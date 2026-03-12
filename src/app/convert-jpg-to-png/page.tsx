import ConvertTool from '@/components/tools/ConvertTool';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'JPG to PNG Converter – Free Online Tool',
    description: 'Convert JPG images to PNG format for free online. Lossless output, supports transparency. Download instantly, no signup.',
    alternates: { canonical: '/convert-jpg-to-png' }
};

export default function JPGToPNGPage() {
    return (
        <>
            <ConvertTool title="JPG to PNG Converter" />
            <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                        JPG to PNG Converter – Free Online
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Convert JPEG images to lossless PNG format for editing, printing, or accessing transparency support. Fast, free, and private.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How to Convert JPG to PNG</h2>
                        <ol className="list-decimal pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Upload your .jpg or .jpeg file</li>
                            <li>Select <strong>PNG</strong> as the output format</li>
                            <li>Click Convert</li>
                            <li>Download your lossless .png file</li>
                        </ol>
                    </section>
                    <section className="space-y-3">
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">When to Use PNG over JPG</h2>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>Editing images (avoid generation loss)</li>
                            <li>Screenshots with text — stays sharp</li>
                            <li>Logos and graphics with solid colors</li>
                            <li>When transparency is needed</li>
                        </ul>
                    </section>
                </div>
            </div>
        </>
    );
}
