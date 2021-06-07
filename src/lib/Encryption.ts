// See https://github.com/ChildMindInstitute/mindlogger-admin/blob/3ccaeb6e23820d480658155014c66179bc7bd112/src/Components/Utils/encryption/encryption.vue#L8
import { createDecipheriv, createDiffieHellman, createHash } from "crypto";

import BufferBrowserPolyfill from "../../node_modules/buffer";

const BufferPolyfillToString = (
  BufferBrowserPolyfill as unknown as {
    Buffer: {
      prototype: {
        toString: () => string;
      };
    };
  }
).Buffer.prototype.toString;

import { AppletData, AppletInfo } from "./Responses";

const createAppletPrivateKey = (
  appletPassword: string,
  accountId: string,
): Buffer => {
  const buf1 = createHash(`sha512`).update(appletPassword).digest();
  const buf2 = createHash(`sha512`).update(accountId).digest();
  const s1 = BufferPolyfillToString.apply(buf1);
  const s2 = BufferPolyfillToString.apply(buf2);
  const s3 = s1 + s2;
  const result = Buffer.from(s3);

  return result;
};

const createAppletRespondentKey = (
  appletPrime: Buffer,
  appletPrivateKey: Buffer,
  appletRespondentPublicKey: Buffer,
): Buffer => {
  const appletRespondentKey = createDiffieHellman(appletPrime);
  appletRespondentKey.setPrivateKey(appletPrivateKey);
  const appletRespondentSecret = appletRespondentKey.computeSecret(
    appletRespondentPublicKey,
  );
  return createHash(`sha256`).update(appletRespondentSecret).digest();
};

const decryptAppletResponse = (
  respondentKey: Buffer,
  responseData: string,
): string => {
  const [ivHex, ...parts] = responseData.split(`:`);
  const iv = Buffer.from(ivHex, `hex`);
  const encryptedData = Buffer.from(parts.join(`:`), `hex`);
  const decipher = createDecipheriv(`aes-256-cbc`, respondentKey, iv);
  const chunks = [decipher.update(encryptedData)];
  chunks.push(decipher.final());
  return Buffer.concat(chunks).toString();
};

export const decryptAppletResponses = (
  appletInfo: AppletInfo,
  appletData: AppletData,
  appletPassword: string,
): { readonly responseId: string; readonly data: unknown }[] => {
  const appletPrime = Buffer.from(appletInfo.applet.encryption.appletPrime);
  const appletPrivateKey = createAppletPrivateKey(
    appletPassword,
    appletInfo.accountId,
  );
  const respondentKeys = appletData.keys.map((appletRespondentPublicKey) =>
    createAppletRespondentKey(
      appletPrime,
      appletPrivateKey,
      Buffer.from(appletRespondentPublicKey),
    ),
  );
  return Object.entries(appletData.dataSources).map(
    ([responseId, { data: responseData, key: respondentKeyIndex }]) => {
      const respondentKey = respondentKeys[respondentKeyIndex];
      if (!respondentKey) {
        throw new Error(`respondentKey not found: ${respondentKeyIndex}`);
      }
      return {
        data: JSON.parse(decryptAppletResponse(respondentKey, responseData)),
        responseId,
      };
    },
  );
};
