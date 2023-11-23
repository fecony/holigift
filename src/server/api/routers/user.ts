import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { GetByUsername, UserOnboarding } from "@/server/api/schema";
import {
  getProfileByUsername,
  updateUserInfo,
} from "@/server/db/repository/user";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.user.findFirst({
      where: (user, { eq }) => eq(user.providerId, ctx.auth.userId),
    });
  }),

  getByUsername: publicProcedure
    .input(GetByUsername)
    .query(async ({ ctx, input }) => {
      const authedUserId = ctx.auth?.userId;

      const profile = await getProfileByUsername(input.username);

      if (!profile) {
        return null;
      }

      return { ...profile, isOwner: authedUserId === profile.providerId };
    }),

  updateUser: protectedProcedure
    .input(UserOnboarding)
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.auth.userId;
      //  TODO: check if can call update
      return updateUserInfo(userId, input);
    }),
});
