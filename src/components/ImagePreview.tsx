'use client';

import { Download, ZoomIn, ZoomOut } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImagePreviewProps {
    originalUrl: string;
    processedUrl?: string;
    originalFile?: File;
    processedFile?: File;
    onDownload?: () => void;
    isProcessing?: boolean;
}

export default function ImagePreview({
    originalUrl,
    processedUrl,
    originalFile,
    processedFile,
    onDownload,
    isProcessing = false,
}: ImagePreviewProps) {
    const [zoom, setZoom] = useState(100);
    const [showComparison, setShowComparison] = useState(false);

    const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
    const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));

    return (
        <div className="card">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {processedUrl ? 'Preview' : 'Original Image'}
                    </h3>
                    {originalFile && (
                        <p className="text-sm text-gray-500">
                            {originalFile.name} • {(originalFile.size / 1024).toFixed(1)} KB
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {/* Zoom Controls */}
                    <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                        <button
                            onClick={handleZoomOut}
                            className="p-1.5 hover:bg-white dark:hover:bg-gray-600 rounded transition-colors"
                            disabled={zoom <= 50}
                        >
                            <ZoomOut className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </button>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 px-2">
                            {zoom}%
                        </span>
                        <button
                            onClick={handleZoomIn}
                            className="p-1.5 hover:bg-white dark:hover:bg-gray-600 rounded transition-colors"
                            disabled={zoom >= 200}
                        >
                            <ZoomIn className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>

                    {/* Download Button */}
                    {onDownload && processedUrl && (
                        <button
                            onClick={onDownload}
                            disabled={isProcessing}
                            className="btn btn-primary text-sm disabled:opacity-50"
                        >
                            <Download className="w-4 h-4" />
                            Download
                        </button>
                    )}
                </div>
            </div>

            {/* Comparison Toggle */}
            {processedUrl && (
                <div className="mb-4">
                    <button
                        onClick={() => setShowComparison(!showComparison)}
                        className="text-sm font-medium text-primary hover:underline"
                    >
                        {showComparison ? 'Hide' : 'Show'} Comparison
                    </button>
                </div>
            )}

            {/* Image Display */}
            <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                {showComparison && processedUrl ? (
                    <div className="grid grid-cols-2 gap-2">
                        {/* Original */}
                        <div className="relative">
                            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded z-10">
                                Original
                            </div>
                            <img
                                src={originalUrl}
                                alt="Original"
                                className="w-full h-auto object-contain"
                                style={{ transform: `scale(${zoom / 100})` }}
                            />
                            {originalFile && (
                                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                    {(originalFile.size / 1024).toFixed(1)} KB
                                </div>
                            )}
                        </div>

                        {/* Processed */}
                        <div className="relative">
                            <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded z-10">
                                Processed
                            </div>
                            <img
                                src={processedUrl}
                                alt="Processed"
                                className="w-full h-auto object-contain"
                                style={{ transform: `scale(${zoom / 100})` }}
                            />
                            {processedFile && (
                                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                    {(processedFile.size / 1024).toFixed(1)} KB
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="relative">
                        <img
                            src={processedUrl || originalUrl}
                            alt="Preview"
                            className={cn(
                                'w-full h-auto max-h-[500px] object-contain transition-transform duration-200',
                                isProcessing && 'opacity-50'
                            )}
                            style={{ transform: `scale(${zoom / 100})` }}
                        />
                        {isProcessing && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* File Size Comparison */}
            {processedFile && originalFile && (
                <div className="mt-4 p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                    <p className="text-sm text-green-800 dark:text-green-300">
                        ✓ Size reduced by{' '}
                        {(
                            ((originalFile.size - processedFile.size) / originalFile.size) *
                            100
                        ).toFixed(1)}
                        % ({(originalFile.size / 1024).toFixed(1)} KB →{' '}
                        {(processedFile.size / 1024).toFixed(1)} KB)
                    </p>
                </div>
            )}
        </div>
    );
}
