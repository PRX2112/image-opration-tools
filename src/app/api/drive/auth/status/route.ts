import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { checkDriveConnection } from '@/lib/google-drive-auth';

export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const connectionStatus = await checkDriveConnection(session.user.id);

        return NextResponse.json(connectionStatus);
    } catch (error) {
        console.error('Error checking Drive connection:', error);
        return NextResponse.json(
            { error: 'Failed to check Drive connection' },
            { status: 500 }
        );
    }
}
