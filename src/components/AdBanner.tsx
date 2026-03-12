'use client';

import { useEffect, useRef } from 'react';

interface AdBannerProps {
    dataAdSlot: string;
    dataAdFormat?: string;
    dataFullWidthResponsive?: boolean;
    className?: string;
}

export default function AdBanner({
    dataAdSlot,
    dataAdFormat = 'auto',
    dataFullWidthResponsive = true,
    className = '',
}: AdBannerProps) {
    const adRef = useRef<HTMLModElement>(null);
    const hasInitialized = useRef(false);

    useEffect(() => {
        // Only initialize the ad once, and ensure we're in the browser
        if (typeof window !== 'undefined' && !hasInitialized.current && adRef.current) {
            try {
                // @ts-ignore - The adsbygoogle array is injected globally by the AdSense script
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                hasInitialized.current = true;
            } catch (error) {
                console.error('AdSense initialization failed:', error);
            }
        }
    }, []);

    // In development mode, show a placeholder block so you can visualize where ads will appear
    if (process.env.NODE_ENV === 'development') {
        return (
            <div className={`w-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl flex items-center justify-center p-4 min-h-[100px] ${className}`}>
                <p className="text-sm text-gray-500 font-medium">
                    AdSense Placement Placeholder<br/>
                    <span className="text-xs font-normal">Slot: {dataAdSlot}</span>
                </p>
            </div>
        );
    }

    const PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
    const ADS_ENABLED = process.env.NEXT_PUBLIC_ADS_ENABLED === 'true';

    // Don't render anything in production if ads are disabled or no ID is provided
    if (!PUBLISHER_ID || !ADS_ENABLED) {
        return null;
    }

    return (
        <div className={`w-full overflow-hidden flex justify-center ${className}`}>
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{ display: 'block', minWidth: '250px', width: '100%' }}
                data-ad-client={PUBLISHER_ID}
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive={dataFullWidthResponsive.toString()}
            />
        </div>
    );
}
