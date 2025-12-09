import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/razorpay';
import { db } from '@/db/db';
import { subscriptions, payments } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();
        const signature = request.headers.get('x-razorpay-signature');

        if (!signature) {
            return NextResponse.json(
                { error: 'Missing signature' },
                { status: 400 }
            );
        }

        // Verify webhook signature
        const isValid = verifyWebhookSignature(body, signature);

        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid signature' },
                { status: 400 }
            );
        }

        const event = JSON.parse(body);
        const { event: eventType, payload } = event;

        console.log('Webhook event received:', eventType);

        switch (eventType) {
            case 'subscription.activated':
                await handleSubscriptionActivated(payload.subscription.entity);
                break;

            case 'subscription.charged':
                await handleSubscriptionCharged(payload.payment.entity, payload.subscription.entity);
                break;

            case 'subscription.cancelled':
                await handleSubscriptionCancelled(payload.subscription.entity);
                break;

            case 'subscription.completed':
                await handleSubscriptionCompleted(payload.subscription.entity);
                break;

            case 'subscription.paused':
                await handleSubscriptionPaused(payload.subscription.entity);
                break;

            case 'subscription.resumed':
                await handleSubscriptionResumed(payload.subscription.entity);
                break;

            case 'payment.failed':
                await handlePaymentFailed(payload.payment.entity);
                break;

            case 'payment.authorized':
                console.log('Payment authorized:', payload.payment.entity.id);
                break;

            case 'payment.captured':
                console.log('Payment captured:', payload.payment.entity.id);
                break;

            default:
                console.log('Unhandled event type:', eventType);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 500 }
        );
    }
}

async function handleSubscriptionActivated(subscription: any) {
    await db
        .update(subscriptions)
        .set({
            status: 'active',
            updatedAt: new Date(),
        })
        .where(eq(subscriptions.razorpaySubscriptionId, subscription.id));
}

async function handleSubscriptionCharged(payment: any, subscription: any) {
    // Find subscription
    const [sub] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.razorpaySubscriptionId, subscription.id))
        .limit(1);

    if (sub) {
        // Create payment record
        await db.insert(payments).values({
            userId: sub.userId,
            subscriptionId: sub.id,
            amount: payment.amount,
            currency: payment.currency,
            razorpayPaymentId: payment.id,
            status: 'success',
        });
    }
}

async function handleSubscriptionCancelled(subscription: any) {
    await db
        .update(subscriptions)
        .set({
            status: 'canceled',
            updatedAt: new Date(),
        })
        .where(eq(subscriptions.razorpaySubscriptionId, subscription.id));
}

async function handleSubscriptionCompleted(subscription: any) {
    await db
        .update(subscriptions)
        .set({
            status: 'expired',
            updatedAt: new Date(),
        })
        .where(eq(subscriptions.razorpaySubscriptionId, subscription.id));
}

async function handleSubscriptionPaused(subscription: any) {
    await db
        .update(subscriptions)
        .set({
            status: 'paused',
            updatedAt: new Date(),
        })
        .where(eq(subscriptions.razorpaySubscriptionId, subscription.id));
}

async function handleSubscriptionResumed(subscription: any) {
    await db
        .update(subscriptions)
        .set({
            status: 'active',
            updatedAt: new Date(),
        })
        .where(eq(subscriptions.razorpaySubscriptionId, subscription.id));
}

async function handlePaymentFailed(payment: any) {
    // Log failed payment
    console.error('Payment failed:', payment.id);
    // You can send notification emails here
}
