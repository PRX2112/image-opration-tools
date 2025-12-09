'use client';

import { useEffect, useRef } from 'react';

interface AdUnitProps {
    adSlot: string;
    adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
    adStyle?: React.CSSProperties;
    className?: string;
}

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export default function AdUnit({
    adSlot,
    adFormat = 'auto',
    adStyle = { display: 'block', minHeight: '100px', width: '100%' },
    className = ''
}: AdUnitProps) {
    const adRef = useRef<HTMLModElement>(null);
    const isAdPushed = useRef(false);

    useEffect(() => {
        // Only push ad once
        if (isAdPushed.current) return;

        // Don't push if the ad container ref is not available
        if (!adRef.current) return;

        const pushAd = () => {
            if (isAdPushed.current) return;
            try {
                if (typeof window !== 'undefined') {
                    window.adsbygoogle = window.adsbygoogle || [];
                    window.adsbygoogle.push({});
                    isAdPushed.current = true;
                }
            } catch (error) {
                console.error('AdSense error:', error);
            }
        };

        // Check if element has width
        if (adRef.current.offsetWidth > 0) {
            pushAd();
        } else {
            // Wait for width to be available
            const resizeObserver = new ResizeObserver(() => {
                if (adRef.current && adRef.current.offsetWidth > 0) {
                    pushAd();
                    resizeObserver.disconnect();
                }
            });
            resizeObserver.observe(adRef.current);
            return () => resizeObserver.disconnect();
        }
    }, []);

    // Don't render if AdSense is disabled
    if (process.env.NEXT_PUBLIC_ADS_ENABLED !== 'true') {
        return null;
    }

    // DEVELOPMENT MODE: Show placeholder
    if (process.env.NODE_ENV === 'development') {
        return (
            <div className={`ad-container ${className} flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-400 text-sm font-medium p-4 my-4 rounded-lg`} style={{ minHeight: '100px', ...adStyle }}>
                <div className="text-center">
                    <p className="font-bold text-gray-500 dark:text-gray-400">AdSlot: {adSlot}</p>
                    <p className="text-xs mt-1 opacity-75">Format: {adFormat}</p>
                    <p className="text-xs mt-2 text-blue-500 font-bold bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded inline-block">DEV MODE PLACEHOLDER</p>
                </div>
            </div>
        );
    }

    if (!process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID) {
        return null;
    }

    return (
        <div className={`ad-container ${className}`}>
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={adStyle}
                data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive="true"
            />
        </div>
    );
}
