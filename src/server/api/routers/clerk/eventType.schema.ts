import { z } from "zod";

// TODO: need to specify all event data types to use it later
export const clerkEvent = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("user.created"),
    data: z.object({
      id: z.string(),
      username: z.string().optional(),
      created_at: z.number(),
      email_addresses: z.array(
        z.object({
          email_address: z.string(),
        }),
      ),
      first_name: z.string(),
      last_name: z.string().nullable(),
    }),
  }),
  z.object({
    type: z.literal("user.updated"),
    data: z.object({
      id: z.string(),
      updated_at: z.number(),
    }),
  }),
  z.object({
    type: z.literal("user.deleted"),
    data: z.object({
      id: z.string(),
    }),
  }),
  z.object({
    type: z.literal("organization.created"),
    data: z.object({
      id: z.string(),
      slug: z.string(),
      name: z.string(),
      created_at: z.number(),
    }),
  }),
  z.object({
    type: z.literal("session.created"),
    data: z.object({
      id: z.string(),
      user_id: z.string(),
      created_at: z.number(),
      expire_at: z.number(),
    }),
  }),
  z.object({
    type: z.literal("session.revoked"),
    data: z.object({
      id: z.string(),
      user_id: z.string(),
    }),
  }),
  z.object({
    type: z.literal("session.removed"),
    data: z.object({
      id: z.string(),
      user_id: z.string(),
    }),
  }),
  z.object({
    type: z.literal("session.ended"),
    data: z.object({
      id: z.string(),
      user_id: z.string(),
    }),
  }),
]);
