'use client';

import { useRef, useEffect } from 'react';
import { useColorPicker } from '@/hooks/useColorPicker';
import FileUpload from '@/components/FileUpload';
import {
    RotateCcw,
    Pipette,
    Copy,
    Droplets
} from 'lucide-react';

interface ColorPickerToolProps {
    title?: string;
}

export default function ColorPickerTool({ title }: ColorPickerToolProps) {
    const {
        image,
        canvasRef,
        hoverColor,
        selectedColor,
        colorHistory,
        isEyeDropperActive,
        setIsEyeDropperActive,
        error,
        loadFile,
        pickColor,
        reset
    } = useColorPicker();

    // Use a ref for the displayed canvas interaction to handle scaling
    const displayCanvasRef = useRef<HTMLCanvasElement>(null);

    // Copy to clipboard helper
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Optional: show toast
    };

    // Draw the display canvas
    useEffect(() => {
        const canvas = displayCanvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (canvas && ctx && image) {
            // Wait for dimension init if needed, though parent container usually constrains max-width
            // We just let the canvas be responsive via CSS, but we need internal resolution to match image
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
        }
    }, [image]);

    // Handle mouse events map screen coords to image coords
    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!image || !displayCanvasRef.current) return;

        const rect = displayCanvasRef.current.getBoundingClientRect();
        const scaleX = image.width / rect.width;
        const scaleY = image.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        pickColor(x, y, false);
    };

    const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!image || !displayCanvasRef.current) return;

        const rect = displayCanvasRef.current.getBoundingClientRect();
        const scaleX = image.width / rect.width;
        const scaleY = image.height / rect.height;

        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        pickColor(x, y, true);
    };

    // Active color to show details for (Locked selection or current hover)
    const activeColor = selectedColor || hoverColor;

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-emerald-50 dark:from-cyan-900/20 dark:via-teal-900/20 dark:to-emerald-900/20 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        {title || (
                            <>Color <span className="gradient-text">Picker</span></>
                        )}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                        Extract precise colors from any image in HEX, RGB, and HSL
                    </p>
                </div>

                {!image ? (
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
                        {/* Hidden Source Canvas for Logical Reads */}
                        <canvas ref={canvasRef} className="hidden" />

                        {/* Left: Image Area */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="card relative p-0 bg-gray-900 flex items-center justify-center overflow-hidden min-h-[500px] cursor-crosshair">
                                <canvas
                                    ref={displayCanvasRef}
                                    onMouseMove={handleMouseMove}
                                    onClick={handleClick}
                                    onMouseLeave={() => !selectedColor && reset()} // Optional behavior?
                                    className="max-w-full max-h-[600px] object-contain"
                                />

                                {/* Magnifier Logic could go here: absolute div following mouse */}
                                {hoverColor && isEyeDropperActive && (
                                    <div
                                        className="pointer-events-none absolute w-24 h-24 rounded-full border-2 border-white shadow-xl overflow-hidden bg-gray-900 z-20"
                                        style={{
                                            // This requires tracking mouse screen coords specifically or re-calculating position relative to container
                                            // For simplicity, sticking to side panel preview for now, or would need valid mouse tracking state
                                            display: 'none'
                                        }}
                                    >
                                        {/* Magnifier content */}
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

                        {/* Right: Info Panel */}
                        <div className="space-y-6">
                            {/* Color Preview Card */}
                            <div className="card">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <Pipette className="w-5 h-5 mr-2 text-primary" />
                                    Selected Color
                                </h3>

                                <div className="space-y-6">
                                    {/* Swatch */}
                                    <div
                                        className="w-full h-24 rounded-xl shadow-inner transition-colors duration-75 border border-gray-200 dark:border-gray-700"
                                        style={{ backgroundColor: activeColor?.hex || '#ffffff' }}
                                    />

                                    {/* Values */}
                                    <div className="space-y-3">
                                        <div className="relative group">
                                            <label className="text-xs font-semibold text-gray-500 uppercase">HEX</label>
                                            <div className="flex items-center mt-1">
                                                <input
                                                    readOnly
                                                    value={activeColor?.hex || '-'}
                                                    className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm"
                                                />
                                                <button
                                                    onClick={() => activeColor && copyToClipboard(activeColor.hex)}
                                                    className="ml-2 p-2 text-gray-400 hover:text-primary transition-colors"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="relative group">
                                            <label className="text-xs font-semibold text-gray-500 uppercase">RGB</label>
                                            <div className="flex items-center mt-1">
                                                <input
                                                    readOnly
                                                    value={activeColor ? `rgb(${activeColor.rgb.r}, ${activeColor.rgb.g}, ${activeColor.rgb.b})` : '-'}
                                                    className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm"
                                                />
                                                <button
                                                    onClick={() => activeColor && copyToClipboard(`rgb(${activeColor.rgb.r}, ${activeColor.rgb.g}, ${activeColor.rgb.b})`)}
                                                    className="ml-2 p-2 text-gray-400 hover:text-primary transition-colors"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="relative group">
                                            <label className="text-xs font-semibold text-gray-500 uppercase">HSL</label>
                                            <div className="flex items-center mt-1">
                                                <input
                                                    readOnly
                                                    value={activeColor ? `hsl(${activeColor.hsl.h}, ${activeColor.hsl.s}%, ${activeColor.hsl.l}%)` : '-'}
                                                    className="w-full p-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-sm"
                                                />
                                                <button
                                                    onClick={() => activeColor && copyToClipboard(`hsl(${activeColor.hsl.h}, ${activeColor.hsl.s}%, ${activeColor.hsl.l}%)`)}
                                                    className="ml-2 p-2 text-gray-400 hover:text-primary transition-colors"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* History */}
                            {colorHistory.length > 0 && (
                                <div className="card">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                        <Droplets className="w-5 h-5 mr-2 text-gray-500" />
                                        History
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {colorHistory.map((hex, i) => (
                                            <button
                                                key={`${hex}-${i}`}
                                                onClick={() => copyToClipboard(hex)}
                                                className="w-10 h-10 rounded-lg shadow-sm border text-xs flex items-center justify-center opacity-100 hover:scale-110 transition-transform group relative"
                                                style={{ backgroundColor: hex }}
                                                title={hex}
                                            >
                                                {/* Tooltip or feedback */}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
