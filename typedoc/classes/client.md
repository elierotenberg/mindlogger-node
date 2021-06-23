[mindlogger-node](../README.md) / Client

# Class: Client

## Table of contents

### Constructors

- [constructor](client.md#constructor)

### Properties

- [authToken](client.md#authtoken)
- [baseURL](client.md#baseurl)

### Methods

- [fetch](client.md#fetch)
- [getAppletData](client.md#getappletdata)
- [getAppletInfo](client.md#getappletinfo)
- [getAuth](client.md#getauth)
- [refreshToken](client.md#refreshtoken)
- [createClient](client.md#createclient)
- [fetchAuthToken](client.md#fetchauthtoken)
- [url](client.md#url)

## Constructors

### constructor

• `Private` **new Client**(`authToken`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authToken` | `Object` |
| `authToken.expires` |  |
| `authToken.token` |  |

#### Defined in

[lib/Client.ts:46](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Client.ts#L46)

## Properties

### authToken

• `Private` **authToken**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `expires` |  |
| `token` |  |

#### Defined in

[lib/Client.ts:46](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Client.ts#L46)

___

### baseURL

▪ `Static` `Readonly` **baseURL**: ``"https://api.mindlogger.org"``

#### Defined in

[lib/Client.ts:6](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Client.ts#L6)

## Methods

### fetch

▸ `Private` `Readonly` **fetch**(`path`, `info?`): `Promise`<unknown\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |
| `info` | `Object` |
| `info.body?` | `BodyInit` |
| `info.headers?` | `Record`<string, unknown\> |
| `info.method?` | `string` |

#### Returns

`Promise`<unknown\>

#### Defined in

[lib/Client.ts:52](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Client.ts#L52)

___

### getAppletData

▸ `Readonly` **getAppletData**(`appletId`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appletId` | `string` |

#### Returns

`Promise`<`Object`\>

#### Defined in

[lib/Client.ts:76](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Client.ts#L76)

___

### getAppletInfo

▸ `Readonly` **getAppletInfo**(`appletId`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appletId` | `string` |

#### Returns

`Promise`<`Object`\>

#### Defined in

[lib/Client.ts:71](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Client.ts#L71)

___

### getAuth

▸ `Readonly` **getAuth**(): `Promise`<`Object`\>

#### Returns

`Promise`<`Object`\>

#### Defined in

[lib/Client.ts:68](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Client.ts#L68)

___

### refreshToken

▸ `Readonly` **refreshToken**(`username`, `password`): `Promise`<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |
| `password` | `string` |

#### Returns

`Promise`<void\>

#### Defined in

[lib/Client.ts:39](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Client.ts#L39)

___

### createClient

▸ `Static` `Readonly` **createClient**(`username`, `password`): `Promise`<[Client](client.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |
| `password` | `string` |

#### Returns

`Promise`<[Client](client.md)\>

#### Defined in

[lib/Client.ts:30](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Client.ts#L30)

___

### fetchAuthToken

▸ `Static` `Private` `Readonly` **fetchAuthToken**(`username`, `password`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | `string` |
| `password` | `string` |

#### Returns

`Promise`<`Object`\>

#### Defined in

[lib/Client.ts:10](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Client.ts#L10)

___

### url

▸ `Static` `Readonly` **url**(`path`): `URL`

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

`URL`

#### Defined in

[lib/Client.ts:7](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Client.ts#L7)
