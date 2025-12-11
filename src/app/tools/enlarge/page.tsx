import EnlargeTool from '@/components/tools/EnlargeTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'Image Enlarger - Upscale Photos Online',
    description: 'Enlarge images online without losing quality. Upscale photos by 2x or 4x using smart resizing algorithms. Improve image resolution with our Pro tools.',
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

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Online Image Enlarger – Upscale Photos
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Make your small images larger without pixelation. Upscale low-resolution photos for printing or web use with our advanced AI tools.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">How to Enlarge an Image</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your small photo</li>
                            <li>Select Scale Factor (2x or 4x)</li>
                            <li>Enable "Smart Sharpening" for best results</li>
                            <li>Download the high-res image</li>
                        </ol>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Why use ResizeMe Enlarger?</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>🔍 Advanced Lanczos3 resampling</li>
                            <li>🖼️ Automatic sharpening</li>
                            <li>📏 Increase resolution for print</li>
                            <li>✨ Improve old low-quality photos</li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}
