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

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Online Color Picker – Extract Colors from Images
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Find the exact color code from any image. Upload a photo and pick pixels to get HEX, RGB, and HSL values.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">How to Pick Colors</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your image</li>
                            <li>Use the magnifier to hover over pixels</li>
                            <li>Click to select a color</li>
                            <li>Copy the HEX or RGB code</li>
                        </ol>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Tool Features</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>🔍 High-precision magnifier zoom</li>
                            <li>📋 One-click copy to clipboard</li>
                            <li>🎨 Palette history tracking</li>
                            <li>💻 Designer-friendly formats</li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}
