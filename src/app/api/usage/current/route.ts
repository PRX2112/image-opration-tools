import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db/db';
import { userUsage } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get user's current usage
        const [usage] = await db
            .select()
            .from(userUsage)
            .where(eq(userUsage.userId, session.user.id))
            .limit(1);

        if (!usage) {
            // Create initial usage record if doesn't exist
            const [newUsage] = await db
                .insert(userUsage)
                .values({
                    userId: session.user.id,
                    downloadsThisMonth: 0,
                    storageUsed: 0,
                    subscriptionTier: 'free',
                    lastResetDate: new Date(),
                })
                .returning();

            return NextResponse.json({ usage: newUsage });
        }

        // Check if we need to reset monthly downloads
        const lastReset = new Date(usage.lastResetDate);
        const now = new Date();
        const daysSinceReset = Math.floor(
            (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysSinceReset >= 30) {
            // Reset monthly downloads
            const [updatedUsage] = await db
                .update(userUsage)
                .set({
                    downloadsThisMonth: 0,
                    lastResetDate: now,
                })
                .where(eq(userUsage.userId, session.user.id))
                .returning();

            return NextResponse.json({ usage: updatedUsage });
        }

        return NextResponse.json({ usage });
    } catch (error) {
        console.error('Error fetching usage:', error);
        return NextResponse.json(
            { error: 'Failed to fetch usage' },
            { status: 500 }
        );
    }
}
