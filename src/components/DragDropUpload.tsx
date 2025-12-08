'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DragDropUploadProps {
    onFilesSelected: (files: File[]) => void;
    accept?: Record<string, string[]>;
    maxSize?: number; // in bytes
    maxFiles?: number;
    multiple?: boolean;
    files?: File[];
    onRemoveFile?: (index: number) => void;
}

export default function DragDropUpload({
    onFilesSelected,
    accept = { 'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'] },
    maxSize = 10 * 1024 * 1024, // 10MB default
    maxFiles = 10,
    multiple = true,
    files = [],
    onRemoveFile,
}: DragDropUploadProps) {
    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: any[]) => {
            if (rejectedFiles.length > 0) {
                const errors = rejectedFiles[0].errors;
                if (errors[0]?.code === 'file-too-large') {
                    alert(`File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`);
                } else if (errors[0]?.code === 'file-invalid-type') {
                    alert('Invalid file type. Please upload an image file.');
                }
                return;
            }
            onFilesSelected(acceptedFiles);
        },
        [onFilesSelected, maxSize]
    );

    const { getRootProps, getInputProps, isDragActive, isDragReject } =
        useDropzone({
            onDrop,
            accept,
            maxSize,
            maxFiles,
            multiple,
        });

    return (
        <div className="w-full">
            <div
                {...getRootProps()}
                className={cn(
                    'relative border-2 border-dashed rounded-xl p-8 sm:p-12 transition-all duration-300 cursor-pointer',
                    'hover:border-primary hover:bg-primary/5',
                    isDragActive && !isDragReject && 'border-primary bg-primary/10 scale-[1.02]',
                    isDragReject && 'border-red-500 bg-red-50 dark:bg-red-900/20',
                    !isDragActive && 'border-gray-300 dark:border-gray-700'
                )}
            >
                <input {...getInputProps()} />

                <div className="flex flex-col items-center justify-center text-center space-y-4">
                    <div
                        className={cn(
                            'w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300',
                            isDragActive && !isDragReject
                                ? 'bg-primary/20 scale-110'
                                : 'bg-gray-100 dark:bg-gray-800'
                        )}
                    >
                        <Upload
                            className={cn(
                                'w-8 h-8 transition-colors',
                                isDragActive && !isDragReject
                                    ? 'text-primary'
                                    : 'text-gray-400 dark:text-gray-500'
                            )}
                        />
                    </div>

                    <div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {isDragActive
                                ? isDragReject
                                    ? 'Invalid file type'
                                    : 'Drop your images here'
                                : 'Drag & drop images here'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            or click to browse from your device
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>Max file size: {maxSize / (1024 * 1024)}MB</span>
                        <span className="hidden sm:inline">•</span>
                        <span>
                            {multiple ? `Up to ${maxFiles} files` : 'Single file only'}
                        </span>
                    </div>

                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        Supported formats: PNG, JPG, WebP, GIF, SVG
                    </p>
                </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Selected files ({files.length})
                    </p>
                    <div className="space-y-2">
                        {files.map((file, index) => (
                            <div
                                key={`${file.name}-${index}`}
                                className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                            >
                                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <File className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {(file.size / 1024).toFixed(1)} KB
                                    </p>
                                </div>
                                {onRemoveFile && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onRemoveFile(index);
                                        }}
                                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                    >
                                        <X className="w-4 h-4 text-gray-500" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Free Tier Notice */}
            <div className="mt-4 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    💡 Free tier: {maxSize / (1024 * 1024)}MB max file size.{' '}
                    <a href="/pricing" className="font-semibold underline hover:text-blue-600">
                        Upgrade for more
                    </a>
                </p>
            </div>
        </div>
    );
}
