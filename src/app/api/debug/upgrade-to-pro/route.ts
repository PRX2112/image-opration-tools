import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db/db';
import { userUsage } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * DEBUG ENDPOINT: Upgrade current user to Pro plan
 * Only for development/testing
 */
export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Update or insert user usage with Pro plan
        const [existing] = await db
            .select()
            .from(userUsage)
            .where(eq(userUsage.userId, session.user.id))
            .limit(1);

        if (existing) {
            await db
                .update(userUsage)
                .set({
                    subscriptionTier: 'pro_monthly',
                })
                .where(eq(userUsage.userId, session.user.id));
        } else {
            await db.insert(userUsage).values({
                userId: session.user.id,
                subscriptionTier: 'pro_monthly',
                downloadsThisMonth: 0,
                storageUsed: 0,
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Upgraded to Pro plan successfully!',
            plan: 'pro_monthly',
            features: [
                '✅ Google Drive integration enabled',
                '✅ 200MB file size limit',
                '✅ 500 downloads per month',
                '✅ 1GB storage',
            ],
        });
    } catch (error: any) {
        console.error('Error upgrading to Pro:', error);
        return NextResponse.json(
            { error: 'Failed to upgrade', details: error.message },
            { status: 500 }
        );
    }
}
