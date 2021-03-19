[mindlogger-node](../README.md) / MindLoggerClient

# Class: MindLoggerClient

## Table of contents

### Constructors

- [constructor](mindloggerclient.md#constructor)

### Properties

- [token](mindloggerclient.md#token)
- [baseURL](mindloggerclient.md#baseurl)

### Methods

- [fetch](mindloggerclient.md#fetch)
- [getAppletData](mindloggerclient.md#getappletdata)
- [getAuth](mindloggerclient.md#getauth)
- [createClient](mindloggerclient.md#createclient)
- [url](mindloggerclient.md#url)

## Constructors

### constructor

\+ `Private`**new MindLoggerClient**(`token`: *string*): [*MindLoggerClient*](mindloggerclient.md)

#### Parameters:

Name | Type |
:------ | :------ |
`token` | *string* |

**Returns:** [*MindLoggerClient*](mindloggerclient.md)

Defined in: [MindLoggerClient.ts:34](https://github.com/elierotenberg/mindlogger-node/blob/25434e4/src/MindLoggerClient.ts#L34)

## Properties

### token

• `Private` `Readonly` **token**: *string*

Defined in: [MindLoggerClient.ts:34](https://github.com/elierotenberg/mindlogger-node/blob/25434e4/src/MindLoggerClient.ts#L34)

___

### baseURL

▪ `Readonly` `Static` **baseURL**: *https://api.mindlogger.org*

Defined in: [MindLoggerClient.ts:9](https://github.com/elierotenberg/mindlogger-node/blob/25434e4/src/MindLoggerClient.ts#L9)

## Methods

### fetch

▸ `Private` `Readonly`**fetch**(`path`: *string*, `info?`: { `body?`: BodyInit ; `headers?`: *Record*<string, unknown\> ; `method?`: *string*  }): *Promise*<unknown\>

#### Parameters:

Name | Type |
:------ | :------ |
`path` | *string* |
`info` | *object* |
`info.body?` | BodyInit |
`info.headers?` | *Record*<string, unknown\> |
`info.method?` | *string* |

**Returns:** *Promise*<unknown\>

Defined in: [MindLoggerClient.ts:40](https://github.com/elierotenberg/mindlogger-node/blob/25434e4/src/MindLoggerClient.ts#L40)

___

### getAppletData

▸ `Readonly`**getAppletData**(`appletId`: *string*): *Promise*<unknown\>

#### Parameters:

Name | Type |
:------ | :------ |
`appletId` | *string* |

**Returns:** *Promise*<unknown\>

Defined in: [MindLoggerClient.ts:58](https://github.com/elierotenberg/mindlogger-node/blob/25434e4/src/MindLoggerClient.ts#L58)

___

### getAuth

▸ `Readonly`**getAuth**(): *Promise*<unknown\>

**Returns:** *Promise*<unknown\>

Defined in: [MindLoggerClient.ts:56](https://github.com/elierotenberg/mindlogger-node/blob/25434e4/src/MindLoggerClient.ts#L56)

___

### createClient

▸ `Readonly` `Static`**createClient**(`__namedParameters`: CreateClientParams): *Promise*<[*MindLoggerClient*](mindloggerclient.md)\>

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | CreateClientParams |

**Returns:** *Promise*<[*MindLoggerClient*](mindloggerclient.md)\>

Defined in: [MindLoggerClient.ts:13](https://github.com/elierotenberg/mindlogger-node/blob/25434e4/src/MindLoggerClient.ts#L13)

___

### url

▸ `Readonly` `Static`**url**(`path`: *string*): URL

#### Parameters:

Name | Type |
:------ | :------ |
`path` | *string* |

**Returns:** URL

Defined in: [MindLoggerClient.ts:10](https://github.com/elierotenberg/mindlogger-node/blob/25434e4/src/MindLoggerClient.ts#L10)
