import Razorpay from 'razorpay';
import crypto from 'crypto';

// Check if Razorpay credentials are set
const hasRazorpayCredentials = () => {
    return !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
};

// Initialize Razorpay instance only if credentials are available
let razorpay: Razorpay | null = null;

if (hasRazorpayCredentials()) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
}

// Helper to ensure Razorpay is initialized
const ensureRazorpay = (): Razorpay => {
    if (!razorpay) {
        throw new Error(
            'Razorpay is not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in your environment variables.'
        );
    }
    return razorpay;
};

export { razorpay };

/**
 * Verify Razorpay payment signature
 * @param orderId - Razorpay order ID
 * @param paymentId - Razorpay payment ID
 * @param signature - Razorpay signature
 * @returns boolean indicating if signature is valid
 */
export function verifyPaymentSignature(
    orderId: string,
    paymentId: string,
    signature: string
): boolean {
    const body = orderId + '|' + paymentId;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(body)
        .digest('hex');

    return expectedSignature === signature;
}

/**
 * Verify Razorpay subscription payment signature
 * @param subscriptionId - Razorpay subscription ID
 * @param paymentId - Razorpay payment ID
 * @param signature - Razorpay signature
 * @returns boolean indicating if signature is valid
 */
export function verifySubscriptionSignature(
    subscriptionId: string,
    paymentId: string,
    signature: string
): boolean {
    // For subscriptions: payment_id + "|" + subscription_id
    const body = paymentId + '|' + subscriptionId;
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
        .update(body)
        .digest('hex');

    return expectedSignature === signature;
}

/**
 * Verify Razorpay webhook signature
 * @param body - Webhook request body as string
 * @param signature - Razorpay signature from header
 * @returns boolean indicating if signature is valid
 */
export function verifyWebhookSignature(body: string, signature: string): boolean {
    if (!process.env.RAZORPAY_WEBHOOK_SECRET) {
        throw new Error('Razorpay webhook secret is not set');
    }

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
        .update(body)
        .digest('hex');

    return expectedSignature === signature;
}

/**
 * Create a Razorpay order
 * @param amount - Amount in paise (smallest currency unit)
 * @param currency - Currency code (default: INR)
 * @param receipt - Receipt ID for reference
 * @returns Razorpay order object
 */
export async function createOrder(
    amount: number,
    currency: string = 'INR',
    receipt?: string
) {
    try {
        const rzp = ensureRazorpay();
        const order = await rzp.orders.create({
            amount,
            currency,
            receipt: receipt || `order_${Date.now()}`,
        });
        return order;
    } catch (error) {
        console.error('Error creating Razorpay order:', error);
        throw error;
    }
}

/**
 * Create a Razorpay subscription
 * @param planId - Razorpay plan ID
 * @param totalCount - Total billing cycles (optional)
 * @param customerNotify - Whether to notify customer (default: 1)
 * @returns Razorpay subscription object
 */
export async function createSubscription(
    planId: string,
    totalCount?: number,
    customerNotify: number = 1
) {
    try {
        const subscriptionParams: any = {
            plan_id: planId,
            customer_notify: customerNotify,
        };

        if (totalCount) {
            subscriptionParams.total_count = totalCount;
        }

        const rzp = ensureRazorpay();
        const subscription = await rzp.subscriptions.create(subscriptionParams);
        return subscription;
    } catch (error) {
        console.error('Error creating Razorpay subscription:', error);
        throw error;
    }
}

/**
 * Cancel a Razorpay subscription
 * @param subscriptionId - Razorpay subscription ID
 * @param cancelAtCycleEnd - Whether to cancel at end of current cycle (default: true)
 * @returns Razorpay subscription object
 */
export async function cancelSubscription(
    subscriptionId: string,
    cancelAtCycleEnd: boolean = true
) {
    try {
        const rzp = ensureRazorpay();
        const subscription = await rzp.subscriptions.cancel(
            subscriptionId,
            cancelAtCycleEnd ? 1 : 0
        );
        return subscription;
    } catch (error) {
        console.error('Error canceling Razorpay subscription:', error);
        throw error;
    }
}

/**
 * Fetch a Razorpay subscription
 * @param subscriptionId - Razorpay subscription ID
 * @returns Razorpay subscription object
 */
export async function fetchSubscription(subscriptionId: string) {
    try {
        const rzp = ensureRazorpay();
        const subscription = await rzp.subscriptions.fetch(subscriptionId);
        return subscription;
    } catch (error) {
        console.error('Error fetching Razorpay subscription:', error);
        throw error;
    }
}
