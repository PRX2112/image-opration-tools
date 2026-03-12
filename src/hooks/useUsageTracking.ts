'use client';

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
    const limits: UsageLimits = {
        maxFileSize: Infinity,
        downloadsPerMonth: Infinity,
        storageLimit: Infinity,
    };

    return {
        usage: {
            downloadsThisMonth: 0,
            storageUsed: 0,
            subscriptionTier: 'business',
            lastResetDate: new Date(),
        },
        limits,
        loading: false,
        canDownload: () => true,
        canProcessFile: () => true,
        trackDownload: async () => { },
        showUpgradePrompt: () => { },
        refreshUsage: async () => { },
    };
}
