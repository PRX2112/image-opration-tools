import { useState, useCallback } from 'react';
import { validateImageFile, fileToBase64, downloadFile } from '@/utils/imageUtils';

export interface EnlargeResult {
    image: string; // base64
    originalWidth: number;
    originalHeight: number;
    newWidth: number;
    newHeight: number;
}

export function useImageEnlarge() {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [result, setResult] = useState<EnlargeResult | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [factor, setFactor] = useState<2 | 4>(2);
    const [enhance, setEnhance] = useState(true);

    const loadFile = useCallback(async (file: File) => {
        try {
            setError(null);
            setResult(null);

            const validation = validateImageFile(file, 10); // 10MB limit
            if (!validation.valid) {
                setError(validation.error || 'Invalid file');
                return;
            }

            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            setOriginalFile(file);

        } catch (err) {
            console.error('Failed to load image:', err);
            setError('Failed to load image');
        }
    }, []);

    const enlargeImage = useCallback(async () => {
        if (!originalFile) return;

        setIsProcessing(true);
        setError(null);

        try {
            const base64 = await fileToBase64(originalFile);

            const response = await fetch('/api/enlarge', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: base64,
                    factor,
                    enhance
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to enlarge image');
            }

            const data = await response.json();
            setResult(data);

        } catch (err: any) {
            console.error('Enlarge failed:', err);
            setError(err.message || 'Failed to enlarge image');
        } finally {
            setIsProcessing(false);
        }
    }, [originalFile, factor, enhance]);

    const reset = useCallback(() => {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
        setOriginalFile(null);
        setPreviewUrl(null);
        setResult(null);
        setError(null);
    }, [previewUrl]);

    return {
        originalFile,
        previewUrl,
        result,
        isProcessing,
        error,
        factor,
        setFactor,
        enhance,
        setEnhance,
        loadFile,
        enlargeImage,
        reset
    };
}
