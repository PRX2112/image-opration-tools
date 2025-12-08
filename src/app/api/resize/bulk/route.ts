import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import JSZip from 'jszip';

export const maxDuration = 60; // Set max duration for simple functionality

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { images, settings } = body;

        if (!images || !Array.isArray(images) || images.length === 0) {
            return NextResponse.json({ error: 'No images provided' }, { status: 400 });
        }

        const zip = new JSZip();

        // Settings defaults
        const percentage = settings.percentage || 100;
        const targetFormat = (settings.format || 'png').toLowerCase();
        const quality = settings.quality || 90;

        await Promise.all(images.map(async (img: { name: string, content: string }, index: number) => {
            try {
                // Decode base64
                const base64Data = img.content.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');

                let sharpInstance = sharp(buffer);
                const metadata = await sharpInstance.metadata();

                // Resize logic
                let newWidth, newHeight;
                if (settings.width && settings.height) {
                    newWidth = settings.width;
                    newHeight = settings.height;
                } else if (metadata.width && metadata.height) {
                    // Use percentage
                    newWidth = Math.round(metadata.width * (percentage / 100));
                    newHeight = Math.round(metadata.height * (percentage / 100));
                }

                if (newWidth && newHeight) {
                    sharpInstance = sharpInstance.resize(newWidth, newHeight, {
                        fit: 'fill'
                    });
                }

                // Format logic
                if (targetFormat === 'jpg' || targetFormat === 'jpeg') {
                    sharpInstance = sharpInstance.jpeg({ quality, mozjpeg: true });
                } else if (targetFormat === 'webp') {
                    sharpInstance = sharpInstance.webp({ quality });
                } else {
                    sharpInstance = sharpInstance.png({ quality, compressionLevel: 9 });
                }

                const outputBuffer = await sharpInstance.toBuffer();

                // Add to zip
                const origName = img.name.split('.')[0]; // remove extension
                const fileName = `${origName}_resized.${targetFormat === 'jpeg' ? 'jpg' : targetFormat}`;
                zip.file(fileName, outputBuffer);

            } catch (err) {
                console.error(`Error processing image ${index}:`, err);
                // Continue with other images even if one fails
            }
        }));

        const zipContent = await zip.generateAsync({ type: 'uint8array' });

        return new NextResponse(zipContent, {
            status: 200,
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': 'attachment; filename="images_resized.zip"'
            }
        });

    } catch (error) {
        console.error('Bulk API Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
