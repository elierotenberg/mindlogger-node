import fetch, { BodyInit, Headers } from "node-fetch";

import { AppletData, AppletInfo, Authentication, AuthToken } from "./Responses";

export class Client {
  public static readonly baseURL = `https://api.mindlogger.org`;
  public static readonly url = (path: string): URL =>
    new URL(path, Client.baseURL);

  private static readonly fetchAuthToken = async (
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

  public static readonly createClient = async (
    username: string,
    password: string,
  ): Promise<Client> => {
    const token = await Client.fetchAuthToken(username, password);

    return new Client(token);
  };

  public readonly refreshToken = async (
    username: string,
    password: string,
  ): Promise<void> => {
    this.authToken = await Client.fetchAuthToken(username, password);
  };

  private authToken: AuthToken;

  private constructor(authToken: AuthToken) {
    this.authToken = authToken;
  }

  private readonly fetch = (
    path: string,
    info: {
      readonly method?: string;
      readonly body?: BodyInit;
      readonly headers?: Record<string, unknown>;
    } = {},
  ): Promise<unknown> =>
    fetch(Client.url(path), {
      ...info,
      headers: {
        ...(info.headers ?? {}),
        "Girder-Token": this.authToken.token,
      },
    }).then((response) => response.json());

  public readonly getAuth = (): Promise<Authentication> =>
    this.fetch(`/api/v1/user/authentication`).then(Authentication.parse);

  public readonly getAppletInfo = (appletId: string): Promise<AppletInfo> =>
    this.fetch(
      `/api/v1/applet/${appletId}?retrieveSchedule=true&retrieveAllEvents=true&retrieveItems=true`,
    ).then(AppletInfo.parse);

  public readonly getAppletData = (appletId: string): Promise<AppletData> =>
    this.fetch(`/api/v1/applet/${appletId}/data?users=`).then(AppletData.parse);
}
