import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { image, quality = 80, format } = body;

        if (!image) {
            return NextResponse.json(
                { error: 'Image is required' },
                { status: 400 }
            );
        }

        // Remove data URL prefix
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');
        const originalSize = imageBuffer.length;

        let sharpInstance = sharp(imageBuffer);
        const metadata = await sharpInstance.metadata();

        // Determine output format
        let outputFormat = format || metadata.format;
        if (outputFormat === 'jpeg') outputFormat = 'jpg';

        // Apply compression settings based on format
        if (outputFormat === 'png') {
            sharpInstance = sharpInstance.png({
                quality: quality,
                palette: true, // Use palette-based compression for better size reduction
                compressionLevel: 9,
                effort: 10
            });
        } else if (outputFormat === 'jpg') {
            sharpInstance = sharpInstance.jpeg({
                quality: quality,
                mozjpeg: true, // Use mozjpeg for better compression
            });
        } else if (outputFormat === 'webp') {
            sharpInstance = sharpInstance.webp({
                quality: quality,
                effort: 6 // Max effort
            });
        }

        const compressedBuffer = await sharpInstance.toBuffer();
        const compressedSize = compressedBuffer.length;

        const mimeType = outputFormat === 'jpg' ? 'image/jpeg' : `image/${outputFormat}`;
        const base64Output = `data:${mimeType};base64,${compressedBuffer.toString('base64')}`;

        return NextResponse.json({
            image: base64Output,
            originalSize,
            compressedSize,
            format: outputFormat
        });

    } catch (error: any) {
        console.error('Compression error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to compress image' },
            { status: 500 }
        );
    }
}
