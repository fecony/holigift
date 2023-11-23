import { type CreateWishlistSchema } from "@/server/api/schema/wishlist";
import { db, wishlistItem } from "@/server/db";
import { type z } from "zod";

export const getUserWishlistItems = async (userId: number) => {
  return await db.query.wishlistItem.findMany({
    where: (item, { eq }) => eq(item.userId, userId),
  });
};

export const createWishlistItem = async (
  userId: number,
  payload: z.infer<typeof CreateWishlistSchema>,
) => {
  const values = { ...payload, userId };

  await db.insert(wishlistItem).values(values);

  return values;
};
