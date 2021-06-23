mindlogger-node

# mindlogger-node

## Table of contents

### Classes

- [Client](classes/client.md)

### Type aliases

- [AppletData](README.md#appletdata)
- [AppletInfo](README.md#appletinfo)
- [AuthToken](README.md#authtoken)
- [Authentication](README.md#authentication)

### Variables

- [AppletData](README.md#appletdata)
- [AppletInfo](README.md#appletinfo)
- [AuthToken](README.md#authtoken)
- [Authentication](README.md#authentication)

### Functions

- [decryptAppletResponses](README.md#decryptappletresponses)

## Type aliases

### AppletData

Ƭ **AppletData**: `z.infer`<typeof [AppletData](README.md#appletdata)\>

#### Defined in

[lib/Responses.ts:91](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Responses.ts#L91)

___

### AppletInfo

Ƭ **AppletInfo**: `z.infer`<typeof [AppletInfo](README.md#appletinfo)\>

#### Defined in

[lib/Responses.ts:61](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Responses.ts#L61)

___

### AuthToken

Ƭ **AuthToken**: `z.infer`<typeof [AuthToken](README.md#authtoken)\>

#### Defined in

[lib/Responses.ts:8](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Responses.ts#L8)

___

### Authentication

Ƭ **Authentication**: `z.infer`<typeof [Authentication](README.md#authentication)\>

#### Defined in

[lib/Responses.ts:20](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Responses.ts#L20)

## Variables

### AppletData

• `Const` **AppletData**: `ZodObject`<`Object`, ``"strip"``, ZodTypeAny, `Object`, `Object`\>

#### Defined in

[lib/Responses.ts:63](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Responses.ts#L63)

___

### AppletInfo

• `Const` **AppletInfo**: `ZodObject`<`Object`, ``"strip"``, ZodTypeAny, `Object`, `Object`\>

#### Defined in

[lib/Responses.ts:22](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Responses.ts#L22)

___

### AuthToken

• `Const` **AuthToken**: `ZodObject`<`Object`, ``"strip"``, ZodTypeAny, `Object`, `Object`\>

#### Defined in

[lib/Responses.ts:3](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Responses.ts#L3)

___

### Authentication

• `Const` **Authentication**: `ZodObject`<`Object`, ``"strip"``, ZodTypeAny, `Object`, `Object`\>

#### Defined in

[lib/Responses.ts:10](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Responses.ts#L10)

## Functions

### decryptAppletResponses

▸ `Const` **decryptAppletResponses**(`appletInfo`, `appletData`, `appletPassword`): { `data`: `unknown` ; `responseId`: `string`  }[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `appletInfo` | `Object` |
| `appletInfo.accountId` |  |
| `appletInfo.applet` |  |
| `appletInfo.items` |  |
| `appletData` | `Object` |
| `appletData.dataSources` |  |
| `appletData.keys` |  |
| `appletData.responses` |  |
| `appletPassword` | `string` |

#### Returns

{ `data`: `unknown` ; `responseId`: `string`  }[]

#### Defined in

[lib/Encryption.ts:58](https://github.com/elierotenberg/mindlogger-node/blob/d40e19b/src/lib/Encryption.ts#L58)
