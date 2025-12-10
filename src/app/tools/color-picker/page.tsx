import ColorPickerTool from '@/components/tools/ColorPickerTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'Image Color Picker - Extract Colors Online',
    description: 'Pick colors from any image online. Get HEX, RGB, and HSL codes instantly. Zoom in for pixel-perfect precision.',
    alternates: {
        canonical: '/tools/color-picker'
    }
};

export default function ColorPickerPage() {
    return (
        <>
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "ResizeMe Color Picker",
                "applicationCategory": "MultimediaApplication",
                "operatingSystem": "Any",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            }} />
            <ColorPickerTool title="Color Picker" />
        </>
    );
}
