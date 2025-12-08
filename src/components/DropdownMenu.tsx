'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface DropdownItem {
    label: string;
    href: string;
    description?: string;
}

interface DropdownMenuProps {
    label: string;
    items: DropdownItem[];
    className?: string;
}

export default function DropdownMenu({
    label,
    items,
    className,
}: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={cn('relative', className)}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="flex items-center gap-1 px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium">
                {label}
                <ChevronDown
                    className={cn(
                        'w-4 h-4 transition-transform duration-200',
                        isOpen && 'rotate-180'
                    )}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                    >
                        <div className="py-2">
                            {items.map((item, index) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {item.label}
                                    </div>
                                    {item.description && (
                                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                            {item.description}
                                        </div>
                                    )}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
