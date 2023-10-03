import type { Config } from "drizzle-kit";
 
export default {
  schema: "./drizzle/schemas/*",
  out: "./drizzle/migrations",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DATABASE_URL!,
  }
} satisfies Config;