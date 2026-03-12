import ResizeTool from '@/components/tools/ResizeTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Resize Image for WhatsApp DP – Free Photo Resizer',
    description: 'Resize your photo to the perfect WhatsApp display picture (DP) size: 500x500 pixels. Free, fast, and private.',
    alternates: { canonical: '/resize-image-for-whatsapp' }
};

export default function ResizeForWhatsappPage() {
    return (
        <>
            <ResizeTool title="Resize Image for WhatsApp DP" />
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                        Resize Image for WhatsApp DP – Free Tool
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Set the perfect WhatsApp display picture. Get the right size, crystal clear, in seconds.
                    </p>
                </div>
                <section className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">WhatsApp Image Size Guide</h2>
                    <table className="w-full text-sm">
                        <thead><tr className="border-b border-green-200 dark:border-green-700">
                            <th className="text-left pb-2">Type</th>
                            <th className="text-left pb-2">Recommended Size</th>
                            <th className="text-left pb-2">Max File Size</th>
                        </tr></thead>
                        <tbody className="text-gray-600 dark:text-gray-300 divide-y divide-green-100 dark:divide-green-800">
                            <tr><td className="py-2">Profile Picture (DP)</td><td>500 × 500 px</td><td>5 MB</td></tr>
                            <tr><td className="py-2">Status Photo</td><td>1280 × 720 px</td><td>16 MB</td></tr>
                            <tr><td className="py-2">Shared Photo (full quality)</td><td>1600 × 1600 px</td><td>16 MB</td></tr>
                            <tr><td className="py-2">Document as Image</td><td>Any</td><td>100 MB</td></tr>
                        </tbody>
                    </table>
                </section>
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Steps to Resize</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your photo above</li>
                            <li>Set Width and Height to <strong>500 × 500</strong></li>
                            <li>Click Resize</li>
                            <li>Download and set as your WhatsApp DP</li>
                        </ol>
                    </section>
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Tips for Best Results</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Use a square (1:1) crop for profile pictures</li>
                            <li>JPG format is best for photos</li>
                            <li>Keep file size under 5MB</li>
                            <li>High contrast images look better at small sizes</li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}
