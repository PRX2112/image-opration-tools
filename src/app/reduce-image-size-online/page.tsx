import CompressTool from '@/components/tools/CompressTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reduce Image Size Online – Free Photo Compressor',
    description: 'Reduce image file size online for free. Compress JPG, PNG, and WebP images without quality loss. No signup, instant download.',
    alternates: { canonical: '/reduce-image-size-online' }
};

export default function ReduceImageSizePage() {
    return (
        <>
            <CompressTool title="Reduce Image Size Online" />
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent">
                        Reduce Image Size Online – Free &amp; Fast
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Make your image files smaller without making them look worse. Works with all major formats — JPG, PNG, WebP, and GIF.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { icon: '⚡', title: 'Instant Results', desc: 'Compressed in under 2 seconds using local browser processing.' },
                        { icon: '🔒', title: '100% Private', desc: 'Your images never leave your device. Zero server uploads.' },
                        { icon: '🆓', title: 'Always Free', desc: 'No limits on file count, size, or usage. Completely free forever.' },
                    ].map(f => (
                        <div key={f.title} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 text-center">
                            <div className="text-3xl mb-3">{f.icon}</div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">{f.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{f.desc}</p>
                        </div>
                    ))}
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How to Reduce Image File Size</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your image (drag &amp; drop supported)</li>
                            <li>Use the quality slider to balance size vs quality</li>
                            <li>Optionally resize dimensions to further reduce size</li>
                            <li>Download when satisfied with the result</li>
                        </ol>
                    </section>
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Common Uses</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Email attachments with file size limits</li>
                            <li>Website images for faster page load</li>
                            <li>Social media platform upload limits</li>
                            <li>Cloud storage saving</li>
                            <li>Government/bank portal uploads</li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}
