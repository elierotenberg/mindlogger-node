#!/usr/bin/env node
import { promises } from "fs";

import * as t from "typed-assert";
import yargs from "yargs";
import { load } from "js-yaml";

import { MindLoggerClient } from ".";

if (require.main !== module) {
  console.error("this should be the main module");
  process.exit(1);
}

const main = async (): Promise<void> => {
  const argv = yargs(process.argv.slice(2))
    .options({
      authFile: {
        type: "string",
        alias: "a",
        description: "path to the auth file",
        demandOption: true,
      },
      outFile: {
        type: "string",
        alias: "o",
        description: "path to download the CSV file",
      },
    })
    .command("auth", "Get authentication results")
    .command("download-applet-data", "Download all data from an applet", {
      appletId: {
        type: "string",
        description: "Applet Id",
        demandOption: true,
      },
    })
    .help()
    .strict()
    .demandCommand(1).argv;

  const command = argv._[0];

  t.isString(command);

  t.isString(argv.authFile);

  const authConfig = load(
    await promises.readFile(argv.authFile, { encoding: "utf8" }),
  );

  t.isRecord(authConfig, "auth file should be a record");

  const { username, password } = authConfig;
  t.isString(username, "username should be a string");
  t.isString(password, "password should be a string");

  t.isOptionOfType(
    argv.authFile,
    t.isString,
    "authFile should be undefined or a string",
  );

  const client = await MindLoggerClient.createClient({ username, password });

  const print = async (data: unknown): Promise<void> => {
    if (argv.outFile) {
      await promises.writeFile(
        argv.outFile,
        typeof data === "string" ? data : JSON.stringify(data, null, 2),
        { encoding: "utf8" },
      );
    } else {
      console.log(data);
    }
  };

  if (command === "auth") {
    await print(await client.getAuth());
  } else if (command === "download-applet-data") {
    const { appletId } = argv;
    t.isString(appletId, "appletId should be a string");
    await print(await client.getAppletData(appletId));
  } else {
    throw new TypeError(`invalid command: ${command}`);
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
