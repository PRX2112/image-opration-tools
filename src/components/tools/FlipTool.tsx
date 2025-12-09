'use client';

import { useState } from 'react';
import { useImageTransform } from '@/hooks/useImageTransform';
import FileUpload from '@/components/FileUpload';
import { downloadFile } from '@/utils/imageUtils';
import {
    Download,
    RotateCcw,
    Loader2,
    FlipHorizontal,
    FlipVertical,
    Save
} from 'lucide-react';
import SaveToDriveButton from '@/components/drive/SaveToDriveButton';
import { useSession } from 'next-auth/react';
import { PLANS } from '@/config/plans';
import { useUsageTracking } from '@/hooks/useUsageTracking';
import AdBanner from '@/components/ads/AdBanner';

interface FlipToolProps {
    title?: string;
}

export default function FlipTool({ title }: FlipToolProps) {
    const {
        originalFile,
        previewUrl,
        result,
        isProcessing,
        error,
        flipH,
        setFlipH,
        flipV,
        setFlipV,
        loadFile,
        applyTransform,
        reset,
        getPreviewStyle
    } = useImageTransform();

    const [processedImageBlob, setProcessedImageBlob] = useState<Blob | null>(null);
    const [processedFileName, setProcessedFileName] = useState<string>('');
    const { data: session } = useSession();
    const { usage } = useUsageTracking();

    const handleSave = async () => {
        await applyTransform();
    };

    const handleDownload = () => {
        if (result) {
            const filename = `flipped-image.${originalFile?.name.split('.').pop() || 'png'}`;
            downloadFile(result.image, filename);

            // Convert base64 to blob for Drive save
            const base64Data = result.image.split(',')[1];
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/png' });

            setProcessedImageBlob(blob);
            setProcessedFileName(filename);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-900/20 dark:via-amber-900/20 dark:to-yellow-900/20 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        {title || (
                            <>Flip <span className="gradient-text">Image</span></>
                        )}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                        Mirror and flip your images horizontally or vertically
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
                        {/* Left: View Area */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="card relative p-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center overflow-hidden min-h-[500px]">
                                {result ? (
                                    <img
                                        src={result.image}
                                        alt="Result"
                                        className="max-h-[500px] max-w-full object-contain shadow-2xl rounded"
                                    />
                                ) : (
                                    <div className="relative w-full h-full flex items-center justify-center p-8">
                                        {previewUrl && (
                                            <img
                                                src={previewUrl}
                                                alt="Preview"
                                                style={getPreviewStyle()}
                                                className="max-h-[400px] max-w-full object-contain shadow-xl rounded transition-transform duration-300"
                                            />
                                        )}
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

                        {/* Right: Controls */}
                        <div className="space-y-6">
                            {/* Controls */}
                            <div className="card">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Flip Options
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setFlipH(!flipH)}
                                        className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${flipH
                                            ? 'border-primary bg-primary/5 text-primary'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 text-gray-600 dark:text-gray-300'
                                            }`}
                                    >
                                        <FlipHorizontal className="w-8 h-8" />
                                        <span className="font-medium">Flip Horizontally</span>
                                    </button>
                                    <button
                                        onClick={() => setFlipV(!flipV)}
                                        className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 ${flipV
                                            ? 'border-primary bg-primary/5 text-primary'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 text-gray-600 dark:text-gray-300'
                                            }`}
                                    >
                                        <FlipVertical className="w-8 h-8" />
                                        <span className="font-medium">Flip Vertically</span>
                                    </button>
                                </div>
                            </div>

                            {/* Action */}
                            {!result ? (
                                <button
                                    onClick={handleSave}
                                    disabled={isProcessing}
                                    className="btn btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-orange-500/20"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5 mr-2" />
                                            Apply Flip
                                        </>
                                    )}
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={handleDownload}
                                        className="btn btn-primary w-full text-lg py-4 shadow-xl shadow-orange-500/20"
                                    >
                                        <Download className="w-5 h-5 mr-2" />
                                        Download Result
                                    </button>

                                    {/* Save to Drive Button */}
                                    {session && usage && processedImageBlob && (() => {
                                        const subscriptionTier = usage.subscriptionTier || 'free';
                                        const basePlan = subscriptionTier.split('_')[0];
                                        const plan = PLANS[basePlan];

                                        return plan?.driveIntegration ? (
                                            <SaveToDriveButton
                                                file={processedImageBlob}
                                                fileName={processedFileName}
                                                toolUsed="flip"
                                            />
                                        ) : null;
                                    })()}
                                </>
                            )}

                            {error && (
                                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            {/* Ad Banner for Free Users */}
                            <AdBanner adSlot="flip-tool-bottom" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
