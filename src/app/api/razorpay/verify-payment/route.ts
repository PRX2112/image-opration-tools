import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { verifyPaymentSignature } from '@/lib/razorpay';
import { db } from '@/db/db';
import { subscriptions, payments, userUsage } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const {
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature,
        } = await request.json();

        if (!razorpay_payment_id || !razorpay_subscription_id || !razorpay_signature) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Verify payment signature
        const isValid = verifyPaymentSignature(
            razorpay_subscription_id,
            razorpay_payment_id,
            razorpay_signature
        );

        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid payment signature' },
                { status: 400 }
            );
        }

        // Find subscription in database
        const [subscription] = await db
            .select()
            .from(subscriptions)
            .where(eq(subscriptions.razorpaySubscriptionId, razorpay_subscription_id))
            .limit(1);

        if (!subscription) {
            return NextResponse.json(
                { error: 'Subscription not found' },
                { status: 404 }
            );
        }

        // Update subscription status to active
        await db
            .update(subscriptions)
            .set({
                status: 'active',
                updatedAt: new Date(),
            })
            .where(eq(subscriptions.id, subscription.id));

        // Create payment record
        await db.insert(payments).values({
            userId: session.user.id,
            subscriptionId: subscription.id,
            amount: 0, // Amount will be updated via webhook
            currency: 'INR',
            razorpayPaymentId: razorpay_payment_id,
            razorpaySignature: razorpay_signature,
            status: 'success',
        });

        // Update user usage with subscription
        const planTier = subscription.planId.split('_')[0]; // Extract 'pro' or 'business'
        await db
            .update(userUsage)
            .set({
                subscriptionTier: planTier,
                subscriptionId: subscription.id,
                lastBillingDate: new Date(),
                nextBillingDate: subscription.currentPeriodEnd,
            })
            .where(eq(userUsage.userId, session.user.id));

        return NextResponse.json({
            success: true,
            message: 'Payment verified successfully',
        });
    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json(
            { error: 'Failed to verify payment' },
            { status: 500 }
        );
    }
}
