import { randomUUID } from "crypto";
import { eq, sql } from "drizzle-orm";
import { transactionCost } from "drizzle/schemas/transaction.schema";
import { users } from "drizzle/schemas/user.schema";
import {
  TransactionCost,
  TransactionCostPayload,
} from "~/entities/TransactionCost";
import { db } from "~/lib/drizzle-orm";

export async function getAllTransaction(user_id: string) {
  const data = await db.query.transactionCost.findMany({
    where: (transactionCost, { eq }) => eq(transactionCost.user, user_id),
    with: {
      user: {
        columns: {
          password: false
        }
      }
    }
  });
  return data;
}

export async function addTransaction(
  transaction: TransactionCostPayload,
  type: "income" | "expense",
) {
  if (type === "expense") {
    transaction.cost = -transaction.cost;
  }

  return db
    .insert(transactionCost)
    .values({
      id: randomUUID(),
      ...transaction,
      type,
    })
    .then(() =>
      db
        .update(users)
        .set({
          balance: sql`${users.balance} + ${transaction.cost}`,
        })
        .where(eq(users.id, transaction.user))
        .then(() => "success 2")
        .catch((error) => `failed 2\nreason: ${error}`),
    )
    .catch(() => "failed");
}

export async function deleteTransaction(id: string) {
  const [data] = await db
    .select()
    .from(transactionCost)
    .where(eq(transactionCost.id, id));

  return db
    .delete(transactionCost)
    .where(eq(transactionCost.id, id))
    .then(() =>
      db
        .update(users)
        .set({
          balance: sql`${users.balance} - ${data.cost}`,
        })
        .where(eq(users.id, data.user!))
        .then(() => "success 2")
        .catch((error) => `failed 2\nreason: ${error}`),
    )
    .catch(() => "failed");
}
