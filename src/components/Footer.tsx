'use client';

import Link from 'next/link';
import { Github, Twitter, Mail, Heart, Image as ImageIcon } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const toolCategories = [
        {
            title: 'Image Editing Tools',
            links: [
                { name: 'Resize Image Online', href: '/resize-image-online', description: 'Free online image resizer' },
                { name: 'Crop Image Online', href: '/crop-image-online', description: 'Crop photos online' },
                { name: 'Compress Image', href: '/compress-image-online', description: 'Reduce image file size' },
                { name: 'Convert Image Format', href: '/convert-image-format', description: 'Convert JPG, PNG, WebP' },
            ],
        },
        {
            title: 'Advanced Tools',
            links: [
                { name: 'Rotate Image', href: '/tools/rotate', description: 'Rotate photos online' },
                { name: 'Flip Image', href: '/tools/flip', description: 'Flip images horizontally or vertically' },
                { name: 'Enlarge Image', href: '/tools/enlarge', description: 'Upscale image quality' },
                { name: 'Meme Generator', href: '/tools/meme-generator', description: 'Create memes online' },
                { name: 'Color Picker', href: '/tools/color-picker', description: 'Extract colors from images' },
            ],
        },
        {
            title: 'Popular Formats',
            links: [
                { name: 'Resize JPG', href: '/resize', description: 'Resize JPG images' },
                { name: 'Resize PNG', href: '/resize', description: 'Resize PNG images' },
                { name: 'Compress JPG', href: '/tools/compress', description: 'Compress JPG files' },
                { name: 'Convert to WebP', href: '/tools/convert', description: 'Convert images to WebP' },
            ],
        },
    ];

    const companyLinks = [
        { name: 'Pricing Plans', href: '/pricing', description: 'View our pricing' },
        { name: 'Privacy Policy', href: '/privacy', description: 'How we protect your data' },
        { name: 'Terms of Service', href: '/terms', description: 'Terms and conditions' },
        { name: 'Refund Policy', href: '/refund', description: 'Our refund policy' },
        { name: 'Shipping Policy', href: '/shipping', description: 'Shipping information' },
        { name: 'Contact Us', href: '/contact', description: 'Get in touch' },
    ];

    const socialLinks = [
        { icon: Github, href: '#', label: 'Follow ResizeMe on GitHub', name: 'GitHub' },
        { icon: Twitter, href: '#', label: 'Follow ResizeMe on Twitter', name: 'Twitter' },
        { icon: Mail, href: 'mailto:handleresizeme@gmail.com', label: 'Email ResizeMe Support', name: 'Email' },
    ];

    // Schema.org structured data for SEO
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ResizeMe",
        "url": "https://resizeme.in",
        "logo": "https://resizeme.in/icon.png",
        "description": "Professional online image editing tools. Resize, crop, compress, and convert images for free in your browser with complete privacy.",
        "email": "handleresizeme@gmail.com",
        "sameAs": [
            "https://github.com/resizeme",
            "https://twitter.com/resizeme"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "handleresizeme@gmail.com",
            "contactType": "Customer Support"
        }
    };

    return (
        <>
            {/* Schema.org JSON-LD for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />

            <footer className="relative border-t border-gray-200 dark:border-gray-800" role="contentinfo" aria-label="Site footer">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Brand Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                                    <img src="/logo.png" className="w-5 h-5 text-white" aria-hidden="true" />
                                </div>
                                <h2 className="text-xl font-bold gradient-text">ResizeMe</h2>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                                Professional online image editing tools. Resize, crop, compress, and convert images for free in your browser with complete privacy.
                            </p>


                            {/* Trust Badges */}
                            <div className="mt-4 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                                <p className="flex items-center gap-2">
                                    <span aria-hidden="true">✨</span>
                                    <span>100% Client-Side Processing</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span aria-hidden="true">🔒</span>
                                    <span>Privacy First - No Upload</span>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span aria-hidden="true">⚡</span>
                                    <span>Lightning Fast & Free</span>
                                </p>
                            </div>
                        </div>

                        {/* Tool Categories - SEO Optimized */}
                        {toolCategories.map((category) => (
                            <nav key={category.title} aria-label={category.title}>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                    {category.title}
                                </h3>
                                <ul className="space-y-2">
                                    {category.links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors hover:underline"
                                                title={link.description}
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        ))}

                        {/* Company Links */}
                        <nav aria-label="Company information">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                Company
                            </h3>
                            <ul className="space-y-2">
                                {companyLinks.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors hover:underline"
                                            title={link.description}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    {/* SEO-Rich Bottom Section */}
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex flex-col gap-4">
                            {/* SEO Keywords Section */}
                            <div className="text-xs text-gray-500 dark:text-gray-500 leading-relaxed">
                                <p className="mb-2">
                                    <strong className="text-gray-600 dark:text-gray-400">Free Online Image Tools:</strong> ResizeMe offers professional image editing tools including image resizer, photo cropper, image compressor, and format converter. Edit JPG, PNG, WebP, GIF, and other image formats directly in your browser without uploading to servers.
                                </p>
                                <p>
                                    <strong className="text-gray-600 dark:text-gray-400">Privacy & Security:</strong> All image processing happens locally in your browser using HTML5 Canvas API. Your photos never leave your device, ensuring complete privacy and data security.
                                </p>
                            </div>

                            {/* Copyright */}
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                    © {currentYear} ResizeMe.in - Free Online Image Editor. Made with <Heart className="w-4 h-4 text-red-500 fill-current" aria-label="love" /> for the web.
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                    All processing happens in your browser. Your images never leave your device.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

