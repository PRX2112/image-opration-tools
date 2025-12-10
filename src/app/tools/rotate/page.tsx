import RotateTool from '@/components/tools/RotateTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'Rotate Image Online - Turn Pictures 90, 180 Degrees',
    description: 'Rotate images online for free. Turn photos 90 degrees clockwise or counter-clockwise, or by custom angles. Save as JPG, PNG, or WEBP.',
    alternates: {
        canonical: '/tools/rotate'
    }
};

export default function RotatePage() {
    return (
        <>
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "ResizeMe Rotate Tool",
                "applicationCategory": "MultimediaApplication",
                "operatingSystem": "Any",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            }} />
            <RotateTool title="Rotate Image" />
        </>
    );
}
