'use client';

import { useEffect, useState } from 'react';
import { Clock, X, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface RecentUpload {
    id: string;
    toolName: string;
    toolHref: string;
    timestamp: number;
    thumbnailData?: string;
}

const MAX_RECENT_UPLOADS = 5;
const STORAGE_KEY = 'resizeme_recent_uploads';

export default function RecentUploads() {
    const [recentUploads, setRecentUploads] = useState<RecentUpload[]>([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        loadRecentUploads();
    }, []);

    const loadRecentUploads = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const uploads = JSON.parse(stored) as RecentUpload[];
                setRecentUploads(uploads);
                setIsVisible(uploads.length > 0);
            }
        } catch (error) {
            console.error('Failed to load recent uploads:', error);
        }
    };

    const clearHistory = () => {
        localStorage.removeItem(STORAGE_KEY);
        setRecentUploads([]);
        setIsVisible(false);
    };

    const removeUpload = (id: string) => {
        const updated = recentUploads.filter(upload => upload.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setRecentUploads(updated);
        if (updated.length === 0) {
            setIsVisible(false);
        }
    };

    const formatTimestamp = (timestamp: number) => {
        const now = Date.now();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    if (!isVisible || recentUploads.length === 0) {
        return null;
    }

    return (
        <div className="card mb-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Recent Edits
                    </h3>
                </div>
                <button
                    onClick={clearHistory}
                    className="text-sm text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                >
                    Clear All
                </button>
            </div>

            <div className="space-y-2">
                {recentUploads.map((upload) => (
                    <div
                        key={upload.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                    >
                        <Link href={upload.toolHref} className="flex items-center gap-3 flex-1">
                            <RefreshCw className="w-4 h-4 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {upload.toolName}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {formatTimestamp(upload.timestamp)}
                                </p>
                            </div>
                        </Link>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                removeUpload(upload.id);
                            }}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                            aria-label="Remove"
                        >
                            <X className="w-4 h-4 text-gray-400 hover:text-red-600 dark:hover:text-red-400" />
                        </button>
                    </div>
                ))}
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Your recent edits are stored locally and never leave your device.
            </p>
        </div>
    );
}

// Helper function to add a recent upload (call this from tool components)
export const addRecentUpload = (toolName: string, toolHref: string) => {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        const existing = stored ? JSON.parse(stored) : [];

        const newUpload: RecentUpload = {
            id: `${Date.now()}-${Math.random()}`,
            toolName,
            toolHref,
            timestamp: Date.now(),
        };

        const updated = [newUpload, ...existing].slice(0, MAX_RECENT_UPLOADS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
        console.error('Failed to save recent upload:', error);
    }
};
