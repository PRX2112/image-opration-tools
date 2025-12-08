import { useState, useCallback } from 'react';
import { fileToBase64, downloadFile } from '@/utils/imageUtils';

export interface ConvertFile {
    file: File;
    preview: string;
}

export function useImageConvert() {
    const [files, setFiles] = useState<ConvertFile[]>([]);
    const [isConverting, setIsConverting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addFiles = useCallback(async (newFiles: File[]) => {
        const processed: ConvertFile[] = [];
        for (const file of newFiles) {
            // Basic validation
            if (!file.type.startsWith('image/')) continue;
            processed.push({
                file,
                preview: URL.createObjectURL(file)
            });
        }
        setFiles(prev => [...prev, ...processed]);
    }, []);

    const removeFile = useCallback((index: number) => {
        setFiles(prev => {
            const newFiles = [...prev];
            URL.revokeObjectURL(newFiles[index].preview);
            newFiles.splice(index, 1);
            return newFiles;
        });
    }, []);

    const convertImages = useCallback(async (format: string, quality: number = 90) => {
        if (files.length === 0) return;

        setIsConverting(true);
        setError(null);

        try {
            const imagesPayload = await Promise.all(
                files.map(async (f) => ({
                    name: f.file.name,
                    content: await fileToBase64(f.file)
                }))
            );

            const response = await fetch('/api/convert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    images: imagesPayload,
                    format,
                    quality
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to convert images');
            }

            const result = await response.json();

            if (result.mode === 'single') {
                downloadFile(result.image, result.filename);
            } else if (result.mode === 'zip') {
                downloadFile(result.base64, result.file);
            }

        } catch (err: any) {
            console.error('Convert failed:', err);
            setError(err.message || 'Failed to convert images');
        } finally {
            setIsConverting(false);
        }
    }, [files]);

    const reset = useCallback(() => {
        files.forEach(f => URL.revokeObjectURL(f.preview));
        setFiles([]);
        setError(null);
    }, [files]);

    return {
        files,
        isConverting,
        error,
        addFiles,
        removeFile,
        convertImages,
        reset
    };
}
