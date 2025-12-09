'use client';

import { Download, HardDrive, FileText } from 'lucide-react';
import { formatBytes, calculateUsagePercentage, getProgressBarColor } from '@/utils/usageUtils';

interface UsageStatsProps {
    usage: {
        downloadsThisMonth: number;
        storageUsed: number;
    };
    limits: {
        downloadsPerMonth: number;
        storageLimit: number;
        maxFileSize: number;
    };
    compact?: boolean;
}

export default function UsageStats({ usage, limits, compact = false }: UsageStatsProps) {
    const downloadPercentage = calculateUsagePercentage(
        usage.downloadsThisMonth,
        limits.downloadsPerMonth
    );
    const storagePercentage = calculateUsagePercentage(
        usage.storageUsed,
        limits.storageLimit
    );

    if (compact) {
        return (
            <div className="bg-gray-100 dark:bg-gray-800/30 rounded-lg p-3 space-y-2 border border-gray-200 dark:border-transparent transition-colors">
                {/* Downloads */}
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">Downloads</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-medium">
                        {usage.downloadsThisMonth} / {limits.downloadsPerMonth === Infinity ? '∞' : limits.downloadsPerMonth}
                    </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div
                        className={`h-1.5 rounded-full transition-all ${getProgressBarColor(downloadPercentage)}`}
                        style={{ width: `${downloadPercentage}%` }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 space-y-6 shadow-sm dark:shadow-none transition-all">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Usage Statistics</h3>

            {/* Downloads */}
            <div>
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Download className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                        <span className="text-gray-600 dark:text-gray-300">Downloads this month</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-semibold">
                        {usage.downloadsThisMonth} / {limits.downloadsPerMonth === Infinity ? '∞' : limits.downloadsPerMonth}
                    </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full transition-all ${getProgressBarColor(downloadPercentage)}`}
                        style={{ width: `${downloadPercentage}%` }}
                    />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {downloadPercentage}% used
                </p>
            </div>

            {/* Storage */}
            {limits.storageLimit > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <HardDrive className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                            <span className="text-gray-600 dark:text-gray-300">Storage used</span>
                        </div>
                        <span className="text-gray-900 dark:text-white font-semibold">
                            {formatBytes(usage.storageUsed)} / {formatBytes(limits.storageLimit)}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all ${getProgressBarColor(storagePercentage)}`}
                            style={{ width: `${storagePercentage}%` }}
                        />
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {storagePercentage}% used
                    </p>
                </div>
            )}

            {/* File Size Limit */}
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-500 dark:text-green-400" />
                        <span className="text-gray-600 dark:text-gray-300">Max file size</span>
                    </div>
                    <span className="text-gray-900 dark:text-white font-semibold">
                        {formatBytes(limits.maxFileSize)}
                    </span>
                </div>
            </div>
        </div>
    );
}
