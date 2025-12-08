import { useState, useCallback } from 'react';
import { validateImageFile, fileToBase64 } from '@/utils/imageUtils';

export interface TransformResult {
    image: string; // base64
    width: number;
    height: number;
}

export function useImageTransform() {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [result, setResult] = useState<TransformResult | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Transform State
    const [rotation, setRotation] = useState(0);
    const [flipH, setFlipH] = useState(false);
    const [flipV, setFlipV] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');

    const loadFile = useCallback(async (file: File) => {
        try {
            setError(null);
            setResult(null);

            const validation = validateImageFile(file, 10);
            if (!validation.valid) {
                setError(validation.error || 'Invalid file');
                return;
            }

            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            setOriginalFile(file);

            // Reset transform state
            setRotation(0);
            setFlipH(false);
            setFlipV(false);

        } catch (err) {
            console.error('Failed to load image:', err);
            setError('Failed to load image');
        }
    }, []);

    const applyTransform = useCallback(async (overrideParams?: {
        rotation?: number,
        flipHorizontal?: boolean,
        flipVertical?: boolean
    }) => {
        if (!originalFile) return;

        setIsProcessing(true);
        setError(null);

        try {
            const base64 = await fileToBase64(originalFile);

            const response = await fetch('/api/transform', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: base64,
                    rotation: overrideParams?.rotation ?? rotation,
                    flipHorizontal: overrideParams?.flipHorizontal ?? flipH,
                    flipVertical: overrideParams?.flipVertical ?? flipV,
                    background: backgroundColor
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to transform image');
            }

            const data = await response.json();
            setResult(data);

        } catch (err: any) {
            console.error('Transform failed:', err);
            setError(err.message || 'Failed to transform image');
        } finally {
            setIsProcessing(false);
        }
    }, [originalFile, rotation, flipH, flipV, backgroundColor]);

    const reset = useCallback(() => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setOriginalFile(null);
        setPreviewUrl(null);
        setResult(null);
        setError(null);
        setRotation(0);
        setFlipH(false);
        setFlipV(false);
    }, [previewUrl]);

    // Live preview style for CSS transforms (before applying to server)
    const getPreviewStyle = () => {
        return {
            transform: `rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
            transition: 'transform 0.3s ease'
        };
    };

    return {
        originalFile,
        previewUrl,
        result,
        isProcessing,
        error,
        rotation,
        setRotation,
        flipH,
        setFlipH,
        flipV,
        setFlipV,
        backgroundColor,
        setBackgroundColor,
        loadFile,
        applyTransform,
        reset,
        getPreviewStyle
    };
}
