'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Tool {
    name: string;
    href: string;
    description: string;
    gradient: string;
}

interface ToolRecommendationsProps {
    currentTool: string;
    onToolClick?: () => void;
}

const allTools: Record<string, Tool[]> = {
    resize: [
        { name: 'Compress Image', href: '/tools/compress', description: 'Reduce file size', gradient: 'from-orange-500 to-yellow-500' },
        { name: 'Crop Image', href: '/tools/crop', description: 'Trim your images', gradient: 'from-pink-500 to-rose-500' },
        { name: 'Convert Format', href: '/tools/convert', description: 'Change image format', gradient: 'from-green-500 to-teal-500' },
    ],
    compress: [
        { name: 'Resize Image', href: '/tools/resize', description: 'Change dimensions', gradient: 'from-purple-500 to-blue-500' },
        { name: 'Convert Format', href: '/tools/convert', description: 'Change image format', gradient: 'from-green-500 to-teal-500' },
        { name: 'Crop Image', href: '/tools/crop', description: 'Trim your images', gradient: 'from-pink-500 to-rose-500' },
    ],
    crop: [
        { name: 'Resize Image', href: '/tools/resize', description: 'Change dimensions', gradient: 'from-purple-500 to-blue-500' },
        { name: 'Rotate Image', href: '/tools/rotate', description: 'Fix orientation', gradient: 'from-indigo-500 to-purple-500' },
        { name: 'Flip Image', href: '/tools/flip', description: 'Mirror your image', gradient: 'from-red-500 to-pink-500' },
    ],
    convert: [
        { name: 'Compress Image', href: '/tools/compress', description: 'Reduce file size', gradient: 'from-orange-500 to-yellow-500' },
        { name: 'Resize Image', href: '/tools/resize', description: 'Change dimensions', gradient: 'from-purple-500 to-blue-500' },
        { name: 'Crop Image', href: '/tools/crop', description: 'Trim your images', gradient: 'from-pink-500 to-rose-500' },
    ],
    rotate: [
        { name: 'Flip Image', href: '/tools/flip', description: 'Mirror your image', gradient: 'from-red-500 to-pink-500' },
        { name: 'Crop Image', href: '/tools/crop', description: 'Trim your images', gradient: 'from-pink-500 to-rose-500' },
        { name: 'Resize Image', href: '/tools/resize', description: 'Change dimensions', gradient: 'from-purple-500 to-blue-500' },
    ],
    flip: [
        { name: 'Rotate Image', href: '/tools/rotate', description: 'Fix orientation', gradient: 'from-indigo-500 to-purple-500' },
        { name: 'Crop Image', href: '/tools/crop', description: 'Trim your images', gradient: 'from-pink-500 to-rose-500' },
        { name: 'Resize Image', href: '/tools/resize', description: 'Change dimensions', gradient: 'from-purple-500 to-blue-500' },
    ],
    enlarge: [
        { name: 'Compress Image', href: '/tools/compress', description: 'Reduce file size', gradient: 'from-orange-500 to-yellow-500' },
        { name: 'Convert Format', href: '/tools/convert', description: 'Change image format', gradient: 'from-green-500 to-teal-500' },
        { name: 'Resize Image', href: '/tools/resize', description: 'Change dimensions', gradient: 'from-purple-500 to-blue-500' },
    ],
    'meme-generator': [
        { name: 'Color Picker', href: '/tools/color-picker', description: 'Extract colors', gradient: 'from-blue-500 to-cyan-500' },
        { name: 'Crop Image', href: '/tools/crop', description: 'Trim your images', gradient: 'from-pink-500 to-rose-500' },
        { name: 'Resize Image', href: '/tools/resize', description: 'Change dimensions', gradient: 'from-purple-500 to-blue-500' },
    ],
    'color-picker': [
        { name: 'Meme Generator', href: '/tools/meme-generator', description: 'Create memes', gradient: 'from-yellow-500 to-orange-500' },
        { name: 'Crop Image', href: '/tools/crop', description: 'Trim your images', gradient: 'from-pink-500 to-rose-500' },
        { name: 'Resize Image', href: '/tools/resize', description: 'Change dimensions', gradient: 'from-purple-500 to-blue-500' },
    ],
};

export default function ToolRecommendations({ currentTool, onToolClick }: ToolRecommendationsProps) {
    const [recommendations, setRecommendations] = useState<Tool[]>([]);

    useEffect(() => {
        const toolKey = currentTool.toLowerCase().replace(/\s+/g, '-');
        const recs = allTools[toolKey] || allTools.resize;
        setRecommendations(recs);
    }, [currentTool]);

    if (recommendations.length === 0) {
        return null;
    }

    return (
        <div className="card mt-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    People Also Used
                </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.map((tool, index) => (
                    <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={onToolClick}
                        className="group p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 hover:shadow-lg animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-3`}>
                            <ArrowRight className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:gradient-text transition-all">
                            {tool.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {tool.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
