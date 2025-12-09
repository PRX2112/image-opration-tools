'use client';

import { useSession } from 'next-auth/react';
import { useUsageTracking } from '@/hooks/useUsageTracking';
import { PLANS } from '@/config/plans';
import AdUnit from './AdUnit';

interface AdBannerProps {
    adSlot: string;
    className?: string;
}

/**
 * AdBanner component that only shows ads to free-tier users
 * Pro and Business users get an ad-free experience
 */
export default function AdBanner({ adSlot, className = '' }: AdBannerProps) {
    const { data: session } = useSession();
    const { usage } = useUsageTracking();

    // If user is not logged in, they are effectively on Free plan -> Show Ads
    if (!session || !usage) {
        return (
            <div className={`my-8 ${className}`}>
                <div className="text-center mb-2">
                    <span className="text-xs text-gray-400 dark:text-gray-500">Advertisement</span>
                </div>
                <div className="flex justify-center w-full">
                    <AdUnit
                        adSlot={adSlot}
                        adFormat="auto"
                        adStyle={{ display: 'block', minHeight: '100px', width: '100%', maxWidth: '100%' }}
                    />
                </div>
            </div>
        );
    }

    // Check if user has ad-free plan
    const subscriptionTier = usage.subscriptionTier || 'free';
    const basePlan = subscriptionTier.split('_')[0];
    const plan = PLANS[basePlan];

    // If user has ad-free plan (Pro/Business), don't show ads
    if (plan?.adFree) {
        return null;
    }

    // Show ad for free users
    return (
        <div className={`my-8 ${className}`}>
            <div className="text-center mb-2">
                <span className="text-xs text-gray-400 dark:text-gray-500">Advertisement</span>
            </div>
            <div className="flex justify-center w-full">
                <AdUnit
                    adSlot={adSlot}
                    adFormat="auto"
                    adStyle={{ display: 'block', textAlign: 'center', minHeight: '100px', width: '100%' }}
                />
            </div>
        </div>
    );
}
