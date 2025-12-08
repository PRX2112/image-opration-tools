import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { image, factor = 2, enhance = true } = body;

        if (!image) {
            return NextResponse.json(
                { error: 'Image is required' },
                { status: 400 }
            );
        }

        // Validate factor
        const scaleFactor = Number(factor);
        if (scaleFactor !== 2 && scaleFactor !== 4) {
            return NextResponse.json(
                { error: 'Factor must be 2 or 4' },
                { status: 400 }
            );
        }

        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');

        let sharpInstance = sharp(imageBuffer);
        const metadata = await sharpInstance.metadata();

        if (!metadata.width || !metadata.height) {
            throw new Error('Invalid image data');
        }

        // Calculate new dimensions
        const newWidth = Math.round(metadata.width * scaleFactor);

        // Safety check for max dimensions (prevent DOS)
        if (newWidth > 8000) {
            return NextResponse.json(
                { error: 'Resulting image would be too large (>8000px)' },
                { status: 400 }
            );
        }

        // 1. Resize using Lanczos3 (high quality interpolation)
        sharpInstance = sharpInstance.resize({
            width: newWidth,
            kernel: sharp.kernel.lanczos3,
            withoutEnlargement: false
        });

        // 2. Apply Sharpening if enhanced (Unsharp Mask)
        if (enhance) {
            // These parameters mimic a moderate "smart sharpen"
            sharpInstance = sharpInstance.sharpen({
                sigma: 1.5,
                m1: 0,
                m2: 3,
                x1: 2,
                y2: 10,
                y3: 20
            });
        }

        const processedBuffer = await sharpInstance.toBuffer();
        const mimeType = metadata.format === 'jpeg' ? 'image/jpeg' : `image/${metadata.format}`;
        const base64Output = `data:${mimeType};base64,${processedBuffer.toString('base64')}`;

        return NextResponse.json({
            image: base64Output,
            originalWidth: metadata.width,
            originalHeight: metadata.height,
            newWidth: newWidth,
            newHeight: Math.round(metadata.height * scaleFactor)
        });

    } catch (error: any) {
        console.error('Enlarge error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to enlarge image' },
            { status: 500 }
        );
    }
}
