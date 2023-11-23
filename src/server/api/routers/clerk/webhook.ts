import * as z from "zod";
import { clerkEvent } from "@/server/api/routers/clerk/eventType.schema";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { user } from "@/server/db";

export const webhookProcedure = publicProcedure.input(
  z.object({
    data: clerkEvent,
  }),
);

export const webhookRouter = createTRPCRouter({
  userCreated: webhookProcedure.mutation(async ({ input, ctx }) => {
    if (input.data.type === "user.created") {
      const email = input.data.data.email_addresses[0]?.email_address;
      const firstName = input.data.data.first_name;
      const lastName = input.data.data.last_name;
      const username = input.data.data.username;

      if (!email) throw new Error("No email provided");

      const alreadyExists = await ctx.db.query.user.findFirst({
        where: (user, { eq }) => eq(user.providerId, input.data.data.id),
        columns: {
          id: true,
        },
      });

      if (alreadyExists) return;

      await ctx.db.insert(user).values({
        providerId: input.data.data.id,
        email,
        firstName,
        lastName,
        username,
      });

      // TODO: send email
      // TODO: save analytics user signed up count+
    }
  }),

  userUpdated: webhookProcedure.mutation((opts) => {
    if (opts.input.data.type === "user.updated") {
      // TODO: Update user
    }
  }),

  userDeleted: webhookProcedure.mutation((opts) => {
    if (opts.input.data.type === "user.deleted") {
      // TODO: Delete user
    }
  }),
});
