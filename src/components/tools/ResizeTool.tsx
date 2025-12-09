'use client';

import { useState, useEffect } from 'react';
import FileUpload from '@/components/FileUpload';
import { useImageResize } from '@/hooks/useImageResize';
import { useUsageTracking } from '@/hooks/useUsageTracking';
import {
    Download,
    RotateCcw,
    Lock,
    Unlock,
    Instagram,
    Facebook,
    Twitter,
    Smartphone,
    Monitor,
} from 'lucide-react';
import { formatFileSize, calculatePercentageSize, fileToBase64, downloadFile } from '@/utils/imageUtils';
import UpgradePrompt from '@/components/UpgradePrompt';
import UsageStats from '@/components/UsageStats';

const PRESET_SIZES = [
    { name: 'Instagram Post', width: 1080, height: 1080, icon: Instagram },
    { name: 'Instagram Story', width: 1080, height: 1920, icon: Instagram },
    { name: 'Facebook Cover', width: 820, height: 312, icon: Facebook },
    { name: 'Twitter Header', width: 1500, height: 500, icon: Twitter },
    { name: 'HD', width: 1920, height: 1080, icon: Monitor },
    { name: 'Mobile', width: 750, height: 1334, icon: Smartphone },
];

const FORMATS = [
    { value: 'png', label: 'PNG' },
    { value: 'jpg', label: 'JPG' },
    { value: 'webp', label: 'WebP' },
];

const PERCENTAGE_PRESETS = [
    { label: '50%', value: 50 },
    { label: '75%', value: 75 },
    { label: '100%', value: 100 },
    { label: '125%', value: 125 },
    { label: '150%', value: 150 },
    { label: '200%', value: 200 },
];

interface ResizeToolProps {
    defaultFormat?: string;
    title?: string;
}

