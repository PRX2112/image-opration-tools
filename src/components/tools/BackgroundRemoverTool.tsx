'use client';

import { useState, useRef, useEffect } from 'react';
import { Upload, Download, Trash2, Zap, Image as ImageIcon, Loader2 } from 'lucide-react';
import { removeBackground, Config } from '@imgly/background-removal';

export default function BackgroundRemoverTool() {
    const [sourceFile, setSourceFile] = useState<File | null>(null);
    const [sourceUrl, setSourceUrl] = useState<string | null>(null);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState<{ action: string; percent: number }>({ action: '', percent: 0 });
    const [error, setError] = useState<string | null>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Cleanup old URLs
        if (sourceUrl) URL.revokeObjectURL(sourceUrl);
        if (resultUrl) URL.revokeObjectURL(resultUrl);

        setSourceFile(file);
        setSourceUrl(URL.createObjectURL(file));
        setResultUrl(null);
        setError(null);
        setProgress({ action: '', percent: 0 });
    };

    const processImage = async () => {
        if (!sourceFile) return;

        setIsProcessing(true);
        setError(null);
        setProgress({ action: 'Initializing Models...', percent: 0 });

        try {
            const config: Config = {
                debug: false,
                progress: (key, current, total) => {
                    const pct = Math.round((current / total) * 100);
                    // key is usually something like 'fetch:model' or 'compute:inference'
                    let actionLabel = 'Processing...';
                    if (key.includes('fetch')) actionLabel = 'Downloading AI Models (Runs locally once)...';
                    if (key.includes('compute')) actionLabel = 'Removing Background...';
                    setProgress({ action: actionLabel, percent: pct || 0 });
                }
            };

            const blob = await removeBackground(sourceFile, config);
            const outputUrl = URL.createObjectURL(blob);
            setResultUrl(outputUrl);
            setProgress({ action: 'Complete!', percent: 100 });
        } catch (err: any) {
            console.error("BG Removal Error:", err);
            setError("Failed to remove background. Ensure you're on a modern browser or try a smaller image.");
        } finally {
            setIsProcessing(false);
        }
    };

    const reset = () => {
        setSourceFile(null);
        if (sourceUrl) URL.revokeObjectURL(sourceUrl);
        if (resultUrl) URL.revokeObjectURL(resultUrl);
        setSourceUrl(null);
        setResultUrl(null);
        setError(null);
    };

    const download = () => {
        if (!resultUrl) return;
        const a = document.createElement('a');
        a.href = resultUrl;
        a.download = `transparent_${sourceFile?.name.replace(/\.[^/.]+$/, "") || 'image'}.png`;
        a.click();
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (sourceUrl) URL.revokeObjectURL(sourceUrl);
            if (resultUrl) URL.revokeObjectURL(resultUrl);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-sm font-medium mb-4 shadow-sm border border-blue-200 dark:border-blue-800">
                        <Zap className="w-4 h-4 text-amber-500 fill-amber-500" /> New: 100% Free &amp; Private
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        AI <span className="gradient-text">Background Remover</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Remove image backgrounds in seconds using cutting-edge AI. Completely free, no uploads — runs entirely within your browser for max privacy.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start">
                    {/* Left side: Upload & Controls */}
                    <div className="card space-y-6">
                        {!sourceUrl ? (
                            <div className="space-y-4">
                                <label className="block w-full cursor-pointer">
                                    <div className="border-2 border-dashed border-purple-300 dark:border-purple-500/50 rounded-2xl p-10 text-center hover:bg-purple-50 dark:hover:bg-purple-900/10 hover:border-purple-500 transition-all group">
                                        <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                            <Upload className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Upload Image</h3>
                                        <p className="text-sm text-gray-500">Supports JPG, PNG, WebP</p>
                                    </div>
                                    <input type="file" accept="image/jpeg, image/png, image/webp" className="hidden" onChange={handleUpload} />
                                </label>

                                <div className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-400 grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">💻</span> Runs in Browser
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">🔒</span> Zero Uploads
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">🆓</span> 100% Free
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">✨</span> High Accuracy AI
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white truncate max-w-[200px]">{sourceFile?.name}</h3>
                                        <p className="text-sm text-gray-500">{(sourceFile!.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                    <button onClick={reset} disabled={isProcessing} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-xl text-sm">
                                        {error}
                                    </div>
                                )}

                                {!resultUrl && (
                                    <div className="space-y-4">
                                        <button
                                            onClick={processImage}
                                            disabled={isProcessing}
                                            className="w-full btn btn-primary text-lg py-4 flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            {isProcessing ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Removing Background...
                                                </>
                                            ) : (
                                                <>
                                                    <Zap className="w-5 h-5" /> Remove Background
                                                </>
                                            )}
                                        </button>

                                        {isProcessing && (
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                                                    <span>{progress.action}</span>
                                                    <span>{progress.percent}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className="bg-primary h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${progress.percent}%` }}
                                                    />
                                                </div>
                                                {progress.action.includes('Downloading') && (
                                                    <p className="text-xs text-center text-gray-500 mt-2">
                                                        Downloading the AI model. This only happens once and may take a moment depending on your connection.
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {resultUrl && (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-2">
                                            <Zap className="w-5 h-5 flex-shrink-0" />
                                            <span>Background removed successfully!</span>
                                        </div>
                                        <button onClick={download} className="w-full btn btn-primary text-lg py-4 flex items-center justify-center gap-2">
                                            <Download className="w-5 h-5" /> Download Transparent PNG
                                        </button>
                                        <p className="text-xs text-center text-gray-500">
                                            Downloads instantly. No watermarks.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right side: Previews */}
                    <div className="space-y-6">
                        {/* Result Checkered Background Container */}
                        <div className="card h-[400px] sm:h-[500px] flex flex-col relative overflow-hidden bg-[url('https://upload.wikimedia.org/wikipedia/commons/b/b2/A_checkered_background.png')] bg-repeat bg-center">
                            {/* Inner white overlay for empty state */}
                            {(!sourceUrl && !resultUrl) && <div className="absolute inset-0 bg-white dark:bg-gray-900 z-0" />}

                            <div className="relative z-10 flex-1 flex items-center justify-center p-4">
                                {resultUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={resultUrl} alt="Result" className="max-w-full max-h-full object-contain filter drop-shadow-2xl animate-fade-in" />
                                ) : sourceUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={sourceUrl} alt="Source" className={`max-w-full max-h-full object-contain transition-all duration-500 ${isProcessing ? 'blur-sm scale-105 opacity-50' : ''}`} />
                                ) : (
                                    <div className="text-center text-gray-400">
                                        <ImageIcon className="w-20 h-20 mx-auto mb-4 opacity-30" />
                                        <p className="text-lg">Image Preview</p>
                                    </div>
                                )}
                            </div>

                            {isProcessing && (
                                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                                    {/* Scanning line animation */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-slide-in-up" style={{ animationDuration: '2s', animationIterationCount: 'infinite' }} />
                                    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 font-medium text-primary animate-pulse flex items-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing Image...
                                    </div>
                                </div>
                            )}

                            {resultUrl && (
                                <div className="absolute top-4 right-4 z-20">
                                    <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/20">
                                        Transparent PNG
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
