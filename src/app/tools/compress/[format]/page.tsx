import CompressTool from '@/components/tools/CompressTool';
import { notFound } from 'next/navigation';

const VALID_FORMATS = ['png', 'jpg', 'jpeg', 'webp'];

interface PageProps {
    params: Promise<{
        format: string;
    }>
}

export default async function FormatCompressPage({ params }: PageProps) {
    const resolvedParams = await params;
    const format = resolvedParams.format.toLowerCase();

    // Validate format
    // Validate format
    if (!VALID_FORMATS.includes(format)) {
        notFound();
    }

    const displayFormat = format === 'jpeg' ? 'JPG' : format.toUpperCase();

    return (
        <CompressTool
            defaultFormat={format === 'jpeg' ? 'jpg' : format}
            title={`Compress ${displayFormat} Online`}
        />
    );
}

export async function generateMetadata({ params }: PageProps) {
    const resolvedParams = await params;
    const format = resolvedParams.format.toLowerCase();
    const displayFormat = format === 'jpeg' ? 'JPG' : format.toUpperCase();

    return {
        title: `Compress ${displayFormat} Online - Reduce File Size Free`,
        description: `Compress ${displayFormat} images online up to 80% without quality loss. Optimize your ${displayFormat} files for web and speed.`,
        alternates: {
            canonical: `/compress-${format}`
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
