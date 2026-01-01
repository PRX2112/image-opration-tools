'use server';

import { db } from '@/db/db';
import { siteStats } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { revalidatePath, unstable_noStore } from 'next/cache';

export async function checkAndIncrementVisitor() {
    unstable_noStore();

    try {
        // Get the first record (we only need one for global site stats)
        const stats = await db.select().from(siteStats).limit(1);

        if (stats.length === 0) {
            // Create initial record if it doesn't exist
            const [newStat] = await db
                .insert(siteStats)
                .values({
                    visitorCount: 1,
                })
                .returning();
            return newStat.visitorCount;
        } else {
            // Increment existing record
            const [updatedStat] = await db
                .update(siteStats)
                .set({
                    visitorCount: sql`${siteStats.visitorCount} + 1`,
                    updatedAt: new Date(),
                })
                .where(eq(siteStats.id, stats[0].id))
                .returning();
            return updatedStat.visitorCount;
        }
    } catch (error) {
        console.error('Error incrementing visitor count:', error);
        return 0; // Return 0 or handle error appropriately
    }
}
