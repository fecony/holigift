import { type Config } from "drizzle-kit";

import { env } from "@/env.mjs";

export default {
  schema: "./src/server/db/schema/index.ts",
  out: "./src/server/db/drizzle",
  driver: "mysql2",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  tablesFilter: ["holigift_*"],
  strict: true,
} satisfies Config;
