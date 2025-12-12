import ConvertTool from '@/components/tools/ConvertTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import ToolRecommendations from '@/components/ToolRecommendations';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Convert Image Format Online Free - JPG, PNG, WEBP | ResizeMe',
    description: 'Convert images between formats online for free. Change JPG to PNG, PNG to WEBP, HEIC to JPG, and more. Fast, secure, no signup required.',
    keywords: ['convert image', 'image converter', 'convert jpg to png', 'convert png to jpg', 'convert to webp', 'change image format'],
    alternates: {
        canonical: '/convert-image-format'
    }
};

export default function ConvertImageFormatPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How do I convert image formats online?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Upload your image, select the output format you want (JPG, PNG, WEBP, etc.), and click Convert. Download your converted image instantly."
                }
            },
            {
                "@type": "Question",
                "name": "What image formats can I convert?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ResizeMe supports JPG, JPEG, PNG, WEBP, AVIF, GIF, BMP, and HEIC. You can convert between any of these formats."
                }
            },
            {
                "@type": "Question",
                "name": "Should I use JPG or PNG?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Use JPG for photos and images with many colors. Use PNG for graphics, logos, images with text, or when you need transparency. WEBP offers the best compression for web use."
                }
            },
            {
                "@type": "Question",
                "name": "Does converting reduce image quality?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Converting to JPG may reduce quality slightly due to compression. PNG and WEBP conversions maintain quality better. Converting from lossy to lossless formats won't restore lost quality."
                }
            }
        ]
    };

    return (
        <>
            <JsonLd data={faqSchema} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <nav className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                    <Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400">Home</Link>
                    <span className="mx-2">/</span>
                    <span>Convert Image Format</span>
                </nav>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                        Convert Image Format Online Free
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Convert between image formats instantly. Support for JPG, PNG, WEBP, HEIC, and more. Fast, secure, and completely free.
                    </p>
                </div>

                <ConvertTool title="Convert Image Format" />

                <div className="mt-16 grid md:grid-cols-2 gap-12">
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            Why Convert Image Formats?
                        </h2>
                        <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🌐</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">Web Optimization</strong>
                                    <p>Convert to WEBP for smaller file sizes and faster website loading.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">📱</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">Device Compatibility</strong>
                                    <p>Convert HEIC from iPhone to JPG for universal compatibility.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🎨</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">Transparency Support</strong>
                                    <p>Convert to PNG to preserve or add transparent backgrounds.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">💾</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">File Size Control</strong>
                                    <p>Choose the right format to balance quality and file size.</p>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            Format Comparison
                        </h2>
                        <div className="space-y-4">
                            <div className="card">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">JPG / JPEG</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Best for photos. Smaller file size, lossy compression, no transparency support.
                                </p>
                            </div>
                            <div className="card">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">PNG</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Best for graphics and logos. Lossless compression, supports transparency, larger files.
                                </p>
                            </div>
                            <div className="card">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">WEBP</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Modern format. Better compression than JPG/PNG, supports transparency, ideal for web.
                                </p>
                            </div>
                            <div className="card">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">HEIC</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Apple's format. Excellent compression, limited compatibility, common on iPhones.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <section className="mt-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                        Popular Conversions
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/convert-jpg-to-png" className="card text-center hover:shadow-lg transition-shadow">
                            <p className="font-semibold text-gray-900 dark:text-white">JPG → PNG</p>
                        </Link>
                        <Link href="/convert-png-to-jpg" className="card text-center hover:shadow-lg transition-shadow">
                            <p className="font-semibold text-gray-900 dark:text-white">PNG → JPG</p>
                        </Link>
                        <Link href="/convert-png-to-webp" className="card text-center hover:shadow-lg transition-shadow">
                            <p className="font-semibold text-gray-900 dark:text-white">PNG → WEBP</p>
                        </Link>
                        <Link href="/convert-heic-to-jpg" className="card text-center hover:shadow-lg transition-shadow">
                            <p className="font-semibold text-gray-900 dark:text-white">HEIC → JPG</p>
                        </Link>
                    </div>
                </section>

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

                <ToolRecommendations currentTool="convert" />
            </div>
        </>
    );
}
