import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
    title: 'Definitive Social Media Image Size Guide 2026 | ResizeMe',
    description: 'The complete, updated guide to image sizes and dimensions for Instagram, Facebook, Twitter (X), LinkedIn, and YouTube. Never upload a blurry image again.',
};

export default function SocialMediaImageSizes() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-8 md:p-12 shadow-xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        The Definitive Social Media Image Size Guide (2026)
                    </h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                        <p className="lead text-xl text-gray-600 dark:text-gray-400">
                            You spend hours crafting the perfect photograph or graphic design, only to upload it to Instagram and realize they awkwardly cropped out the most important part. Or worse, you upload your company logo to LinkedIn, and it turns into a blurry, pixelated mess.
                        </p>
                        <p>
                            Every social media platform has its own wildly different, constantly changing set of rules for image dimensions and aspect ratios. If you upload an image that does not perfectly match their specifications, their aggressive internal compression and auto-cropping algorithms will destroy your image's quality. 
                        </p>
                        <p>
                            To maintain a professional, high-quality digital presence, you must prepare your assets correctly. This guide provides the exact pixel dimensions you need for every major platform right now.
                        </p>

                        <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-6 my-8 rounded-r-lg">
                            <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-2">Pro Tip: Don't Guess, Resize!</h3>
                            <p className="mb-0 text-purple-900 dark:text-purple-200">
                                Memorizing these numbers is tedious. Use our <Link href="/tools/resize" className="font-bold underline">Free Online Image Resizer</Link> to instantly punch in the required Width and Height and get a pixel-perfect image tailored for any platform in seconds.
                            </p>
                        </div>

                        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">Instagram Image Sizes</h2>
                        <p>Instagram is fundamentally a visual platform. It is notoriously strict about aspect ratios. If your image doesn't fit the 1:1, 4:5, or 16:9 molds, it will be mercilessly cropped.</p>
                        <ul className="list-none space-y-4 pl-0">
                            <li className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                                <CheckCircle2 className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="block text-gray-900 dark:text-white font-bold text-lg">Profile Picture: 320 x 320 pixels</strong>
                                    <p className="mb-0 text-sm mt-1">Displays circularly at 110x110 on mobile. Ensure the focal point of your logo or face is dead center so it doesn't get clipped by the circular mask.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                                <CheckCircle2 className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="block text-gray-900 dark:text-white font-bold text-lg">Square Post (1:1 Ratio): 1080 x 1080 pixels</strong>
                                    <p className="mb-0 text-sm mt-1">The classic Instagram format. Ideal for carousels and grid aesthetics.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                                <CheckCircle2 className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="block text-gray-900 dark:text-white font-bold text-lg">Portrait Post (4:5 Ratio): 1080 x 1350 pixels</strong>
                                    <p className="mb-0 text-sm mt-1">Highly recommended by marketers! Portrait posts take up maximum screen real estate on mobile phones, making it harder for users to scroll past your content.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                                <CheckCircle2 className="w-6 h-6 text-pink-500 mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="block text-gray-900 dark:text-white font-bold text-lg">Instagram Stories & Reels: 1080 x 1920 pixels</strong>
                                    <p className="mb-0 text-sm mt-1">Leave the bottom 250 pixels and the top 250 pixels clear of important text, as Instagram UI (comments, swipe up, bio) will cover these areas.</p>
                                </div>
                            </li>
                        </ul>

                        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">Facebook Image Sizes</h2>
                        <p>Facebook constantly redesigns its interface, so uploading high-resolution baseline images is critical to survive downscaling.</p>
                        <ul className="list-none space-y-4 pl-0">
                            <li className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                                <CheckCircle2 className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="block text-gray-900 dark:text-white font-bold text-lg">Profile Picture: 170 x 170 pixels minimum</strong>
                                    <p className="mb-0 text-sm mt-1">We recommend uploading a much larger 1080 x 1080 pixel image so it looks crisp when users click to expand it.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                                <CheckCircle2 className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="block text-gray-900 dark:text-white font-bold text-lg">Cover Photo: 820 x 312 pixels</strong>
                                    <p className="mb-0 text-sm mt-1">Displays highly variably between desktop (820x312) and mobile (640x360). Keep all important text in the central "safe zone" of 640x312.</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                                <CheckCircle2 className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                                <div>
                                    <strong className="block text-gray-900 dark:text-white font-bold text-lg">Shared Post Image: 1200 x 630 pixels</strong>
                                    <p className="mb-0 text-sm mt-1">The ubiquitous 1.91:1 ratio. This is also the exact dimension you should use for your website's Open Graph (OG) meta tags when links are shared on Facebook.</p>
                                </div>
                            </li>
                        </ul>

                        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">Twitter (X) Image Sizes</h2>
                        <p>Twitter is notorious for harsh image compression. If your image contains text, always convert it to PNG format using our <Link href="/tools/convert" className="font-bold underline">Format Converter</Link> before uploading to prevent compression artifacts.</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Profile Picture:</strong> 400 x 400 pixels (Displays circular).</li>
                            <li><strong>Header Image:</strong> 1500 x 500 pixels. Account for your profile picture covering the bottom-left corner of the header!</li>
                            <li><strong>In-Stream Photo:</strong> 1600 x 900 pixels (16:9 ratio). Previously Twitter heavily cropped preview images, but now mostly respects the uploaded ratio. However, 16:9 is safest for maximizing click-through rates.</li>
                        </ul>

                        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">LinkedIn Image Sizes</h2>
                        <p>LinkedIn is your digital resume. Blurry images here immediately communicate a lack of professionalism to potential employers or clients.</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Personal Profile Picture:</strong> 400 x 400 pixels (Maximum 8MB).</li>
                            <li><strong>Personal Background Cover:</strong> 1584 x 396 pixels.</li>
                            <li><strong>Company Logo:</strong> 300 x 300 pixels.</li>
                            <li><strong>Company Page Cover Image:</strong> 1128 x 191 pixels (Extremely wide crop).</li>
                            <li><strong>Shared Link / Article Image:</strong> 1200 x 627 pixels.</li>
                        </ul>

                        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">YouTube Image Sizes</h2>
                        <p>A compelling thumbnail is 90% of a video's success metric. Viewers judge the quality of a video by the sharpness of its thumbnail.</p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Channel Profile Image:</strong> 800 x 800 pixels.</li>
                            <li><strong>Channel Banner Image:</strong> 2560 x 1440 pixels. This displays across TVs, Desktops, and Mobiles entirely differently. The "Safe Area" for text and logos is the dead center measuring 1546 x 423 pixels.</li>
                            <li><strong>Video Thumbnail:</strong> 1280 x 720 pixels (Must be under 2MB).</li>
                        </ul>

                        <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">Workflow: From Raw Photo to Social Ready</h2>
                        <p>
                            To ensure you never upload a bad image again, follow this quick checklist before you hit publish:
                        </p>
                        <ol className="list-decimal pl-6 space-y-4 mt-4 mb-12">
                            <li>Find the correct dimensions for your target platform in the guide above.</li>
                            <li>Open the <Link href="/tools/resize" className="font-semibold text-purple-600 dark:text-purple-400 hover:underline">ResizeMe Resizer Tool</Link> and input the dimensions.</li>
                            <li>If the platform has strict size limits (like YouTube's 2MB thumbnail limit), quickly pass the resized image through the <Link href="/tools/compress" className="font-semibold text-purple-600 dark:text-purple-400 hover:underline">Image Compressor</Link>.</li>
                            <li>Ensure you are using the correct file type. Use our <Link href="/image-format-guide" className="font-semibold text-purple-600 dark:text-purple-400 hover:underline">Image Format Guide</Link> to decide if you need a JPG or a PNG.</li>
                        </ol>

                        <hr className="border-gray-200 dark:border-gray-700 my-8" />
                        <div className="flex justify-center mt-8">
                            <Link href="/tools/resize" className="btn btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
                                Start Perfecting Your Images <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
