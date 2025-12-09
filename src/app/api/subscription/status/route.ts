import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db/db';
import { subscriptions, userUsage } from '@/db/schema';
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

        // Get user's subscription
        const [subscription] = await db
            .select()
            .from(subscriptions)
            .where(eq(subscriptions.userId, session.user.id))
            .orderBy(subscriptions.createdAt)
            .limit(1);

        // Get user usage
        const [usage] = await db
            .select()
            .from(userUsage)
            .where(eq(userUsage.userId, session.user.id))
            .limit(1);

        return NextResponse.json({
            subscription: subscription || null,
            usage: usage || null,
        });
    } catch (error) {
        console.error('Error fetching subscription status:', error);
        return NextResponse.json(
            { error: 'Failed to fetch subscription status' },
            { status: 500 }
        );
    }
}
