'use client';

import { useState } from 'react';
import { Cloud, Check, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SaveToDriveButtonProps {
    file: Blob;
    fileName: string;
    toolUsed: string;
    disabled?: boolean;
}

export default function SaveToDriveButton({
    file,
    fileName,
    toolUsed,
    disabled = false,
}: SaveToDriveButtonProps) {
    const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
    const [driveLink, setDriveLink] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSaveToDrive = async () => {
        setStatus('uploading');
        setErrorMessage('');

        try {
            const formData = new FormData();
            formData.append('file', file, fileName);
            formData.append('fileName', fileName);
            formData.append('toolUsed', toolUsed);

            const response = await fetch('/api/drive/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to upload to Drive');
            }

            setDriveLink(data.webViewLink);
            setStatus('success');

            // Reset to idle after 5 seconds
            setTimeout(() => {
                setStatus('idle');
            }, 5000);
        } catch (error: any) {
            console.error('Error saving to Drive:', error);
            setErrorMessage(error.message || 'Failed to save to Drive');
            setStatus('error');

            // Reset to idle after 5 seconds
            setTimeout(() => {
                setStatus('idle');
                setErrorMessage('');
            }, 5000);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <button
                onClick={handleSaveToDrive}
                disabled={disabled || status === 'uploading' || status === 'success'}
                className={`
                    flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium
                    transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                    ${status === 'success'
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : status === 'error'
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }
                `}
            >
                <AnimatePresence mode="wait">
                    {status === 'uploading' && (
                        <motion.div
                            key="uploading"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <Loader2 className="w-5 h-5 animate-spin" />
                        </motion.div>
                    )}
                    {status === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <Check className="w-5 h-5" />
                        </motion.div>
                    )}
                    {status === 'error' && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <AlertCircle className="w-5 h-5" />
                        </motion.div>
                    )}
                    {status === 'idle' && (
                        <motion.div
                            key="idle"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                        >
                            <Cloud className="w-5 h-5" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <span>
                    {status === 'uploading' && 'Saving to Drive...'}
                    {status === 'success' && 'Saved to Drive!'}
                    {status === 'error' && 'Failed to Save'}
                    {status === 'idle' && 'Save to Google Drive'}
                </span>
            </button>

            {/* Success message with link */}
            <AnimatePresence>
                {status === 'success' && driveLink && (
                    <motion.a
                        href={driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" />
                        View in Google Drive
                    </motion.a>
                )}
            </AnimatePresence>

            {/* Error message */}
            <AnimatePresence>
                {status === 'error' && errorMessage && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-sm text-red-400"
                    >
                        {errorMessage}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
