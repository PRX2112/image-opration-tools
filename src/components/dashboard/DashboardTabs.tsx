'use client';

import { useState } from 'react';
import { LayoutDashboard, HardDrive, History, CreditCard, Image as ImageIcon } from 'lucide-react';
import { formatBytes } from '@/utils/usageUtils';
import DriveGallery from './DriveGallery';
import BillingCard from './BillingCard';
import DriveConnectionCard from '@/components/drive/DriveConnectionCard';
import Link from 'next/link';

// Types passed from Server Component
interface UsageData {
    subscriptionTier: string;
    downloadsThisMonth: number;
    storageUsed: number;
    nextBillingDate: Date | null;
}

interface HistoryItem {
    id: string;
    toolName: string;
    originalFileName: string;
    fileSize: number | null;
    createdAt: Date;
}

interface DriveFile {
    id: string;
    fileName: string;
    mimeType: string;
    fileSize: number;
    thumbnailLink: string | null;
    webViewLink: string | null;
    createdAt: Date;
    toolUsed: string;
}

interface Payment {
    id: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: Date;
    razorpayPaymentId: string | null;
}

interface DashboardTabsProps {
    usage: UsageData;
    limits: { downloads: number; storage: number };
    history: HistoryItem[];
    driveFiles: DriveFile[];
    payments: Payment[];
    userName: string;
}

export default function DashboardTabs({ usage, limits, history, driveFiles, payments, userName }: DashboardTabsProps) {
    const [activeTab, setActiveTab] = useState('overview');

    // Subscription helpers
    const basePlan = usage.subscriptionTier.split('_')[0];
    const isProOrBusiness = basePlan === 'pro' || basePlan === 'business';

    const tabs = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'files', label: 'Saved Files', icon: HardDrive },
        { id: 'history', label: 'Activity Log', icon: History },
        { id: 'billing', label: 'Billing', icon: CreditCard },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
                <p className="text-gray-500 dark:text-gray-400">Welcome back, {userName}!</p>
            </div>

            {/* Tabs Navigation */}
            <div className="flex overflow-x-auto pb-2 gap-2 border-b border-gray-200 dark:border-gray-700 scrollbar-hide">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap
                                ${activeTab === tab.id
                                    ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                }`}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <div className="min-h-[400px]">

                {/* OVERVIEW TAB */}
                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Usage Cards (Reused from original layout) */}
                            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6">
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Plan</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">{basePlan}</p>
                                <Link href="/pricing" className="text-sm text-blue-600 hover:underline mt-2 inline-block">Manage Subscription →</Link>
                            </div>

                            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6">
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Downloads</p>
                                <div className="flex items-end gap-2">
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{usage.downloadsThisMonth}</p>
                                    <p className="text-sm text-gray-400 mb-1">/ {limits.downloads === Infinity ? '∞' : limits.downloads}</p>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mt-3">
                                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${limits.downloads === Infinity ? 0 : Math.min((usage.downloadsThisMonth / limits.downloads) * 100, 100)}%` }}></div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 p-6">
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Storage</p>
                                <div className="flex items-end gap-2">
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatBytes(usage.storageUsed)}</p>
                                    <p className="text-sm text-gray-400 mb-1">/ {limits.storage === Infinity ? '∞' : formatBytes(limits.storage)}</p>
                                </div>
                                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 mt-3">
                                    <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: `${limits.storage === Infinity ? 0 : Math.min((usage.storageUsed / limits.storage) * 100, 100)}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Drive Files Preview */}
                        {isProOrBusiness && driveFiles.length > 0 && (
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Saved Files</h3>
                                    <button onClick={() => setActiveTab('files')} className="text-sm text-blue-600 hover:underline">View All</button>
                                </div>
                                <DriveGallery files={driveFiles.slice(0, 4)} />
                            </div>
                        )}
                    </div>
                )}

                {/* SAVED FILES TAB */}
                {activeTab === 'files' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {isProOrBusiness ? (
                            <>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Google Drive Files</h3>
                                    <DriveConnectionCard />
                                </div>
                                <DriveGallery files={driveFiles} />
                            </>
                        ) : (
                            <div className="text-center py-20 bg-gray-50/50 dark:bg-gray-900/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                                <HardDrive className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Google Drive Integration</h3>
                                <p className="text-gray-500 mb-6 max-w-md mx-auto">Upgrade to Pro or Business to save your processed images directly to Google Drive and view them here.</p>
                                <Link href="/pricing" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">View Plans</Link>
                            </div>
                        )}
                    </div>
                )}

                {/* ACTIVITY LOG TAB */}
                {activeTab === 'history' && (
                    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {history.length === 0 ? (
                            <div className="text-center py-12">
                                <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-gray-500">No activity recorded yet.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400">
                                        <tr>
                                            <th className="px-6 py-3 font-medium">File Name</th>
                                            <th className="px-6 py-3 font-medium">Tool</th>
                                            <th className="px-6 py-3 font-medium">Size</th>
                                            <th className="px-6 py-3 font-medium">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700/50">
                                        {history.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.originalFileName}</td>
                                                <td className="px-6 py-4 capitalize text-gray-500 dark:text-gray-400">{item.toolName}</td>
                                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{item.fileSize ? (item.fileSize / 1024).toFixed(1) + ' KB' : '-'}</td>
                                                <td className="px-6 py-4 text-gray-500 dark:text-gray-400" suppressHydrationWarning>{new Date(item.createdAt).toLocaleDateString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* BILLING TAB */}
                {activeTab === 'billing' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <BillingCard
                            subscriptionTier={usage.subscriptionTier}
                            nextBillingDate={usage.nextBillingDate}
                            payments={payments}
                        />
                    </div>
                )}
            </div>
        </div >
    );
}
