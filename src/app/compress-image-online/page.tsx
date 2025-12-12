import CompressTool from '@/components/tools/CompressTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import ToolRecommendations from '@/components/ToolRecommendations';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Compress Image Online Free - Reduce File Size | ResizeMe',
    description: 'Compress images online for free. Reduce JPG, PNG, WEBP file size without losing quality. Perfect for websites, emails, and social media.',
    keywords: ['compress image', 'compress image online', 'reduce image size', 'image compression', 'optimize image', 'reduce file size'],
    alternates: {
        canonical: '/compress-image-online'
    }
};

export default function CompressImageOnlinePage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How do I compress an image without losing quality?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ResizeMe uses advanced compression algorithms that reduce file size while maintaining visual quality. You can adjust the quality slider to find the perfect balance between file size and image quality."
                }
            },
            {
                "@type": "Question",
                "name": "What's the difference between compressing and resizing?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Compressing reduces file size by optimizing the image data without changing dimensions. Resizing changes the actual width and height of the image. Both can reduce file size."
                }
            },
            {
                "@type": "Question",
                "name": "How much can I compress an image?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Compression rates vary by image type and content. Typically, you can reduce file size by 50-80% while maintaining good quality. Photos compress more than graphics with text."
                }
            },
            {
                "@type": "Question",
                "name": "Is image compression permanent?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, compression is permanent. Always keep your original images. ResizeMe processes images in your browser, so your originals remain untouched on your device."
                }
            }
        ]
    };

    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Compress an Image Online",
        "description": "Reduce image file size online for free",
        "step": [
            {
                "@type": "HowToStep",
                "name": "Upload Image",
                "text": "Select your image file (JPG, PNG, WEBP, or GIF)"
            },
            {
                "@type": "HowToStep",
                "name": "Adjust Quality",
                "text": "Use the quality slider to set your desired compression level"
            },
            {
                "@type": "HowToStep",
                "name": "Compress",
                "text": "Click Compress to optimize your image"
            },
            {
                "@type": "HowToStep",
                "name": "Download",
                "text": "Download your compressed image with reduced file size"
            }
        ]
    };

    return (
        <>
            <JsonLd data={faqSchema} />
            <JsonLd data={howToSchema} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <nav className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                    <Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400">Home</Link>
                    <span className="mx-2">/</span>
                    <span>Compress Image Online</span>
                </nav>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                        Compress Image Online Free
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Reduce image file size without sacrificing quality. Optimize images for web, email, and social media in seconds.
                    </p>
                </div>

                <CompressTool title="Compress Image" />

                <div className="mt-16 grid md:grid-cols-2 gap-12">
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            Why Compress Images?
                        </h2>
                        <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🚀</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">Faster Website Loading</strong>
                                    <p>Compressed images load faster, improving user experience and SEO rankings.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">💾</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">Save Storage Space</strong>
                                    <p>Reduce storage costs and save disk space on your devices and servers.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">📧</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">Email-Friendly</strong>
                                    <p>Compressed images meet email attachment size limits easily.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">📱</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">Mobile Optimization</strong>
                                    <p>Smaller images use less mobile data and load faster on slow connections.</p>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            Compression Tips
                        </h2>
                        <div className="space-y-4">
                            <div className="card">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Choose the Right Format</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    JPG for photos, PNG for graphics with transparency, WEBP for best compression
                                </p>
                            </div>
                            <div className="card">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quality vs Size</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    80-85% quality offers the best balance between file size and visual quality
                                </p>
                            </div>
                            <div className="card">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Resize First</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    For maximum reduction, resize images to needed dimensions before compressing
                                </p>
                            </div>
                            <div className="card">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Keep Originals</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Always save original high-quality versions before compressing
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

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

                <ToolRecommendations currentTool="compress" />
            </div>
        </>
    );
}
