/**
 * Validates if a file is a valid image
 */
export function validateImageFile(file: File, maxSizeMB: number = 10): { valid: boolean; error?: string } {
    // Check file type
    if (!file.type.startsWith('image/')) {
        return { valid: false, error: 'Please upload an image file' };
    }

    // Check file size
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
        return { valid: false, error: `File size must be less than ${maxSizeMB}MB` };
    }

    return { valid: true };
}

/**
 * Loads an image file and returns an HTMLImageElement
 */
export function loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Failed to load image'));
        };

        img.src = url;
    });
}

/**
 * Resizes an image using canvas
 */
export function resizeImage(
    img: HTMLImageElement,
    width: number,
    height: number,
    quality: number = 0.95
): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Failed to get canvas context');
    }

    canvas.width = width;
    canvas.height = height;

    // Use high-quality image smoothing
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Draw the resized image
    ctx.drawImage(img, 0, 0, width, height);

    return canvas;
}

/**
 * Converts canvas to blob
 */
export function canvasToBlob(
    canvas: HTMLCanvasElement,
    format: string = 'image/png',
    quality: number = 0.95
): Promise<Blob> {
    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Failed to convert canvas to blob'));
                }
            },
            format,
            quality
        );
    });
}

/**
 * Downloads a blob as a file
 */
export function downloadBlob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Gets file extension from filename
 */
export function getFileExtension(filename: string): string {
    const parts = filename.split('.');
    return parts.length > 1 ? parts[parts.length - 1] : '';
}

/**
 * Gets MIME type from format
 */
export function getMimeType(format: string): string {
    const mimeTypes: Record<string, string> = {
        png: 'image/png',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        webp: 'image/webp',
        gif: 'image/gif',
    };

    return mimeTypes[format.toLowerCase()] || 'image/png';
}

/**
 * Formats file size in human-readable format
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Calculates dimensions maintaining aspect ratio
 */
export function calculateAspectRatio(
    originalWidth: number,
    originalHeight: number,
    newWidth?: number,
    newHeight?: number
): { width: number; height: number } {
    const aspectRatio = originalWidth / originalHeight;

    if (newWidth && !newHeight) {
        return {
            width: newWidth,
            height: Math.round(newWidth / aspectRatio),
        };
    }

    if (newHeight && !newWidth) {
        return {
            width: Math.round(newHeight * aspectRatio),
            height: newHeight,
        };
    }

    if (newWidth && newHeight) {
        return { width: newWidth, height: newHeight };
    }

    return { width: originalWidth, height: originalHeight };
}

/**
 * Calculate new dimensions based on percentage
 */
export function calculatePercentageSize(
    width: number,
    height: number,
    percentage: number
): { width: number; height: number } {
    return {
        width: Math.round(width * (percentage / 100)),
        height: Math.round(height * (percentage / 100)),
    };
}

/**
 * Estimate file size based on dimensions and format
 * This is a rough estimation
 */
export function estimateFileSize(
    width: number,
    height: number,
    format: string,
    quality: number
): number {
    const pixels = width * height;
    const bytesPerPixel = format === 'png' ? 4 : format === 'webp' ? 1.5 : 3;
    const compressionFactor = quality / 100;

    return Math.round(pixels * bytesPerPixel * compressionFactor);
}

/**
 * Validate image dimensions
 */
export function validateImageDimensions(
    width: number,
    height: number
): { valid: boolean; error?: string } {
    if (width < 1 || height < 1) {
        return { valid: false, error: 'Dimensions must be at least 1px' };
    }

    if (width > 10000 || height > 10000) {
        return { valid: false, error: 'Dimensions cannot exceed 10000px' };
    }

    return { valid: true };
}

/**
 * Convert file to base64
 */
export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Download a file from data URL
 */
export function downloadFile(dataUrl: string, filename: string) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
