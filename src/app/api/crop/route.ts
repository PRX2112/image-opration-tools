import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { image, crop, format = 'png', quality = 90 } = body;

        if (!image || !crop) {
            return NextResponse.json(
                { error: 'Image and crop data are required' },
                { status: 400 }
            );
        }

        // Remove data URL prefix if present
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');

        // Round coordinates to integers as Sharp expects integers
        let left = Math.round(crop.x);
        let top = Math.round(crop.y);
        let width = Math.round(crop.width);
        let height = Math.round(crop.height);

        // Ensure minimum dimensions of 1x1
        if (width < 1) width = 1;
        if (height < 1) height = 1;

        // Ensure non-negative coordinates
        if (left < 0) left = 0;
        if (top < 0) top = 0;

        let sharpInstance = sharp(imageBuffer);

        // Get metadata to validate crop bounds
        const metadata = await sharpInstance.metadata();

        // Validate bounds against image size
        if (metadata.width && metadata.height) {
            // Ensure crop doesn't exceed image dimensions
            if (left + width > metadata.width) {
                width = Math.max(1, metadata.width - left);
            }
            if (top + height > metadata.height) {
                height = Math.max(1, metadata.height - top);
            }
        }

        const extractRegion = { left, top, width, height };

        // Perform crop
        sharpInstance = sharpInstance.extract(extractRegion);

        // Format conversion
        if (format === 'jpg' || format === 'jpeg') {
            sharpInstance = sharpInstance.jpeg({ quality });
        } else if (format === 'webp') {
            sharpInstance = sharpInstance.webp({ quality });
        } else {
            sharpInstance = sharpInstance.png({ quality });
        }

        const processedBuffer = await sharpInstance.toBuffer();
        const mimeType = format === 'jpg' || format === 'jpeg' ? 'image/jpeg' : `image/${format}`;
        const base64Output = `data:${mimeType};base64,${processedBuffer.toString('base64')}`;

        return NextResponse.json({
            image: base64Output,
            width: extractRegion.width,
            height: extractRegion.height
        });

    } catch (error: any) {
        console.error('Crop error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to crop image' },
            { status: 500 }
        );
    }
}
