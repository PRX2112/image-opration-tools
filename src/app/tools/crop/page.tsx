

import CropTool from '@/components/tools/CropTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'Crop Image Online - Free Photo Cropper',
    description: 'Crop images online with ease. Use presets like 16:9, 1:1, or freeform cropping. Secure, client-side processing.',
    alternates: {
        canonical: '/tools/crop'
    }
};

export default function CropPage() {
    return (
        <>
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "ResizeMe Crop Tool",
                "applicationCategory": "MultimediaApplication",
                "operatingSystem": "Any",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            }} />
            <CropTool title="Crop Image" />
        </>
    );
}
