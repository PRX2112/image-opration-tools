import { google } from 'googleapis';
import { db } from '@/db/db';
import { accounts, users } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

/**
 * Get authenticated Google Drive client for a user
 */
export async function getDriveClient(userId: string) {
    // Fetch user's Google account with tokens
    const [account] = await db
        .select()
        .from(accounts)
        .where(and(eq(accounts.userId, userId), eq(accounts.provider, 'google')))
        .limit(1);

    if (!account || !account.access_token) {
        throw new Error('User has not connected Google Drive');
    }

    // Check if token is expired and refresh if needed
    const now = Math.floor(Date.now() / 1000);
    if (account.expires_at && account.expires_at < now) {
        // Token is expired, refresh it
        const newTokens = await refreshDriveToken(account.refresh_token!);

        // Update tokens in database
        await db
            .update(accounts)
            .set({
                access_token: newTokens.access_token,
                expires_at: newTokens.expires_at,
                refresh_token: newTokens.refresh_token || account.refresh_token,
            })
            .where(and(eq(accounts.userId, userId), eq(accounts.provider, 'google')));

        // Use new access token
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
        );

        oauth2Client.setCredentials({
            access_token: newTokens.access_token,
            refresh_token: newTokens.refresh_token || account.refresh_token,
        });

        return google.drive({ version: 'v3', auth: oauth2Client });
    }

    // Token is still valid
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
        access_token: account.access_token,
        refresh_token: account.refresh_token,
    });

    return google.drive({ version: 'v3', auth: oauth2Client });
}

/**
 * Refresh expired Google Drive access token
 */
async function refreshDriveToken(refreshToken: string) {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
        refresh_token: refreshToken,
    });

    const { credentials } = await oauth2Client.refreshAccessToken();

    return {
        access_token: credentials.access_token!,
        refresh_token: credentials.refresh_token || refreshToken,
        expires_at: credentials.expiry_date ? Math.floor(credentials.expiry_date / 1000) : undefined,
    };
}

/**
 * Check if user has connected Google Drive
 */
export async function checkDriveConnection(userId: string): Promise<{
    connected: boolean;
    email?: string;
}> {
    try {
        const [account] = await db
            .select()
            .from(accounts)
            .where(and(eq(accounts.userId, userId), eq(accounts.provider, 'google')))
            .limit(1);

        if (!account || !account.access_token) {
            return { connected: false };
        }

        // Get user email from the users table instead of making API call
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

        return {
            connected: true,
            email: user?.email || undefined,
        };
    } catch (error) {
        console.error('Error checking Drive connection:', error);
        return { connected: false };
    }
}

/**
 * Revoke Google Drive access for a user
 */
export async function revokeDriveAccess(userId: string) {
    const [account] = await db
        .select()
        .from(accounts)
        .where(and(eq(accounts.userId, userId), eq(accounts.provider, 'google')))
        .limit(1);

    if (!account || !account.access_token) {
        return;
    }

    try {
        // Revoke the token with Google
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET
        );

        await oauth2Client.revokeToken(account.access_token);

        // Clear tokens from database
        await db
            .update(accounts)
            .set({
                access_token: null,
                refresh_token: null,
                expires_at: null,
            })
            .where(and(eq(accounts.userId, userId), eq(accounts.provider, 'google')));
    } catch (error) {
        console.error('Error revoking Drive access:', error);
        throw error;
    }
}
