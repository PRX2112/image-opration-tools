import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db/db';
import { accounts, sessions } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

/**
 * DEBUG ENDPOINT: Reset Google OAuth connection
 * This deletes the Google account tokens to force fresh authentication
 * WARNING: Only use in development!
 */
export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const userId = session.user.id;

        // Delete Google account tokens
        const deletedAccounts = await db
            .delete(accounts)
            .where(and(eq(accounts.userId, userId), eq(accounts.provider, 'google')))
            .returning();

        // Delete all sessions to force re-login
        await db
            .delete(sessions)
            .where(eq(sessions.userId, userId));

        return NextResponse.json({
            success: true,
            message: 'Google account connection reset successfully',
            deletedAccounts: deletedAccounts.length,
            nextSteps: [
                '1. Go to https://myaccount.google.com/permissions',
                '2. Remove "ResizeMe" or "localhost" access',
                '3. Sign out from the app',
                '4. Sign in again - you will see the Drive permission request',
                '5. Try saving to Drive again',
            ],
        });
    } catch (error) {
        console.error('Error resetting Google account:', error);
        return NextResponse.json(
            { error: 'Failed to reset Google account' },
            { status: 500 }
        );
    }
}
