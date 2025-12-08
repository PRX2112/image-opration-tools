import ConvertTool from '@/components/tools/ConvertTool';
import { notFound } from 'next/navigation';

const VALID_FORMATS = ['png', 'jpg', 'jpeg', 'webp', 'avif', 'gif', 'svg', 'heic'];

interface PageProps {
    params: Promise<{
        slug: string;
    }>
}

export default async function FormatConvertPage({ params }: PageProps) {
    const resolvedParams = await params;
    const slug = resolvedParams.slug.toLowerCase();

    // Parse slug: e.g. "png-to-jpg"
    const parts = slug.split('-to-');

    // Basic validation
    if (parts.length !== 2) {
        // If it's just a format like "png", maybe redirect or show "Convert to PNG"?
        // For now, let's treat single slugs as output targets "jpg" -> convert anything to jpg
        if (VALID_FORMATS.includes(slug)) {
            const target = slug === 'jpeg' ? 'jpg' : slug;
            return <ConvertTool defaultOutputFormat={target} title={`Convert Images to ${target.toUpperCase()}`} />;
        }
        return notFound();
    }

    const [source, target] = parts;
    const cleanSource = source === 'jpeg' ? 'jpg' : source;
    const cleanTarget = target === 'jpeg' ? 'jpg' : target;

    // Validate formats
    if (!VALID_FORMATS.includes(cleanSource) || !VALID_FORMATS.includes(cleanTarget)) {
        notFound();
    }

    const displaySource = cleanSource.toUpperCase();
    const displayTarget = cleanTarget.toUpperCase();

    return (
        <ConvertTool
            defaultInputFormat={cleanSource}
            defaultOutputFormat={cleanTarget}
            title={`Convert ${displaySource} to ${displayTarget}`}
        />
    );
}

export function generateStaticParams() {
    const formats = ['png', 'jpg', 'webp', 'avif'];
    const paths = [];

    // Generate combinations
    for (const source of formats) {
        for (const target of formats) {
            if (source !== target) {
                paths.push({ slug: `${source}-to-${target}` });
            }
        }
    }

    // Add single targets
    for (const f of formats) {
        paths.push({ slug: f });
    }

    return paths;
}
