import { integer, pgEnum, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { transactionCost } from './transaction.schema';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).unique().notNull(),
  password: varchar('password', { length: 100 }).notNull(),
  balance: integer('balance').default(0)
})

export const usersRelations = relations(users, ({ many }) => ({
	transactionCost: many(transactionCost),
}));