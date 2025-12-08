'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    href: string;
    gradient?: string;
}

export default function ToolCard({
    icon: Icon,
    title,
    description,
    href,
    gradient = 'from-purple-500 to-blue-500',
}: ToolCardProps) {
    return (
        <Link href={href} className="group block">
            <div className="card h-full relative overflow-hidden">
                {/* Gradient Glow Effect */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`}></div>

                <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:gradient-text transition-all duration-300">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {description}
                    </p>

                    {/* Arrow Indicator */}
                    <div className="mt-4 flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                        Try it now
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}
