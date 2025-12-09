import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/db/db';
import { subscriptions, payments } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { formatPrice } from '@/config/plans';
import { CreditCard, Calendar, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import CancelSubscriptionButton from '@/components/CancelSubscriptionButton';

export default async function BillingPage() {
    const session = await auth();

    if (!session?.user) {
        redirect('/login');
    }

    // Fetch user's subscription
    const [subscription] = await db
        .select()
        .from(subscriptions)
        .where(eq(subscriptions.userId, session.user.id))
        .orderBy(desc(subscriptions.createdAt))
        .limit(1);

    // Fetch payment history
    const paymentHistory = await db
        .select()
        .from(payments)
        .where(eq(payments.userId, session.user.id))
        .orderBy(desc(payments.createdAt))
        .limit(10);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href="/dashboard"
                        className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
                    >
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold text-white mb-2">Billing & Subscription</h1>
                    <p className="text-gray-400">Manage your subscription and view payment history</p>
                </div>

                {/* Current Subscription */}
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                        <CreditCard className="w-6 h-6" />
                        Current Subscription
                    </h2>

                    {subscription ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Plan</p>
                                    <p className="text-white font-semibold text-lg capitalize">
                                        {subscription.planId.replace('_', ' ')}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Status</p>
                                    <span
                                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${subscription.status === 'active'
                                            ? 'bg-green-500/20 text-green-400'
                                            : subscription.status === 'canceled'
                                                ? 'bg-red-500/20 text-red-400'
                                                : 'bg-yellow-500/20 text-yellow-400'
                                            }`}
                                    >
                                        {subscription.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Current Period</p>
                                    <p className="text-white">
                                        {new Date(subscription.currentPeriodStart).toLocaleDateString()} -{' '}
                                        {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Next Billing Date</p>
                                    <p className="text-white flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            {subscription.cancelAtPeriodEnd === 1 && (
                                <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4 flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-yellow-400 font-medium">
                                            Subscription Cancellation Scheduled
                                        </p>
                                        <p className="text-yellow-400/80 text-sm mt-1">
                                            Your subscription will end on{' '}
                                            {new Date(subscription.currentPeriodEnd).toLocaleDateString()}. You'll
                                            continue to have access until then.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4 pt-4">
                                <Link
                                    href="/pricing"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                                >
                                    Change Plan
                                </Link>
                                {subscription.status === 'active' && subscription.cancelAtPeriodEnd === 0 && (
                                    <CancelSubscriptionButton />
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-400 mb-4">You don't have an active subscription</p>
                            <Link
                                href="/pricing"
                                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all"
                            >
                                View Plans
                            </Link>
                        </div>
                    )}
                </div>

                {/* Payment History */}
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Payment History</h2>

                    {paymentHistory.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="text-left text-gray-400 font-medium py-3 px-4">Date</th>
                                        <th className="text-left text-gray-400 font-medium py-3 px-4">Amount</th>
                                        <th className="text-left text-gray-400 font-medium py-3 px-4">Status</th>
                                        <th className="text-left text-gray-400 font-medium py-3 px-4">Payment ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentHistory.map((payment) => (
                                        <tr key={payment.id} className="border-b border-gray-700/50">
                                            <td className="py-4 px-4 text-white">
                                                {new Date(payment.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="py-4 px-4 text-white">
                                                {formatPrice(payment.amount / 100, payment.currency)}
                                            </td>
                                            <td className="py-4 px-4">
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${payment.status === 'success'
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : payment.status === 'failed'
                                                            ? 'bg-red-500/20 text-red-400'
                                                            : 'bg-yellow-500/20 text-yellow-400'
                                                        }`}
                                                >
                                                    {payment.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 text-gray-400 text-sm font-mono">
                                                {payment.razorpayPaymentId || 'N/A'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-400">No payment history yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
