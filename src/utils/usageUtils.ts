/**
 * Format bytes to human-readable string
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';
    if (bytes === Infinity) return 'Unlimited';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Calculate usage percentage
 */
export function calculateUsagePercentage(used: number, limit: number): number {
    if (limit === Infinity || limit === 0) return 0;
    return Math.min(Math.round((used / limit) * 100), 100);
}

/**
 * Get color based on usage percentage
 */
export function getUsageColor(percentage: number): string {
    if (percentage >= 90) return 'text-red-500';
    if (percentage >= 75) return 'text-yellow-500';
    return 'text-green-500';
}

/**
 * Get progress bar color based on usage percentage
 */
export function getProgressBarColor(percentage: number): string {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
}

/**
 * Calculate remaining downloads
 */
export function getRemainingDownloads(used: number, limit: number): number {
    if (limit === Infinity) return Infinity;
    return Math.max(0, limit - used);
}

/**
 * Calculate remaining storage
 */
export function getRemainingStorage(used: number, limit: number): number {
    if (limit === Infinity) return Infinity;
    return Math.max(0, limit - used);
}

/**
 * Check if user should see upgrade prompt
 */
export function shouldShowUpgradePrompt(
    usage: { downloadsThisMonth: number; storageUsed: number },
    limits: { downloadsPerMonth: number; storageLimit: number }
): boolean {
    const downloadPercentage = calculateUsagePercentage(
        usage.downloadsThisMonth,
        limits.downloadsPerMonth
    );
    const storagePercentage = calculateUsagePercentage(
        usage.storageUsed,
        limits.storageLimit
    );

    return downloadPercentage >= 80 || storagePercentage >= 80;
}

/**
 * Format file size limit for display
 */
export function formatFileSizeLimit(bytes: number): string {
    if (bytes === Infinity) return 'Unlimited';
    return formatBytes(bytes);
}

/**
 * Check if file size is within limit
 */
export function isFileSizeAllowed(fileSize: number, limit: number): boolean {
    if (limit === Infinity) return true;
    return fileSize <= limit;
}
