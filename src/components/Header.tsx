'use client';

import Link from 'next/link';
import { Menu, X, Image as ImageIcon, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import UserNav from './UserNav';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);

    const resizeTools = [
        { label: 'Image Resize', href: '/resize-image-online', description: 'Resize to any dimension' },
        { label: 'Bulk Resize', href: '/tools/resize/bulk', description: 'Resize multiple images' },
        { label: 'Resize PNG', href: '/tools/resize/png', description: 'PNG specific resizing' },
        { label: 'Resize JPG', href: '/tools/resize/jpg', description: 'JPG specific resizing' },
        { label: 'Resize WebP', href: '/tools/resize/webp', description: 'WebP specific resizing' },
    ];

    const cropTools = [
        { label: 'Image Crop', href: '/crop-image-online', description: 'Crop with precision' },
        { label: 'Crop PNG', href: '/tools/crop/png', description: 'PNG specific cropping' },
        { label: 'Crop JPG', href: '/tools/crop/jpg', description: 'JPG specific cropping' },
        { label: 'Crop WebP', href: '/tools/crop/webp', description: 'WebP specific cropping' },
    ];

    const compressTools = [
        { label: 'Image Compress', href: '/compress-image-online', description: 'Reduce file size' },
        { label: 'Compress JPEG', href: '/tools/compress/jpeg', description: 'JPEG compression' },
        { label: 'Compress PNG', href: '/tools/compress/png', description: 'PNG compression' },
        { label: 'Compress GIF', href: '/tools/compress/gif', description: 'GIF compression' },
    ];

    const convertTools = [
        { label: 'Format Convert', href: '/convert-image-format', description: 'Convert between formats' },
        { label: 'To SVG', href: '/tools/convert/svg', description: 'Convert to SVG' },
        { label: 'To PNG', href: '/tools/convert/png', description: 'Convert to PNG' },
        { label: 'To JPG', href: '/tools/convert/jpg', description: 'Convert to JPG' },
        { label: 'HEIC to JPG', href: '/tools/convert/heic-to-jpg', description: 'HEIC to JPG' },
        { label: 'WebP to PNG', href: '/tools/convert/webp-to-png', description: 'WebP to PNG' },
        { label: 'PNG to JPG', href: '/tools/convert/png-to-jpg', description: 'PNG to JPG' },
    ];

    const moreTools = [
        { label: 'Meme Generator', href: '/tools/meme-generator', description: 'Create memes' },
        { label: 'Color Picker', href: '/tools/color-picker', description: 'Extract colors' },
        { label: 'Rotate Image', href: '/rotate-image', description: 'Rotate images' },
        { label: 'Flip Image', href: '/flip-image', description: 'Flip horizontally/vertically' },
        { label: 'Image Enlarger', href: '/tools/enlarge', description: 'Upscale images' },
    ];

    const toggleMobileCategory = (category: string) => {
        setExpandedMobileCategory(expandedMobileCategory === category ? null : category);
    };

    const MobileMenuItem = ({ label, items, category }: { label: string, items: typeof resizeTools, category: string }) => (
        <div className="flex flex-col">
            <button
                onClick={() => toggleMobileCategory(category)}
                className="flex items-center justify-between w-full px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
                {label}
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedMobileCategory === category ? 'rotate-180' : ''}`} />
            </button>
            {expandedMobileCategory === category && (
                <div className="flex flex-col pl-4 mt-1 space-y-1">
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <header className="sticky top-0 z-50 glass border-b border-white/10">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-black to-blue-900 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                            <img src="/logo.png" alt="Logo" className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold gradient-text hidden sm:block">
                            ResizeMe
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        <DropdownMenu label="Resize" items={resizeTools} />
                        <DropdownMenu label="Crop" items={cropTools} />
                        <DropdownMenu label="Compress" items={compressTools} />
                        <DropdownMenu label="Convert" items={convertTools} />
                        <DropdownMenu label="More" items={moreTools} />
                        <Link
                            href="/pricing"
                            className="px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium"
                        >
                            Pricing
                        </Link>
                    </div>

                    {/* Right side: Theme Toggle + User Nav */}
                    <div className="hidden md:flex items-center gap-3">
                        <ThemeToggle />
                        <UserNav />
                    </div>

                    {/* Mobile Menu Button + Theme Toggle */}
                    <div className="md:hidden flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 animate-fade-in border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 absolute left-0 right-0 px-4 shadow-xl border-b">
                        <div className="flex flex-col gap-2 max-h-[80vh] overflow-y-auto">
                            <MobileMenuItem label="Resize" items={resizeTools} category="resize" />
                            <MobileMenuItem label="Crop" items={cropTools} category="crop" />
                            <MobileMenuItem label="Compress" items={compressTools} category="compress" />
                            <MobileMenuItem label="Convert" items={convertTools} category="convert" />
                            <MobileMenuItem label="More Tools" items={moreTools} category="more" />

                            <div className="bg-gray-100 dark:bg-gray-800 h-px my-2 mx-4" />

                            <Link
                                href="/pricing"
                                className="px-4 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Pricing
                            </Link>

                            <div className="bg-gray-100 dark:bg-gray-800 h-px my-2 mx-4" />

                            <div className="flex flex-col gap-2 px-4 pb-4">
                                <Link
                                    href="/login"
                                    className="btn btn-ghost w-full justify-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="btn btn-primary w-full justify-center"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}

