import FlipTool from '@/components/tools/FlipTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import ToolRecommendations from '@/components/ToolRecommendations';

export const metadata: Metadata = {
    title: 'Flip Image Online - Mirror Photos Vertically & Horizontally',
    description: 'Flip images online instantly. Create mirror effects by flipping photos vertically or horizontally. Free to use.',
    alternates: {
        canonical: '/tools/flip'
    }
};

export default function FlipPage() {
    return (
        <>
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "ResizeMe Flip Tool",
                "applicationCategory": "MultimediaApplication",
                "operatingSystem": "Any",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            }} />
            <FlipTool title="Flip Image" />

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Online Image Flipper – Mirror Images for Free
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Flip your images vertically or horizontally online. Create mirror effects or correct self-portraits easily.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">How to Flip an Image</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your image to mirror</li>
                            <li>Click <strong>Flip Horizontal</strong> or <strong>Vertical</strong></li>
                            <li>See the instant preview</li>
                            <li>Download your mirrored photo</li>
                        </ol>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Common Uses</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>🤳 Correct selfie camera mirroring</li>
                            <li>🎨 Create artistic reflections</li>
                            <li>🖨️ Prepare transfers for printing</li>
                            <li>🖼️ Fix orientation issues</li>
                        </ul>
                    </section>
                </div>
            </div>

            <ToolRecommendations currentTool="flip" />
        </>
    );
}
