import { promises } from "fs";
import { join } from "path";

import { AuthTokenService, Client, ClientConfig } from "../lib/Client";
import { AppletData, AppletInfo, Authentication } from "../lib/Responses";

const config = promises
  .readFile(join(__dirname, `..`, `..`, `config.test.json`), {
    encoding: `utf-8`,
  })
  .then((json) => JSON.parse(json))
  .then(ClientConfig.parse);

const authTokenService = config.then(
  (config) => new AuthTokenService(config.auth),
);

beforeAll(async () => {
  (await authTokenService).start();
});

afterAll(async () => {
  (await authTokenService).stop();
});

describe(`Client`, () => {
  test(`getAuth`, async () => {
    const client = new Client(await authTokenService);
    expect(client.getAuth().then(Authentication.parse)).resolves.toBeTruthy();
  });

  test(`getAppletInfo`, async () => {
    const { applets } = await config;
    const client = new Client(await authTokenService);
    await Promise.all(
      applets.map(async ({ appletId }) => {
        await expect(
          client.getAppletInfo(appletId).then(AppletInfo.parse),
        ).resolves.toBeTruthy();
      }),
    );
  });

  test(`getAppletData`, async () => {
    const { applets } = await config;
    const client = new Client(await authTokenService);
    await Promise.all(
      applets.map(async ({ appletId }) => {
        await expect(
          client.getAppletData(appletId).then(AppletData.parse),
        ).resolves.toBeTruthy();
      }),
    );
  });
});
