import { integer, pgEnum, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { users } from './user.schema';
import { relations } from 'drizzle-orm';
 
// declaring enum in database
export const transactionTypeEnum = pgEnum('transaction_type', ['income', 'expense']);
 
export const transactionCost = pgTable('transaction_cost', {
  id: uuid('id').primaryKey(),
  type: transactionTypeEnum('type').notNull(),
  cost: integer('cost').notNull(),
  description: varchar('description', { length: 250 }).notNull(),
  user: uuid('user_id').references(() => users.id)
});

export const transactionCostRelations = relations(transactionCost, ({ one }) => ({
	user: one(users, {
		fields: [transactionCost.user],
		references: [users.id],
	}),
}));