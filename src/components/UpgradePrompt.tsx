'use client';

import { X, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface UpgradePromptProps {
    reason: 'downloads' | 'file_size' | 'storage';
    currentPlan: string;
    onClose?: () => void;
}

export default function UpgradePrompt({ reason, currentPlan, onClose }: UpgradePromptProps) {
    const [isVisible, setIsVisible] = useState(true);

    const handleClose = () => {
        setIsVisible(false);
        onClose?.();
    };

    const getPromptContent = () => {
        switch (reason) {
            case 'downloads':
                return {
                    title: 'Download Limit Reached',
                    description: `You've reached your monthly download limit on the ${currentPlan} plan.`,
                    suggestion: 'Upgrade to Pro for 500 downloads/month or Business for unlimited downloads.',
                    icon: <TrendingUp className="w-6 h-6" />,
                };
            case 'file_size':
                return {
                    title: 'File Size Too Large',
                    description: `This file exceeds your plan's file size limit.`,
                    suggestion: 'Upgrade to Pro for 200MB files or Business for unlimited file sizes.',
                    icon: <Zap className="w-6 h-6" />,
                };
            case 'storage':
                return {
                    title: 'Storage Limit Reached',
                    description: `You've used all your available storage on the ${currentPlan} plan.`,
                    suggestion: 'Upgrade to Pro for 1GB storage or Business for unlimited storage.',
                    icon: <TrendingUp className="w-6 h-6" />,
                };
        }
    };

    const content = getPromptContent();

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4"
                >
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-2xl p-6 text-white relative">
                        {/* Close button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Icon */}
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-white/20 p-2 rounded-lg">
                                {content.icon}
                            </div>
                            <h3 className="text-xl font-bold">{content.title}</h3>
                        </div>

                        {/* Description */}
                        <p className="text-white/90 mb-2">{content.description}</p>
                        <p className="text-sm text-white/80 mb-4">{content.suggestion}</p>

                        {/* CTA Button */}
                        <Link
                            href="/pricing"
                            className="block w-full bg-white text-blue-600 font-semibold py-3 px-4 rounded-lg text-center hover:bg-gray-100 transition-colors"
                        >
                            Upgrade Now
                        </Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
