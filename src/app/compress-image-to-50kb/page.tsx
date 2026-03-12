import CompressTool from '@/components/tools/CompressTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Compress Image to 50KB Online – Free, Instant',
    description: 'Reduce any image to under 50KB online for free. Works with JPG, PNG, and WebP. No signup required, instant download.',
    alternates: { canonical: '/compress-image-to-50kb' }
};

export default function CompressTo50KBPage() {
    return (
        <>
            <CompressTool title="Compress Image to 50KB" />
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Compress Image to 50KB – Free Tool
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Need an image under 50KB? Combine dimension resizing with quality adjustment to hit your exact target file size.
                    </p>
                </div>
                <section className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-6 space-y-3">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Strategy to Reach 50KB</h2>
                    <div className="space-y-3 text-gray-600 dark:text-gray-300">
                        <p>Getting a photo under 50KB usually requires a combination of dimension reduction and quality compression:</p>
                        <ol className="list-decimal pl-5 space-y-2">
                            <li><strong>Start with quality</strong> — Lower the quality slider to 60–70% which typically cuts size by 50–70%</li>
                            <li><strong>Resize dimensions</strong> — A 1000px wide image at 60% quality is usually around 50–80KB</li>
                            <li><strong>Choose the right format</strong> — Use JPEG for photos; it compresses much smaller than PNG</li>
                            <li><strong>Convert to WebP</strong> — WebP is 25–35% smaller than JPEG at the same quality</li>
                        </ol>
                    </div>
                </section>
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Why 50KB?</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Job application portals</li>
                            <li>College application forms</li>
                            <li>Government ID uploads</li>
                            <li>Banking and financial forms</li>
                            <li>Profile picture limits</li>
                        </ul>
                    </section>
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Related Size Targets</h2>
                        <ul className="space-y-2">
                            <li><a href="/resize-image-to-100kb" className="text-blue-600 hover:underline text-sm">→ Compress image to 100KB</a></li>
                            <li><a href="/compress-image-to-200kb" className="text-blue-600 hover:underline text-sm">→ Compress image to 200KB</a></li>
                            <li><a href="/compress-jpg-online" className="text-blue-600 hover:underline text-sm">→ Compress JPG online</a></li>
                            <li><a href="/compress-png-online" className="text-blue-600 hover:underline text-sm">→ Compress PNG online</a></li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}
