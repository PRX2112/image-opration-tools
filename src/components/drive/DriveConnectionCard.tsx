'use client';

import { useEffect, useState } from 'react';
import { Cloud, CheckCircle, XCircle, Loader2, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

export default function DriveConnectionCard() {
    const { data: session } = useSession();
    const [connectionStatus, setConnectionStatus] = useState<{
        connected: boolean;
        email?: string;
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDisconnecting, setIsDisconnecting] = useState(false);

    useEffect(() => {
        checkConnection();
    }, [session]);

    const checkConnection = async () => {
        if (!session?.user) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/drive/auth/status');
            const data = await response.json();
            setConnectionStatus(data);
        } catch (error) {
            console.error('Error checking Drive connection:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDisconnect = async () => {
        setIsDisconnecting(true);

        try {
            const response = await fetch('/api/drive/disconnect', {
                method: 'POST',
            });

            if (response.ok) {
                setConnectionStatus({ connected: false });
            }
        } catch (error) {
            console.error('Error disconnecting Drive:', error);
        } finally {
            setIsDisconnecting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6">
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${connectionStatus?.connected
                        ? 'bg-green-500/20'
                        : 'bg-gray-700/50'
                        }`}>
                        <Cloud className={`w-6 h-6 ${connectionStatus?.connected
                            ? 'text-green-400'
                            : 'text-gray-400'
                            }`} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white">
                            Google Drive
                        </h3>
                        <p className="text-sm text-gray-400">
                            {connectionStatus?.connected
                                ? 'Connected'
                                : 'Not connected'}
                        </p>
                    </div>
                </div>

                {connectionStatus?.connected ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                ) : (
                    <XCircle className="w-6 h-6 text-gray-500" />
                )}
            </div>

            {connectionStatus?.connected ? (
                <div className="space-y-4">
                    <div className="bg-gray-700/30 rounded-lg p-4">
                        <p className="text-sm text-gray-300 mb-1">Connected Account</p>
                        <p className="text-white font-medium">{connectionStatus.email}</p>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                        <p className="text-sm text-blue-300">
                            ✓ Your processed images can be saved directly to Google Drive
                        </p>
                    </div>

                    <button
                        onClick={handleDisconnect}
                        disabled={isDisconnecting}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {isDisconnecting ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <LogOut className="w-4 h-4" />
                        )}
                        Disconnect Drive
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-gray-700/30 rounded-lg p-4">
                        <p className="text-sm text-gray-300 mb-3">
                            Connect your Google Drive to:
                        </p>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-400 mt-0.5">•</span>
                                Save processed images directly to Drive
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-400 mt-0.5">•</span>
                                Access your files from anywhere
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-400 mt-0.5">•</span>
                                Use your own storage quota
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-400 mt-0.5">•</span>
                                Share files easily with built-in Drive sharing
                            </li>
                        </ul>
                    </div>

                    <button
                        onClick={() => window.location.href = '/api/auth/signin/google'}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all"
                    >
                        <Cloud className="w-5 h-5" />
                        Connect Google Drive
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                        We only access files created by ResizeMe
                    </p>
                </div>
            )}
        </motion.div>
    );
}
