import * as UserSchema from "drizzle/schemas/user.schema";
import * as TransactionCostSchema from "drizzle/schemas/transaction.schema";
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
const db = drizzle(sql, {
  schema: { ...UserSchema, ...TransactionCostSchema },
});

export { db };
