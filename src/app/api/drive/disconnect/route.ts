import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { revokeDriveAccess } from '@/lib/google-drive-auth';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        await revokeDriveAccess(session.user.id);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error disconnecting Drive:', error);
        return NextResponse.json(
            { error: 'Failed to disconnect Drive' },
            { status: 500 }
        );
    }
}
