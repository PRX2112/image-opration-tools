import { useState, useCallback, useEffect } from 'react';
import { validateImageFile, loadImage, fileToBase64, downloadFile, formatFileSize } from '@/utils/imageUtils';

export interface CompressionResult {
    image: string; // base64
    originalSize: number;
    compressedSize: number;
    format: string;
}

export function useImageCompress() {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [compressedResult, setCompressedResult] = useState<CompressionResult | null>(null);
    const [isCompressing, setIsCompressing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [quality, setQuality] = useState(80);

    // Cleanup preview URL
    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const loadFile = useCallback(async (file: File) => {
        try {
            setError(null);
            setCompressedResult(null);

            const validation = validateImageFile(file);
            if (!validation.valid) {
                setError(validation.error || 'Invalid file');
                return;
            }

            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            setOriginalFile(file);

            // Initial compression with default quality
            await compressImage(file, 80);

        } catch (err) {
            console.error('Failed to load image:', err);
            setError('Failed to load image');
        }
    }, []);

    const compressImage = useCallback(async (file: File, qualityValue: number) => {
        setIsCompressing(true);
        setError(null);

        try {
            const base64 = await fileToBase64(file);

            const response = await fetch('/api/compress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: base64,
                    quality: qualityValue,
                    // format: optional, defaults to original
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to compress');
            }

            const result = await response.json();
            setCompressedResult(result);

        } catch (err: any) {
            console.error('Compression failed:', err);
            setError(err.message || 'Failed to compress image');
        } finally {
            setIsCompressing(false);
        }
    }, []);

    // Defounce quality change
    useEffect(() => {
        if (!originalFile) return;

        const timer = setTimeout(() => {
            compressImage(originalFile, quality);
        }, 500); // 500ms debounce

        return () => clearTimeout(timer);
    }, [quality, originalFile, compressImage]);

    const reset = useCallback(() => {
        if (previewUrl && previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl);
        }
        setOriginalFile(null);
        setPreviewUrl(null);
        setCompressedResult(null);
        setError(null);
        setQuality(80);
    }, [previewUrl]);

    return {
        originalFile,
        previewUrl,
        compressedResult,
        isCompressing,
        error,
        quality,
        setQuality,
        loadFile,
        reset,
    };
}
