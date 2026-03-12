import ResizeTool from '@/components/tools/ResizeTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Resize Image to 100KB Online - Free Image Compressor',
    description: 'Reduce your image file size to 100KB online for free. No signup needed. Works with JPG, PNG, WebP. Download instantly.',
    alternates: { canonical: '/resize-image-to-100kb' }
};

export default function ResizeTo100KBPage() {
    return (
        <>
            <ResizeTool title="Resize Image to 100KB" />
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Resize Image to 100KB – Free Online Tool
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Need to reduce an image to exactly 100KB? Upload your photo, resize the dimensions or reduce quality, and download the compressed file instantly.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How to Reduce Image to 100KB</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your image (JPG, PNG, or WebP)</li>
                            <li>Reduce the width/height or use percentage scaling</li>
                            <li>Lower the quality slider if needed</li>
                            <li>Check the output file size and download</li>
                        </ol>
                    </section>
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Why Reduce to 100KB?</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>📧 Email attachment limits</li>
                            <li>🌐 Faster website loading</li>
                            <li>📱 Form upload restrictions</li>
                            <li>🏢 Government portal requirements</li>
                        </ul>
                    </section>
                </div>
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Tips to Get Under 100KB</h2>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li>✅ Reduce image dimensions — halving width/height reduces file size by ~75%</li>
                        <li>✅ Use JPEG format — smaller than PNG for photos</li>
                        <li>✅ Lower quality to 60-70% — often unnoticeable visually</li>
                        <li>✅ Use WebP format — 30% smaller than JPEG at same quality</li>
                    </ul>
                </section>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Related Tools</h3>
                    <div className="flex flex-wrap gap-3">
                        <a href="/compress-image-online" className="text-blue-600 hover:underline text-sm">Compress Image Online</a>
                        <a href="/compress-image-to-50kb" className="text-blue-600 hover:underline text-sm">Compress to 50KB</a>
                        <a href="/resize-image-for-instagram" className="text-blue-600 hover:underline text-sm">Resize for Instagram</a>
                    </div>
                </div>
            </div>
        </>
    );
}
