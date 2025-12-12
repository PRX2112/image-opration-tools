'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Home, ArrowRight } from 'lucide-react';
import { track404Error, trackSearch } from '@/lib/analytics';

export default function NotFound() {
    const [searchQuery, setSearchQuery] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Track 404 error
        const referrer = document.referrer || 'direct';
        const path = window.location.pathname;
        track404Error(path, referrer);

        // Log to console for debugging (can be removed in production)
        console.log('404 Error:', { path, referrer });
    }, []);

    const popularTools = [
        { name: 'Resize Image', href: '/tools/resize', description: 'Resize images to any dimension' },
        { name: 'Compress Image', href: '/tools/compress', description: 'Reduce file size without quality loss' },
        { name: 'Crop Image', href: '/tools/crop', description: 'Crop and trim images with precision' },
        { name: 'Convert Format', href: '/tools/convert', description: 'Convert between image formats' },
        { name: 'Meme Generator', href: '/tools/meme-generator', description: 'Create hilarious memes' },
        { name: 'Color Picker', href: '/tools/color-picker', description: 'Extract colors from images' },
    ];

    const filteredTools = searchQuery
        ? popularTools.filter(tool =>
            tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : popularTools;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery && mounted) {
            trackSearch(searchQuery, filteredTools.length);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                {/* 404 Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Oops! The page you're looking for doesn't exist. But don't worry, we have plenty of amazing tools for you to explore.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-12 animate-fade-in" style={{ animationDelay: '100ms' }}>
                    <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search for tools..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors"
                            />
                        </div>
                    </form>
                </div>

                {/* Popular Tools */}
                <div className="mb-12">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                        {searchQuery ? `Search Results (${filteredTools.length})` : 'Popular Tools'}
                    </h3>

                    {filteredTools.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredTools.map((tool, index) => (
                                <Link
                                    key={tool.href}
                                    href={tool.href}
                                    className="card group hover:shadow-xl transition-all duration-300 animate-fade-in"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 group-hover:gradient-text transition-all">
                                                {tool.name}
                                            </h4>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {tool.description}
                                            </p>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                No tools found matching "{searchQuery}"
                            </p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="btn btn-secondary"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>

                {/* Home Button */}
                <div className="text-center animate-fade-in" style={{ animationDelay: '200ms' }}>
                    <Link href="/" className="btn btn-primary inline-flex items-center gap-2">
                        <Home className="w-5 h-5" />
                        Back to Home
                    </Link>
                </div>

                {/* Help Text */}
                <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 animate-fade-in" style={{ animationDelay: '300ms' }}>
                    <p>
                        If you believe this is an error, please{' '}
                        <Link href="/contact" className="text-purple-600 dark:text-purple-400 hover:underline">
                            contact us
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
