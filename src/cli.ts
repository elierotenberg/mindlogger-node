#!/usr/bin/env node
import { promises } from "fs";
import { readFile } from "fs/promises";
import { resolve } from "path";

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { z } from "zod";

import { AppletData, AppletInfo } from "./lib/Responses";
import { decryptAppletResponses } from "./lib/Encryption";

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
      await promises.writeFile(resolve(process.cwd(), outFile), json, {
        encoding: `utf-8`,
      });
    } else {
      console.log(data);
    }
  };

  await yargs(hideBin(process.argv))
    .options({
      outFile: {
        type: `string`,
        alias: `o`,
        description: `Optional output file`,
      },
    })
    .command(
      `authentication`,
      `Get authentication results`,
      {
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
      },
      async (argv) => {
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
        appletId: {
          type: `string`,
          alias: `a`,
          description: `Applet Id`,
          demandOption: true,
        },
      },
      async (argv) => {
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
        appletId: {
          type: `string`,
          alias: `a`,
          description: `Applet Id`,
          demandOption: true,
        },
      },
      async (argv) => {
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
    .command(
      `decrypt-applet-data`,
      `Decrypt applet data`,
      {
        appletPassword: {
          type: `string`,
          alias: `p`,
          description: `Applet password`,
          demandOption: true,
        },
        appletInfo: {
          type: `string`,
          alias: `i`,
          description: `Applet info file`,
          demandOption: true,
        },
        appletData: {
          type: `string`,
          alias: `d`,
          description: `Applet data file`,
          demandOption: true,
        },
      },
      async (argv) => {
        const {
          outFile,
          appletPassword,
          appletInfo: appletInfoFile,
          appletData: appletDataFile,
        } = z
          .object({
            outFile: z.string().optional(),
            appletPassword: z.string(),
            appletInfo: z.string(),
            appletData: z.string(),
          })
          .parse(argv);
        const appletInfo = await readFile(
          resolve(process.cwd(), appletInfoFile),
          {
            encoding: `utf-8`,
          },
        ).then((appletInfo) => AppletInfo.parse(JSON.parse(appletInfo)));
        const appletData = await readFile(
          resolve(process.cwd(), appletDataFile),
          {
            encoding: `utf-8`,
          },
        ).then((appletData) => AppletData.parse(JSON.parse(appletData)));
        const appletResponses = await decryptAppletResponses(
          appletInfo,
          appletData,
          appletPassword,
        );
        await print(outFile, JSON.stringify(appletResponses, null, 2));
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
