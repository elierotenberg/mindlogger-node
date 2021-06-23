import { promises } from "fs";
import { join } from "path";

import { z } from "zod";

import { Client, AppletData, AppletInfo, Authentication } from "..";

const config = promises
  .readFile(join(__dirname, `..`, `..`, `config.test.json`), {
    encoding: `utf-8`,
  })
  .then((json) => JSON.parse(json))
  .then(
    z.object({
      username: z.string(),
      password: z.string(),
      applets: z.array(
        z.object({
          appletId: z.string(),
          appletPassword: z.string(),
        }),
      ),
    }).parse,
  );

describe(`Client`, () => {
  test(`getAuth`, async () => {
    const { username, password } = await config;
    await expect(
      Client.createClient(username, `wrong password`),
    ).rejects.toBeTruthy();
    await expect(
      Client.createClient(`wrong username`, password),
    ).rejects.toBeTruthy();
    const client = await Client.createClient(username, password);
    await expect(
      client.getAuth().then(Authentication.parse),
    ).resolves.toBeTruthy();
  });

  test(`getAppletInfo`, async () => {
    const { username, password, applets } = await config;
    const client = await Client.createClient(username, password);
    await Promise.all(
      applets.map(async ({ appletId }) => {
        await expect(
          client.getAppletInfo(appletId).then(AppletInfo.parse),
        ).resolves.toBeTruthy();
      }),
    );
  });

  test(`getAppletData`, async () => {
    const { username, password, applets } = await config;
    const client = await Client.createClient(username, password);
    await Promise.all(
      applets.map(async ({ appletId }) => {
        await expect(
          client.getAppletData(appletId).then(AppletData.parse),
        ).resolves.toBeTruthy();
      }),
    );
  });
});
