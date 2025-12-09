'use client';

import { useState } from 'react';
import { useImageTransform } from '@/hooks/useImageTransform';
import FileUpload from '@/components/FileUpload';
import { downloadFile } from '@/utils/imageUtils';
import {
    Download,
    RotateCcw,
    Loader2,
    RotateCw,
    Save
} from 'lucide-react';
import SaveToDriveButton from '@/components/drive/SaveToDriveButton';
import { useSession } from 'next-auth/react';
import { PLANS } from '@/config/plans';
import { useUsageTracking } from '@/hooks/useUsageTracking';
import AdBanner from '@/components/ads/AdBanner';

interface RotateToolProps {
    title?: string;
}

export default function RotateTool({ title }: RotateToolProps) {
    const {
        originalFile,
        previewUrl,
        result,
        isProcessing,
        error,
        rotation,
        setRotation,
        backgroundColor,
        setBackgroundColor,
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
            const filename = `rotated-image.${originalFile?.name.split('.').pop() || 'png'}`;
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-blue-900/20 dark:via-cyan-900/20 dark:to-teal-900/20 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        {title || (
                            <>Rotate <span className="gradient-text">Image</span></>
                        )}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                        Rotate your images to the perfect angle
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
                            {/* Preset Buttons */}
                            <div className="card">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Presets
                                </h3>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => setRotation((r) => r - 90)}
                                        className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex flex-col items-center justify-center"
                                    >
                                        <RotateCcw className="w-5 h-5 mb-1 text-gray-600 dark:text-gray-300" />
                                        <span className="text-xs font-medium">-90°</span>
                                    </button>
                                    <button
                                        onClick={() => setRotation(0)}
                                        className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex flex-col items-center justify-center"
                                    >
                                        <span className="text-lg font-bold text-gray-600 dark:text-gray-300">0°</span>
                                        <span className="text-xs font-medium">Reset</span>
                                    </button>
                                    <button
                                        onClick={() => setRotation((r) => r + 90)}
                                        className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex flex-col items-center justify-center"
                                    >
                                        <RotateCw className="w-5 h-5 mb-1 text-gray-600 dark:text-gray-300" />
                                        <span className="text-xs font-medium">+90°</span>
                                    </button>
                                </div>
                            </div>

                            {/* Custom Angle Slider */}
                            <div className="card">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Custom Angle
                                    </h3>
                                    <span className="text-primary font-bold font-mono">{rotation}°</span>
                                </div>
                                <input
                                    type="range"
                                    min="-180"
                                    max="180"
                                    value={rotation % 360} // Keep slider sane
                                    onChange={(e) => setRotation(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-2">
                                    <span>-180°</span>
                                    <span>0°</span>
                                    <span>180°</span>
                                </div>
                            </div>

                            {/* Background Color (Optional) */}
                            {rotation % 90 !== 0 && (
                                <div className="card animate-fade-in">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                        Background Fill
                                    </h3>
                                    <div className="flex items-center space-x-4">
                                        <input
                                            type="color"
                                            value={backgroundColor}
                                            onChange={(e) => setBackgroundColor(e.target.value)}
                                            className="h-10 w-20 rounded cursor-pointer"
                                        />
                                        <span className="text-sm font-mono text-gray-600 dark:text-gray-300">
                                            {backgroundColor}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Used to fill empty space when rotating at custom angles.
                                    </p>
                                </div>
                            )}

                            {/* Action */}
                            {!result ? (
                                <button
                                    onClick={handleSave}
                                    disabled={isProcessing}
                                    className="btn btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-500/20"
                                >
                                    {isProcessing ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                            Rotating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5 mr-2" />
                                            Apply Rotation
                                        </>
                                    )}
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={handleDownload}
                                        className="btn btn-primary w-full text-lg py-4 shadow-xl shadow-blue-500/20"
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
                                                toolUsed="rotate"
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
                            <AdBanner adSlot="rotate-tool-bottom" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
