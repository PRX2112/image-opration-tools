'use client';

import { useEffect, useState } from 'react';
import { Bookmark, X } from 'lucide-react';
import { trackBookmarkPrompt } from '@/lib/analytics';

const STORAGE_KEY = 'resizeme_bookmark_prompt_dismissed';
const USAGE_COUNT_KEY = 'resizeme_tool_usage_count';
const SHOW_AFTER_USES = 2;

export default function BookmarkPrompt() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        checkAndShowPrompt();
    }, []);

    const checkAndShowPrompt = () => {
        try {
            // Check if already dismissed
            const dismissed = localStorage.getItem(STORAGE_KEY);
            if (dismissed === 'true') {
                return;
            }

            // Check usage count
            const usageCount = parseInt(localStorage.getItem(USAGE_COUNT_KEY) || '0', 10);

            if (usageCount >= SHOW_AFTER_USES) {
                setIsVisible(true);
                trackBookmarkPrompt('shown');
            }
        } catch (error) {
            console.error('Failed to check bookmark prompt:', error);
        }
    };

    const handleBookmark = async () => {
        trackBookmarkPrompt('accepted');

        // Try to use the browser's bookmark API (limited support)
        if (window.sidebar && (window.sidebar as any).addPanel) {
            // Firefox
            (window.sidebar as any).addPanel(document.title, window.location.href, '');
        } else if ((window.external as any).AddFavorite) {
            // IE
            (window.external as any).AddFavorite(window.location.href, document.title);
        } else {
            // For modern browsers, show instructions
            alert('Press Ctrl+D (Cmd+D on Mac) to bookmark this page!');
        }

        handleDismiss();
    };

    const handleDismiss = () => {
        trackBookmarkPrompt('dismissed');
        localStorage.setItem(STORAGE_KEY, 'true');
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-slide-up">
            <div className="card relative overflow-hidden shadow-2xl border-2 border-purple-500 dark:border-purple-400">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>

                <div className="relative z-10">
                    <button
                        onClick={handleDismiss}
                        className="absolute top-2 right-2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                        aria-label="Dismiss"
                    >
                        <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </button>

                    <div className="flex items-start gap-4 pr-8">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                            <Bookmark className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                                Bookmark ResizeMe
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                Quick access to all your favorite image tools anytime!
                            </p>

                            <div className="flex gap-2">
                                <button
                                    onClick={handleBookmark}
                                    className="btn btn-primary text-sm py-2 px-4"
                                >
                                    Add Bookmark
                                </button>
                                <button
                                    onClick={handleDismiss}
                                    className="btn btn-secondary text-sm py-2 px-4"
                                >
                                    Maybe Later
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper function to increment usage count (call this from tool components)
export const incrementToolUsage = () => {
    try {
        const currentCount = parseInt(localStorage.getItem(USAGE_COUNT_KEY) || '0', 10);
        localStorage.setItem(USAGE_COUNT_KEY, (currentCount + 1).toString());
    } catch (error) {
        console.error('Failed to increment tool usage:', error);
    }
};
