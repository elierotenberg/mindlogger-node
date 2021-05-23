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

\+ `Private` **new Client**(`authToken`: { `expires`:  ; `token`:   }): [*Client*](client.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `authToken` | *object* |
| `authToken.expires` | - |
| `authToken.token` | - |

**Returns:** [*Client*](client.md)

Defined in: lib/Client.ts:46

## Properties

### authToken

• `Private` **authToken**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `expires` |  |
| `token` |  |

Defined in: lib/Client.ts:46

___

### baseURL

▪ `Static` `Readonly` **baseURL**: ``"https://api.mindlogger.org"``

Defined in: lib/Client.ts:6

## Methods

### fetch

▸ `Private` `Readonly` **fetch**(`path`: *string*, `info?`: { `body?`: BodyInit ; `headers?`: *Record*<string, unknown\> ; `method?`: *string*  }): *Promise*<unknown\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `path` | *string* | - |
| `info` | *object* | {} |
| `info.body?` | BodyInit | - |
| `info.headers?` | *Record*<string, unknown\> | - |
| `info.method?` | *string* | - |

**Returns:** *Promise*<unknown\>

Defined in: lib/Client.ts:52

___

### getAppletData

▸ `Readonly` **getAppletData**(`appletId`: *string*): *Promise*<{ `dataSources`:  ; `keys`:  ; `responses`:   }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appletId` | *string* |

**Returns:** *Promise*<{ `dataSources`:  ; `keys`:  ; `responses`:   }\>

Defined in: lib/Client.ts:76

___

### getAppletInfo

▸ `Readonly` **getAppletInfo**(`appletId`: *string*): *Promise*<{ `accountId`:  ; `applet`:  ; `items`:   }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `appletId` | *string* |

**Returns:** *Promise*<{ `accountId`:  ; `applet`:  ; `items`:   }\>

Defined in: lib/Client.ts:71

___

### getAuth

▸ `Readonly` **getAuth**(): *Promise*<{ `account`:  ; `authToken`:  ; `user`:   }\>

**Returns:** *Promise*<{ `account`:  ; `authToken`:  ; `user`:   }\>

Defined in: lib/Client.ts:68

___

### refreshToken

▸ `Readonly` **refreshToken**(`username`: *string*, `password`: *string*): *Promise*<void\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | *string* |
| `password` | *string* |

**Returns:** *Promise*<void\>

Defined in: lib/Client.ts:39

___

### createClient

▸ `Static` `Readonly` **createClient**(`username`: *string*, `password`: *string*): *Promise*<[*Client*](client.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | *string* |
| `password` | *string* |

**Returns:** *Promise*<[*Client*](client.md)\>

Defined in: lib/Client.ts:30

___

### fetchAuthToken

▸ `Static` `Private` `Readonly` **fetchAuthToken**(`username`: *string*, `password`: *string*): *Promise*<{ `expires`:  ; `token`:   }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `username` | *string* |
| `password` | *string* |

**Returns:** *Promise*<{ `expires`:  ; `token`:   }\>

Defined in: lib/Client.ts:10

___

### url

▸ `Static` `Readonly` **url**(`path`: *string*): URL

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | *string* |

**Returns:** URL

Defined in: lib/Client.ts:7
