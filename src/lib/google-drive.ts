import { getDriveClient } from './google-drive-auth';
import { db } from '@/db/db';
import { driveFiles } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { Readable } from 'stream';

const DRIVE_FOLDER_NAME = process.env.DRIVE_FOLDER_NAME || 'ResizeMe';

/**
 * Create or get the ResizeMe folder in user's Google Drive
 */
async function getOrCreateAppFolder(userId: string): Promise<string> {
    const drive = await getDriveClient(userId);

    // Search for existing folder
    const response = await drive.files.list({
        q: `name='${DRIVE_FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
        fields: 'files(id, name)',
        spaces: 'drive',
    });

    if (response.data.files && response.data.files.length > 0) {
        return response.data.files[0].id!;
    }

    // Create folder if it doesn't exist
    const folderMetadata = {
        name: DRIVE_FOLDER_NAME,
        mimeType: 'application/vnd.google-apps.folder',
    };

    const folder = await drive.files.create({
        requestBody: folderMetadata,
        fields: 'id',
    });

    return folder.data.id!;
}

/**
 * Upload an image file to Google Drive
 */
export async function uploadImageToDrive(params: {
    userId: string;
    file: Buffer;
    fileName: string;
    mimeType: string;
    toolUsed: string;
}): Promise<{
    driveFileId: string;
    webViewLink: string;
    thumbnailLink?: string;
}> {
    const { userId, file, fileName, mimeType, toolUsed } = params;

    try {
        const drive = await getDriveClient(userId);
        const folderId = await getOrCreateAppFolder(userId);

        // Convert Buffer to Readable stream
        const stream = Readable.from(file);

        // Upload file to Drive
        const fileMetadata = {
            name: fileName,
            parents: [folderId],
        };

        const media = {
            mimeType: mimeType,
            body: stream,
        };

        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id, webViewLink, thumbnailLink, size',
        });

        const driveFileId = response.data.id!;
        const webViewLink = response.data.webViewLink!;
        const thumbnailLink = response.data.thumbnailLink;
        const fileSize = parseInt(response.data.size || '0');

        // Save metadata to database
        await db.insert(driveFiles).values({
            userId,
            driveFileId,
            fileName,
            mimeType,
            fileSize,
            toolUsed,
            webViewLink,
            thumbnailLink,
        });

        return {
            driveFileId,
            webViewLink,
            thumbnailLink: thumbnailLink || undefined,
        };
    } catch (error: any) {
        console.error('Error uploading to Drive:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            status: error.status,
            errors: error.errors,
        });
        throw new Error(`Failed to upload file to Google Drive: ${error.message || 'Unknown error'}`);
    }
}

/**
 * List user's Drive files with optional filtering
 */
export async function listUserDriveFiles(params: {
    userId: string;
    toolUsed?: string;
    limit?: number;
    offset?: number;
}) {
    const { userId, toolUsed, limit = 20, offset = 0 } = params;

    try {
        let query = db
            .select()
            .from(driveFiles)
            .where(eq(driveFiles.userId, userId))
            .orderBy(desc(driveFiles.createdAt))
            .limit(limit)
            .offset(offset);

        if (toolUsed) {
            query = db
                .select()
                .from(driveFiles)
                .where(and(eq(driveFiles.userId, userId), eq(driveFiles.toolUsed, toolUsed)))
                .orderBy(desc(driveFiles.createdAt))
                .limit(limit)
                .offset(offset);
        }

        const files = await query;

        return files;
    } catch (error) {
        console.error('Error listing Drive files:', error);
        throw new Error('Failed to list Drive files');
    }
}

/**
 * Get a specific Drive file metadata
 */
export async function getDriveFileMetadata(userId: string, fileId: string) {
    try {
        const [file] = await db
            .select()
            .from(driveFiles)
            .where(and(eq(driveFiles.id, fileId), eq(driveFiles.userId, userId)))
            .limit(1);

        if (!file) {
            throw new Error('File not found');
        }

        return file;
    } catch (error) {
        console.error('Error getting file metadata:', error);
        throw new Error('Failed to get file metadata');
    }
}

/**
 * Delete a file from Google Drive and database
 */
export async function deleteFileFromDrive(userId: string, fileId: string) {
    try {
        // Get file metadata
        const [file] = await db
            .select()
            .from(driveFiles)
            .where(and(eq(driveFiles.id, fileId), eq(driveFiles.userId, userId)))
            .limit(1);

        if (!file) {
            throw new Error('File not found');
        }

        // Delete from Google Drive
        const drive = await getDriveClient(userId);
        await drive.files.delete({
            fileId: file.driveFileId,
        });

        // Delete from database
        await db
            .delete(driveFiles)
            .where(and(eq(driveFiles.id, fileId), eq(driveFiles.userId, userId)));

        return { success: true };
    } catch (error) {
        console.error('Error deleting file from Drive:', error);
        throw new Error('Failed to delete file from Drive');
    }
}

/**
 * Generate a shareable link for a Drive file
 */
export async function generateShareableLink(userId: string, fileId: string) {
    try {
        const [file] = await db
            .select()
            .from(driveFiles)
            .where(and(eq(driveFiles.id, fileId), eq(driveFiles.userId, userId)))
            .limit(1);

        if (!file) {
            throw new Error('File not found');
        }

        const drive = await getDriveClient(userId);

        // Make file accessible to anyone with the link
        await drive.permissions.create({
            fileId: file.driveFileId,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
        });

        // Get updated file metadata with webViewLink
        const response = await drive.files.get({
            fileId: file.driveFileId,
            fields: 'webViewLink, webContentLink',
        });

        return {
            webViewLink: response.data.webViewLink,
            webContentLink: response.data.webContentLink,
        };
    } catch (error) {
        console.error('Error generating shareable link:', error);
        throw new Error('Failed to generate shareable link');
    }
}

/**
 * Get total storage used by user in Drive (from our app)
 */
export async function getUserDriveStorageUsed(userId: string): Promise<number> {
    try {
        const files = await db
            .select()
            .from(driveFiles)
            .where(eq(driveFiles.userId, userId));

        const totalSize = files.reduce((sum, file) => sum + file.fileSize, 0);

        return totalSize;
    } catch (error) {
        console.error('Error calculating storage used:', error);
        return 0;
    }
}
