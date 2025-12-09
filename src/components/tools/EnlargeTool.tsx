'use client';

import { useState } from 'react';
import { useImageEnlarge } from '@/hooks/useImageEnlarge';
import { useUsageTracking } from '@/hooks/useUsageTracking';
import FileUpload from '@/components/FileUpload';
import { formatFileSize, downloadFile } from '@/utils/imageUtils';
import {
    Download,
    RotateCcw,
    Loader2,
    Check,
    Wand2,
    ZoomIn,
    ArrowRight
} from 'lucide-react';
import {
    ReactCompareSlider,
    ReactCompareSliderImage,
} from 'react-compare-slider';
import UpgradePrompt from '@/components/UpgradePrompt';
import UsageStats from '@/components/UsageStats';

interface EnlargeToolProps {
    title?: string;
}

export default function EnlargeTool({ title }: EnlargeToolProps) {
    const {
        originalFile,
        previewUrl,
        result,
        isProcessing,
        error,
        factor,
        setFactor,
        enhance,
        setEnhance,
        loadFile,
        enlargeImage,
        reset,
    } = useImageEnlarge();

    const [showUpgrade, setShowUpgrade] = useState(false);
    const [upgradeReason, setUpgradeReason] = useState<'downloads' | 'file_size' | 'storage'>('downloads');

    // Usage tracking
    const { usage, limits, canDownload, canProcessFile, trackDownload } = useUsageTracking();

    // Check if user has Pro or Business plan for AI upscaling
    const isPremiumUser = usage && (usage.subscriptionTier === 'pro' || usage.subscriptionTier === 'business');

    const handleFileSelect = async (file: File) => {
        // Check file size before loading
        if (!canProcessFile(file.size)) {
            setUpgradeReason('file_size');
            setShowUpgrade(true);
            return;
        }
        await loadFile(file);
    };

    const handleEnlarge = async () => {
        // Check if user has premium plan for AI upscaling
        if (!isPremiumUser) {
            setUpgradeReason('file_size'); // Using file_size as proxy for feature upgrade
            setShowUpgrade(true);
            return;
        }

        await enlargeImage();
    };

    const handleDownload = async () => {
        if (!result) return;

        // Check if user can download
        if (!canDownload()) {
            setUpgradeReason('downloads');
            setShowUpgrade(true);
            return;
        }

        downloadFile(result.image, `enlarged-${factor}x-image.${originalFile?.name.split('.').pop() || 'png'}`);

        // Track download
        if (originalFile) {
            await trackDownload(originalFile.size, 'Enlarge Tool', originalFile.name);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-purple-900/20 py-12">
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
                            <>Image <span className="gradient-text">Enlarger</span></>
                        )}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4">
                        Upscale your images by 2x or 4x with smart enhancement
                    </p>
                    {!isPremiumUser && (
                        <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                            ⭐ Pro or Business plan required for AI upscaling
                        </p>
                    )}
                </div>

                {/* Usage Stats */}
                {usage && limits && (
                    <div className="mb-8 max-w-2xl mx-auto">
                        <UsageStats usage={usage} limits={limits} compact />
                    </div>
                )}

                {!originalFile ? (
                    <div className="max-w-2xl mx-auto animate-fade-in">
                        <FileUpload
                            onFileSelect={handleFileSelect}
                            accept="image/*"
                            maxSizeMB={limits.maxFileSize === Infinity ? Infinity : limits.maxFileSize / (1024 * 1024)}
                        />
                        {error && (
                            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
                        {/* Left: View Area */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="card relative overflow-hidden p-0 bg-gray-900 min-h-[400px] flex items-center justify-center">
                                {result ? (
                                    <div className="flex items-center justify-center w-full h-full p-4 overflow-auto">
                                        <img
                                            src={result.image}
                                            alt="Enlarged"
                                            className="max-h-[600px] max-w-full object-contain shadow-2xl rounded"
                                        />
                                    </div>
                                ) : (
                                    <div className="relative w-full h-full flex flex-col items-center justify-center min-h-[500px]">
                                        {previewUrl && (
                                            <img
                                                src={previewUrl}
                                                alt="Original"
                                                className="max-h-[400px] max-w-full object-contain mb-4"
                                            />
                                        )}
                                        <div className="text-gray-400 text-sm">Preview</div>
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
                            </div>
                        </div>

                        {/* Right: Controls & Stats */}
                        <div className="space-y-6">
                            {/* Upscale Options */}
                            <div className="card">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <ZoomIn className="w-5 h-5 mr-2 text-primary" />
                                    Upscale Factor
                                </h3>
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <button
                                        onClick={() => setFactor(2)}
                                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center ${factor === 2
                                            ? 'border-primary bg-primary/5 text-primary'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 text-gray-600 dark:text-gray-300'
                                            }`}
                                    >
                                        <span className="text-2xl font-bold">2x</span>
                                        <span className="text-sm opacity-80">Double Size</span>
                                    </button>
                                    <button
                                        onClick={() => setFactor(4)}
                                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center ${factor === 4
                                            ? 'border-primary bg-primary/5 text-primary'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 text-gray-600 dark:text-gray-300'
                                            }`}
                                    >
                                        <span className="text-2xl font-bold">4x</span>
                                        <span className="text-sm opacity-80">Ultra Size</span>
                                    </button>
                                </div>

                                <div className="flex items-center space-x-3 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg cursor-pointer" onClick={() => setEnhance(!enhance)}>
                                    <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${enhance ? 'bg-primary border-primary text-white' : 'bg-white border-gray-300'}`}>
                                        {enhance && <Check className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white flex items-center">
                                            Smart Enhance
                                            <Wand2 className="w-4 h-4 ml-2 text-indigo-500" />
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Reduce noise & sharpen edges
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Dimensions */}
                            {result && (
                                <div className="card animate-fade-in">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Dimensions
                                    </h3>
                                    <div className="flex items-center justify-between">
                                        <div className="text-center">
                                            <div className="text-sm text-gray-500">Original</div>
                                            <div className="font-mono text-lg font-medium">{result.originalWidth} x {result.originalHeight}</div>
                                        </div>
                                        <ArrowRight className="text-gray-400" />
                                        <div className="text-center">
                                            <div className="text-sm text-green-600">Enlarged</div>
                                            <div className="font-mono text-lg font-bold text-green-600">{result.newWidth} x {result.newHeight}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action */}
                            {!result ? (
                                <button
                                    onClick={handleEnlarge}
                                    disabled={isProcessing || !isPremiumUser}
                                    className="btn btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-indigo-500/20"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                            Upscaling...
                                        </>
                                    ) : !isPremiumUser ? (
                                        <>
                                            <Wand2 className="w-5 h-5 mr-2" />
                                            Upgrade to Pro for AI Upscaling
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 className="w-5 h-5 mr-2" />
                                            Enlarge Image
                                        </>
                                    )}
                                </button>
                            ) : (
                                <button
                                    onClick={handleDownload}
                                    className="btn btn-primary w-full text-lg py-4 shadow-xl shadow-indigo-500/20"
                                >
                                    <Download className="w-5 h-5 mr-2" />
                                    Download Result
                                </button>
                            )}

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
