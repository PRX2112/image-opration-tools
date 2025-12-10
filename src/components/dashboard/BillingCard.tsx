'use client';

import { CreditCard, Calendar, Clock, Download, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import CancelSubscriptionButton from '../CancelSubscriptionButton';

interface Payment {
    id: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: Date;
    razorpayPaymentId: string | null;
}

interface BillingCardProps {
    subscriptionTier: string;
    nextBillingDate: Date | null;
    payments: Payment[];
}

export default function BillingCard({ subscriptionTier, nextBillingDate, payments }: BillingCardProps) {
    const isFree = subscriptionTier === 'free';
    const planName = subscriptionTier.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const isPro = subscriptionTier.startsWith('pro');
    const isBusiness = subscriptionTier.startsWith('business');

    return (
        <div className="space-y-6">
            {/* Current Plan Details */}
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Current Plan</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Manage your subscription and billing</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${isFree
                        ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}>
                        {planName}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Status</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
                            </div>
                        </div>

                        {!isFree && (
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Next Billing Date</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400" suppressHydrationWarning>
                                        {nextBillingDate ? new Date(nextBillingDate).toLocaleDateString() : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center space-y-3">
                        {isFree ? (
                            <Link
                                href="/pricing"
                                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Upgrade Plan
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/pricing"
                                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Change Plan
                                </Link>
                                <div className="w-full">
                                    <CancelSubscriptionButton />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Payment History */}
            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700/50">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Payment History</h3>
                </div>

                {payments.length === 0 ? (
                    <div className="p-8 text-center">
                        <Clock className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                        <p className="text-gray-500 dark:text-gray-400">No payment history available</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Date</th>
                                    <th className="px-6 py-3 font-medium">Amount</th>
                                    <th className="px-6 py-3 font-medium">Status</th>
                                    <th className="px-6 py-3 font-medium">Reference</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700/50">
                                {payments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        <td className="px-6 py-4 text-gray-900 dark:text-white whitespace-nowrap" suppressHydrationWarning>
                                            {new Date(payment.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-gray-900 dark:text-white">
                                            {payment.currency} {(payment.amount / 100).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                                ${payment.status === 'success'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                                                }`}>
                                                {payment.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-mono text-xs">
                                            {payment.razorpayPaymentId || '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
