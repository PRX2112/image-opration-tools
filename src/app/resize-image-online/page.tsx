import ResizeTool from '@/components/tools/ResizeTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import ToolRecommendations from '@/components/ToolRecommendations';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Resize Image Online Free - Fast & High Quality | ResizeMe',
    description: 'Resize images online for free. Change image dimensions, resize by percentage, or resize for social media. Supports JPG, PNG, WEBP. No signup required.',
    keywords: ['resize image online', 'resize image', 'image resizer', 'resize photo', 'resize picture online free', 'change image size'],
    alternates: {
        canonical: '/resize-image-online'
    }
};

export default function ResizeImageOnlinePage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How do I resize an image online for free?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Upload your image to ResizeMe, enter your desired width and height or percentage, and click Resize. Download your resized image instantly. No signup required."
                }
            },
            {
                "@type": "Question",
                "name": "What image formats can I resize?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ResizeMe supports all major image formats including JPG, JPEG, PNG, WEBP, AVIF, and GIF. You can resize any of these formats while maintaining quality."
                }
            },
            {
                "@type": "Question",
                "name": "Will resizing reduce image quality?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ResizeMe uses advanced algorithms to maintain image quality when resizing. Enlarging images may reduce quality, but reducing size maintains excellent quality."
                }
            },
            {
                "@type": "Question",
                "name": "Is it safe to resize images online?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes! ResizeMe processes images directly in your browser. Your images never leave your device, ensuring complete privacy and security."
                }
            }
        ]
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Resize an Image Online",
        "description": "Step-by-step guide to resize images online for free using ResizeMe",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Upload Image",
                "text": "Click the upload button and select your image (JPG, PNG, or WEBP)"
            },
            {
                "@type": "HowToStep",
                "name": "Set Dimensions",
                "text": "Enter your desired width and height in pixels, or choose a percentage to resize by"
            },
            {
                "@type": "HowToStep",
                "name": "Resize",
                "text": "Click the Resize button to process your image"
            },
            {
                "@type": "HowToStep",
                "name": "Download",
                "text": "Download your resized image to your device"
            }
        ]
    };

    return (
        <>
            <JsonLd data={faqSchema} />
            <JsonLd data={howToSchema} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Breadcrumbs */}
                <nav className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                    <Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400">Home</Link>
                    <span className="mx-2">/</span>
                    <span>Resize Image Online</span>
                </nav>

                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                        Resize Image Online Free
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Professional image resizer tool. Change dimensions, resize by percentage, or optimize for social media. Fast, secure, and completely free.
                    </p>
                </div>

                {/* Tool */}
                <ResizeTool title="Resize Image" />

                {/* SEO Content */}
                <div className="mt-16 grid md:grid-cols-2 gap-12">
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            Why Use Our Online Image Resizer?
                        </h2>
                        <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">⚡</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">Lightning Fast Processing</strong>
                                    <p>Resize images instantly in your browser. No waiting, no uploads to servers.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🔒</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">100% Private & Secure</strong>
                                    <p>All processing happens locally. Your images never leave your device.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🎯</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">Precise Control</strong>
                                    <p>Resize by exact pixels, percentage, or choose from preset dimensions.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">📱</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">Works Everywhere</strong>
                                    <p>Use on desktop, tablet, or mobile. No app installation needed.</p>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            Common Use Cases
                        </h2>
                        <div className="space-y-4">
                            <div className="card">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Social Media Images</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Resize for Instagram (1080x1080), Facebook (1200x630), Twitter (1200x675), LinkedIn (1200x627)
                                </p>
                            </div>
                            <div className="card">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Website Optimization</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Reduce image dimensions for faster page loading and better SEO performance
                                </p>
                            </div>
                            <div className="card">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email Attachments</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Make images smaller to meet email size limits without losing quality
                                </p>
                            </div>
                            <div className="card">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Profile Pictures</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Resize photos to perfect dimensions for avatars and profile images
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* FAQ Section */}
                <section className="mt-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {faqSchema.mainEntity.map((faq, index) => (
                            <div key={index} className="card">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    {faq.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {faq.acceptedAnswer.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Tool Recommendations */}
                <ToolRecommendations currentTool="resize" />
            </div>
        </>
    );
}
