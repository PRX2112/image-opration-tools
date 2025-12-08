'use client';

import { useImageCompress } from '@/hooks/useImageCompress';
import FileUpload from '@/components/FileUpload';
import { formatFileSize, downloadFile } from '@/utils/imageUtils';
import {
    Download,
    RotateCcw,
    Loader2,
    ArrowRight,
    CheckCircle,
} from 'lucide-react';
import {
    ReactCompareSlider,
    ReactCompareSliderImage,
} from 'react-compare-slider';

interface CompressToolProps {
    defaultFormat?: string;
    title?: string;
}

export default function CompressTool({ defaultFormat, title }: CompressToolProps) {
    const {
        originalFile,
        previewUrl,
        compressedResult,
        isCompressing,
        error,
        quality,
        setQuality,
        loadFile,
        reset,
    } = useImageCompress();

    const handleDownload = () => {
        if (compressedResult) {
            const ext = compressedResult.format === 'jpeg' ? 'jpg' : compressedResult.format;
            downloadFile(compressedResult.image, `compressed-image.${ext}`);
        }
    };

    const savedPercentage = compressedResult
        ? Math.round(((compressedResult.originalSize - compressedResult.compressedSize) / compressedResult.originalSize) * 100)
        : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        {title || (
                            <>Image <span className="gradient-text">Compress</span></>
                        )}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                        Reduce file size while maintaining the best possible quality
                    </p>
                </div>

                {!originalFile ? (
                    <div className="max-w-2xl mx-auto animate-fade-in">
                        <FileUpload
                            onFileSelect={loadFile}
                            accept="image/*"
                            maxSizeMB={10}
                        />
                        {error && (
                            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                        {/* Left: Comparison View */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="card relative overflow-hidden p-0 bg-gray-900 min-h-[400px] flex items-center justify-center">
                                {previewUrl && compressedResult ? (
                                    <ReactCompareSlider
                                        itemOne={
                                            <ReactCompareSliderImage
                                                src={previewUrl}
                                                alt="Original"
                                            />
                                        }
                                        itemTwo={
                                            <ReactCompareSliderImage
                                                src={compressedResult.image}
                                                alt="Compressed"
                                                style={{ opacity: isCompressing ? 0.5 : 1, transition: 'opacity 0.2s' }}
                                            />
                                        }
                                        className="h-[600px] w-full object-contain"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center text-white">
                                        <Loader2 className="w-8 h-8 animate-spin" />
                                    </div>
                                )}

                                <div className="absolute top-4 right-4 z-10">
                                    <button
                                        onClick={reset}
                                        className="btn btn-secondary shadow-lg py-2 px-4 text-sm"
                                    >
                                        <RotateCcw className="w-4 h-4 mr-2" />
                                        Reset
                                    </button>
                                </div>
                                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                                    <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                        Drag slider to compare quality
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Controls & Stats */}
                        <div className="space-y-6">
                            {/* Stats Card */}
                            <div className="card">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Compression Stats
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <span className="text-gray-500 text-sm">Original Size</span>
                                        <span className="font-medium">
                                            {compressedResult ? formatFileSize(compressedResult.originalSize) : '...'}
                                        </span>
                                    </div>

                                    <div className="flex justify-center">
                                        <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 lg:rotate-0" />
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-lg">
                                        <span className="text-green-700 dark:text-green-400 text-sm">New Size</span>
                                        <div className="text-right">
                                            <div className="font-bold text-green-700 dark:text-green-400">
                                                {compressedResult ? formatFileSize(compressedResult.compressedSize) : '...'}
                                            </div>
                                            {savedPercentage > 0 && (
                                                <div className="text-xs text-green-600 dark:text-green-500">
                                                    Saved {savedPercentage}%
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Controls */}
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
                                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary mb-2"
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>Smaller File</span>
                                    <span>Better Quality</span>
                                </div>
                            </div>

                            {/* Download */}
                            <button
                                onClick={handleDownload}
                                disabled={isCompressing || !compressedResult}
                                className="btn btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isCompressing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Compressing...
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-5 h-5 mr-2" />
                                        Download Image
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
