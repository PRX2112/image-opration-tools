import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import JSZip from 'jszip';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { images, format = 'png', quality = 90 } = body;

        if (!images || !Array.isArray(images) || images.length === 0) {
            return NextResponse.json(
                { error: 'Images are required' },
                { status: 400 }
            );
        }

        const processedImages: { name: string; buffer: Buffer }[] = [];

        for (let i = 0; i < images.length; i++) {
            const { content, name } = images[i];

            // Remove data URL prefix
            const base64Data = content.replace(/^data:image\/\w+;base64,/, '');
            const imageBuffer = Buffer.from(base64Data, 'base64');
            const originalName = name.substring(0, name.lastIndexOf('.')) || name;

            let sharpInstance = sharp(imageBuffer);

            // Apply compression/formatting
            if (format === 'png') {
                sharpInstance = sharpInstance.png({ quality, effort: 6 });
            } else if (format === 'jpg' || format === 'jpeg') {
                sharpInstance = sharpInstance.jpeg({ quality, mozjpeg: true });
            } else if (format === 'webp') {
                sharpInstance = sharpInstance.webp({ quality });
            } else if (format === 'avif') {
                sharpInstance = sharpInstance.avif({ quality });
            } else if (format === 'gif') {
                // Warning: Sharp GIF support is limited for non-animated, but works.
                // If animated gif is input, this might just take the first frame unless 'animated: true' is passed often.
                // For now, simple conversion.
                sharpInstance = sharpInstance.gif();
            }

            const processedBuffer = await sharpInstance.toBuffer();
            const ext = format === 'jpeg' ? 'jpg' : format;
            processedImages.push({
                name: `${originalName}.${ext}`,
                buffer: processedBuffer
            });
        }

        // Return single image or ZIP
        if (processedImages.length === 1) {
            const img = processedImages[0];
            const mimeType = format === 'jpg' || format === 'jpeg' ? 'image/jpeg' : `image/${format}`;
            const base64 = `data:${mimeType};base64,${img.buffer.toString('base64')}`;

            return NextResponse.json({
                mode: 'single',
                image: base64,
                filename: img.name
            });
        } else {
            const zip = new JSZip();
            processedImages.forEach(img => {
                zip.file(img.name, img.buffer);
            });

            const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

            return NextResponse.json({
                mode: 'zip',
                file: `converted_images.zip`,
                base64: `data:application/zip;base64,${zipBuffer.toString('base64')}`
            });
        }

    } catch (error: any) {
        console.error('Conversion error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to convert images' },
            { status: 500 }
        );
    }
}
