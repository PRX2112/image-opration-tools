import FlipTool from '@/components/tools/FlipTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'Flip Image Online - Mirror Photos Vertically & Horizontally',
    description: 'Flip images online instantly. Create mirror effects by flipping photos vertically or horizontally. Free to use.',
    alternates: {
        canonical: '/tools/flip'
    }
};

export default function FlipPage() {
    return (
        <>
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "ResizeMe Flip Tool",
                "applicationCategory": "MultimediaApplication",
                "operatingSystem": "Any",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            }} />
            <FlipTool title="Flip Image" />
        </>
    );
}
