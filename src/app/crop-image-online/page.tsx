import CropTool from '@/components/tools/CropTool';
import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import ToolRecommendations from '@/components/ToolRecommendations';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Crop Image Online Free - Trim & Cut Photos | ResizeMe',
    description: 'Crop images online for free. Trim photos, cut unwanted areas, use preset aspect ratios. Perfect for social media, profile pictures, and more.',
    keywords: ['crop image', 'crop image online', 'trim photo', 'cut image', 'crop photo online free', 'image cropper'],
    alternates: {
        canonical: '/crop-image-online'
    }
};

export default function CropImageOnlinePage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How do I crop an image online?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Upload your image, select the area you want to keep using the crop tool, choose an aspect ratio if needed, and click Crop. Download your trimmed image instantly."
                }
            },
            {
                "@type": "Question",
                "name": "What aspect ratios are available?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "ResizeMe offers common aspect ratios including 1:1 (square), 16:9 (widescreen), 4:3, 3:2, and custom ratios. Perfect for Instagram, YouTube, Facebook, and more."
                }
            },
            {
                "@type": "Question",
                "name": "Can I crop multiple images at once?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Currently, you can crop one image at a time. For batch processing, crop each image individually and download them separately."
                }
            },
            {
                "@type": "Question",
                "name": "Does cropping reduce image quality?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, cropping only removes unwanted areas without affecting the quality of the remaining image. The pixels you keep remain at their original quality."
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
                    <span>Crop Image Online</span>
                </nav>

                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                        Crop Image Online Free
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Trim and crop images with precision. Choose from preset aspect ratios or create custom crops for social media, websites, and more.
                    </p>
                </div>

                <CropTool title="Crop Image" />

                <div className="mt-16 grid md:grid-cols-2 gap-12">
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            Perfect Crops Every Time
                        </h2>
                        <ul className="space-y-4 text-gray-600 dark:text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">📐</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">Preset Aspect Ratios</strong>
                                    <p>Choose from common ratios like 1:1, 16:9, 4:3 for social media and web use.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">✂️</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">Custom Cropping</strong>
                                    <p>Drag and resize the crop area to select exactly what you want to keep.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">👁️</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">Live Preview</strong>
                                    <p>See your crop in real-time before downloading.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-2xl">🎯</span>
                                <div>
                                    <strong className="text-gray-900 dark:text-white">Pixel-Perfect Precision</strong>
                                    <p>Fine-tune your crop with exact pixel coordinates.</p>
                                </div>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            Popular Crop Sizes
                        </h2>
                        <div className="space-y-4">
                            <div className="card">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Instagram Post (1:1)</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Square format - 1080x1080px perfect for Instagram feed posts
                                </p>
                            </div>
                            <div className="card">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">YouTube Thumbnail (16:9)</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Widescreen format - 1280x720px ideal for video thumbnails
                                </p>
                            </div>
                            <div className="card">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Facebook Cover (205:78)</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Wide banner - 820x312px for Facebook page covers
                                </p>
                            </div>
                            <div className="card">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Profile Picture (1:1)</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Square crop - Perfect for avatars and profile photos
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

                <ToolRecommendations currentTool="crop" />
            </div>
        </>
    );
}