export default function ResizeTool({ defaultFormat = 'png', title }: ResizeToolProps) {
    const {
        originalImage,
        originalFile,
        previewUrl,
        isProcessing,
        error,
        loadImageFile,
        download,
        reset,
    } = useImageResize();

    const [width, setWidth] = useState<number>(0);
    const [height, setHeight] = useState<number>(0);
    const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
    const [quality, setQuality] = useState(95);
    const [format, setFormat] = useState(defaultFormat);
    const [useServerProcessing, setUseServerProcessing] = useState(true);
    const [isServerProcessing, setIsServerProcessing] = useState(false);
    const [showUpgrade, setShowUpgrade] = useState(false);
    const [upgradeReason, setUpgradeReason] = useState<'downloads' | 'file_size' | 'storage'>('downloads');

    // Usage tracking
    const { usage, limits, canDownload, canProcessFile, trackDownload, showUpgradePrompt } = useUsageTracking();

    // Update dimensions when image loads
    useEffect(() => {
        if (originalImage) {
            setWidth(originalImage.width);
            setHeight(originalImage.height);
        }
    }, [originalImage]);

    // Update format if defaultFormat changes
    useEffect(() => {
        setFormat(defaultFormat);
    }, [defaultFormat]);

    const handleFileSelect = async (file: File) => {
        // Check file size before loading
        if (!canProcessFile(file.size)) {
            setUpgradeReason('file_size');
            setShowUpgrade(true);
            return;
        }
        await loadImageFile(file);
    };

    const handleWidthChange = (newWidth: number) => {
        setWidth(newWidth);
        if (maintainAspectRatio && originalImage) {
            const aspectRatio = originalImage.width / originalImage.height;
            setHeight(Math.round(newWidth / aspectRatio));
        }
    };

    const handleHeightChange = (newHeight: number) => {
        setHeight(newHeight);
        if (maintainAspectRatio && originalImage) {
            const aspectRatio = originalImage.width / originalImage.height;
            setWidth(Math.round(newHeight * aspectRatio));
        }
    };

    const handlePresetClick = (presetWidth: number, presetHeight: number) => {
        setWidth(presetWidth);
        setHeight(presetHeight);
    };

    const handlePercentageClick = (percentage: number) => {
        if (originalImage) {
            const newDimensions = calculatePercentageSize(
                originalImage.width,
                originalImage.height,
                percentage
            );
            setWidth(newDimensions.width);
            setHeight(newDimensions.height);
        }
    };

    const handleDownload = async () => {
        if (!originalFile || !originalImage) return;

        // Check if user can download
        if (!canDownload()) {
            setUpgradeReason('downloads');
            setShowUpgrade(true);
            return;
        }

        try {
            if (useServerProcessing) {
                setIsServerProcessing(true);

                // Convert file to base64
                const base64 = await fileToBase64(originalFile);

                // Call server API
                const response = await fetch('/api/resize', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        image: base64,
                        width,
                        height,
                        format,
                        quality,
                        preserveMetadata: false,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Server processing failed');
                }

                const result = await response.json();

                // Download the result
                const filename = `resized-${width}x${height}.${format}`;
                downloadFile(result.image, filename);

                // Track download
                await trackDownload(originalFile.size, 'Resize Tool', originalFile.name);

                setIsServerProcessing(false);
            } else {
                // Use client-side processing
                await download({
                    width,
                    height,
                    maintainAspectRatio,
                    quality: quality / 100,
                    format,
                });

                // Track download
                await trackDownload(originalFile.size, 'Resize Tool', originalFile.name);
            }
        } catch (err) {
            console.error('Download failed:', err);
            setIsServerProcessing(false);
        }
    };

    const handleReset = () => {
        reset();
        setWidth(0);
        setHeight(0);
        setQuality(95);
        setFormat(defaultFormat);
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
                            <>Image <span className="gradient-text">Resize</span></>
                        )}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                        Resize your images to any dimension while maintaining quality
                    </p>

                    <a
                        href="/tools/resize/bulk"
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white dark:bg-gray-800 border-2 border-primary/20 hover:border-primary text-primary font-medium transition-all hover:shadow-lg hover:shadow-primary/10"
                    >
                        <span>✨ Need to resize multiple images?</span>
                        <span className="font-bold">Try Bulk Resize →</span>
                    </a>
                </div>

                {/* Usage Stats - Show if user is logged in */}
                {usage && limits && (
                    <div className="mb-8 max-w-2xl mx-auto">
                        <UsageStats usage={usage} limits={limits} compact />
                    </div>
                )}

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Upload & Preview */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* File Upload */}
                        {!originalFile && (
                            <div className="animate-fade-in">
                                <FileUpload
                                    onFileSelect={handleFileSelect}
                                    accept="image/*"
                                    maxSizeMB={10}
                                />
                            </div>
                        )}

                        {/* Preview */}
                        {originalFile && previewUrl && (
                            <div className="card animate-fade-in">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            Preview
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Original: {originalImage?.width} × {originalImage?.height}px
                                            {originalFile && ` • ${formatFileSize(originalFile.size)}`}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleReset}
                                        className="btn btn-ghost flex items-center gap-2"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                        Reset
                                    </button>
                                </div>

                                <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="w-full h-auto max-h-[500px] object-contain"
                                    />
                                </div>

                                {error && (
                                    <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Preset Sizes */}
                        {originalFile && (
                            <div className="card animate-fade-in">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Preset Sizes
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {PRESET_SIZES.map((preset) => (
                                        <button
                                            key={preset.name}
                                            onClick={() => handlePresetClick(preset.width, preset.height)}
                                            className="flex items-center gap-3 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                                                <preset.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                    {preset.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {preset.width} × {preset.height}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Percentage Scaling */}
                        {originalFile && (
                            <div className="card animate-fade-in">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Scale by Percentage
                                </h3>
                                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                                    {PERCENTAGE_PRESETS.map((preset) => (
                                        <button
                                            key={preset.value}
                                            onClick={() => handlePercentageClick(preset.value)}
                                            className="px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary hover:bg-primary/5 transition-all duration-200 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            {preset.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Controls */}
                    {originalFile && (
                        <div className="space-y-6 animate-fade-in">
                            {/* Dimensions */}
                            <div className="card">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Dimensions
                                </h3>

                                <div className="space-y-4">
                                    {/* Width */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Width (px)
                                        </label>
                                        <input
                                            type="number"
                                            value={width}
                                            onChange={(e) => handleWidthChange(Number(e.target.value))}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            min="1"
                                        />
                                    </div>

                                    {/* Aspect Ratio Lock */}
                                    <button
                                        onClick={() => setMaintainAspectRatio(!maintainAspectRatio)}
                                        className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-primary transition-colors"
                                    >
                                        {maintainAspectRatio ? (
                                            <Lock className="w-4 h-4 text-primary" />
                                        ) : (
                                            <Unlock className="w-4 h-4 text-gray-400" />
                                        )}
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {maintainAspectRatio ? 'Locked' : 'Unlocked'} Aspect Ratio
                                        </span>
                                    </button>

                                    {/* Height */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Height (px)
                                        </label>
                                        <input
                                            type="number"
                                            value={height}
                                            onChange={(e) => handleHeightChange(Number(e.target.value))}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            min="1"
                                        />
                                    </div>
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

                            {/* Quality */}
                            <div className="card">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Quality: {quality}%
                                </h3>
                                <input
                                    type="range"
                                    min="1"
                                    max="100"
                                    value={quality}
                                    onChange={(e) => setQuality(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>Lower size</span>
                                    <span>Higher quality</span>
                                </div>
                            </div>

                            {/* Download Button */}
                            <button
                                onClick={handleDownload}
                                disabled={isProcessing || isServerProcessing || !width || !height}
                                className="btn btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Download className="w-5 h-5" />
                                {isProcessing || isServerProcessing ? 'Processing...' : `Download (${width} × ${height}px)`}
                            </button>

                            {/* Info */}
                            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                                <p className="text-sm text-blue-800 dark:text-blue-300">
                                    💡 {useServerProcessing ? 'Server-side processing with Sharp for best quality.' : 'Your image is processed in your browser.'}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
