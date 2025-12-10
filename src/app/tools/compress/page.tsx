

import CompressTool from '@/components/tools/CompressTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'Compress Image Online - Reduce File Size',
    description: 'Compress JPG, PNG, WEBP images online without losing quality. Reduce file size up to 80% for faster websites.',
    alternates: {
        canonical: '/tools/compress'
    }
};

export default function CompressPage() {
    return (
        <>
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "ResizeMe Compress Tool",
                "applicationCategory": "MultimediaApplication",
                "operatingSystem": "Any",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            }} />
            <CompressTool title="Compress Image" />
        </>
    );
}
