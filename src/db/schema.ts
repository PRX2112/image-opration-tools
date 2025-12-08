import { pgTable, text, timestamp, primaryKey, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import type { AdapterAccountType } from 'next-auth/adapters';

// Users table
export const users = pgTable('user', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: text('name'),
    email: text('email').notNull().unique(),
    emailVerified: timestamp('emailVerified', { mode: 'date' }),
    image: text('image'),
    password: text('password'), // Hashed password for credentials auth
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
});

// Accounts table (for OAuth providers)
export const accounts = pgTable(
    'account',
    {
        userId: text('userId')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        type: text('type').$type<AdapterAccountType>().notNull(),
        provider: text('provider').notNull(),
        providerAccountId: text('providerAccountId').notNull(),
        refresh_token: text('refresh_token'),
        access_token: text('access_token'),
        expires_at: integer('expires_at'),
        token_type: text('token_type'),
        scope: text('scope'),
        id_token: text('id_token'),
        session_state: text('session_state'),
    },
    (account) => ({
        compoundKey: primaryKey({
            columns: [account.provider, account.providerAccountId],
        }),
    })
);

// Sessions table
export const sessions = pgTable('session', {
    sessionToken: text('sessionToken').primaryKey(),
    userId: text('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
});

// Verification tokens table
export const verificationTokens = pgTable(
    'verificationToken',
    {
        identifier: text('identifier').notNull(),
        token: text('token').notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (verificationToken) => ({
        compositePk: primaryKey({
            columns: [verificationToken.identifier, verificationToken.token],
        }),
    })
);

// Image history table (for user dashboard)
export const imageHistory = pgTable('imageHistory', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    toolName: text('toolName').notNull(), // e.g., 'resize', 'compress', 'convert'
    originalFileName: text('originalFileName').notNull(),
    processedFileName: text('processedFileName'),
    fileSize: integer('fileSize'), // in bytes
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
});

// User usage tracking table
export const userUsage = pgTable('userUsage', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text('userId')
        .notNull()
        .unique()
        .references(() => users.id, { onDelete: 'cascade' }),
    downloadsThisMonth: integer('downloadsThisMonth').default(0).notNull(),
    storageUsed: integer('storageUsed').default(0).notNull(), // in bytes
    subscriptionTier: text('subscriptionTier').default('free').notNull(), // 'free', 'pro', 'business'
    lastResetDate: timestamp('lastResetDate', { mode: 'date' }).defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    sessions: many(sessions),
    imageHistory: many(imageHistory),
    usage: many(userUsage),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
    user: one(users, {
        fields: [accounts.userId],
        references: [users.id],
    }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
    user: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));

export const imageHistoryRelations = relations(imageHistory, ({ one }) => ({
    user: one(users, {
        fields: [imageHistory.userId],
        references: [users.id],
    }),
}));

export const userUsageRelations = relations(userUsage, ({ one }) => ({
    user: one(users, {
        fields: [userUsage.userId],
        references: [users.id],
    }),
}));
