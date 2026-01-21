import RotateTool from '@/components/tools/RotateTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import ToolRecommendations from '@/components/ToolRecommendations';

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

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Online Image Rotator – Rotate Photos for Free
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Rotate your images left or right, 90 degrees or custom angles online. Fix sideways or upside-down photos instantly.
                    </p>
                </div>


                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">How to Rotate an Image</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your image needing rotation</li>
                            <li>Click Rotate Left or Right buttons</li>
                            <li>Or enter a specific angle (e.g. 45°)</li>
                            <li>Save the corrected image</li>
                        </ol>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Why use ResizeMe Rotator?</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>🔄 Precision angle control</li>
                            <li>✨ Smart background filling</li>
                            <li>⚡ Instant client-side preview</li>
                            <li>💾 Keeps original quality</li>
                        </ul>
                    </section>
                </div>

                <section className="space-y-4 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <h2 className="text-2xl font-semibold">Rotation FAQs</h2>
                    <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                            <h3 className="font-semibold text-lg mb-2">Can I rotate an image slightly (e.g., 5 degrees)?</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Yes! While we have quick buttons for 90-degree turns, you can enter any custom angle to straighten a crooked photo perfectly.
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                            <h3 className="font-semibold text-lg mb-2">What happens to the empty space when I rotate?</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                When you rotate by custom angles, empty space may appear in the corners. Our tool automatically fills this with a neutral color, or you can choose to crop the image afterwards.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <ToolRecommendations currentTool="rotate" />
        </>
    );
}
