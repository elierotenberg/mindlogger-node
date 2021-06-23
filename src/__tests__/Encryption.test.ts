import { promises } from "fs";
import { join } from "path";

import { z } from "zod";

import { Client, decryptAppletResponses } from "..";

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

describe(`Encryption`, () => {
  test(`decryptAppletResponses`, async () => {
    const { username, password, applets } = await config;
    const client = await Client.createClient(username, password);
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
