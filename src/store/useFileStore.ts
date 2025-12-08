import { create } from 'zustand';

interface FileState {
    files: File[];
    processedFiles: { file: File; url: string }[];
    isProcessing: boolean;
    error: string | null;
    addFiles: (files: File[]) => void;
    removeFile: (index: number) => void;
    setProcessing: (processing: boolean) => void;
    setError: (error: string | null) => void;
    addProcessedFile: (file: File, url: string) => void;
    reset: () => void;
}

export const useFileStore = create<FileState>((set) => ({
    files: [],
    processedFiles: [],
    isProcessing: false,
    error: null,
    addFiles: (files) =>
        set((state) => ({ files: [...state.files, ...files], error: null })),
    removeFile: (index) =>
        set((state) => ({
            files: state.files.filter((_, i) => i !== index),
        })),
    setProcessing: (processing) => set({ isProcessing: processing }),
    setError: (error) => set({ error }),
    addProcessedFile: (file, url) =>
        set((state) => ({
            processedFiles: [...state.processedFiles, { file, url }],
        })),
    reset: () =>
        set({
            files: [],
            processedFiles: [],
            isProcessing: false,
            error: null,
        }),
}));
