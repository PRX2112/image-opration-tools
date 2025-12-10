

import ResizeTool from '@/components/tools/ResizeTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'Resize Image Online - Free, Fast & Secure',
    description: 'Resize JPG, PNG, WEBP images online for free. Change image dimensions by percentage or pixels without losing quality.',
    alternates: {
        canonical: '/tools/resize'
    }
};

export default function ResizePage() {
    return (
        <>
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "ResizeMe Resize Tool",
                "applicationCategory": "MultimediaApplication",
                "operatingSystem": "Any",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            }} />
            <ResizeTool title="Resize Image" />
        </>
    );
}
