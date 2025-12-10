import MemeGeneratorTool from '@/components/tools/MemeGeneratorTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'Meme Generator Online - Create Memes Free',
    description: 'Create funny memes online with your own images. Add text, emojis, and styling. No watermark options available.',
    alternates: {
        canonical: '/tools/meme-generator'
    }
};

export default function MemeGeneratorPage() {
    return (
        <>
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "ResizeMe Meme Generator",
                "applicationCategory": "MultimediaApplication",
                "operatingSystem": "Any",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                }
            }} />
            <MemeGeneratorTool title="Meme Generator" />

            <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Online Meme Generator – Create Funny Memes Free
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Make custom memes instantly. Upload your own image or choose a template, add text, and share the laughter.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">How to Make a Meme</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload an image or template</li>
                            <li>Add Top and Bottom text</li>
                            <li>Customize font, size, and color</li>
                            <li>Download and share!</li>
                        </ol>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold">Meme Maker Features</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>😂 Custom text positioning</li>
                            <li>🎨 Stroke and Shadow effects</li>
                            <li>🚫 No watermark (Pro option)</li>
                            <li>🚀 Instant generation</li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}
