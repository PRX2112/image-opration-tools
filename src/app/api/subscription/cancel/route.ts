import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { cancelSubscription as cancelRazorpaySubscription } from '@/lib/razorpay';
import { db } from '@/db/db';
import { subscriptions, userUsage } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Find user's active subscription
        const [subscription] = await db
            .select()
            .from(subscriptions)
            .where(
                and(
                    eq(subscriptions.userId, session.user.id),
                    eq(subscriptions.status, 'active')
                )
            )
            .limit(1);

        if (!subscription) {
            return NextResponse.json(
                { error: 'No active subscription found' },
                { status: 404 }
            );
        }

        if (!subscription.razorpaySubscriptionId) {
            return NextResponse.json(
                { error: 'Invalid subscription' },
                { status: 400 }
            );
        }

        // Cancel subscription in Razorpay
        await cancelRazorpaySubscription(subscription.razorpaySubscriptionId, true);

        // Update subscription in database
        await db
            .update(subscriptions)
            .set({
                cancelAtPeriodEnd: 1,
                updatedAt: new Date(),
            })
            .where(eq(subscriptions.id, subscription.id));

        return NextResponse.json({
            success: true,
            message: 'Subscription will be cancelled at the end of the billing period',
        });
    } catch (error) {
        console.error('Error cancelling subscription:', error);
        return NextResponse.json(
            { error: 'Failed to cancel subscription' },
            { status: 500 }
        );
    }
}
