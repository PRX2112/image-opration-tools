import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDriveFileMetadata, deleteFileFromDrive } from '@/lib/google-drive';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = await params;
        const file = await getDriveFileMetadata(session.user.id, id);

        return NextResponse.json(file);
    } catch (error: any) {
        console.error('Error getting file metadata:', error);

        if (error.message === 'File not found') {
            return NextResponse.json(
                { error: 'File not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to get file metadata' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = await params;
        await deleteFileFromDrive(session.user.id, id);

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error deleting file:', error);

        if (error.message === 'File not found') {
            return NextResponse.json(
                { error: 'File not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to delete file' },
            { status: 500 }
        );
    }
}
