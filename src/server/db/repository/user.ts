import { type UserOnboarding } from "@/server/api/schema";
import { db, user } from "@/server/db";
import { eq } from "drizzle-orm";
import { type z } from "zod";

export const getUserByProviderId = async (providerId: string) => {
  return await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.providerId, providerId),
  });
};

// TODO: cache
export const getProfileByUsername = async (username: string) => {
  return db.query.user.findFirst({
    where: (user, { eq }) => eq(user.username, username),
    with: {
      wishlistItems: {
        where: (wishlistItem, { eq }) => eq(wishlistItem.isPublic, true),
      },
    },
  });
};

export const updateUserInfo = async (
  userProviderId: string,
  payload: z.infer<typeof UserOnboarding>,
) => {
  await db
    .update(user)
    .set({
      username: payload.username,
      isPublic: payload.isPublic,
      isOnboarded: true,
    })
    .where(eq(user.providerId, userProviderId));

  return payload;
};
