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

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Online Image Converter – Convert Images for Free
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Convert your images to any format instantly. Supports JPG, PNG, WEBP, GIF, SVG, AVIF, and HEIC.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">How to Convert Images</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload up to 10 images at once</li>
                            <li>Select your desired output format</li>
                            <li>Click <strong>Convert</strong></li>
                            <li>Download individually or as ZIP</li>
                        </ol>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Why use ResizeMe Converter?</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>🔄 Universal format support</li>
                            <li>✨ High-quality conversion</li>
                            <li>🚀 Batch processing enabled</li>
                            <li>🛡️ 100% Secure & Private</li>
                        </ul>
                    </section>
                </div>

                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Supported Conversions</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Convert between <strong>JPG to PNG</strong>, <strong>PNG to WEBP</strong>, <strong>HEIC to JPG</strong>, and many more combinations.
                        We ensure your images look crisp and clean after conversion.
                    </p>
                </section>
            </div>
        </>
    );
}
