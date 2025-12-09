'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetGooglePage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleReset = async () => {
        setStatus('loading');
        try {
            const response = await fetch('/api/debug/reset-google', {
                method: 'POST',
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage('Google account reset successfully! Follow the steps below.');
            } else {
                setStatus('error');
                setMessage(data.error || 'Failed to reset');
            }
        } catch (error) {
            setStatus('error');
            setMessage('Network error');
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-gray-800 rounded-2xl p-8 border border-gray-700">
                <h1 className="text-3xl font-bold text-white mb-4">
                    🔧 Reset Google Drive Connection
                </h1>
                <p className="text-gray-300 mb-6">
                    This will delete your Google OAuth tokens and force a fresh authentication with Drive permissions.
                </p>

                {status === 'idle' && (
                    <button
                        onClick={handleReset}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                        Reset Google Connection
                    </button>
                )}

                {status === 'loading' && (
                    <div className="text-center text-white">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <p>Resetting...</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="space-y-4">
                        <div className="bg-green-900/50 border border-green-700 rounded-lg p-4">
                            <p className="text-green-300 font-semibold">✅ {message}</p>
                        </div>

                        <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Next Steps:</h2>
                            <ol className="space-y-3 text-gray-300">
                                <li className="flex gap-3">
                                    <span className="font-bold text-blue-400">1.</span>
                                    <span>
                                        Go to{' '}
                                        <a
                                            href="https://myaccount.google.com/permissions"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 underline hover:text-blue-300"
                                        >
                                            Google Account Permissions
                                        </a>
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-blue-400">2.</span>
                                    <span>Remove "ResizeMe" or "localhost" access</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-blue-400">3.</span>
                                    <span>
                                        <button
                                            onClick={() => router.push('/api/auth/signout')}
                                            className="text-blue-400 underline hover:text-blue-300"
                                        >
                                            Sign out from the app
                                        </button>
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-blue-400">4.</span>
                                    <span>Sign in again - you'll see the Drive permission</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-blue-400">5.</span>
                                    <span>Try saving an image to Drive!</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="bg-red-900/50 border border-red-700 rounded-lg p-4">
                        <p className="text-red-300">❌ {message}</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-4 text-blue-400 underline hover:text-blue-300"
                        >
                            Try again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
