import { bigint, boolean, text, varchar } from "drizzle-orm/mysql-core";
import { type z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { mysqlTable } from "../table";
import { user } from "@/server/db/schema";

export const wishlistItem = mysqlTable("wishlist_item", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  userId: bigint("user_id", { mode: "number" }).notNull(),
  url: text("url"),
  imageUrl: text("image_url"),
  title: varchar("title", { length: 500 }).notNull(),
  notes: text("notes"),
  isPublic: boolean("isPublic").default(false),
});

export const wishlistItemRelations = relations(wishlistItem, ({ one }) => ({
  owner: one(user, {
    fields: [wishlistItem.userId],
    references: [user.id],
  }),
}));

export const insertWishlistItemSchema = createInsertSchema(wishlistItem);
export const selectWishlistItemSchema = createSelectSchema(wishlistItem);

export type WishlistItem = z.infer<typeof selectWishlistItemSchema>;
