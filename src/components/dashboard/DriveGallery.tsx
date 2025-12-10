'use client';

import { HardDrive, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface DriveFile {
    id: string;
    fileName: string;
    mimeType: string;
    fileSize: number;
    thumbnailLink: string | null;
    webViewLink: string | null;
    createdAt: Date;
    toolUsed: string;
}

interface DriveGalleryProps {
    files: DriveFile[];
}

export default function DriveGallery({ files }: DriveGalleryProps) {
    if (files.length === 0) {
        return (
            <div className="text-center py-12 bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <HardDrive className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No Saved Files
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
                    Connect your Google Drive account and save your processed images directly to the cloud.
                </p>
                <a
                    href="/"
                    className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                    Start Creating
                </a>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {files.map((file) => (
                <div
                    key={file.id}
                    className="group bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-200 dark:border-gray-700/50 overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-500/50"
                >
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-gray-100 dark:bg-gray-900 overflow-hidden">
                        {file.thumbnailLink ? (
                            <img
                                src={file.thumbnailLink}
                                alt={file.fileName}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                    // Fallback to icon if image fails to load (e.g. 403 or broken link)
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                                }}
                            />
                        ) : null}

                        {/* Fallback Icon (Hidden by default if thumbnail exists) */}
                        <div className={`fallback-icon w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 dark:bg-gray-900 absolute top-0 left-0 ${file.thumbnailLink ? 'hidden' : ''}`}>
                            <HardDrive className="w-8 h-8 opacity-50" />
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            {file.webViewLink && (
                                <a
                                    href={file.webViewLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 bg-white rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                                    title="Open in Drive"
                                >
                                    <ExternalLink className="w-5 h-5 text-gray-900" />
                                </a>
                            )}
                        </div>

                        {/* Badge */}
                        <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 backdrop-blur-md rounded-md">
                            <span className="text-xs text-white font-medium capitalize">
                                {file.toolUsed}
                            </span>
                        </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate mb-1" title={file.fileName}>
                            {file.fileName}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>{(file.fileSize / 1024).toFixed(1)} KB</span>
                            <span suppressHydrationWarning>{new Date(file.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
