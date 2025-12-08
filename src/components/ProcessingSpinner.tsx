'use client';

import { motion } from 'framer-motion';

export default function ProcessingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            <motion.div
                className="relative w-16 h-16"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
                <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"></div>
            </motion.div>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-gray-600 dark:text-gray-400 font-medium"
            >
                Processing your image...
            </motion.p>
        </div>
    );
}
