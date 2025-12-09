import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { createSubscription } from '@/lib/razorpay';
import { db } from '@/db/db';
import { subscriptions, userUsage } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { PLANS } from '@/config/plans';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { planId, billingCycle } = await request.json();

        if (!planId || !billingCycle) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Get the plan from config
        const plan = PLANS[planId];
        if (!plan || !plan.razorpayPlanId) {
            console.error('Invalid plan:', { planId, availablePlans: Object.keys(PLANS) });
            return NextResponse.json(
                { error: 'Invalid plan' },
                { status: 400 }
            );
        }

        // Get the actual Razorpay plan ID
        const razorpayPlanId = billingCycle === 'monthly'
            ? plan.razorpayPlanId.monthly
            : plan.razorpayPlanId.yearly;

        console.log('Creating subscription:', {
            planId,
            billingCycle,
            razorpayPlanId,
            planName: plan.name
        });

        if (!razorpayPlanId) {
            console.error('Plan not available for billing cycle:', { planId, billingCycle });
            return NextResponse.json(
                { error: 'Plan not available for this billing cycle' },
                { status: 400 }
            );
        }

        // Create Razorpay subscription
        // total_count: 12 for monthly (1 year), 5 for yearly (5 years)
        // You can also omit total_count for unlimited recurring subscription
        const totalCount = billingCycle === 'monthly' ? 120 : 10; // 10 years worth
        const razorpaySubscription = await createSubscription(razorpayPlanId, totalCount);

        console.log('Razorpay subscription created:', razorpaySubscription.id);

        // Calculate period dates
        const currentPeriodStart = new Date();
        const currentPeriodEnd = new Date();
        if (billingCycle === 'monthly') {
            currentPeriodEnd.setMonth(currentPeriodEnd.getMonth() + 1);
        } else {
            currentPeriodEnd.setFullYear(currentPeriodEnd.getFullYear() + 1);
        }

        // Create subscription record in database
        const [newSubscription] = await db
            .insert(subscriptions)
            .values({
                userId: session.user.id,
                planId: `${planId}_${billingCycle}`,
                status: 'created', // Will be updated to 'active' after payment
                razorpaySubscriptionId: razorpaySubscription.id,
                razorpayPlanId: razorpayPlanId,
                currentPeriodStart,
                currentPeriodEnd,
                cancelAtPeriodEnd: 0,
            })
            .returning();

        return NextResponse.json({
            subscriptionId: newSubscription.id,
            razorpaySubscriptionId: razorpaySubscription.id,
            razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error('Error creating subscription:', error);
        return NextResponse.json(
            { error: 'Failed to create subscription', details: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
}
