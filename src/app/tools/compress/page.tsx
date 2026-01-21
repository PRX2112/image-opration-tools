

import CompressTool from '@/components/tools/CompressTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import ToolRecommendations from '@/components/ToolRecommendations';

export const metadata: Metadata = {
    title: 'Compress Image Online - Reduce File Size',
    description: 'Compress JPG, PNG, WEBP images online without losing quality. Reduce file size up to 80% for faster websites.',
    alternates: {
        canonical: '/compress-image-online'
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

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Online Image Compressor – Reduce File Size for Free
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Compress and optimize your images instantly using our advanced compression tool. Reduce file size up to 80% without losing quality.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">How to Compress an Image</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your image or drop it here</li>
                            <li>Adjust compression level (optional)</li>
                            <li>Wait for automatic optimization</li>
                            <li>Compare Before/After and Download</li>
                        </ol>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Why use ResizeMe Compressor?</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>⚡ Lightning fast compression</li>
                            <li>🔒 Secure client-side processing</li>
                            <li>✨ Smart lossy & lossless comparison</li>
                            <li>📦 Bulk compression supported</li>
                        </ul>
                    </section>
                </div>


                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Supported Formats</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        Our compressor works perfectly with <strong>JPG, PNG, WEBP, and GIF</strong> files.
                        Ideal for optimizing website images, email attachments, and storage saving.
                    </p>
                </section>

                <section className="space-y-4 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <h2 className="text-2xl font-semibold">Image Compression FAQs</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                            <h3 className="font-semibold text-lg mb-2">How much will my file size reduce?</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                It varies by image, but we typically see reductions of 50-80% without noticeable quality loss. Complex photos may compress less than simple graphics.
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                            <h3 className="font-semibold text-lg mb-2">What is the difference between specific compression levels?</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Higher compression levels result in smaller file sizes but may introduce some visual artifacts. Lower compression keeps more detail but saves less space. We recommend starting with the default "Balanced" setting.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <ToolRecommendations currentTool="compress" />
        </>
    );
}
