'use client';

import { useRef, useEffect, useState } from 'react';
import { useMemeGenerator, MemeText } from '@/hooks/useMemeGenerator';
import { useUsageTracking } from '@/hooks/useUsageTracking';
import FileUpload from '@/components/FileUpload';
import UpgradePrompt from '@/components/UpgradePrompt';
import UsageStats from '@/components/UsageStats';
import {
    Download,
    RotateCcw,
    Plus,
    Type,
    Palette,
    Trash2,
    Move
} from 'lucide-react';
import SaveToDriveButton from '@/components/drive/SaveToDriveButton';
import { useSession } from 'next-auth/react';
import { PLANS } from '@/config/plans';
import AdBanner from '@/components/ads/AdBanner';

interface MemeGeneratorToolProps {
    title?: string;
}

export default function MemeGeneratorTool({ title }: MemeGeneratorToolProps) {
    const {
        originalFile,
        canvasRef,
        texts,
        selectedTextId,
        setSelectedTextId,
        error,
        loadFile,
        addText,
        updateText,
        removeText,
        downloadMeme,
        reset
    } = useMemeGenerator();

    const [showUpgrade, setShowUpgrade] = useState(false);
    const [upgradeReason, setUpgradeReason] = useState<'downloads' | 'file_size' | 'storage'>('downloads');
    const [processedImageBlob, setProcessedImageBlob] = useState<Blob | null>(null);
    const [processedFileName, setProcessedFileName] = useState<string>('');
    const { data: session } = useSession();

    // Usage tracking
    const { usage, limits, canDownload, canProcessFile, trackDownload } = useUsageTracking();

    const containerRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef(false);
    const lastMousePosRef = useRef({ x: 0, y: 0 });

    // Handle drag interaction
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        // Check if any text is clicked
        // Simple hit detection: rough bounding box
        const clickedText = texts.slice().reverse().find(text => {
            // Approximate width based on font size/length - simple heuristic
            // ideally check canvas context.measureText but we don't have context here easily without ref storing
            const estimatedWidth = text.fontSize * 0.6 * text.content.length;
            const estimatedHeight = text.fontSize;

            return (
                x >= text.x - estimatedWidth / 2 &&
                x <= text.x + estimatedWidth / 2 &&
                y >= text.y - estimatedHeight / 2 &&
                y <= text.y + estimatedHeight / 2
            );
        });

        if (clickedText) {
            setSelectedTextId(clickedText.id);
            isDraggingRef.current = true;
            lastMousePosRef.current = { x: e.clientX, y: e.clientY };
        } else {
            setSelectedTextId(null);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDraggingRef.current || !selectedTextId || !canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = canvasRef.current.width / rect.width;
        const scaleY = canvasRef.current.height / rect.height;

        const dx = (e.clientX - lastMousePosRef.current.x) * scaleX;
        const dy = (e.clientY - lastMousePosRef.current.y) * scaleY;

        const text = texts.find(t => t.id === selectedTextId);
        if (text) {
            updateText(selectedTextId, {
                x: text.x + dx,
                y: text.y + dy
            });
        }

        lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
    };

    const handleFileSelect = async (file: File) => {
        // Check file size before loading
        if (!canProcessFile(file.size)) {
            setUpgradeReason('file_size');
            setShowUpgrade(true);
            return;
        }
        await loadFile(file);
    };

    const handleDownload = async () => {
        // Check if user can download
        if (!canDownload()) {
            setUpgradeReason('downloads');
            setShowUpgrade(true);
            return;
        }

        downloadMeme();

        // Convert canvas to blob for Drive save
        if (canvasRef.current) {
            canvasRef.current.toBlob((blob) => {
                if (blob) {
                    setProcessedImageBlob(blob);
                    setProcessedFileName('meme.png');
                }
            }, 'image/png');
        }

        // Track download
        if (originalFile) {
            await trackDownload(originalFile.size, 'Meme Generator', originalFile.name);
        }
    };

    const selectedText = texts.find(t => t.id === selectedTextId);

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-red-900/20 py-12">
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
                            <>Meme <span className="gradient-text">Generator</span></>
                        )}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                        Create viral memes in seconds directly in your browser
                    </p>
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
                        {/* Left: Canvas Area */}
                        <div className="lg:col-span-2 space-y-6">
                            <div
                                className="card relative p-0 bg-gray-900 flex items-center justify-center overflow-hidden min-h-[500px]"
                                ref={containerRef}
                            >
                                <canvas
                                    ref={canvasRef}
                                    onMouseDown={handleMouseDown}
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseUp}
                                    className="max-w-full max-h-[600px] object-contain cursor-crosshair"
                                />

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
                                    <span className="bg-black/50 text-white px-3 py-1 rounded-full text-xs">
                                        Drag text to move • Click to edit
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right: Controls */}
                        <div className="space-y-6">
                            {/* Text Layers */}
                            <div className="card">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Text Layers
                                    </h3>
                                    <button
                                        onClick={addText}
                                        className="text-primary hover:text-primary/80 font-medium text-sm flex items-center"
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Add Text
                                    </button>
                                </div>

                                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                                    {texts.map((text) => (
                                        <div
                                            key={text.id}
                                            onClick={() => setSelectedTextId(text.id)}
                                            className={`p-3 rounded-lg cursor-pointer border-2 transition-all ${selectedTextId === text.id
                                                ? 'border-primary bg-primary/5'
                                                : 'border-transparent bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-medium truncate max-w-[150px]">
                                                    {text.content}
                                                </span>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); removeText(text.id); }}
                                                    className="text-gray-400 hover:text-red-500"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Edit Text Controls */}
                            {selectedText && (
                                <div className="card animate-fade-in">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-semibold text-gray-500 uppercase">Content</label>
                                            <textarea
                                                value={selectedText.content}
                                                onChange={(e) => updateText(selectedText.id, { content: e.target.value.toUpperCase() })}
                                                className="w-full mt-1 p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-bold uppercase"
                                                rows={2}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-semibold text-gray-500 uppercase">Size</label>
                                                <input
                                                    type="number"
                                                    value={selectedText.fontSize}
                                                    onChange={(e) => updateText(selectedText.id, { fontSize: Number(e.target.value) })}
                                                    className="w-full mt-1 p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-semibold text-gray-500 uppercase flex items-center">
                                                    Color <Palette className="w-3 h-3 ml-1" />
                                                </label>
                                                <div className="flex space-x-2 mt-1">
                                                    <input
                                                        type="color"
                                                        value={selectedText.color}
                                                        onChange={(e) => updateText(selectedText.id, { color: e.target.value })}
                                                        className="h-8 w-full rounded cursor-pointer"
                                                    />
                                                    <input
                                                        type="color"
                                                        value={selectedText.strokeColor}
                                                        onChange={(e) => updateText(selectedText.id, { strokeColor: e.target.value })}
                                                        className="h-8 w-full rounded cursor-pointer"
                                                        title="Stroke Color"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Download */}
                            <button
                                onClick={handleDownload}
                                className="btn btn-primary w-full text-lg py-4 shadow-xl shadow-yellow-500/20"
                            >
                                <Download className="w-5 h-5 mr-2" />
                                Download Meme
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
                                        toolUsed="meme-generator"
                                    />
                                ) : null;
                            })()}
                            {/* Ad Banner for Free Users */}
                            <AdBanner adSlot="meme-generator-bottom" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
