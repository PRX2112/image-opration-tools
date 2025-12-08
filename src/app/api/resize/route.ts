import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { image, width, height, format, quality, preserveMetadata } = body;

        // Validate inputs
        if (!image || !width || !height || !format) {
            return NextResponse.json(
                { error: 'Missing required parameters' },
                { status: 400 }
            );
        }

        // Validate dimensions
        if (width > 10000 || height > 10000 || width < 1 || height < 1) {
            return NextResponse.json(
                { error: 'Invalid dimensions. Must be between 1 and 10000 pixels' },
                { status: 400 }
            );
        }

        // Validate format
        if (!['png', 'jpg', 'jpeg', 'webp'].includes(format.toLowerCase())) {
            return NextResponse.json(
                { error: 'Invalid format. Supported: png, jpg, webp' },
                { status: 400 }
            );
        }

        // Convert base64 to buffer
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const imageBuffer = Buffer.from(base64Data, 'base64');

        // Process image with Sharp
        let sharpInstance = sharp(imageBuffer);

        // Resize
        sharpInstance = sharpInstance.resize(width, height, {
            fit: 'fill',
            withoutEnlargement: false,
        });

        // Apply format-specific options
        const normalizedFormat = format.toLowerCase() === 'jpg' ? 'jpeg' : format.toLowerCase();
        const qualityValue = quality || 95;

        if (normalizedFormat === 'jpeg') {
            sharpInstance = sharpInstance.jpeg({
                quality: qualityValue,
                progressive: true,
                mozjpeg: true,
            });
        } else if (normalizedFormat === 'png') {
            sharpInstance = sharpInstance.png({
                quality: qualityValue,
                compressionLevel: 9,
                adaptiveFiltering: true,
            });
        } else if (normalizedFormat === 'webp') {
            sharpInstance = sharpInstance.webp({
                quality: qualityValue,
                effort: 6,
            });
        }

        // Keep metadata if requested (Pro feature - for now just acknowledge the flag)
        if (preserveMetadata) {
            sharpInstance = sharpInstance.withMetadata();
        }

        // Convert to buffer
        const outputBuffer = await sharpInstance.toBuffer();

        // Get metadata
        const metadata = await sharp(outputBuffer).metadata();

        // Convert to base64
        const base64Output = outputBuffer.toString('base64');
        const mimeType = `image/${normalizedFormat === 'jpeg' ? 'jpeg' : normalizedFormat}`;
        const dataUrl = `data:${mimeType};base64,${base64Output}`;

        return NextResponse.json({
            image: dataUrl,
            size: outputBuffer.length,
            width: metadata.width || width,
            height: metadata.height || height,
            format: normalizedFormat,
        });
    } catch (error) {
        console.error('Resize API error:', error);
        return NextResponse.json(
            { error: 'Failed to process image. Please try again.' },
            { status: 500 }
        );
    }
}
