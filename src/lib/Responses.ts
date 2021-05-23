import { z } from "zod";

export const AuthToken = z.object({
  expires: z.string(),
  token: z.string(),
});

export type AuthToken = z.infer<typeof AuthToken>;

export const Authentication = z.object({
  account: z.object({
    accountId: z.string(),
  }),
  authToken: AuthToken,
  user: z.object({
    email: z.string(),
  }),
});

export type Authentication = z.infer<typeof Authentication>;

export const AppletInfo = z.object({
  accountId: z.string(),
  applet: z.object({
    encryption: z.object({
      appletPrime: z.array(z.number()),
      appletPublicKey: z.array(z.number()),
      base: z.array(z.number()),
    }),
  }),
  items: z.record(
    z.object({
      [`@id`]: z.string(),
      [`reprolib:terms/inputType`]: z.array(
        z.object({
          [`@type`]: z.string(),
          [`@value`]: z.string(),
        }),
      ),
      [`reprolib:terms/responseOptions`]: z.array(
        z.object({
          [`reprolib:terms/valueType`]: z
            .array(
              z.object({
                [`@id`]: z.string(),
              }),
            )
            .optional(),
        }),
      ),
      [`schema:question`]: z.array(
        z.object({
          [`@language`]: z.string(),
          [`@value`]: z.string(),
        }),
      ),
    }),
  ),
});

export type AppletInfo = z.infer<typeof AppletInfo>;

export const AppletData = z.object({
  dataSources: z.record(
    z.object({
      data: z.string(),
      key: z.number(),
    }),
  ),
  keys: z.array(z.array(z.number())),
  responses: z.array(
    z.object({
      MRN: z.string(),
      activity: z.object({
        [`@id`]: z.string(),
        name: z.string(),
      }),
      created: z.string(),
      responseCompleted: z.string(),
      data: z.record(
        z.object({
          ptr: z.number(),
          src: z.string(),
        }),
      ),
      userId: z.string(),
    }),
  ),
});

export type AppletData = z.infer<typeof AppletData>;
