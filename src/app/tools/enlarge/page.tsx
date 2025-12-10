import EnlargeTool from '@/components/tools/EnlargeTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'Image Enlarger - Upscale Photos Online',
    description: 'Enlarge images online without losing quality. Upscale photos by 2x or 4x using smart resizing algorithms. Improve image resolution free.',
    alternates: {
        canonical: '/tools/enlarge'
    }
};

export default function EnlargePage() {
    return (
        <>
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "ResizeMe Image Enlarger",
                "applicationCategory": "MultimediaApplication",
                "operatingSystem": "Any",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            }} />
            <EnlargeTool title="Enlarge Image" />
        </>
    );
}
