import { sqliteTable, integer, real, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
    id: integer('id').primaryKey(),
    investment: real('investment').notNull(),
    totalInvested: real('totalInvested').notNull(),
    profitLoss: real('profitLoss').notNull(),
    createdAt: real('createdAt').notNull(),
})