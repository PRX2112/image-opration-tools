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
    subscriptionId: text('subscriptionId'), // Foreign key to subscriptions table
    lastBillingDate: timestamp('lastBillingDate', { mode: 'date' }),
    nextBillingDate: timestamp('nextBillingDate', { mode: 'date' }),
});

// Subscriptions table (for Razorpay subscriptions)
export const subscriptions = pgTable('subscription', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    planId: text('planId').notNull(), // 'free', 'pro_monthly', 'pro_yearly', 'business_monthly', 'business_yearly'
    status: text('status').notNull(), // 'active', 'canceled', 'expired', 'paused'
    razorpaySubscriptionId: text('razorpaySubscriptionId').unique(),
    razorpayPlanId: text('razorpayPlanId'),
    currentPeriodStart: timestamp('currentPeriodStart', { mode: 'date' }).notNull(),
    currentPeriodEnd: timestamp('currentPeriodEnd', { mode: 'date' }).notNull(),
    cancelAtPeriodEnd: integer('cancelAtPeriodEnd').default(0).notNull(), // 0 = false, 1 = true
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().notNull(),
});

// Payments table (for tracking all payments)
export const payments = pgTable('payment', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    subscriptionId: text('subscriptionId').references(() => subscriptions.id, { onDelete: 'set null' }),
    amount: integer('amount').notNull(), // in paise (smallest currency unit)
    currency: text('currency').default('INR').notNull(),
    razorpayPaymentId: text('razorpayPaymentId').unique(),
    razorpayOrderId: text('razorpayOrderId'),
    razorpaySignature: text('razorpaySignature'),
    status: text('status').notNull(), // 'success', 'failed', 'pending'
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
});

// Google Drive files table (for tracking images saved to Drive)
export const driveFiles = pgTable('driveFile', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    userId: text('userId')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    driveFileId: text('driveFileId').notNull().unique(), // Google Drive file ID
    fileName: text('fileName').notNull(),
    mimeType: text('mimeType').notNull(),
    fileSize: integer('fileSize').notNull(), // in bytes
    toolUsed: text('toolUsed').notNull(), // 'resize', 'crop', 'compress', etc.
    webViewLink: text('webViewLink'), // Google Drive shareable link
    thumbnailLink: text('thumbnailLink'), // Google Drive thumbnail URL
    createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    accounts: many(accounts),
    sessions: many(sessions),
    imageHistory: many(imageHistory),
    usage: many(userUsage),
    subscriptions: many(subscriptions),
    payments: many(payments),
    driveFiles: many(driveFiles),
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
    subscription: one(subscriptions, {
        fields: [userUsage.subscriptionId],
        references: [subscriptions.id],
    }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one, many }) => ({
    user: one(users, {
        fields: [subscriptions.userId],
        references: [users.id],
    }),
    payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
    user: one(users, {
        fields: [payments.userId],
        references: [users.id],
    }),
    subscription: one(subscriptions, {
        fields: [payments.subscriptionId],
        references: [subscriptions.id],
    }),
}));

export const driveFilesRelations = relations(driveFiles, ({ one }) => ({
    user: one(users, {
        fields: [driveFiles.userId],
        references: [users.id],
    }),
}));
