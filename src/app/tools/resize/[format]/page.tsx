

import ResizeTool from '@/components/tools/ResizeTool';
import { notFound } from 'next/navigation';

const VALID_FORMATS = ['png', 'jpg', 'jpeg', 'webp'];

interface PageProps {
    params: Promise<{
        format: string;
    }>
}

export default async function FormatResizePage({ params }: PageProps) {
    const resolvedParams = await params;
    const format = resolvedParams.format.toLowerCase();

    // Validate format
    // Validate format
    if (!VALID_FORMATS.includes(format)) {
        notFound();
    }

    const displayFormat = format === 'jpeg' ? 'JPG' : format.toUpperCase();

    return (
        <ResizeTool
            defaultFormat={format === 'jpeg' ? 'jpg' : format}
            title={`Resize ${displayFormat} Images Online`}
        />
    );
}

export async function generateMetadata({ params }: PageProps) {
    const resolvedParams = await params;
    const format = resolvedParams.format.toLowerCase();
    const displayFormat = format === 'jpeg' ? 'JPG' : format.toUpperCase();

    return {
        title: `Resize ${displayFormat} Online - Free and Fast Image Resizer`,
        description: `Best tool to resize ${displayFormat} images online. Change dimensions of your ${displayFormat} files without losing quality. No sign-up required.`,
        alternates: {
            canonical: `/resize-${format}`
        }
    };
}

export function generateStaticParams() {
    return [
        { format: 'png' },
        { format: 'jpg' },
        { format: 'webp' },
    ];
}
