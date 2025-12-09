'use client';

import { useState, useRef, useEffect } from 'react';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import FileUpload from '@/components/FileUpload';
import { useImageCrop } from '@/hooks/useImageCrop';
import { useUsageTracking } from '@/hooks/useUsageTracking';
import {
    Download,
    RotateCcw,
    Smartphone,
    Monitor,
    Square,
    Maximize,
    Loader2,
} from 'lucide-react';
import UpgradePrompt from '@/components/UpgradePrompt';
import UsageStats from '@/components/UsageStats';
import SaveToDriveButton from '@/components/drive/SaveToDriveButton';
import { useSession } from 'next-auth/react';
import { PLANS } from '@/config/plans';

const ASPECT_RATIOS = [
    { label: 'Free', value: undefined, icon: Maximize },
    { label: 'Square (1:1)', value: 1 / 1, icon: Square },
    { label: 'Landscape (16:9)', value: 16 / 9, icon: Monitor },
    { label: 'Portrait (4:5)', value: 4 / 5, icon: Smartphone },
    { label: 'Mobile (9:16)', value: 9 / 16, icon: Smartphone },
    { label: 'Standard (4:3)', value: 4 / 3, icon: Monitor },
];

const FORMATS = [
    { value: 'png', label: 'PNG' },
    { value: 'jpg', label: 'JPG' },
    { value: 'webp', label: 'WebP' },
];

interface CropToolProps {
    defaultFormat?: string;
    title?: string;
}

// Helper to center the crop when image loads or aspect changes
function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    );
}

