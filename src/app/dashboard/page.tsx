import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { db } from '@/db/db';
import { userUsage, imageHistory, driveFiles, payments } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

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
        .limit(20);

    // Fetch saved Drive files
    const driveFilesData = await db
        .select()
        .from(driveFiles)
        .where(eq(driveFiles.userId, session.user.id))
        .orderBy(desc(driveFiles.createdAt))
        .limit(20);

    // Fetch payment history
    const paymentsData = await db
        .select()
        .from(payments)
        .where(eq(payments.userId, session.user.id))
        .orderBy(desc(payments.createdAt))
        .limit(10);

    const subscriptionTier = usage?.subscriptionTier || 'free';
    const downloadsThisMonth = usage?.downloadsThisMonth || 0;
    const storageUsed = usage?.storageUsed || 0;
    const nextBillingDate = usage?.nextBillingDate || usage?.lastBillingDate || null;

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
                <DashboardTabs
                    userName={session.user.name || 'User'}
                    usage={{
                        subscriptionTier,
                        downloadsThisMonth,
                        storageUsed,
                        nextBillingDate
                    }}
                    limits={{
                        downloads: currentLimits.downloads,
                        storage: currentLimits.storage
                    }}
                    history={history}
                    driveFiles={driveFilesData}
                    payments={paymentsData}
                />
            </div>
        </div>
    );
}
