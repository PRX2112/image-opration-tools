'use client';

import { Upload, X, FileImage } from 'lucide-react';
import { useCallback, useState } from 'react';

interface FileUploadProps {
    onFileSelect: (file: File) => void;
    accept?: string;
    maxSizeMB?: number;
    currentFile?: File | null;
    onClear?: () => void;
}

export default function FileUpload({
    onFileSelect,
    accept = 'image/*',
    maxSizeMB = 10,
    currentFile,
    onClear,
}: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string>('');

    const validateFile = (file: File): boolean => {
        setError('');

        // Check file type
        if (!file.type.startsWith('image/')) {
            setError('Please upload an image file');
            return false;
        }

        // Check file size
        const maxSize = maxSizeMB * 1024 * 1024;
        if (file.size > maxSize) {
            setError(`File size must be less than ${maxSizeMB}MB`);
            return false;
        }

        return true;
    };

    const handleFile = (file: File) => {
        if (validateFile(file)) {
            onFileSelect(file);
        }
    };

    const handleDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragging(false);

            const file = e.dataTransfer.files[0];
            if (file) {
                handleFile(file);
            }
        },
        [onFileSelect]
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
        const file = e.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    };

    if (currentFile) {
        return (
            <div className="card relative">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                            <FileImage className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                                {currentFile.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {(currentFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                        </div>
                    </div>
                    {onClear && (
                        <button
                            onClick={onClear}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Remove file"
                        >
                            <X className="w-5 h-5 text-gray-500" />
                        </button>
                    )}
                </div>
            </div>
        );
    }

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
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    aria-label="Upload file"
                />

                <div className="flex flex-col items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
                        <Upload className="w-8 h-8 text-white" />
                    </div>

                    <div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {isDragging ? 'Drop your image here' : 'Drop your image here'}
                        </p>
                        <p className="text-sm text-gray-500">
                            or click to browse (max {maxSizeMB}MB)
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
                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
                            GIF
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
