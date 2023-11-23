import {
  bigint,
  index,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/mysql-core";
import { relations, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { mysqlTable } from "@/server/db/table";
import { wishlistItem } from "@/server/db/schema";
import { type z } from "zod";

export const user = mysqlTable(
  "user",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    providerId: varchar("provider_id", { length: 256 }).unique(),

    username: varchar("username", { length: 256 }),
    isOnboarded: boolean("isOnboarded").default(false),
    isPublic: boolean("isPublic").default(false),
    email: varchar("email", { length: 256 }).unique().notNull(),
    firstName: varchar("first_name", { length: 256 }),
    lastName: varchar("last_name", { length: 256 }),

    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (t) => ({
    providerIdIndex: index("provider_id_idx").on(t.providerId),
  }),
);

export const userRelations = relations(user, ({ many }) => ({
  wishlistItems: many(wishlistItem),
}));

export const insertUserSchema = createInsertSchema(user);
export const selectUserSchema = createSelectSchema(user);

export type User = z.infer<typeof selectUserSchema>;
