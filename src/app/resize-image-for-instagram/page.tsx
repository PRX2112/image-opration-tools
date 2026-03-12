import ResizeTool from '@/components/tools/ResizeTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Resize Image for Instagram – Free Online Tool',
    description: 'Resize photos to perfect Instagram dimensions: 1080x1080 (square), 1080x1350 (portrait), 1080x608 (landscape) and more. Free and instant.',
    alternates: { canonical: '/resize-image-for-instagram' }
};

const sizes = [
    { name: 'Square Post', dims: '1080 × 1080 px', ratio: '1:1', use: 'Standard feed posts' },
    { name: 'Portrait Post', dims: '1080 × 1350 px', ratio: '4:5', use: 'More screen space in feed' },
    { name: 'Landscape Post', dims: '1080 × 608 px', ratio: '1.91:1', use: 'Panoramic shots' },
    { name: 'Story / Reels', dims: '1080 × 1920 px', ratio: '9:16', use: 'Full-screen vertical content' },
    { name: 'Profile Picture', dims: '320 × 320 px', ratio: '1:1', use: 'Profile/avatar image' },
];

export default function ResizeForInstagramPage() {
    return (
        <>
            <ResizeTool title="Resize Image for Instagram" />
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
                        Resize Image for Instagram – Free Tool
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Get perfectly sized images for every Instagram format — posts, stories, reels, and profile pictures — without cropping or distortion.
                    </p>
                </div>
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Instagram Image Size Guide (2025)</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-800">
                                    <th className="text-left p-3 rounded-tl-lg">Format</th>
                                    <th className="text-left p-3">Dimensions</th>
                                    <th className="text-left p-3">Ratio</th>
                                    <th className="text-left p-3 rounded-tr-lg">Use For</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {sizes.map(s => (
                                    <tr key={s.name}>
                                        <td className="p-3 font-medium text-gray-900 dark:text-white">{s.name}</td>
                                        <td className="p-3 text-gray-600 dark:text-gray-400">{s.dims}</td>
                                        <td className="p-3 text-gray-600 dark:text-gray-400">{s.ratio}</td>
                                        <td className="p-3 text-gray-600 dark:text-gray-400">{s.use}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How to Resize for Instagram</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your photo above</li>
                            <li>Enter the target dimensions from the table above</li>
                            <li>Click Resize and review the result</li>
                            <li>Download and post to Instagram!</li>
                        </ol>
                    </section>
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Pro Tips</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Keep aspect ratio to avoid distortion</li>
                            <li>Use JPG for photos to reduce file size</li>
                            <li>PNG for graphics with text or transparency</li>
                            <li>Max file size on Instagram: 8MB</li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}
