'use client';

import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);

    const resizeTools = [
        { label: 'Image Resize', href: '/resize-image-online', description: 'Resize to any dimension' },
        { label: 'Bulk Resize', href: '/tools/resize/bulk', description: 'Resize multiple images' },
        { label: 'Resize to 100KB', href: '/resize-image-to-100kb', description: 'Hit exact file size' },
        { label: '1920×1080 (Full HD)', href: '/resize-image-to-1920x1080', description: 'Wallpapers & presentations' },
        { label: 'For Instagram', href: '/resize-image-for-instagram', description: 'Perfect Instagram sizes' },
        { label: 'For WhatsApp DP', href: '/resize-image-for-whatsapp', description: 'WhatsApp profile photo' },
        { label: 'For YouTube', href: '/resize-image-for-youtube', description: 'Thumbnail & channel art' },
        { label: 'Passport Photo', href: '/resize-image-for-passport', description: 'ID & visa photo sizes' },
    ];

    const compressTools = [
        { label: 'Image Compress', href: '/compress-image-online', description: 'Reduce file size' },
        { label: 'Compress JPG', href: '/compress-jpg-online', description: 'JPEG compression' },
        { label: 'Compress PNG', href: '/compress-png-online', description: 'PNG compression' },
        { label: 'Reduce Image Size', href: '/reduce-image-size-online', description: 'Any format' },
        { label: 'Compress to 50KB', href: '/compress-image-to-50kb', description: 'Hit 50KB target' },
        { label: 'Compress to 200KB', href: '/compress-image-to-200kb', description: 'Hit 200KB target' },
    ];

    const convertTools = [
        { label: 'Format Convert', href: '/convert-image-format', description: 'Convert between formats' },
        { label: 'WebP to PNG', href: '/webp-to-png', description: 'WebP → PNG' },
        { label: 'PNG to JPG', href: '/png-to-jpg', description: 'PNG → JPG' },
        { label: 'JPG to PNG', href: '/convert-jpg-to-png', description: 'JPG → PNG' },
        { label: 'PNG to WebP', href: '/convert-png-to-webp', description: 'PNG → WebP' },
        { label: 'HEIC to JPG', href: '/tools/convert/heic-to-jpg', description: 'iPhone photos' },
    ];

    const cropTools = [
        { label: 'Image Crop', href: '/crop-image-online', description: 'Crop with precision' },
        { label: 'Crop PNG', href: '/tools/crop/png', description: 'PNG specific cropping' },
        { label: 'Crop JPG', href: '/tools/crop/jpg', description: 'JPG specific cropping' },
    ];

    const moreTools = [
        { label: 'Watermark', href: '/tools/watermark', description: 'Add text/image watermark' },
        { label: 'Background Remover', href: '/tools/background-remover', description: 'AI background removal' },
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
                    </div>

                    {/* Right side: Theme Toggle */}
                    <div className="hidden md:flex items-center gap-3">
                        <ThemeToggle />
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
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
