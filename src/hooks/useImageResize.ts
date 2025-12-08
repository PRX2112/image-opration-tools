'use client';

import { useState, useCallback } from 'react';
import {
    loadImage,
    resizeImage,
    canvasToBlob,
    downloadBlob,
    calculateAspectRatio,
    getFileExtension,
    getMimeType,
} from '@/utils/imageUtils';

interface ResizeOptions {
    width: number;
    height: number;
    maintainAspectRatio: boolean;
    quality: number;
    format: string;
}

export function useImageResize() {
    const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string>('');

    const loadImageFile = useCallback(async (file: File) => {
        try {
            setIsProcessing(true);
            setError('');

            const img = await loadImage(file);
            setOriginalImage(img);
            setOriginalFile(file);

            // Create preview URL
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

            setIsProcessing(false);
            return img;
        } catch (err) {
            setError('Failed to load image');
            setIsProcessing(false);
            throw err;
        }
    }, []);

    const resize = useCallback(
        async (options: ResizeOptions) => {
            if (!originalImage || !originalFile) {
                throw new Error('No image loaded');
            }

            try {
                setIsProcessing(true);
                setError('');

                let { width, height } = options;

                // Calculate dimensions with aspect ratio if needed
                if (options.maintainAspectRatio) {
                    const calculated = calculateAspectRatio(
                        originalImage.width,
                        originalImage.height,
                        width,
                        height
                    );
                    width = calculated.width;
                    height = calculated.height;
                }

                // Resize the image
                const canvas = resizeImage(originalImage, width, height, options.quality);

                // Convert to blob
                const mimeType = getMimeType(options.format);
                const blob = await canvasToBlob(canvas, mimeType, options.quality);

                setIsProcessing(false);
                return { blob, canvas, width, height };
            } catch (err) {
                setError('Failed to resize image');
                setIsProcessing(false);
                throw err;
            }
        },
        [originalImage, originalFile]
    );

    const download = useCallback(
        async (options: ResizeOptions) => {
            try {
                const result = await resize(options);

                // Generate filename
                const originalName = originalFile?.name || 'image';
                const nameWithoutExt = originalName.substring(
                    0,
                    originalName.lastIndexOf('.')
                ) || originalName;
                const filename = `${nameWithoutExt}_${result.width}x${result.height}.${options.format}`;

                // Download
                downloadBlob(result.blob, filename);

                return result;
            } catch (err) {
                throw err;
            }
        },
        [resize, originalFile]
    );

    const reset = useCallback(() => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setOriginalImage(null);
        setOriginalFile(null);
        setPreviewUrl('');
        setError('');
    }, [previewUrl]);

    return {
        originalImage,
        originalFile,
        previewUrl,
        isProcessing,
        error,
        loadImageFile,
        resize,
        download,
        reset,
    };
}
