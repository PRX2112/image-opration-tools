import Link from 'next/link';

export const metadata = {
    title: 'Image Format Guide: WebP vs PNG vs JPG vs SVG | ResizeMe',
    description: 'Learn the difference between JPEG, PNG, WebP, SVG, and AVIF. Find out exactly which media format you should use for your website, social media, or graphic design.',
};

export default function ImageFormatGuide() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-8 md:p-12 shadow-xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        The Ultimate Image Format Guide: WebP vs. PNG vs. JPG vs. SVG
                    </h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                        <p className="lead text-xl text-gray-600 dark:text-gray-400">
                            JPG, PNG, WebP, AVIF, HEIC, TIFF, SVG, GIF… the alphabet soup of image extensions is enough to dizzy any content creator or web developer. 
                        </p>
                        <p>
                            Choosing the wrong image format might seem like a minor technical detail, but the consequences are severe. Use a PNG when you should have used a JPG, and your website load time triples. Use a JPG when you should have used a PNG, and your brand logo becomes surrounded by ugly compression artifacts and loses its transparent background. 
                        </p>
                        <p>
                            This complete guide definitively breaks down the core image formats used on the web today, the science behind their compression, and exactly when you should leverage each one.
                        </p>

                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 my-8 rounded-r-lg">
                            <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2">The Core Concept: Lossy vs. Lossless Compression</h3>
                            <p className="mb-0 text-yellow-900 dark:text-yellow-200">
                                Before dissecting formats, you must understand compression types:
                                <br/><br/>
                                <strong>Lossy Compression:</strong> Permanently deletes "unnecessary" pixel data to drastically reduce file sizes. The quality drops slightly, but the file size plummets. Perfect for photographs.
                                <br/><br/>
                                <strong>Lossless Compression:</strong> Compresses the data without throwing any pixels away. The image looks 100% identical to the original, but the file size will be much larger. Perfect for typography, blueprints, and clean logos.
                            </p>
                        </div>

                        <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-900 dark:text-white">1. JPEG (or JPG) - The Old Reliable Standard</h2>
                        <p>
                            Introduced in 1992, the Joint Photographic Experts Group (JPEG) format revolutionized the internet. It is the most universally compatible image format on the planet. It utilizes <strong>lossy compression</strong>, meaning it discards data to keep file sizes incredibly small.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Best Used For:</strong> Detailed photographs, realistic images, and scenarios containing millions of colors or gradients. Essentially, real-world camera captures.</li>
                            <li><strong>Do Not Use For:</strong> Logos, screenshots containing text, line-art, or graphics with sharp contrasting edges. The lossy compression algorithms struggle with hard edges, creating a blurry "halo" effect around text (known as artifacts).</li>
                            <li><strong>Transparency:</strong> Not supported. All transparent backgrounds will convert to flat white.</li>
                        </ul>

                        <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-900 dark:text-white">2. PNG - The Transparency King</h2>
                        <p>
                            Portable Network Graphics (PNG) was designed to replace the aging GIF format. PNG relies exclusively on <strong>lossless compression</strong>. It saves every minute detail of the original image data. It supports millions of colors and crucially supports partial and complete transparency (the "Alpha Channel").
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Best Used For:</strong> Brand logos, website headers requiring transparent cut-outs, computer screenshots, charts, graphics containing text, and illustrations with sharp geometric edges.</li>
                            <li><strong>Do Not Use For:</strong> Huge photographs. Because it refuses to throw away data, a high-resolution photograph saved as a PNG will possess astronomical file sizes (often 5x to 10x larger than a JPEG of the exact same photo), completely destroying your website's <Link href="/why-image-optimization-matters" className="text-purple-600 dark:text-purple-400 hover:underline">performance metrics</Link>.</li>
                            <li><strong>Transparency:</strong> Fully supported, including drop shadows and semi-translucent glass effects.</li>
                        </ul>

                        <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-900 dark:text-white">3. WebP - The Modern Internet Champion</h2>
                        <p>
                            Developed by Google, WebP was explicitly created to make the internet faster. WebP is a hybrid format that supports <strong>both lossy and lossless compression</strong>, and it supports animation and transparency. It is the holy grail of web images.
                        </p>
                        <p>
                            Lossless WebP images are 26% smaller than equivalent PNGs, while Lossy WebPs are 25-34% smaller than equivalent JPEGs at equivalent SSIM quality indexes. It has near-universal browser support today (Chrome, Safari, Firefox, Edge).
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>Best Used For:</strong> Almost everything on a modern website. You can replace every JPG and PNG on your site with WebP.</li>
                            <li><strong>Do Not Use For:</strong> Very old legacy systems or specific offline printing pipelines that refuse to recognize the extension.</li>
                        </ul>
                        <p className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-4 text-sm inline-block">
                            💡 <i>Pro Tip: You can instantly convert any massive JPG or PNG into a hyper-optimized WebP using our free <Link href="/tools/convert" className="font-bold underline text-purple-600 dark:text-purple-400">Format Converter</Link>.</i>
                        </p>

                        <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-900 dark:text-white">4. SVG - The Scalable Vector Graphic</h2>
                        <p>
                            SVG stands alone. Unlike JPG, PNG, and WebP—which are "raster" images made of thousands of tiny colored square pixels—an SVG isn't composed of pixels at all. It is literally a text file containing XML code. This code uses mathematical equations to draw shapes, lines, and curves.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li><strong>The Superpower:</strong> Infinite scalability. Because it's math, you can stretch an SVG icon to be the size of a postage stamp or the size of a skyscraper, and it will remain 100% razor-sharp with ZERO loss in quality. Furthermore, the file sizes are measured in tiny kilobytes.</li>
                            <li><strong>Best Used For:</strong> Flat icons, UI elements, simplistic company logos, and basic vector illustrations.</li>
                            <li><strong>Do Not Use For:</strong> Photographs. You literally cannot capture a photograph in SVG format.</li>
                        </ul>

                        <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-900 dark:text-white">5. AVIF - The Bleeding Edge</h2>
                        <p>
                            AV1 Image File Format (AVIF) is the newest heavyweight contender. Sourced from the compression algorithms of top-tier video codecs, AVIF routinely beats WebP in compression ratios, offering incredible image quality at unfathomably tiny file sizes. 
                        </p>
                        <p>
                            <strong>The Catch:</strong> While adoption is growing rapidly, certain extremely old browsers and niche hardware devices still lack full AVIF decoding support. However, for cutting-edge web development, it is undeniably the future.
                        </p>

                        <h2 className="text-3xl font-bold mt-12 mb-4 text-gray-900 dark:text-white">The Quick Decision Tree Summary</h2>
                        <ul className="list-none space-y-4 pl-0 py-4">
                            <li className="flex gap-4">
                                <strong className="w-16 flex-shrink-0 text-xl text-blue-500">Is it a...</strong>
                                <div>
                                    <strong className="block text-gray-900 dark:text-white">Flat Icon / UI Vector?</strong>
                                    Use <strong className="text-purple-600 dark:text-purple-400">SVG</strong>.
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <strong className="w-16 flex-shrink-0 text-xl text-blue-500">Is it a...</strong>
                                <div>
                                    <strong className="block text-gray-900 dark:text-white">Logo / Text graphic needing a transparent background?</strong>
                                    Convert it to <strong className="text-purple-600 dark:text-purple-400">PNG</strong> or (better) Lossless <strong className="text-purple-600 dark:text-purple-400">WebP</strong>.
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <strong className="w-16 flex-shrink-0 text-xl text-blue-500">Is it a...</strong>
                                <div>
                                    <strong className="block text-gray-900 dark:text-white">High-resolution photograph for the web?</strong>
                                    Convert it to <strong className="text-purple-600 dark:text-purple-400">WebP</strong> (or AVIF if you feel brave). If WebP isn't an option, use a highly compressed <strong className="text-purple-600 dark:text-purple-400">JPEG</strong>.
                                </div>
                            </li>
                        </ul>

                        <hr className="border-gray-200 dark:border-gray-700 my-8" />
                        <p className="mt-8 text-center text-lg font-medium">
                            If you find yourself stuck with the wrong file extension, jump over to the <Link href="/tools/convert" className="text-purple-600 dark:text-purple-400 hover:underline">ResizeMe Format Converter</Link> and fix your assets seamlessly.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
