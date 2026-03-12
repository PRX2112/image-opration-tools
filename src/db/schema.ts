import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core';

// Site stats table (for visitor counting)
export const siteStats = pgTable('siteStats', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    visitorCount: integer('visitorCount').default(0).notNull(),
    updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow().notNull(),
});
