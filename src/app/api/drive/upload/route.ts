import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { uploadImageToDrive } from '@/lib/google-drive';
import { db } from '@/db/db';
import { userUsage } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Check user's subscription plan
        const [usage] = await db
            .select()
            .from(userUsage)
            .where(eq(userUsage.userId, session.user.id))
            .limit(1);

        const subscriptionTier = usage?.subscriptionTier || 'free';
        const basePlan = subscriptionTier.split('_')[0]; // Remove '_monthly' or '_yearly'

        // Only Pro and Business users can use Drive integration
        if (basePlan !== 'pro' && basePlan !== 'business') {
            return NextResponse.json(
                { error: 'Drive integration is only available for Pro and Business plans' },
                { status: 403 }
            );
        }

        // Parse form data
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const fileName = formData.get('fileName') as string;
        const toolUsed = formData.get('toolUsed') as string;

        if (!file || !fileName || !toolUsed) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Check file size limit (200MB for Pro, unlimited for Business)
        const maxFileSize = basePlan === 'business'
            ? Infinity
            : parseInt(process.env.DRIVE_MAX_FILE_SIZE || '209715200'); // 200MB default

        if (buffer.length > maxFileSize) {
            return NextResponse.json(
                { error: 'File size exceeds plan limit' },
                { status: 413 }
            );
        }

        // Upload to Drive
        const result = await uploadImageToDrive({
            userId: session.user.id,
            file: buffer,
            fileName,
            mimeType: file.type,
            toolUsed,
        });

        return NextResponse.json({
            success: true,
            driveFileId: result.driveFileId,
            webViewLink: result.webViewLink,
            thumbnailLink: result.thumbnailLink,
        });
    } catch (error: any) {
        console.error('Error uploading to Drive:', error);

        if (error.message === 'User has not connected Google Drive') {
            return NextResponse.json(
                { error: 'Please connect your Google Drive account first' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to upload file to Drive' },
            { status: 500 }
        );
    }
}
