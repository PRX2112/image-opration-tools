

import CropTool from '@/components/tools/CropTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import ToolRecommendations from '@/components/ToolRecommendations';

export const metadata: Metadata = {
    title: 'Crop Image Online - Free Photo Cropper',
    description: 'Crop images online with ease. Use presets like 16:9, 1:1, or freeform cropping. Secure, client-side processing.',
    alternates: {
        canonical: '/crop-image-online'
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

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Online Image Cropper – Crop Photos for Free
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Crop your images easily with our free online tool. Perfect for social media profiles, covers, and posts.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">How to Crop an Image</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your photo</li>
                            <li>Select an aspect ratio (16:9, 1:1, etc.)</li>
                            <li>Drag the crop area to adjust</li>
                            <li>Download the cropped image</li>
                        </ol>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Crop Features</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>📐 Pre-set Social Media Ratios</li>
                            <li>✂️ Freeform cropping</li>
                            <li>🔄 Lossless cropping quality</li>
                            <li>📱 Mobile-friendly interface</li>
                        </ul>
                    </section>
                </div>


                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Supported Formats</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        You can crop <strong>JPG, PNG, and WEBP</strong> images. Perfect for adjusting profile pictures for Instagram, Facebook, Twitter, and LinkedIn.
                    </p>
                </section>

                <section className="space-y-4 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <h2 className="text-2xl font-semibold">Common Cropping Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                            <h3 className="font-semibold text-lg mb-2">What is the best aspect ratio for Instagram?</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                For posts, a 1:1 (Square) or 4:5 (Portrait) ratio is best. For Stories, use 9:16. Our tool has built-in presets for all these sizes.
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                            <h3 className="font-semibold text-lg mb-2">does cropping lower the resolution?</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Cropping removes pixels from the image, so the overall resolution (dimensions) will be smaller. However, the quality of the remaining pixels stays exactly the same.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <ToolRecommendations currentTool="crop" />
        </>
    );
}
