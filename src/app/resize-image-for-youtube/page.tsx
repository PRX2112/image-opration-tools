import ResizeTool from '@/components/tools/ResizeTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'YouTube Thumbnail Size – Resize Image to 1280x720',
    description: 'Resize your image to the perfect YouTube thumbnail size: 1280x720 pixels (16:9). Free online tool, no signup required.',
    alternates: { canonical: '/resize-image-for-youtube' }
};

export default function ResizeForYoutubePage() {
    return (
        <>
            <ResizeTool title="Resize Image for YouTube Thumbnail" />
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                        Resize Image for YouTube – Free Tool
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Get your YouTube thumbnails, channel art, and profile pictures to the exact right size with our free online resizer.
                    </p>
                </div>
                <section className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">YouTube Image Size Guide (2025)</h2>
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-red-200 dark:border-red-700">
                            <th className="text-left pb-2">Type</th>
                            <th className="text-left pb-2">Recommended Size</th>
                            <th className="text-left pb-2">Max File Size</th>
                        </tr></thead>
                        <tbody className="text-gray-600 dark:text-gray-300 divide-y divide-red-100 dark:divide-red-800">
                            <tr><td className="py-2">Video Thumbnail</td><td>1280 × 720 px (HD)</td><td>2 MB</td></tr>
                            <tr><td className="py-2">Channel Banner</td><td>2560 × 1440 px</td><td>6 MB</td></tr>
                            <tr><td className="py-2">Profile Picture</td><td>800 × 800 px</td><td>4 MB</td></tr>
                            <tr><td className="py-2">End Screen</td><td>1920 × 1080 px</td><td>–</td></tr>
                        </tbody>
                    </table>
                </section>
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How to Resize a YouTube Thumbnail</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your image above</li>
                            <li>Set Width to <strong>1280</strong> and Height to <strong>720</strong></li>
                            <li>Enable &quot;Lock aspect ratio&quot; if your image is already 16:9</li>
                            <li>Click Resize and download</li>
                        </ol>
                    </section>
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Thumbnail Design Tips</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Use bold text that&apos;s readable at small sizes</li>
                            <li>High contrast between elements</li>
                            <li>Include faces — they boost click-through rates</li>
                            <li>Keep file size under 2MB for faster loading</li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}
