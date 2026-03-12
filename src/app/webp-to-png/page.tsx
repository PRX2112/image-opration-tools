import ConvertTool from '@/components/tools/ConvertTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'WebP to PNG Converter – Free Online Tool',
    description: 'Convert WebP images to PNG format online for free. Preserve transparency, download instantly. No signup required.',
    alternates: { canonical: '/webp-to-png' }
};

export default function WebPToPNGPage() {
    return (
        <>
            <ConvertTool title="WebP to PNG Converter" />
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                        WebP to PNG Converter – Free Online
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Convert WebP images to universally compatible PNG format. Retains all quality, transparency, and color accuracy — for free.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How to Convert WebP to PNG</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your .webp file using the tool above</li>
                            <li>Select <strong>PNG</strong> as the output format</li>
                            <li>Click Convert</li>
                            <li>Download your .png file</li>
                        </ol>
                    </section>
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Why Convert WebP to PNG?</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>PNG has wider compatibility (Word, Photoshop, etc.)</li>
                            <li>Needed for print-ready image quality</li>
                            <li>Some apps don&apos;t support WebP</li>
                            <li>PNG is losslessly compressed</li>
                        </ul>
                    </section>
                </div>
                <section className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">WebP vs PNG — Key Differences</h2>
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-blue-200 dark:border-blue-700">
                            <th className="text-left pb-2">Feature</th>
                            <th className="text-left pb-2">WebP</th>
                            <th className="text-left pb-2">PNG</th>
                        </tr></thead>
                        <tbody className="text-gray-600 dark:text-gray-300 divide-y divide-blue-100 dark:divide-blue-800">
                            <tr><td className="py-2">File Size</td><td>Smaller</td><td>Larger</td></tr>
                            <tr><td className="py-2">Transparency</td><td>✅ Yes</td><td>✅ Yes</td></tr>
                            <tr><td className="py-2">Browser Support</td><td>Modern only</td><td>Universal</td></tr>
                            <tr><td className="py-2">App Compatibility</td><td>Limited</td><td>Wide</td></tr>
                            <tr><td className="py-2">Quality</td><td>Lossy/Lossless</td><td>Lossless</td></tr>
                        </tbody>
                    </table>
                </section>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-400">
                    <strong>Related:</strong>{' '}
                    <a href="/png-to-jpg" className="text-blue-600 hover:underline">PNG to JPG</a> ·{' '}
                    <a href="/convert-png-to-webp" className="text-blue-600 hover:underline">PNG to WebP</a> ·{' '}
                    <a href="/convert-jpg-to-png" className="text-blue-600 hover:underline">JPG to PNG</a>
                </div>
            </div>
        </>
    );
}
