import ConvertTool from '@/components/tools/ConvertTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'Image Converter Online - Convert JPG, PNG, WEBP, SVG',
    description: 'Free online image converter. Convert between format like JPG, PNG, WEBP, SVG, and GIF instantly. Bulk conversion supported.',
    alternates: {
        canonical: '/tools/convert'
    }
};

export default function ConvertPage() {
    return (
        <>
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "ResizeMe Image Converter",
                "applicationCategory": "MultimediaApplication",
                "operatingSystem": "Any",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            }} />
            <ConvertTool title="Convert Image" />
        </>
    );
}