export default function CropTool({ defaultFormat = 'png', title }: CropToolProps) {
    const {
        originalFile,
        previewUrl,
        isProcessing,
        error,
        loadImageFile,
        cropImage,
        reset,
    } = useImageCrop();

    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [aspect, setAspect] = useState<number | undefined>(undefined);
    const [format, setFormat] = useState(defaultFormat);
    const imgRef = useRef<HTMLImageElement>(null);
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [upgradeReason, setUpgradeReason] = useState<'downloads' | 'file_size' | 'storage'>('downloads');
    const [processedImageBlob, setProcessedImageBlob] = useState<Blob | null>(null);
    const [processedFileName, setProcessedFileName] = useState<string>('');

    // Session for Drive integration
    const { data: session } = useSession();

    // Usage tracking
    const { usage, limits, canDownload, canProcessFile, trackDownload } = useUsageTracking();

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        } else {
            // Default to full width crop for freeform
            const { width, height } = e.currentTarget;
            setCrop({
                unit: '%',
                width: 90,
                height: 90,
                x: 5,
                y: 5
            });
        }
    };

    const handleFileSelect = async (file: File) => {
        // Check file size before loading
        if (!canProcessFile(file.size)) {
            setUpgradeReason('file_size');
            setShowUpgrade(true);
            return;
        }
        await loadImageFile(file);
        setCrop(undefined);
        setCompletedCrop(undefined);
        setAspect(undefined);
    };

    const handleAspectRatioChange = (newAspect: number | undefined) => {
        setAspect(newAspect);

        if (imgRef.current && newAspect) {
            const { width, height } = imgRef.current;
            setCrop(centerAspectCrop(width, height, newAspect));
        } else if (imgRef.current && !newAspect) {
            // Reset to a default free crop if switching to free
            setCrop({
                unit: '%',
                width: 50,
                height: 50,
                x: 25,
                y: 25
            });
        }
    };

    const handleDownload = async () => {
        if (!completedCrop || !imgRef.current) return;

        // Check if user can download
        if (!canDownload()) {
            setUpgradeReason('downloads');
            setShowUpgrade(true);
            return;
        }

        // The completedCrop contains coordinates relative to the DISPLAYED image size.
        // We need to scale them to the ORIGINAL image natural size for the server.
        const image = imgRef.current;
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const serverCrop = {
            x: completedCrop.x * scaleX,
            y: completedCrop.y * scaleY,
            width: completedCrop.width * scaleX,
            height: completedCrop.height * scaleY,
        };

        // Call crop API and get result
        const base64 = originalFile ? await (async () => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(originalFile);
            });
        })() : '';

        const response = await fetch('/api/crop', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                image: base64,
                crop: serverCrop,
                rotate: 0,
                format,
            }),
        });

        if (response.ok) {
            const result = await response.json();

            // Convert base64 to blob for Drive save
            const base64Data = result.image.split(',')[1];
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: `image/${format}` });
            const filename = `cropped-image.${format === 'jpg' ? 'jpg' : format}`;

            // Download
            const link = document.createElement('a');
            link.href = result.image;
            link.download = filename;
            link.click();

            // Store for Drive save
            setProcessedImageBlob(blob);
            setProcessedFileName(filename);
        }

        // Track download
        if (originalFile) {
            await trackDownload(originalFile.size, 'Crop Tool', originalFile.name);
        }
    };

    const handleReset = () => {
        reset();
        setCrop(undefined);
        setCompletedCrop(undefined);
        setAspect(undefined);
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
                            <>Image <span className="gradient-text">Crop</span></>
                        )}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                        Crop your images to exact dimensions or common aspect ratios
                    </p>
                </div>

                {/* Usage Stats */}
                {usage && limits && (
                    <div className="mb-8 max-w-2xl mx-auto">
                        <UsageStats usage={usage} limits={limits} compact />
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Cropper / Upload */}
                    <div className="lg:col-span-2 space-y-6">
                        {!originalFile && (
                            <div className="animate-fade-in">
                                <FileUpload
                                    onFileSelect={handleFileSelect}
                                    accept="image/*"
                                    maxSizeMB={limits.maxFileSize === Infinity ? Infinity : limits.maxFileSize / (1024 * 1024)}
                                />
                            </div>
                        )}

                        {originalFile && previewUrl && (
                            <div className="card animate-fade-in relative flex flex-col min-h-[500px]">
                                <div className="absolute top-4 right-4 z-10">
                                    <button
                                        onClick={handleReset}
                                        className="btn btn-secondary shadow-lg py-2 px-4 text-sm"
                                    >
                                        <RotateCcw className="w-4 h-4 mr-2" />
                                        Reset
                                    </button>
                                </div>

                                <div className="relative flex-1 rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center p-4">
                                    <ReactCrop
                                        crop={crop}
                                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                                        onComplete={(c) => setCompletedCrop(c)}
                                        aspect={aspect}
                                        className="max-h-[600px]"
                                    >
                                        <img
                                            ref={imgRef}
                                            src={previewUrl}
                                            alt="Crop preview"
                                            onLoad={onImageLoad}
                                            style={{ maxHeight: '600px', width: 'auto', maxWidth: '100%' }}
                                        />
                                    </ReactCrop>
                                </div>

                                <div className="mt-4 px-2 text-center text-sm text-gray-500">
                                    Draft handles to resize selection. {aspect ? 'Aspect ratio locked.' : 'Free selection active.'}
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
                    {originalFile && (
                        <div className="space-y-6 animate-fade-in">
                            {/* Aspect Ratios */}
                            <div className="card">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Aspect Ratio
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {ASPECT_RATIOS.map((ratio) => (
                                        <button
                                            key={ratio.label}
                                            onClick={() => handleAspectRatioChange(ratio.value)}
                                            className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${aspect === ratio.value
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 text-gray-700 dark:text-gray-300'
                                                }`}
                                        >
                                            <ratio.icon className="w-4 h-4" />
                                            <span className="text-sm font-medium">{ratio.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Format */}
                            <div className="card">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Output Format
                                </h3>
                                <div className="grid grid-cols-3 gap-2">
                                    {FORMATS.map((fmt) => (
                                        <button
                                            key={fmt.value}
                                            onClick={() => setFormat(fmt.value)}
                                            className={`py-2 px-4 rounded-lg font-medium transition-all ${format === fmt.value
                                                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                                }`}
                                        >
                                            {fmt.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Download */}
                            <button
                                onClick={handleDownload}
                                disabled={isProcessing || !completedCrop}
                                className="btn btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Download className="w-5 h-5 mr-2" />
                                        Crop & Download
                                    </>
                                )}
                            </button>

                            {/* Save to Drive Button - Only for Pro/Business users */}
                            {session && usage && processedImageBlob && (() => {
                                const subscriptionTier = usage.subscriptionTier || 'free';
                                const basePlan = subscriptionTier.split('_')[0];
                                const plan = PLANS[basePlan];

                                return plan?.driveIntegration ? (
                                    <SaveToDriveButton
                                        file={processedImageBlob}
                                        fileName={processedFileName}
                                        toolUsed="crop"
                                    />
                                ) : null;
                            })()}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
