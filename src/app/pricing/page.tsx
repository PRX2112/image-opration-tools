'use client';

import { useState, useEffect } from 'react';
import { PLANS } from '@/config/plans';
import PricingCard from '@/components/pricing/PricingCard';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

export default function PricingPage() {
    const { data: session } = useSession();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
    const [currentPlan, setCurrentPlan] = useState<string>('free');
    const [isLoading, setIsLoading] = useState(true);

    // Fetch user's current plan from the database
    useEffect(() => {
        async function fetchCurrentPlan() {
            if (!session?.user) {
                setCurrentPlan('free');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/usage/current');
                if (response.ok) {
                    const data = await response.json();
                    // Extract base plan from subscriptionTier (e.g., 'pro_monthly' -> 'pro')
                    const tier = data.usage?.subscriptionTier || 'free';
                    const basePlan = tier.split('_')[0]; // Remove '_monthly' or '_yearly' suffix
                    setCurrentPlan(basePlan);
                }
            } catch (error) {
                console.error('Error fetching current plan:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCurrentPlan();
    }, [session]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Choose Your Plan
                    </h1>
                    <p className="text-xl text-gray-400 mb-8">
                        Select the perfect plan for your image editing needs
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-xl rounded-lg p-1 border border-gray-700/50">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2 rounded-md font-medium transition-all ${billingCycle === 'monthly'
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-6 py-2 rounded-md font-medium transition-all ${billingCycle === 'yearly'
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Yearly
                            <span className="ml-2 text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                                Save 17%
                            </span>
                        </button>
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <PricingCard
                        plan={PLANS.free}
                        billingCycle={billingCycle}
                        currentPlan={currentPlan}
                    />
                    <PricingCard
                        plan={PLANS.pro}
                        billingCycle={billingCycle}
                        currentPlan={currentPlan}
                    />
                    <PricingCard
                        plan={PLANS.business}
                        billingCycle={billingCycle}
                        currentPlan={currentPlan}
                    />
                </div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-8"
                >
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                Can I change my plan later?
                            </h3>
                            <p className="text-gray-400">
                                Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                What payment methods do you accept?
                            </h3>
                            <p className="text-gray-400">
                                We accept all major credit/debit cards, UPI, net banking, and digital wallets through Razorpay.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                Is there a free trial?
                            </h3>
                            <p className="text-gray-400">
                                Our Free plan is available forever with no credit card required. Upgrade anytime to unlock more features.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                Can I cancel anytime?
                            </h3>
                            <p className="text-gray-400">
                                Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
