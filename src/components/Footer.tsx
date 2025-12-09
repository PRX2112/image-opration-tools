'use client';

import Link from 'next/link';
import { Github, Twitter, Mail, Heart, Image as ImageIcon } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const toolCategories = [
        {
            title: 'Core Tools',
            links: [
                { name: 'Image Resize', href: '/tools/resize' },
                { name: 'Image Crop', href: '/tools/crop' },
                { name: 'Image Compress', href: '/tools/compress' },
                { name: 'Format Convert', href: '/tools/convert' },
            ],
        },
        {
            title: 'More Tools',
            links: [
                { name: 'Meme Generator', href: '/tools/meme-generator' },
                { name: 'Color Picker', href: '/tools/color-picker' },
                { name: 'Rotate Image', href: '/tools/rotate' },
                { name: 'Flip Image', href: '/tools/flip' },
                { name: 'Image Enlarger', href: '/tools/enlarge' },
            ],
        },
    ];

    const legalLinks = [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Contact Us', href: '/contact' },
    ];

    const socialLinks = [
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Mail, href: 'mailto:support@resizeme.com', label: 'Email' },
    ];

    return (
        <footer className="relative border-t border-gray-200 dark:border-gray-800">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                <ImageIcon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold gradient-text">GetPixelTool</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                            Professional image tools right in your browser. Resize, crop,
                            compress, and convert images with complete privacy.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300 hover:scale-110"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Tool Categories */}
                    {toolCategories.map((category) => (
                        <div key={category.title}>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                                {category.title}
                            </h4>
                            <ul className="space-y-2">
                                {category.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Legal & Info */}
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                            Company
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/pricing"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                                >
                                    Pricing
                                </Link>
                            </li>
                            {legalLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <p>✨ Client-Side Processing</p>
                            <p>🔒 Privacy First</p>
                            <p>⚡ Lightning Fast</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                            © {currentYear} GetPixelTool. Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> for the web.
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                            All processing happens in your browser. Your images never leave your device.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

