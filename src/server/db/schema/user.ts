import { relations, sql } from "drizzle-orm";
import {
  bigint,
  index,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { mysqlTable } from "./table";
// import { link } from "./link";

export const user = mysqlTable("user", {
  //   id: uuid("id").primaryKey().defaultRandom(),
  //   providerId: text("provider_id").unique(),
  //   email: varchar("email", { length: 255 }).unique().notNull(),
  //   firstName: varchar("first_name", { length: 255 }),
  //   lastName: varchar("last_name"),
  //   createdAt: timestamp("created_at")
  //     .default(sql`CURRENT_TIMESTAMP`)
  //     .notNull(),
  //   updatedAt: timestamp("updatedAt").onUpdateNow(),
  //   id: uuid("id").primaryKey().defaultRandom(),
  //   providerId: text("provider_id").unique(),
  //   email: text("email").unique().notNull(),
  //   firstName: text("first_name"),
  //   lastName: text("last_name"),
  //   createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  //   updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// export const userRelations = relations(user, ({ many }) => ({
//   links: many(link),
// }));
