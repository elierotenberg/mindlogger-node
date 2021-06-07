import { promisify } from "util";
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

import fetch, { BodyInit, Headers } from "node-fetch";
import { z } from "zod";
import lockFile from "lockfile";

import { AppletData, AppletInfo, Authentication, AuthToken } from "./Responses";

const lock = promisify(lockFile.lock);
const unlock = promisify(lockFile.unlock);

const cwd = (path: string): string => resolve(process.cwd(), path);

const useLockFile = async <T>(
  lockfile: string,
  fn: () => Promise<T>,
): Promise<T> => {
  try {
    await lock(cwd(lockfile));
    return await fn();
  } finally {
    await unlock(cwd(lockfile));
  }
};

const AppletConfig = z.object({
  appletId: z.string(),
  appletPassword: z.string(),
});

const AuthCacheFileConfig = z.object({
  kind: z.literal(`file`),
  path: z.string(),
  lockfile: z.string(),
});

const AuthConfig = z.object({
  username: z.string(),
  password: z.string(),
  cache: AuthCacheFileConfig.nullish(),
});

type AuthConfig = z.infer<typeof AuthConfig>;

export const ClientConfig = z.object({
  auth: AuthConfig,
  applets: z.array(AppletConfig),
});

type ClientConfig = z.infer<typeof ClientConfig>;

const isExpired = (authToken: AuthToken): boolean => {
  const expires = new Date(authToken.expires);
  return expires.getTime() > Date.now() + 30 * 1000;
};

const nextTickDelay = (authToken: AuthToken): number => {
  const expires = new Date(authToken.expires);
  const delta = expires.getTime() - 30 * 1000 - Date.now();
  return Math.max(1, delta);
};

export class AuthTokenService {
  private props: AuthConfig;
  private authToken: null | Promise<AuthToken>;
  private nextTick: null | NodeJS.Timeout;
  public constructor(props: AuthConfig) {
    this.props = props;
    this.authToken = null;
    this.nextTick = null;
  }

  private readonly scheduleNextTick = (authToken: AuthToken): void => {
    this.nextTick = setTimeout(this.refreshToken, nextTickDelay(authToken));
  };

  private readonly useCache = async <T>(fn: () => Promise<T>): Promise<T> => {
    if (!this.props.cache) {
      return await fn();
    }
    return await useLockFile(this.props.cache.lockfile, fn);
  };

  private readonly readCache = async (): Promise<null | AuthToken> => {
    if (!this.props.cache) {
      return null;
    }
    return await readFile(this.props.cache.path, { encoding: `utf-8` })
      .then(AuthToken.parse)
      .catch(() => null);
  };

  private readonly writeCache = async (authToken: AuthToken): Promise<void> => {
    if (!this.props.cache) {
      return;
    }
    await writeFile(this.props.cache.path, JSON.stringify(authToken, null, 2));
  };

  private readonly refreshToken = (): Promise<AuthToken> => {
    this.authToken = this.useCache(async (): Promise<AuthToken> => {
      const cachedToken = await this.readCache();
      if (cachedToken && !isExpired(cachedToken)) {
        return cachedToken;
      }
      const authToken = await Client.fetchAuthToken(
        this.props.username,
        this.props.password,
      );
      await this.writeCache(authToken);
      return authToken;
    }).then((authToken) => {
      this.scheduleNextTick(authToken);
      return authToken;
    });
    return this.authToken;
  };

  public readonly start = (): void => {
    if (this.authToken) {
      throw new Error(`TokenService already started`);
    }
    this.authToken = this.refreshToken();
  };

  public readonly stop = (): void => {
    if (this.nextTick) {
      clearTimeout(this.nextTick);
    }
  };

  public readonly getAuthToken = async (): Promise<AuthToken> => {
    if (!this.authToken) {
      throw new Error(`TokenService not started`);
    }
    return await this.authToken;
  };
}

export class Client {
  public static readonly baseURL = `https://api.mindlogger.org`;
  public static readonly url = (path: string): URL =>
    new URL(path, Client.baseURL);

  public static readonly fetchAuthToken = async (
    username: string,
    password: string,
  ): Promise<AuthToken> => {
    const { authToken } = await fetch(
      Client.url(`/api/v1/user/authentication?lang=en_US`),
      {
        method: `get`,
        headers: new Headers({
          "Girder-Authorization": `Basic ${Buffer.from(
            `${username}:${password}`,
          ).toString(`base64`)}`,
        }),
      },
    )
      .then((response) => response.json())
      .then(Authentication.parse);
    return authToken;
  };

  private readonly authTokenService: AuthTokenService;

  public constructor(authTokenService: AuthTokenService) {
    this.authTokenService = authTokenService;
  }

  private readonly fetch = (
    path: string,
    info: {
      readonly method?: string;
      readonly body?: BodyInit;
      readonly headers?: Record<string, unknown>;
    } = {},
  ): Promise<unknown> =>
    this.authTokenService
      .getAuthToken()
      .then(({ token }) =>
        fetch(Client.url(path), {
          ...info,
          headers: {
            ...(info.headers ?? {}),
            "Girder-Token": token,
          },
        }),
      )
      .then((response) => response.json());

  public readonly getAuth = (): Promise<Authentication> =>
    this.fetch(`/api/v1/user/authentication`).then(Authentication.parse);

  public readonly getAppletInfo = (appletId: string): Promise<AppletInfo> =>
    this.fetch(
      `/api/v1/applet/${appletId}?retrieveSchedule=true&retrieveAllEvents=true&retrieveItems=true`,
    ).then(AppletInfo.parse);

  public readonly getAppletData = (appletId: string): Promise<AppletData> =>
    this.fetch(`/api/v1/applet/${appletId}/data?users=`).then(AppletData.parse);
}
