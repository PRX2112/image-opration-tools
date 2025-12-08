'use client';

import { useState } from 'react';
import BulkFileUpload from '@/components/BulkFileUpload';
import { Download, Loader2, Trash2, Archive, FileImage } from 'lucide-react';
import { formatFileSize, fileToBase64, downloadFile } from '@/utils/imageUtils';

const PERCENTAGE_PRESETS = [
    { label: '50%', value: 50 },
    { label: '75%', value: 75 },
    { label: '100%', value: 100 },
    { label: '150%', value: 150 },
    { label: '200%', value: 200 },
];

const FORMATS = [
    { value: 'png', label: 'PNG' },
    { value: 'jpg', label: 'JPG' },
    { value: 'webp', label: 'WebP' },
];

export default function BulkResizePage() {
    const [files, setFiles] = useState<File[]>([]);
    const [percentage, setPercentage] = useState<number>(100);
    const [width, setWidth] = useState<number>(0); // 0 means use percentage
    const [height, setHeight] = useState<number>(0); // 0 means use percentage
    const [targetFormat, setTargetFormat] = useState('png');
    const [quality, setQuality] = useState(90);

    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<string | null>(null);

    const handleFilesSelect = (newFiles: File[]) => {
        setFiles(prev => [...prev, ...newFiles]);
        setError(null);
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleBulkResize = async () => {
        if (files.length === 0) return;

        setIsProcessing(true);
        setProgress(0);
        setError(null);

        try {
            // Prepare images
            const images = await Promise.all(files.map(async (file) => ({
                name: file.name,
                content: await fileToBase64(file),
            })));

            // Call API
            const response = await fetch('/api/resize/bulk', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    images,
                    settings: {
                        percentage,
                        width: width || undefined,
                        height: height || undefined,
                        format: targetFormat,
                        quality,
                    }
                }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Batch processing failed');
            }

            // Get blob response (ZIP)
            const blob = await response.blob();

            // Trigger download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `resized_images_batch.zip`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

        } catch (err: any) {
            console.error('Bulk resize error:', err);
            setError(err.message || 'Failed to process bulk resize');
        } finally {
            setIsProcessing(false);
        }
    };

    const clearAll = () => {
        setFiles([]);
        setError(null);
        setProgress(0);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Bulk Image <span className="gradient-text">Resize</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                        Resize multiple images at once and download as ZIP
                    </p>

                    <a
                        href="/tools/resize"
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white dark:bg-gray-800 border-2 border-primary/20 hover:border-primary text-primary font-medium transition-all hover:shadow-lg hover:shadow-primary/10"
                    >
                        <span>← Back to Single Image Resize</span>
                    </a>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: File List & Upload */}
                    <div className="lg:col-span-2 space-y-6">
                        <BulkFileUpload onFilesSelect={handleFilesSelect} maxFiles={10} />

                        {files.length > 0 && (
                            <div className="card animate-fade-in">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                        <FileImage className="w-5 h-5 text-primary" />
                                        Files ({files.length})
                                    </h3>
                                    <button
                                        onClick={clearAll}
                                        className="text-sm text-red-500 hover:text-red-600 transition-colors"
                                    >
                                        Clear All
                                    </button>
                                </div>

                                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                                    {files.map((file, idx) => (
                                        <div key={`${file.name}-${idx}`} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xs font-bold text-gray-500 uppercase">
                                                        {file.name.split('.').pop()}
                                                    </span>
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {formatFileSize(file.size)}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeFile(idx)}
                                                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Right: Controls */}
                    <div className="space-y-6 animate-fade-in">
                        <div className="card">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Resize Settings
                            </h3>

                            <div className="space-y-6">
                                {/* Percentage */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Scale Percentage
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {PERCENTAGE_PRESETS.map((p) => (
                                            <button
                                                key={p.value}
                                                onClick={() => setPercentage(p.value)}
                                                className={`py-2 px-1 rounded-md text-sm transition-colors ${percentage === p.value
                                                        ? 'bg-primary text-white'
                                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {p.label}
                                            </button>
                                        ))}
                                    </div>
                                    <input
                                        type="number"
                                        value={percentage}
                                        onChange={(e) => setPercentage(Number(e.target.value))}
                                        className="mt-2 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                                        min="1" max="500"
                                    />
                                </div>

                                {/* Format */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Output Format
                                    </label>
                                    <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                        {FORMATS.map((fmt) => (
                                            <button
                                                key={fmt.value}
                                                onClick={() => setTargetFormat(fmt.value)}
                                                className={`flex-1 py-2 text-sm font-medium transition-colors ${targetFormat === fmt.value
                                                        ? 'bg-primary text-white'
                                                        : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100'
                                                    }`}
                                            >
                                                {fmt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quality */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Quality: {quality}%
                                    </label>
                                    <input
                                        type="range"
                                        min="10"
                                        max="100"
                                        value={quality}
                                        onChange={(e) => setQuality(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                </div>

                                <button
                                    onClick={handleBulkResize}
                                    disabled={files.length === 0 || isProcessing}
                                    className="w-full py-3 px-4 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-semibold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Archive className="w-5 h-5" />
                                            Resize & Zip {files.length > 0 ? `(${files.length})` : ''}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
