import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            image,
            rotation = 0,
            flipHorizontal = false,
            flipVertical = false,
            background = '#ffffff'
        } = body;

        if (!image) {
            return NextResponse.json(
                { error: 'Image is required' },
                { status: 400 }
            );
        }

        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');

        let sharpInstance = sharp(imageBuffer);

        // 1. Rotate
        if (rotation !== 0) {
            sharpInstance = sharpInstance.rotate(rotation, {
                background: background
            });
        }

        // 2. Flip / Flop
        if (flipHorizontal) {
            sharpInstance = sharpInstance.flop();
        }

        if (flipVertical) {
            sharpInstance = sharpInstance.flip();
        }

        // Get metadata for validation/info if needed
        const metadata = await sharpInstance.metadata();

        const processedBuffer = await sharpInstance.toBuffer();
        const mimeType = metadata.format === 'jpeg' ? 'image/jpeg' : `image/${metadata.format}`;
        const base64Output = `data:${mimeType};base64,${processedBuffer.toString('base64')}`;

        return NextResponse.json({
            image: base64Output,
            width: metadata.width,
            height: metadata.height
        });

    } catch (error: any) {
        console.error('Transform error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to transform image' },
            { status: 500 }
        );
    }
}
