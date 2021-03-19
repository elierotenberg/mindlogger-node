MindLogger Node Client

### Installation

```
npm i mindlogger-node
```

### Usage

#### CLI

```
Commands:
  mindlogger-cli auth                  Get authentication results
  mindlogger-cli download-applet-data  Download all data from an applet

Options:
      --version   Show version number                                  [boolean]
  -a, --authFile  path to the auth file                      [string] [required]
  -o, --outFile   path to write the output                              [string]
      --help      Show help                                            [boolean]
```

#### Library

```ts
import { MindLoggerClient } from "mindlogger-node";

const client = await MindLoggerClient.createClient({
  username: "...",
  password: "...",
});

await client.getAppletData("...");
```

See [the generated docs](docs).
