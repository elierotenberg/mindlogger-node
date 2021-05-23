#!/usr/bin/env node
import { promises } from "fs";
import { resolve } from "path";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { z } from "zod";

import { Client } from ".";

if (require.main !== module) {
  console.error(`this should be the main module`);
  process.exit(1);
}

const main = async (): Promise<void> => {
  const print = async (
    outFile: undefined | string,
    data: unknown,
  ): Promise<void> => {
    const json = JSON.stringify(data, null, 2);
    if (outFile) {
      await promises.writeFile(resolve(__dirname, outFile), json, {
        encoding: `utf-8`,
      });
    } else {
      console.log(data);
    }
  };

  await yargs(hideBin(process.argv))
    .options({
      username: {
        type: `string`,
        alias: `u`,
        demandOption: true,
        description: `User name`,
      },
      password: {
        type: `string`,
        alias: `p`,
        demandOption: true,
        description: `Password`,
      },
      outFile: {
        type: `string`,
        alias: `o`,
        description: `Optional output file`,
      },
    })
    .command(
      `authentication`,
      `Get authentication results`,
      async ({ argv }) => {
        const { username, password, outFile } = z
          .object({
            username: z.string(),
            password: z.string(),
            outFile: z.string().optional(),
          })
          .parse(argv);
        const client = await Client.createClient(username, password);
        await print(outFile, await client.getAuth());
      },
    )
    .command(
      `applet-info`,
      `Get applet info`,
      {
        appletId: {
          type: `string`,
          description: `Applet Id`,
          demandOption: true,
        },
      },
      async ({ argv }) => {
        const { username, password, outFile, appletId } = z
          .object({
            username: z.string(),
            password: z.string(),
            outFile: z.string().optional(),
            appletId: z.string(),
          })
          .parse(argv);
        const client = await Client.createClient(username, password);
        await print(outFile, await client.getAppletInfo(appletId));
      },
    )
    .command(
      `applet-data`,
      `Get applet data`,
      {
        appletId: {
          type: `string`,
          description: `Applet Id`,
          demandOption: true,
        },
      },
      async ({ argv }) => {
        const { username, password, outFile, appletId } = z
          .object({
            username: z.string(),
            password: z.string(),
            outFile: z.string().optional(),
            appletId: z.string(),
          })
          .parse(argv);
        const client = await Client.createClient(username, password);
        await print(outFile, await client.getAppletData(appletId));
      },
    )
    .help()
    .strict()
    .demandCommand(1)
    .parseAsync();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
