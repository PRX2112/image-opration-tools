import ConvertTool from '@/components/tools/ConvertTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PNG to WebP Converter – Free Online Tool',
    description: 'Convert PNG images to WebP format for smaller file sizes and faster web performance. Free, instant, browser-based.',
    alternates: { canonical: '/convert-png-to-webp' }
};

export default function PNGToWebPPage() {
    return (
        <>
            <ConvertTool title="PNG to WebP Converter" />
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-teal-500 bg-clip-text text-transparent">
                        PNG to WebP Converter – Free Online
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Convert PNG images to WebP format to achieve 25–35% smaller file sizes while maintaining the same quality. Supports transparency.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How to Convert PNG to WebP</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your PNG file</li>
                            <li>Select <strong>WebP</strong> as output format</li>
                            <li>Adjust quality if desired</li>
                            <li>Download your .webp file</li>
                        </ol>
                    </section>
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Benefits of WebP</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>25–35% smaller than PNG at same quality</li>
                            <li>Supports transparency (like PNG)</li>
                            <li>Supported in all modern browsers</li>
                            <li>Boosts Google PageSpeed / Core Web Vitals</li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}
