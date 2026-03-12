import CompressTool from '@/components/tools/CompressTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Compress Image to 200KB – Free Online Compressor',
    description: 'Reduce your image file size to 200KB or less online for free. Works for JPG, PNG, WebP. Instant, no signup needed.',
    alternates: { canonical: '/compress-image-to-200kb' }
};

export default function CompressTo200KBPage() {
    return (
        <>
            <CompressTool title="Compress Image to 200KB" />
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        Compress Image to 200KB – Free Online
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Easily reduce images to under 200KB for form uploads, email attachments, and social platforms. Free, fast, and secure.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Tips to Reach 200KB</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Set quality to 75–85% for good results</li>
                            <li>Resize to max 1200px wide if image is very large</li>
                            <li>Use JPEG for photographs (not PNG)</li>
                            <li>Remove EXIF metadata to save extra bytes</li>
                        </ul>
                    </section>
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">When You Need Under 200KB</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>LinkedIn profile / banner photo</li>
                            <li>Agency and portfolio submissions</li>
                            <li>Government job applications</li>
                            <li>Email newsletter images</li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}
