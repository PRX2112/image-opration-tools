'use client';

import { useState } from 'react';
import { useImageConvert } from '@/hooks/useImageConvert';
import { useUsageTracking } from '@/hooks/useUsageTracking';
import BulkFileUpload from '@/components/BulkFileUpload';
import {
    Download,
    RotateCcw,
    Loader2,
    ArrowRight,
    FileImage,
    X,
} from 'lucide-react';
import UpgradePrompt from '@/components/UpgradePrompt';
import UsageStats from '@/components/UsageStats';

const FORMATS = [
    { value: 'png', label: 'PNG' },
    { value: 'jpg', label: 'JPG' },
    { value: 'webp', label: 'WebP' },
    { value: 'avif', label: 'AVIF' },
    { value: 'gif', label: 'GIF' },
];

interface ConvertToolProps {
    defaultInputFormat?: string;
    defaultOutputFormat?: string;
    title?: string;
}

export default function ConvertTool({ defaultInputFormat, defaultOutputFormat = 'jpg', title }: ConvertToolProps) {
    const {
        files,
        isConverting,
        error,
        addFiles,
        removeFile,
        convertImages,
        reset,
    } = useImageConvert();

    const [targetFormat, setTargetFormat] = useState(defaultOutputFormat);
    const [quality, setQuality] = useState(90);
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [upgradeReason, setUpgradeReason] = useState<'downloads' | 'file_size' | 'storage'>('downloads');

    // Usage tracking
    const { usage, limits, canDownload, canProcessFile, trackDownload } = useUsageTracking();

    const handleFilesSelect = async (selectedFiles: File[]) => {
        // Check each file size
        for (const file of selectedFiles) {
            if (!canProcessFile(file.size)) {
                setUpgradeReason('file_size');
                setShowUpgrade(true);
                return;
            }
        }
        addFiles(selectedFiles);
    };

    const handleConvert = async () => {
        // Check if user can download
        if (!canDownload()) {
            setUpgradeReason('downloads');
            setShowUpgrade(true);
            return;
        }

        await convertImages(targetFormat, quality);

        // Track download for each file
        for (const fileData of files) {
            await trackDownload(fileData.file.size, 'Convert Tool', fileData.file.name);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 py-12">
            {/* Upgrade Prompt */}
            {showUpgrade && usage && (
                <UpgradePrompt
                    reason={upgradeReason}
                    currentPlan={usage.subscriptionTier}
                    onClose={() => setShowUpgrade(false)}
                />
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        {title || (
                            <>Format <span className="gradient-text">Converter</span></>
                        )}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                        Convert images to PNG, JPG, WebP, AVIF, and GIF in seconds
                    </p>
                </div>

                {/* Usage Stats */}
                {usage && limits && (
                    <div className="mb-8 max-w-2xl mx-auto">
                        <UsageStats usage={usage} limits={limits} compact />
                    </div>
                )}

                {files.length === 0 ? (
                    <div className="max-w-2xl mx-auto animate-fade-in">
                        <BulkFileUpload
                            onFilesSelect={handleFilesSelect}
                            accept={defaultInputFormat ? `image/${defaultInputFormat}` : undefined}
                            maxSizeMB={10}
                            maxFiles={20}
                        />
                        {error && (
                            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                        {/* Left: File List */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Files ({files.length})
                                </h2>
                                <button
                                    onClick={reset}
                                    className="text-sm text-red-500 hover:text-red-600 font-medium"
                                >
                                    Clear All
                                </button>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {files.map((f, i) => (
                                    <div key={i} className="relative group card p-2 bg-white dark:bg-gray-800 border-none shadow-sm hover:shadow-md transition-shadow">
                                        <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 mb-2">
                                            <img
                                                src={f.preview}
                                                alt={f.file.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <button
                                                onClick={() => removeFile(i)}
                                                className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate px-1">
                                            {f.file.name}
                                        </p>
                                        <div className="absolute inset-x-0 bottom-0 top-auto flex justify-center translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none">
                                            <div className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full mb-8 shadow-sm">
                                                {(f.file.size / 1024 / 1024).toFixed(2)} MB
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors aspect-square">
                                    <label className="cursor-pointer flex flex-col items-center w-full h-full justify-center">
                                        <input
                                            type="file"
                                            className="hidden"
                                            multiple
                                            accept="image/*"
                                            onChange={(e) => {
                                                if (e.target.files) {
                                                    addFiles(Array.from(e.target.files));
                                                }
                                            }}
                                        />
                                        <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm mb-2">
                                            <FileImage className="w-6 h-6 text-primary" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Add More</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Right: Controls */}
                        <div className="space-y-6">
                            {/* Target Format */}
                            <div className="card">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Convert to
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {FORMATS.map((fmt) => (
                                        <button
                                            key={fmt.value}
                                            onClick={() => setTargetFormat(fmt.value)}
                                            className={`py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${targetFormat === fmt.value
                                                ? 'bg-primary text-white shadow-lg'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            {fmt.label}
                                            {targetFormat === fmt.value && <div className="w-2 h-2 bg-white rounded-full" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Quality */}
                            <div className="card">
                                <div className="flex justify-between items-center mb-4">
                                    <label className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Quality
                                    </label>
                                    <span className="text-primary font-bold">{quality}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="10"
                                    max="100"
                                    value={quality}
                                    onChange={(e) => setQuality(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                            </div>

                            {/* Convert Action */}
                            <button
                                onClick={handleConvert}
                                disabled={isConverting}
                                className="btn btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/20"
                            >
                                {isConverting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Converting...
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-5 h-5 mr-2" />
                                        Convert All Images
                                    </>
                                )}
                            </button>

                            {error && (
                                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm text-center">
                                    {error}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
