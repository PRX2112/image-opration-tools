

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
    if (!VALID_FORMATS.includes(format)) {
        notFound();
    }

    const displayFormat = format === 'jpeg' ? 'JPG' : format.toUpperCase();

    return (
        <ResizeTool
            defaultFormat={format === 'jpeg' ? 'jpg' : format}
            title={`Resize Image to ${displayFormat}`}
        />
    );
}

export function generateStaticParams() {
    return [
        { format: 'png' },
        { format: 'jpg' },
        { format: 'webp' },
    ];
}
