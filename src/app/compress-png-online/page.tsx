import CompressTool from '@/components/tools/CompressTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Compress PNG Online – Reduce PNG File Size Free',
    description: 'Compress PNG images online for free. Reduce PNG file size without losing transparency or quality. Instant, private, no signup.',
    alternates: { canonical: '/compress-png-online' }
};

export default function CompressPNGPage() {
    return (
        <>
            <CompressTool title="Compress PNG Online" />
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                        Compress PNG Online – Free PNG Optimizer
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Reduce the file size of PNG images while keeping sharp edges, text readability, and transparency intact.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How to Compress PNG</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your PNG file(s)</li>
                            <li>Adjust the compression level</li>
                            <li>Preview the result — check quality is acceptable</li>
                            <li>Download your smaller PNG</li>
                        </ol>
                    </section>
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">PNG vs JPG Compression</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>PNG is lossless — uses compression levels 0–9</li>
                            <li>PNG supports transparency (alpha channel)</li>
                            <li>Best for logos, screenshots, and graphics</li>
                            <li>For photos with no transparency, JPG is smaller</li>
                        </ul>
                    </section>
                </div>
                <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">When to Use PNG vs JPG vs WebP</h2>
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-blue-200 dark:border-blue-700">
                            <th className="text-left pb-2">Format</th>
                            <th className="text-left pb-2">Best For</th>
                            <th className="text-left pb-2">File Size</th>
                        </tr></thead>
                        <tbody className="text-gray-600 dark:text-gray-300 divide-y divide-blue-100 dark:divide-blue-800">
                            <tr><td className="py-2">PNG</td><td>Logos, graphics, screenshots</td><td>Large</td></tr>
                            <tr><td className="py-2">JPG</td><td>Photos, complex images</td><td>Medium</td></tr>
                            <tr><td className="py-2">WebP</td><td>Web images (modern browsers)</td><td>Smallest</td></tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}
