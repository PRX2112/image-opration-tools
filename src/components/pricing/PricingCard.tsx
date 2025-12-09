'use client';

import { Plan, PlanFeature } from '@/config/plans';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface PricingCardProps {
    plan: Plan;
    billingCycle: 'monthly' | 'yearly';
    currentPlan?: string;
}

export default function PricingCard({ plan, billingCycle, currentPlan }: PricingCardProps) {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;
    const monthlyPrice = billingCycle === 'yearly' ? plan.price.yearly / 12 : price;
    const isCurrentPlan = currentPlan === plan.id;
    const isFree = plan.id === 'free';

    const handleSubscribe = async () => {
        if (!session) {
            window.location.href = '/login?callbackUrl=/pricing';
            return;
        }

        if (isFree || isCurrentPlan) return;

        setIsLoading(true);

        try {
            // Create subscription
            const response = await fetch('/api/razorpay/create-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planId: plan.id,
                    billingCycle,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create subscription');
            }

            // Load Razorpay script if not already loaded
            if (!window.Razorpay) {
                const script = document.createElement('script');
                script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                script.async = true;
                await new Promise((resolve, reject) => {
                    script.onload = resolve;
                    script.onerror = reject;
                    document.body.appendChild(script);
                });
            }

            // Open Razorpay checkout
            const options = {
                key: data.razorpayKeyId,
                subscription_id: data.razorpaySubscriptionId,
                name: 'ResizeMe',
                description: `${plan.name} - ${billingCycle} subscription`,
                handler: async function (response: any) {
                    try {
                        // Verify payment
                        const verifyResponse = await fetch('/api/razorpay/verify-payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_subscription_id: response.razorpay_subscription_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });

                        const verifyData = await verifyResponse.json();

                        if (verifyData.success) {
                            router.push('/dashboard?payment=success');
                        } else {
                            alert('Payment verification failed. Please contact support.');
                            setIsLoading(false);
                        }
                    } catch (error) {
                        console.error('Payment verification error:', error);
                        alert('An error occurred. Please try again.');
                        setIsLoading(false);
                    }
                },
                prefill: {
                    name: session.user.name || '',
                    email: session.user.email || '',
                },
                theme: {
                    color: '#6366f1',
                },
                modal: {
                    ondismiss: function () {
                        setIsLoading(false);
                    },
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Subscription error:', error);
            alert('Failed to create subscription. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`relative bg-gray-800/50 backdrop-blur-xl rounded-2xl border ${plan.popular
                ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                : 'border-gray-700/50'
                } p-8 flex flex-col h-full`}
        >
            {/* Popular Badge */}
            {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Most Popular
                    </span>
                </div>
            )}

            {/* Current Plan Badge */}
            {isCurrentPlan && (
                <div className="absolute -top-4 right-4">
                    <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                        Current Plan
                    </span>
                </div>
            )}

            {/* Plan Header */}
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.description}</p>
            </div>

            {/* Price */}
            <div className="mb-6">
                {isFree ? (
                    <div className="text-4xl font-bold text-white">Free</div>
                ) : (
                    <>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-white">
                                ₹{Math.floor(monthlyPrice)}
                            </span>
                            <span className="text-gray-400">/month</span>
                        </div>
                        {billingCycle === 'yearly' && (
                            <p className="text-sm text-green-400 mt-2">
                                Save ₹{(plan.price.monthly * 12 - plan.price.yearly).toFixed(0)} per year
                            </p>
                        )}
                    </>
                )}
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature: PlanFeature, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                        {feature.included ? (
                            <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        ) : (
                            <X className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                        )}
                        <span
                            className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-600'
                                }`}
                        >
                            {feature.text}
                        </span>
                    </li>
                ))}
            </ul>

            {/* CTA Button */}
            {isFree ? (
                <button
                    disabled
                    className="w-full bg-gray-700 text-gray-400 font-medium py-3 px-4 rounded-lg cursor-not-allowed"
                >
                    Current Plan
                </button>
            ) : isCurrentPlan ? (
                <Link
                    href="/dashboard/billing"
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center block"
                >
                    Manage Subscription
                </Link>
            ) : (
                <button
                    onClick={handleSubscribe}
                    disabled={isLoading}
                    className={`w-full font-medium py-3 px-4 rounded-lg transition-all ${plan.popular
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {isLoading ? 'Processing...' : 'Choose Plan'}
                </button>
            )}
        </motion.div>
    );
}
