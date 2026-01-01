'use client';

import { checkAndIncrementVisitor } from '@/app/actions/visitor';
import { Users } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function VisitorCounter() {
    const [count, setCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const visitorCount = await checkAndIncrementVisitor();
                setCount(visitorCount);
            } catch (error) {
                console.error('Failed to fetch visitor count:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCount();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm animate-pulse">
                <Users className="w-4 h-4" />
                <span className="w-12 h-4 bg-purple-200 dark:bg-purple-800 rounded"></span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium animate-fade-in transition-all hover:bg-purple-200 dark:hover:bg-purple-900/50 cursor-default">
            <Users className="w-4 h-4" />
            <span>
                {count ? count.toLocaleString() : '0'} Visitors
            </span>
        </div>
    );
}
