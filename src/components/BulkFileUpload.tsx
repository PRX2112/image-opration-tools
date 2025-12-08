'use client';

import { Upload, X, FileImage, Plus } from 'lucide-react';
import { useCallback, useState } from 'react';

interface BulkFileUploadProps {
    onFilesSelect: (files: File[]) => void;
    accept?: string;
    maxSizeMB?: number;
    maxFiles?: number;
}

export default function BulkFileUpload({
    onFilesSelect,
    accept = 'image/*',
    maxSizeMB = 10,
    maxFiles = 10,
}: BulkFileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string>('');

    const validateFiles = (fileList: File[]): File[] => {
        setError('');
        const validFiles: File[] = [];

        if (fileList.length > maxFiles) {
            setError(`You can only upload up to ${maxFiles} files at once.`);
            // Take only first maxFiles
            fileList = fileList.slice(0, maxFiles);
        }

        for (const file of fileList) {
            // Check file type
            if (!file.type.startsWith('image/')) {
                continue; // Skip non-image files
            }

            // Check file size
            const maxSize = maxSizeMB * 1024 * 1024;
            if (file.size > maxSize) {
                // Skip oversized files or warn? For bulk, let's skip and maybe warn.
                // For simplicity, just adding valid ones.
                continue;
            }

            validFiles.push(file);
        }

        if (validFiles.length === 0 && fileList.length > 0) {
            setError('No valid image files found inside limits.');
        }

        return validFiles;
    };

    const handleFiles = (files: FileList | null) => {
        if (!files) return;
        const fileArray = Array.from(files);
        const validFiles = validateFiles(fileArray);
        if (validFiles.length > 0) {
            onFilesSelect(validFiles);
        }
    };

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragging(false);

            if (e.dataTransfer.files) {
                handleFiles(e.dataTransfer.files);
            }
        },
        [onFilesSelect]
    );

    const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
    };

    return (
        <div>
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer
          ${isDragging
                        ? 'border-primary bg-primary/5 scale-105'
                        : 'border-gray-300 dark:border-gray-700 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-900/50'
                    }
        `}
            >
                <input
                    type="file"
                    accept={accept}
                    multiple
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Upload files"
                />

                <div className="flex flex-col items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
                        <Plus className="w-8 h-8 text-white" />
                    </div>

                    <div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {isDragging ? 'Drop your images here' : 'Drop multiple images here'}
                        </p>
                        <p className="text-sm text-gray-500">
                            or click to browse (up to {maxFiles} files)
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center text-xs text-gray-400">
                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                            PNG
                        </span>
                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                            JPG
                        </span>
                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                            WebP
                        </span>
                    </div>
                </div>
            </div>

            {error && (
                <div className="mt-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
            )}
        </div>
    );
}
