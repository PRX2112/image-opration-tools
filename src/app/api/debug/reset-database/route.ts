import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/db';
import {
    users,
    accounts,
    sessions,
    verificationTokens,
    imageHistory,
    userUsage,
    subscriptions,
    payments,
    driveFiles
} from '@/db/schema';

/**
 * DEBUG ENDPOINT: Reset entire database
 * WARNING: This will delete ALL data! Only use in development!
 */
export async function POST(request: NextRequest) {
    try {
        // Only allow in development
        if (process.env.NODE_ENV === 'production') {
            return NextResponse.json(
                { error: 'This endpoint is only available in development' },
                { status: 403 }
            );
        }

        // Delete all data in order (respecting foreign key constraints)
        await db.delete(driveFiles);
        await db.delete(payments);
        await db.delete(subscriptions);
        await db.delete(userUsage);
        await db.delete(imageHistory);
        await db.delete(verificationTokens);
        await db.delete(sessions);
        await db.delete(accounts);
        await db.delete(users);

        return NextResponse.json({
            success: true,
            message: 'Database reset successfully',
            deletedTables: [
                'driveFiles',
                'payments',
                'subscriptions',
                'userUsage',
                'imageHistory',
                'verificationTokens',
                'sessions',
                'accounts',
                'users',
            ],
            nextSteps: [
                '1. Go to https://myaccount.google.com/permissions',
                '2. Remove "ResizeMe" or "localhost" access',
                '3. Go to http://localhost:3000',
                '4. Sign in with Google - you will see the Drive permission',
                '5. Try saving an image to Drive!',
            ],
        });
    } catch (error: any) {
        console.error('Error resetting database:', error);
        return NextResponse.json(
            {
                error: 'Failed to reset database',
                details: error.message
            },
            { status: 500 }
        );
    }
}
