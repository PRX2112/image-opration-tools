import Link from 'next/link';
import { BookOpen, CheckCircle, Smartphone, Globe, Lock, Cpu } from 'lucide-react';

export default function UltimateGuide() {
    return (
        <section className="py-20 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
                        <BookOpen className="w-4 h-4" />
                        <span>Educational Resources</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        The Ultimate Guide to Image Optimization
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Why optimizing your images matters for SEO, performance, and user experience.
                    </p>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none">

                    {/* Section 1: Why It Matters */}
                    <div className="mb-16">
                        <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            <Globe className="w-6 h-6 text-blue-500" />
                            Why Image Resizing & Compression Matters
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            In the modern web, speed is everything. Did you know that images often account for over 60% of a webpage's total file size? Large, unoptimized images are the #1 culprit for slow loading speeds.
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Using a tool like <strong>ResizeMe</strong> to optimize your visuals has three major benefits:
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mb-8">
                            <li className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Better SEO Rankings</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Google prioritizes fast-loading sites. Optimized images improve your Core Web Vitals.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Reduced Bounce Rate</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Users leave sites that take more than 3 seconds to load. Speed keeps them engaged.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Mobile Data Savings</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Smaller files consume less data, which is crucial for users on mobile networks.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white">Server Storage</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Reduced file sizes save you money on hosting and storage bandwidth.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Section 2: File Formats */}
                    <div className="mb-16">
                        <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            <Smartphone className="w-6 h-6 text-purple-500" />
                            Choosing the Right File Format
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Not all image formats are created equal. Knowing when to use JPG, PNG, or WebP can make a huge difference in quality and size.
                        </p>

                        <div className="overflow-x-auto not-prose">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-800">
                                        <th className="py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 rounded-tl-lg">Format</th>
                                        <th className="py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900">Best Used For</th>
                                        <th className="py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900">Pros</th>
                                        <th className="py-4 px-4 text-sm font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-900 rounded-tr-lg">Cons</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                    <tr>
                                        <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-white">JPG / JPEG</td>
                                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">Photographs, realistic images</td>
                                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">Small file size, universal support</td>
                                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">No transparency, lossy quality</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-white">PNG</td>
                                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">Logos, icons, screenshots</td>
                                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">Supports transparency, lossless</td>
                                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">Large file sizes for photos</td>
                                    </tr>
                                    <tr>
                                        <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-white">WebP</td>
                                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">Modern websites</td>
                                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">Superior compression (30% smaller)</td>
                                        <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">Not supported by very old browsers</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            <strong>Pro Tip:</strong> Use our <Link href="/tools/convert" className="text-blue-600 hover:underline">Format Converter</Link> to change your PNGs to WebP for instant performance gains.
                        </p>
                    </div>

                    {/* Section 3: Privacy */}
                    <div className="mb-16">
                        <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            <Lock className="w-6 h-6 text-green-500" />
                            Why Client-Side Processing is Safer
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Most online image editors require you to upload your files to their servers. This creates a privacy risk—you don't know who has access to your photos or how long they are stored.
                        </p>
                        <div className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-6 rounded-r-xl">
                            <h4 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white mb-2">
                                <Cpu className="w-5 h-5" />
                                The ResizeMe Difference
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                ResizeMe is different. We utilize advanced <strong>WebAssembly</strong> technology to process your images directly in your web browser. Your photos never leave your device. This means:
                            </p>
                            <ul className="list-disc list-inside mt-2 text-gray-700 dark:text-gray-300">
                                <li>0% risk of data breaches</li>
                                <li>No waiting for uploads or downloads</li>
                                <li>You can edit sensitive documents securely</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 4: Social Media Cheat Sheet */}
                    <div>
                        <h3 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Social Media Image Size Cheat Sheet (2025)
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Stop guessing the right dimensions. Here is a quick reference for the most popular platforms. properly sized images prevent awkward cropping.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
                            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Instagram</h4>
                                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                    <li><strong>Post (Square):</strong> 1080 x 1080 px</li>
                                    <li><strong>Post (Portrait):</strong> 1080 x 1350 px</li>
                                    <li><strong>Story:</strong> 1080 x 1920 px</li>
                                </ul>
                            </div>
                            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">YouTube</h4>
                                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                    <li><strong>Thumbnail:</strong> 1280 x 720 px</li>
                                    <li><strong>Channel Art:</strong> 2560 x 1440 px</li>
                                    <li><strong>Profile Icon:</strong> 800 x 800 px</li>
                                </ul>
                            </div>
                            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Twitter / X</h4>
                                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                    <li><strong>Post Image:</strong> 1600 x 900 px</li>
                                    <li><strong>Header:</strong> 1500 x 500 px</li>
                                    <li><strong>Profile Photo:</strong> 400 x 400 px</li>
                                </ul>
                            </div>
                            <div className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-2">LinkedIn</h4>
                                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                    <li><strong>Post Image:</strong> 1200 x 627 px</li>
                                    <li><strong>Cover Photo:</strong> 1128 x 191 px</li>
                                    <li><strong>Profile Photo:</strong> 400 x 400 px</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
