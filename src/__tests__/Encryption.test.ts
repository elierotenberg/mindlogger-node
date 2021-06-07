import { promises } from "fs";
import { join } from "path";

import { AuthTokenService, Client, ClientConfig } from "../lib/Client";
import { decryptAppletResponses } from "../lib/Encryption";

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

describe(`Encryption`, () => {
  test(`decryptAppletResponses`, async () => {
    const { applets } = await config;
    const client = new Client(await authTokenService);
    await Promise.all(
      applets.map(async ({ appletId, appletPassword }) => {
        const [appletInfo, appletData] = await Promise.all([
          client.getAppletInfo(appletId),
          client.getAppletData(appletId),
        ]);
        const responses = decryptAppletResponses(
          appletInfo,
          appletData,
          appletPassword,
        );
        expect(responses).toBeInstanceOf(Array);
        for (const response of responses) {
          expect(typeof response.responseId).toEqual(`string`);
          expect(typeof response.data).not.toEqual(`undefined`);
        }
      }),
    );
  });
});
