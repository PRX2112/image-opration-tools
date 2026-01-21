

import ResizeTool from '@/components/tools/ResizeTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import ToolRecommendations from '@/components/ToolRecommendations';

export const metadata: Metadata = {
    title: 'Resize Image Online - Free, Fast & Secure',
    description: 'Resize JPG, PNG, WEBP images online for free. Change image dimensions by percentage or pixels without losing quality.',
    alternates: {
        canonical: '/resize-image-online'
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

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Online Image Resizer – Resize Images for Free
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Resize your images instantly using our free online image resizer. No signup needed.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">How to Resize an Image</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your image (JPG, PNG, or WEBP)</li>
                            <li>Choose width & height or percentage</li>
                            <li>Click <strong>Resize</strong></li>
                            <li>Download the optimized file</li>
                        </ol>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Why use ResizeMe?</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>⚡ Fast image processing</li>
                            <li>🔒 Secure, no files stored on servers</li>
                            <li>🆓 Free to use forever</li>
                            <li>📱 Works on Mobile and Desktop</li>
                        </ul>
                    </section>
                </div>


                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Supported Formats</h2>
                    <p className="text-gray-600 dark:text-gray-300">
                        We support all major image formats including <strong>JPG, JPEG, PNG, WEBP, and AVIF</strong>.
                        You can resize images for social media profile pictures, banners, or website optimization.
                    </p>
                </section>

                <section className="space-y-4 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <h2 className="text-2xl font-semibold">Frequency Asked Questions</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                            <h3 className="font-semibold text-lg mb-2">Does resizing reduce image quality?</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                It depends on how you resize. Scaling down (making smaller) usually maintains or improves perceived quality. Upscaling (making larger) can cause pixelation, but our AI-powered upscaler helps minimize this.
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                            <h3 className="font-semibold text-lg mb-2">Is my data safe?</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Yes! We process all images locally in your browser. Unlike other sites, we don't upload your photos to a server, so your privacy is 100% guaranteed.
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                            <h3 className="font-semibold text-lg mb-2">Can I resize multiple images at once?</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Yes, our tool supports batch processing. You can select multiple files and resize them all to the same dimensions simultaneously.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <ToolRecommendations currentTool="resize" />
        </>
    );
}
