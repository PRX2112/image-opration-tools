'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetDatabasePage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');
    const [showConfirm, setShowConfirm] = useState(false);
    const router = useRouter();

    const handleReset = async () => {
        setShowConfirm(false);
        setStatus('loading');
        try {
            const response = await fetch('/api/debug/reset-database', {
                method: 'POST',
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage('Database reset successfully!');
            } else {
                setStatus('error');
                setMessage(data.error || 'Failed to reset database');
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
                    ⚠️ Reset Entire Database
                </h1>
                <p className="text-gray-300 mb-6">
                    This will delete ALL data from the database including users, accounts, sessions, and Drive files.
                </p>

                {status === 'idle' && !showConfirm && (
                    <button
                        onClick={() => setShowConfirm(true)}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                        Reset Database
                    </button>
                )}

                {showConfirm && (
                    <div className="space-y-4">
                        <div className="bg-yellow-900/50 border border-yellow-700 rounded-lg p-4">
                            <p className="text-yellow-300 font-semibold">
                                ⚠️ Are you sure? This will delete ALL data!
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={handleReset}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                            >
                                Yes, Reset Everything
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {status === 'loading' && (
                    <div className="text-center text-white">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <p>Resetting database...</p>
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
                                            onClick={() => router.push('/')}
                                            className="text-blue-400 underline hover:text-blue-300"
                                        >
                                            Go to homepage
                                        </button>
                                    </span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="font-bold text-blue-400">4.</span>
                                    <span>Sign in with Google - you'll see the Drive permission!</span>
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
