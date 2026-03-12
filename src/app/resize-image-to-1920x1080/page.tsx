import ResizeTool from '@/components/tools/ResizeTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Resize Image to 1920x1080 (Full HD) – Free Online',
    description: 'Resize any image to 1920x1080 pixels (1080p Full HD) for free. Perfect for wallpapers, video thumbnails, and presentations.',
    alternates: { canonical: '/resize-image-to-1920x1080' }
};

export default function ResizeTo1920x1080Page() {
    return (
        <>
            <ResizeTool title="Resize Image to 1920x1080" />
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Resize Image to 1920×1080 – Full HD Online
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Resize any image to 1920x1080 pixels (1080p Full HD resolution) instantly and for free. Perfect for desktop wallpapers, YouTube thumbnails, and presentations.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How to Resize to 1920x1080</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your image (JPG, PNG, or WebP)</li>
                            <li>Set Width to <strong>1920</strong> and Height to <strong>1080</strong></li>
                            <li>Click Resize</li>
                            <li>Download your Full HD image</li>
                        </ol>
                    </section>
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Common Use Cases</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>🖥️ Desktop / laptop wallpapers</li>
                            <li>📺 TV screen background images</li>
                            <li>🎬 YouTube video thumbnails</li>
                            <li>📊 PowerPoint / Keynote slides</li>
                            <li>🌐 Website hero / banner images</li>
                        </ul>
                    </section>
                </div>
                <section className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Common Full HD Resolutions</h2>
                    <table className="w-full text-sm text-left border-collapse">
                        <thead><tr className="border-b">
                            <th className="py-2 pr-4 font-semibold">Resolution</th>
                            <th className="py-2 pr-4 font-semibold">Name</th>
                            <th className="py-2 font-semibold">Use For</th>
                        </tr></thead>
                        <tbody className="text-gray-600 dark:text-gray-300 divide-y divide-gray-200 dark:divide-gray-700">
                            <tr><td className="py-2 pr-4">1920×1080</td><td className="py-2 pr-4">Full HD / 1080p</td><td className="py-2">Wallpapers, TV, YouTube</td></tr>
                            <tr><td className="py-2 pr-4">2560×1440</td><td className="py-2 pr-4">2K / QHD</td><td className="py-2">High-res monitors</td></tr>
                            <tr><td className="py-2 pr-4">3840×2160</td><td className="py-2 pr-4">4K / UHD</td><td className="py-2">4K displays, prints</td></tr>
                            <tr><td className="py-2 pr-4">1280×720</td><td className="py-2 pr-4">HD / 720p</td><td className="py-2">Streaming, web</td></tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}
