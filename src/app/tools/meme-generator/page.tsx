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
        </>
    );
}
