import ConvertTool from '@/components/tools/ConvertTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'PNG to JPG Converter – Free Online',
    description: 'Convert PNG images to JPG format online for free. Reduce file size, remove transparency, download instantly. No signup.',
    alternates: { canonical: '/png-to-jpg' }
};

export default function PNGToJPGPage() {
    return (
        <>
            <ConvertTool title="PNG to JPG Converter" />
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                        PNG to JPG Converter – Free Online
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Convert your PNG files to JPG format to drastically reduce file size without significant quality loss. Perfect for sharing and uploading photos.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How to Convert PNG to JPG</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your PNG file above</li>
                            <li>Select <strong>JPG</strong> as the output format</li>
                            <li>Adjust quality if needed (80% is a good default)</li>
                            <li>Download your .jpg file</li>
                        </ol>
                    </section>
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Why Convert PNG to JPG?</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>JPG is 60–80% smaller than PNG for photos</li>
                            <li>Universal compatibility across all devices</li>
                            <li>Required by some upload form fields</li>
                            <li>Faster loading on websites</li>
                        </ul>
                    </section>
                </div>
                <section className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-5">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                        ⚠️ <strong>Note on Transparency:</strong> JPG does not support transparent backgrounds. When converting PNG with transparency to JPG, the transparent areas will be filled with white. If you need to keep transparency, keep it as PNG or use WebP.
                    </p>
                </section>
            </div>
        </>
    );
}
