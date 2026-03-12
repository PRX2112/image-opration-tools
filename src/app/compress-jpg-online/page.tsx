import CompressTool from '@/components/tools/CompressTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Compress JPG Online – Reduce JPEG Size for Free',
    description: 'Compress JPG images online for free. Reduce JPEG file size by up to 90% without visible quality loss. No signup, instant download.',
    alternates: { canonical: '/compress-jpg-online' }
};

export default function CompressJPGPage() {
    return (
        <>
            <CompressTool title="Compress JPG Online" />
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                        Compress JPG Online – Free JPEG Compressor
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Reduce your JPEG file size by up to 90% while keeping it looking great. No uploads, no account needed — all processing happens in your browser.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How to Compress a JPG</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your JPG or JPEG file</li>
                            <li>Adjust the quality slider (60–80% works best)</li>
                            <li>See the file size reduction in real time</li>
                            <li>Download your compressed JPG</li>
                        </ol>
                    </section>
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Why Compress JPEG?</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>🌐 Faster website page loading</li>
                            <li>📧 Easier email sharing</li>
                            <li>💾 Save storage space</li>
                            <li>📊 Improve Google Core Web Vitals</li>
                        </ul>
                    </section>
                </div>
                <section className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Recommended Quality Settings</h2>
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-orange-200 dark:border-orange-700">
                            <th className="text-left pb-2">Quality</th>
                            <th className="text-left pb-2">Typical Size Reduction</th>
                            <th className="text-left pb-2">Best For</th>
                        </tr></thead>
                        <tbody className="text-gray-600 dark:text-gray-300 space-y-1 divide-y divide-orange-100 dark:divide-orange-800">
                            <tr><td className="py-2">85–95%</td><td>20–40%</td><td>Print quality, portfolio</td></tr>
                            <tr><td className="py-2">70–84%</td><td>40–65%</td><td>Web images, blogs, social</td></tr>
                            <tr><td className="py-2">50–69%</td><td>65–80%</td><td>Thumbnails, previews</td></tr>
                            <tr><td className="py-2">Below 50%</td><td>80–90%</td><td>Icons, small images</td></tr>
                        </tbody>
                    </table>
                </section>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Related:</strong>{' '}
                        <a href="/compress-png-online" className="text-blue-600 hover:underline">Compress PNG</a> ·{' '}
                        <a href="/compress-image-to-50kb" className="text-blue-600 hover:underline">Compress to 50KB</a> ·{' '}
                        <a href="/resize-image-to-100kb" className="text-blue-600 hover:underline">Resize to 100KB</a>
                    </p>
                </div>
            </div>
        </>
    );
}
