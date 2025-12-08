import { useState, useCallback, useEffect } from 'react';
import { validateImageFile, loadImage, fileToBase64, downloadFile } from '@/utils/imageUtils';

export interface CropArea {
    x: number;
    y: number;
    width: number;
    height: number;
}

export function useImageCrop() {
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Cleanup object URL when component unmounts or previewUrl changes
    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const loadImageFile = useCallback(async (file: File) => {
        try {
            setError(null);

            // Validate file
            const validation = validateImageFile(file);
            if (!validation.valid) {
                setError(validation.error || 'Invalid file');
                return;
            }

            // Create a persistent URL for display
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);

            // Load image to get dimensions (loadImage will create/revoke its own temp URL)
            const img = await loadImage(file);

            setOriginalFile(file);
            setOriginalImage(img);

        } catch (err) {
            console.error('Failed to load image:', err);
            setError('Failed to load image. Please try another file.');
        }
    }, []);

    const cropImage = useCallback(async (cropArea: CropArea, rotate: number = 0, format: string = 'png') => {
        if (!originalFile) return;

        setIsProcessing(true);
        setError(null);

        try {
            const base64 = await fileToBase64(originalFile);

            const response = await fetch('/api/crop', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    image: base64,
                    crop: cropArea,
                    rotate,
                    format,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to crop image');
            }

            const result = await response.json();

            // Download the result
            downloadFile(result.image, `cropped.${format}`);

        } catch (err: any) {
            console.error('Crop failed:', err);
            setError(err.message || 'Failed to crop image');
        } finally {
            setIsProcessing(false);
        }
    }, [originalFile]);

    const reset = useCallback(() => {
        if (previewUrl && previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl);
        }
        setOriginalFile(null);
        setOriginalImage(null);
        setPreviewUrl(null);
        setError(null);
        setIsProcessing(false);
    }, [previewUrl]);

    return {
        originalFile,
        originalImage,
        previewUrl,
        isProcessing,
        error,
        loadImageFile,
        cropImage,
        reset,
    };
}
