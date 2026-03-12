import ResizeTool from '@/components/tools/ResizeTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Passport Photo Size Online – Resize Photo Free',
    description: 'Resize your photo to passport size (35x45mm or 2x2 inch) online for free. Works for Indian passport, US passport, visa photos and more.',
    alternates: { canonical: '/resize-image-for-passport' }
};

const passportSizes = [
    { country: 'India (Passport)', size: '35 × 45 mm', pixels: '413 × 531 px' },
    { country: 'USA (Passport & Visa)', size: '2 × 2 inch', pixels: '600 × 600 px' },
    { country: 'UK (Passport)', size: '35 × 45 mm', pixels: '413 × 531 px' },
    { country: 'Schengen Visa', size: '35 × 45 mm', pixels: '413 × 531 px' },
    { country: 'Canada (Passport)', size: '50 × 70 mm', pixels: '590 × 827 px' },
];

export default function ResizeForPassportPage() {
    return (
        <>
            <ResizeTool title="Resize Photo to Passport Size" />
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Passport Photo Size – Free Online Resizer
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Resize your photo to the exact passport or visa photo dimensions required for any country — instantly and for free.
                    </p>
                </div>
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Passport Photo Sizes by Country</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-800">
                                    <th className="text-left p-3 rounded-tl-lg">Country / Visa</th>
                                    <th className="text-left p-3">Physical Size</th>
                                    <th className="text-left p-3 rounded-tr-lg">Pixels (300 DPI)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {passportSizes.map(s => (
                                    <tr key={s.country}>
                                        <td className="p-3 font-medium text-gray-900 dark:text-white">{s.country}</td>
                                        <td className="p-3 text-gray-600 dark:text-gray-400">{s.size}</td>
                                        <td className="p-3 text-gray-600 dark:text-gray-400">{s.pixels}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How to Resize Your Passport Photo</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your photo above</li>
                            <li>Enter the exact pixel dimensions for your country</li>
                            <li>Click Resize</li>
                            <li>Download the correctly sized photo</li>
                        </ol>
                    </section>
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Photo Requirements</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Face must take up 70–80% of the frame</li>
                            <li>White or off-white background</li>
                            <li>No glasses, hats, or filters</li>
                            <li>Neutral expression, mouth closed</li>
                            <li>Eyes open and clearly visible</li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}
