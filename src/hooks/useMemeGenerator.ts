import { useState, useCallback, useRef, useEffect } from 'react';
import { validateImageFile, downloadFile } from '@/utils/imageUtils';

export interface MemeText {
    id: string;
    content: string;
    x: number;
    y: number;
    fontSize: number;
    color: string;
    strokeColor: string;
    isDragging?: boolean;
}

export function useMemeGenerator() {
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [originalFile, setOriginalFile] = useState<File | null>(null);
    const [texts, setTexts] = useState<MemeText[]>([]);
    const [selectedTextId, setSelectedTextId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Initial setup with top/bottom text
    const addDefaultTexts = useCallback((width: number, height: number) => {
        const topText: MemeText = {
            id: 'top',
            content: 'TOP TEXT',
            x: width / 2,
            y: height * 0.1,
            fontSize: Math.round(height * 0.1),
            color: '#ffffff',
            strokeColor: '#000000',
        };
        const bottomText: MemeText = {
            id: 'bottom',
            content: 'BOTTOM TEXT',
            x: width / 2,
            y: height * 0.9,
            fontSize: Math.round(height * 0.1),
            color: '#ffffff',
            strokeColor: '#000000',
        };
        setTexts([topText, bottomText]);
    }, []);

    const loadFile = useCallback(async (file: File) => {
        try {
            setError(null);
            const validation = validateImageFile(file);
            if (!validation.valid) {
                setError(validation.error || 'Invalid file');
                return;
            }

            setOriginalFile(file);

            const img = new Image();
            img.onload = () => {
                setImage(img);
                addDefaultTexts(img.width, img.height);
            };
            img.onerror = () => setError('Failed to load image');
            img.src = URL.createObjectURL(file);

        } catch (err) {
            console.error('Failed to load image:', err);
            setError('Failed to load image');
        }
    }, [addDefaultTexts]);

    const addText = useCallback(() => {
        if (!image) return;
        const newText: MemeText = {
            id: Date.now().toString(),
            content: 'NEW TEXT',
            x: image.width / 2,
            y: image.height / 2,
            fontSize: Math.round(image.height * 0.1),
            color: '#ffffff',
            strokeColor: '#000000',
        };
        setTexts(prev => [...prev, newText]);
        setSelectedTextId(newText.id);
    }, [image]);

    const updateText = useCallback((id: string, updates: Partial<MemeText>) => {
        setTexts(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    }, []);

    const removeText = useCallback((id: string) => {
        setTexts(prev => prev.filter(t => t.id !== id));
        if (selectedTextId === id) setSelectedTextId(null);
    }, [selectedTextId]);

    // Draw canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !image) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw image
        ctx.drawImage(image, 0, 0);

        // Draw texts
        texts.forEach(text => {
            ctx.font = `bold ${text.fontSize}px Impact, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Stroke
            ctx.strokeStyle = text.strokeColor;
            ctx.lineWidth = text.fontSize / 15;
            ctx.lineJoin = 'round';
            ctx.strokeText(text.content, text.x, text.y);

            // Fill
            ctx.fillStyle = text.color;
            ctx.fillText(text.content, text.x, text.y);

            // Selection indicator
            if (selectedTextId === text.id) {
                const metrics = ctx.measureText(text.content);
                const height = text.fontSize;
                const width = metrics.width;
                ctx.strokeStyle = '#3b82f6'; // Primary blue
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.strokeRect(
                    text.x - width / 2 - 10,
                    text.y - height / 2 - 5,
                    width + 20,
                    height + 10
                );
                ctx.setLineDash([]);
            }
        });

    }, [image, texts, selectedTextId]);

    const downloadMeme = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Temporarily deselect text to remove selection box
        const currentSelection = selectedTextId;
        setSelectedTextId(null);

        // Need a small timeout to let the effect run and clear the selection box
        setTimeout(() => {
            const dataUrl = canvas.toDataURL('image/png', 1.0);
            downloadFile(dataUrl, `meme-${Date.now()}.png`);
            setSelectedTextId(currentSelection); // Restore selection
        }, 50);
    }, [selectedTextId]);

    const reset = useCallback(() => {
        setImage(null);
        setOriginalFile(null);
        setTexts([]);
        setError(null);
    }, []);

    return {
        originalFile,
        canvasRef,
        texts,
        selectedTextId,
        setSelectedTextId,
        error,
        loadFile,
        addText,
        updateText,
        removeText,
        downloadMeme,
        reset
    };
}
