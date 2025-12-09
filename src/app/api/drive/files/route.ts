import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { listUserDriveFiles } from '@/lib/google-drive';

export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Parse query parameters
        const searchParams = request.nextUrl.searchParams;
        const toolUsed = searchParams.get('toolUsed') || undefined;
        const limit = parseInt(searchParams.get('limit') || '20');
        const offset = parseInt(searchParams.get('offset') || '0');

        const files = await listUserDriveFiles({
            userId: session.user.id,
            toolUsed,
            limit,
            offset,
        });

        return NextResponse.json({
            files,
            count: files.length,
        });
    } catch (error) {
        console.error('Error listing Drive files:', error);
        return NextResponse.json(
            { error: 'Failed to list Drive files' },
            { status: 500 }
        );
    }
}
