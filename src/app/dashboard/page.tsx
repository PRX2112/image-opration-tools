import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/db/db';
import { userUsage, imageHistory } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { LogOut, Settings, Image, Download, HardDrive } from 'lucide-react';
import Link from 'next/link';
import DriveConnectionCard from '@/components/drive/DriveConnectionCard';

export default async function DashboardPage() {
    const session = await auth();

    if (!session?.user) {
        redirect('/login');
    }

    // Fetch user usage data
    const [usage] = await db
        .select()
        .from(userUsage)
        .where(eq(userUsage.userId, session.user.id))
        .limit(1);

    // Fetch image history
    const history = await db
        .select()
        .from(imageHistory)
        .where(eq(imageHistory.userId, session.user.id))
        .orderBy(desc(imageHistory.createdAt))
        .limit(10);

    const subscriptionTier = usage?.subscriptionTier || 'free';
    const downloadsThisMonth = usage?.downloadsThisMonth || 0;
    const storageUsed = usage?.storageUsed || 0;

    // Subscription limits
    const limits = {
        free: { downloads: 50, storage: 100 * 1024 * 1024 }, // 100MB
        pro: { downloads: 500, storage: 1024 * 1024 * 1024 }, // 1GB
        business: { downloads: Infinity, storage: Infinity },
    };

    const currentLimits = limits[subscriptionTier as keyof typeof limits] || limits.free;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400">Welcome back, {session.user.name}!</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Subscription Card */}
                    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 shadow-sm dark:shadow-none transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <Settings className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Subscription</p>
                                <p className="text-gray-900 dark:text-white font-semibold capitalize">{subscriptionTier}</p>
                            </div>
                        </div>
                        <Link
                            href="/pricing"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
                        >
                            Upgrade Plan →
                        </Link>
                    </div>

                    {/* Downloads Card */}
                    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 shadow-sm dark:shadow-none transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/20">
                                <Download className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Downloads This Month</p>
                                <p className="text-gray-900 dark:text-white font-semibold">
                                    {downloadsThisMonth} / {currentLimits.downloads === Infinity ? '∞' : currentLimits.downloads}
                                </p>
                            </div>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                                style={{
                                    width: `${currentLimits.downloads === Infinity ? 0 : Math.min((downloadsThisMonth / currentLimits.downloads) * 100, 100)}%`,
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Storage Card */}
                    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 shadow-sm dark:shadow-none transition-all hover:shadow-md">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/20">
                                <HardDrive className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Storage Used</p>
                                <p className="text-gray-900 dark:text-white font-semibold">
                                    {(storageUsed / (1024 * 1024)).toFixed(2)} MB
                                </p>
                            </div>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                                style={{
                                    width: `${currentLimits.storage === Infinity ? 0 : Math.min((storageUsed / currentLimits.storage) * 100, 100)}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Google Drive Integration - Only for Pro/Business */}
                {(subscriptionTier === 'pro_monthly' ||
                    subscriptionTier === 'pro_yearly' ||
                    subscriptionTier === 'business_monthly' ||
                    subscriptionTier === 'business_yearly') && (
                        <div className="mb-8">
                            <DriveConnectionCard />
                        </div>
                    )}

                {/* Image History */}
                <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6 shadow-sm dark:shadow-none">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Image className="w-6 h-6 text-blue-500" />
                        Recent Activity
                    </h2>

                    {history.length === 0 ? (
                        <div className="text-center py-12">
                            <Image className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 mb-4">No image processing history yet</p>
                            <Link
                                href="/"
                                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
                            >
                                Start Editing Images
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {history.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-gray-600/50 transition-all hover:shadow-sm"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-500/20 dark:to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-200 dark:border-blue-500/30">
                                            <Image className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-gray-900 dark:text-white font-medium">{item.originalFileName}</p>
                                            <p className="text-gray-500 dark:text-gray-400 text-sm capitalize">{item.toolName}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                                            {item.fileSize ? `${(item.fileSize / 1024).toFixed(2)} KB` : 'N/A'}
                                        </p>
                                        <p className="text-gray-400 dark:text-gray-500 text-xs">
                                            {new Date(item.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
