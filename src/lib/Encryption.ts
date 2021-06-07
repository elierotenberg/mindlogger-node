import { createDecipheriv, createDiffieHellman, createHash } from "crypto";

import { AppletData, AppletInfo } from "./Responses";

// See https://github.com/ChildMindInstitute/mindlogger-admin/blob/3ccaeb6e23820d480658155014c66179bc7bd112/src/Components/Utils/encryption/encryption.vue#L8
const combineKeys = (parts: string[]): Buffer =>
  Buffer.concat(
    parts.map((part) => createHash(`sha512`).update(part).digest()),
  );

const createAppletPrivateKeyHash = (
  accountId: string,
  appletPassword: string,
): Buffer => combineKeys([appletPassword, accountId]);

const createAppletRespondentKey = (
  appletPrime: Buffer,
  appletPrivateKeyHash: Buffer,
  appletRespondentPublicKey: Buffer,
): Buffer => {
  const appletRespondentKey = createDiffieHellman(appletPrime);
  appletRespondentKey.setPrivateKey(appletPrivateKeyHash);
  const appletRespondentSecret = appletRespondentKey.computeSecret(
    appletRespondentPublicKey,
  );
  return createHash(`sha256`).update(appletRespondentSecret).digest();
};

const decryptAppletResponse = (
  respondentKeyHash: Buffer,
  responseData: string,
): string => {
  const [ivSeed, ...parts] = responseData.split(`:`);
  const iv = Buffer.from(ivSeed, `hex`);
  const encryptedData = Buffer.from(parts.join(`:`), `hex`);
  const decipher = createDecipheriv(`aes-256-cbc`, respondentKeyHash, iv);
  console.log({
    ivSeed,
    iv,
    respondentKeyHash: respondentKeyHash.slice(0, 20),
    encryptedData,
  });
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
  const appletPrivateKeyHash = createAppletPrivateKeyHash(
    appletInfo.accountId,
    appletPassword,
  );
  const respondentKeys = appletData.keys.map((appletRespondentPublicKey) =>
    createAppletRespondentKey(
      appletPrime,
      appletPrivateKeyHash,
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
        data: JSON.stringify(
          decryptAppletResponse(respondentKey, responseData),
        ),
        responseId,
      };
    },
  );
};
