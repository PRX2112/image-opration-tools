'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { getPlanLimits } from '@/config/plans';

interface Usage {
    downloadsThisMonth: number;
    storageUsed: number;
    subscriptionTier: string;
    lastResetDate: Date;
}

interface UsageLimits {
    maxFileSize: number;
    downloadsPerMonth: number;
    storageLimit: number;
}

interface UseUsageTrackingReturn {
    usage: Usage | null;
    limits: UsageLimits;
    loading: boolean;
    canDownload: () => boolean;
    canProcessFile: (fileSize: number) => boolean;
    trackDownload: (fileSize?: number, toolName?: string, fileName?: string) => Promise<void>;
    showUpgradePrompt: (reason: 'downloads' | 'file_size' | 'storage') => void;
    refreshUsage: () => Promise<void>;
}

export function useUsageTracking(): UseUsageTrackingReturn {
    const { data: session } = useSession();
    const [usage, setUsage] = useState<Usage | null>(null);
    const [loading, setLoading] = useState(true);
    const [upgradePromptReason, setUpgradePromptReason] = useState<string | null>(null);

    // Get plan limits based on subscription tier
    const limits = usage
        ? getPlanLimits(usage.subscriptionTier)
        : getPlanLimits('free');

    // Fetch current usage
    const fetchUsage = useCallback(async () => {
        if (!session?.user) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/usage/current');
            if (response.ok) {
                const data = await response.json();
                setUsage(data.usage);
            }
        } catch (error) {
            console.error('Error fetching usage:', error);
        } finally {
            setLoading(false);
        }
    }, [session]);

    // Load usage on mount and when session changes
    useEffect(() => {
        fetchUsage();
    }, [fetchUsage]);

    // Check if user can download
    const canDownload = useCallback((): boolean => {
        if (!usage) return true; // Allow if not logged in (for now)

        const { downloadsThisMonth } = usage;
        const { downloadsPerMonth } = limits;

        if (downloadsPerMonth === Infinity) return true;
        return downloadsThisMonth < downloadsPerMonth;
    }, [usage, limits]);

    // Check if file size is allowed
    const canProcessFile = useCallback((fileSize: number): boolean => {
        const { maxFileSize } = limits;

        if (maxFileSize === Infinity) return true;
        return fileSize <= maxFileSize;
    }, [limits]);

    // Track a download
    const trackDownload = useCallback(async (fileSize: number = 0, toolName?: string, fileName?: string) => {
        if (!session?.user) return;

        try {
            const response = await fetch('/api/usage/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'download',
                    fileSize,
                    toolName,
                    fileName,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setUsage(data.usage);
            }
        } catch (error) {
            console.error('Error tracking download:', error);
        }
    }, [session]);

    // Show upgrade prompt
    const showUpgradePrompt = useCallback((reason: 'downloads' | 'file_size' | 'storage') => {
        setUpgradePromptReason(reason);
        // You can implement a modal or toast here
        // For now, we'll just redirect to pricing
        window.location.href = '/pricing';
    }, []);

    // Refresh usage data
    const refreshUsage = useCallback(async () => {
        await fetchUsage();
    }, [fetchUsage]);

    return {
        usage,
        limits,
        loading,
        canDownload,
        canProcessFile,
        trackDownload,
        showUpgradePrompt,
        refreshUsage,
    };
}
