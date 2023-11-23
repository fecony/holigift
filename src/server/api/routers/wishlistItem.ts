import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { getUserByProviderId } from "@/server/db/repository/user";
import {
  getUserWishlistItems,
  createWishlistItem,
} from "@/server/db/repository/wishlistItem";
import { CreateWishlistSchema } from "@/server/api/schema/wishlist";

export const wishlistItemRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const user = await getUserByProviderId(ctx.auth.userId);

    if (!user) throw new Error("User not found");

    return await getUserWishlistItems(user.id);
  }),

  create: protectedProcedure
    .input(CreateWishlistSchema)
    .mutation(async ({ input, ctx }) => {
      const user = await getUserByProviderId(ctx.auth.userId);

      if (!user) throw new Error("User not found");

      return await createWishlistItem(user.id, input);
    }),
});
