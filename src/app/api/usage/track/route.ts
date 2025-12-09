import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db/db';
import { userUsage, imageHistory } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { getPlanLimits } from '@/config/plans';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { action, fileSize, toolName, fileName } = await request.json();

        if (!action) {
            return NextResponse.json(
                { error: 'Missing action' },
                { status: 400 }
            );
        }

        // Get current usage
        const [usage] = await db
            .select()
            .from(userUsage)
            .where(eq(userUsage.userId, session.user.id))
            .limit(1);

        if (!usage) {
            return NextResponse.json(
                { error: 'Usage record not found' },
                { status: 404 }
            );
        }

        const limits = getPlanLimits(usage.subscriptionTier);

        // Check limits before tracking
        if (action === 'download') {
            if (limits.downloadsPerMonth !== Infinity) {
                if (usage.downloadsThisMonth >= limits.downloadsPerMonth) {
                    return NextResponse.json(
                        {
                            error: 'Download limit reached',
                            limitReached: true,
                            currentPlan: usage.subscriptionTier
                        },
                        { status: 403 }
                    );
                }
            }

            // Update download count
            const [updatedUsage] = await db
                .update(userUsage)
                .set({
                    downloadsThisMonth: usage.downloadsThisMonth + 1,
                    storageUsed: fileSize ? usage.storageUsed + fileSize : usage.storageUsed,
                })
                .where(eq(userUsage.userId, session.user.id))
                .returning();

            // Optionally save to image history (Only for paid plans)
            if (toolName && fileName && usage.subscriptionTier !== 'free') {
                await db.insert(imageHistory).values({
                    userId: session.user.id,
                    toolName,
                    originalFileName: fileName,
                    fileSize: fileSize || 0,
                });
            }

            return NextResponse.json({
                success: true,
                usage: updatedUsage
            });
        }

        return NextResponse.json(
            { error: 'Invalid action' },
            { status: 400 }
        );
    } catch (error) {
        console.error('Error tracking usage:', error);
        return NextResponse.json(
            { error: 'Failed to track usage' },
            { status: 500 }
        );
    }
}
