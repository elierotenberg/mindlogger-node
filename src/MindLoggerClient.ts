import fetch, { BodyInit, Headers } from "node-fetch";

type CreateClientParams = {
  readonly username: string;
  readonly password: string;
};

export class MindLoggerClient {
  public static readonly baseURL = `https://api.mindlogger.org`;
  public static readonly url = (path: string): URL =>
    new URL(path, MindLoggerClient.baseURL);

  public static readonly createClient = async ({
    username,
    password,
  }: CreateClientParams): Promise<MindLoggerClient> => {
    const {
      authToken: { token },
    } = await fetch(
      MindLoggerClient.url("/api/v1/user/authentication?lang=en_US"),
      {
        method: "get",
        headers: new Headers({
          "Girder-Authorization": `Basic ${Buffer.from(
            `${username}:${password}`,
          ).toString("base64")}`,
        }),
      },
    ).then((response) => response.json());

    return new MindLoggerClient(token);
  };

  private readonly token: string;

  private constructor(token: string) {
    this.token = token;
  }

  private readonly fetch = (
    path: string,
    info: {
      readonly method?: string;
      readonly body?: BodyInit;
      readonly headers?: Record<string, unknown>;
    } = {},
  ): Promise<unknown> =>
    fetch(MindLoggerClient.url(path), {
      ...info,
      headers: {
        ...(info.headers ?? {}),
        "Girder-Token": this.token,
      },
    }).then((response) => response.json());

  public readonly getAuth = (): Promise<unknown> =>
    this.fetch(`/api/v1/user/authentication`);
  public readonly getAppletData = (appletId: string): Promise<unknown> =>
    this.fetch(`/api/v1/applet/${appletId}/data?users=`);
}
