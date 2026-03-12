'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Download, Upload, Trash2, Type, Image as ImageIcon, Move } from 'lucide-react';

type WatermarkType = 'text' | 'image';
type Position = 'top-left' | 'top-center' | 'top-right' | 'center' | 'bottom-left' | 'bottom-center' | 'bottom-right';

const POSITIONS: { label: string; value: Position }[] = [
    { label: '↖ Top Left', value: 'top-left' },
    { label: '↑ Top Center', value: 'top-center' },
    { label: '↗ Top Right', value: 'top-right' },
    { label: '• Center', value: 'center' },
    { label: '↙ Bottom Left', value: 'bottom-left' },
    { label: '↓ Bottom Center', value: 'bottom-center' },
    { label: '↘ Bottom Right', value: 'bottom-right' },
];

export default function WatermarkTool() {
    const [sourceImage, setSourceImage] = useState<string | null>(null);
    const [sourceName, setSourceName] = useState('');
    const [watermarkType, setWatermarkType] = useState<WatermarkType>('text');
    const [text, setText] = useState('© ResizeMe');
    const [fontSize, setFontSize] = useState(48);
    const [fontColor, setFontColor] = useState('#ffffff');
    const [opacity, setOpacity] = useState(80);
    const [position, setPosition] = useState<Position>('bottom-right');
    const [margin, setMargin] = useState(20);
    const [watermarkImageSrc, setWatermarkImageSrc] = useState<string | null>(null);
    const [watermarkSize, setWatermarkSize] = useState(20); // % of image width
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleMainUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSourceName(file.name);
        const reader = new FileReader();
        reader.onload = ev => setSourceImage(ev.target?.result as string);
        reader.readAsDataURL(file);
        setResultUrl(null);
    };

    const handleWatermarkImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ev => setWatermarkImageSrc(ev.target?.result as string);
        reader.readAsDataURL(file);
    };

    const applyWatermark = useCallback(() => {
        if (!sourceImage || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new window.Image();
        img.onload = () => {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            ctx.drawImage(img, 0, 0);
            ctx.globalAlpha = opacity / 100;

            const getXY = (pos: Position, w: number, h: number) => {
                const m = (margin / 100) * Math.min(img.naturalWidth, img.naturalHeight);
                const xMap: Record<string, number> = {
                    'top-left': m, 'top-center': img.naturalWidth / 2,
                    'top-right': img.naturalWidth - m, 'center': img.naturalWidth / 2,
                    'bottom-left': m, 'bottom-center': img.naturalWidth / 2,
                    'bottom-right': img.naturalWidth - m,
                };
                const yMap: Record<string, number> = {
                    'top-left': m, 'top-center': m,
                    'top-right': m, 'center': img.naturalHeight / 2,
                    'bottom-left': img.naturalHeight - m - h,
                    'bottom-center': img.naturalHeight - m - h,
                    'bottom-right': img.naturalHeight - m - h,
                };
                const alignMap: Record<string, CanvasTextAlign> = {
                    'top-left': 'left', 'top-center': 'center', 'top-right': 'right',
                    'center': 'center', 'bottom-left': 'left',
                    'bottom-center': 'center', 'bottom-right': 'right',
                };
                return { x: xMap[pos], y: yMap[pos], align: alignMap[pos] };
            };

            if (watermarkType === 'text') {
                const scaledFont = (fontSize / 100) * img.naturalHeight * 0.1;
                ctx.font = `bold ${scaledFont}px Inter, Arial, sans-serif`;
                ctx.fillStyle = fontColor;
                const { x, y, align } = getXY(position, 0, scaledFont);
                ctx.textAlign = align;
                ctx.fillText(text, x, y + scaledFont);
            } else if (watermarkImageSrc) {
                const wm = new window.Image();
                wm.onload = () => {
                    const wmW = (watermarkSize / 100) * img.naturalWidth;
                    const wmH = (wmW / wm.naturalWidth) * wm.naturalHeight;
                    const { x, y, align } = getXY(position, wmW, wmH);
                    const drawX = align === 'right' ? x - wmW : align === 'center' ? x - wmW / 2 : x;
                    ctx.drawImage(wm, drawX, y, wmW, wmH);
                    ctx.globalAlpha = 1;
                    setResultUrl(canvas.toDataURL('image/png'));
                };
                wm.src = watermarkImageSrc;
                return;
            }
            ctx.globalAlpha = 1;
            setResultUrl(canvas.toDataURL('image/png'));
        };
        img.src = sourceImage;
    }, [sourceImage, watermarkType, text, fontSize, fontColor, opacity, position, margin, watermarkImageSrc, watermarkSize]);

    useEffect(() => {
        if (sourceImage) applyWatermark();
    }, [sourceImage, applyWatermark]);

    const download = () => {
        if (!resultUrl) return;
        const a = document.createElement('a');
        a.href = resultUrl;
        a.download = `watermarked_${sourceName || 'image'}.png`;
        a.click();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12">
            <canvas ref={canvasRef} className="hidden" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Add <span className="gradient-text">Watermark</span> to Image
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Protect your photos with a text or image watermark. Adjust position, opacity, and size — all free.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Upload Main Image */}
                        <div className="card">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <Upload className="w-4 h-4 text-primary" /> Upload Image
                            </h3>
                            <label className="block w-full cursor-pointer">
                                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 text-center hover:border-primary transition-colors">
                                    {sourceName
                                        ? <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">{sourceName}</p>
                                        : <>
                                            <ImageIcon className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-500">Click to upload image</p>
                                        </>
                                    }
                                </div>
                                <input type="file" accept="image/*" className="hidden" onChange={handleMainUpload} />
                            </label>
                        </div>

                        {/* Watermark Type */}
                        <div className="card space-y-4">
                            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <Type className="w-4 h-4 text-primary" /> Watermark Settings
                            </h3>
                            <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                {(['text', 'image'] as const).map(t => (
                                    <button key={t} onClick={() => setWatermarkType(t)}
                                        className={`flex-1 py-2 text-sm capitalize transition-colors ${watermarkType === t ? 'bg-primary text-white' : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100'}`}>
                                        {t === 'text' ? '📝 Text' : '🖼️ Image'}
                                    </button>
                                ))}
                            </div>

                            {watermarkType === 'text' ? (
                                <div className="space-y-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Text</label>
                                        <input value={text} onChange={e => setText(e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Font Size: {fontSize}%</label>
                                        <input type="range" min={10} max={200} value={fontSize} onChange={e => setFontSize(+e.target.value)}
                                            className="w-full accent-primary" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Color</label>
                                        <input type="color" value={fontColor} onChange={e => setFontColor(e.target.value)}
                                            className="w-12 h-10 rounded border border-gray-200 cursor-pointer" />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Watermark Image</label>
                                    <label className="block cursor-pointer">
                                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center hover:border-primary transition-colors">
                                            <p className="text-sm text-gray-500">{watermarkImageSrc ? '✅ Image loaded' : 'Upload logo/watermark'}</p>
                                        </div>
                                        <input type="file" accept="image/*" className="hidden" onChange={handleWatermarkImageUpload} />
                                    </label>
                                    <div className="mt-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Size: {watermarkSize}% of image</label>
                                        <input type="range" min={5} max={80} value={watermarkSize} onChange={e => setWatermarkSize(+e.target.value)}
                                            className="w-full accent-primary" />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Opacity: {opacity}%</label>
                                <input type="range" min={10} max={100} value={opacity} onChange={e => setOpacity(+e.target.value)}
                                    className="w-full accent-primary" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Margin: {margin}%</label>
                                <input type="range" min={0} max={10} value={margin} onChange={e => setMargin(+e.target.value)}
                                    className="w-full accent-primary" />
                            </div>

                            {/* Position Grid */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
                                    <Move className="w-3 h-3" /> Position
                                </label>
                                <div className="grid grid-cols-3 gap-1">
                                    {POSITIONS.map(p => (
                                        <button key={p.value} onClick={() => setPosition(p.value)}
                                            className={`py-1.5 px-1 rounded text-xs transition-colors ${position === p.value ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200'}`}>
                                            {p.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button onClick={applyWatermark}
                                    className="flex-1 btn btn-primary text-sm py-2">
                                    Apply Watermark
                                </button>
                                {resultUrl && (
                                    <button onClick={() => { setSourceImage(null); setResultUrl(null); setSourceName(''); }}
                                        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-red-100 text-gray-500 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="card min-h-[400px] flex items-center justify-center">
                            {resultUrl ? (
                                <img src={resultUrl} alt="Watermarked preview" className="max-w-full max-h-[600px] rounded-lg shadow object-contain" />
                            ) : sourceImage ? (
                                <img src={sourceImage} alt="Source preview" className="max-w-full max-h-[600px] rounded-lg shadow object-contain opacity-60" />
                            ) : (
                                <div className="text-center text-gray-400">
                                    <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                    <p>Upload an image to get started</p>
                                </div>
                            )}
                        </div>
                        {resultUrl && (
                            <button onClick={download}
                                className="w-full btn btn-primary flex items-center justify-center gap-2">
                                <Download className="w-5 h-5" />
                                Download Watermarked Image
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
