'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { LogOut, LayoutDashboard } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function UserNav() {
    const { data: session } = useSession();

    if (!session?.user) {
        return (
            <div className="flex items-center gap-3">
                <Link
                    href="/login"
                    className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white transition-colors font-medium"
                >
                    Login
                </Link>
                <Link
                    href="/signup"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
                >
                    Sign Up
                </Link>
            </div>
        );
    }

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none group">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold shadow-lg group-hover:shadow-xl transition-all">
                    {session.user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="text-gray-700 dark:text-gray-200 font-medium hidden md:block group-hover:text-primary dark:group-hover:text-white transition-colors">
                    {session.user.name}
                </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-xl">
                <div className="px-3 py-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{session.user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{session.user.email}</p>
                </div>
                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                <DropdownMenuItem asChild>
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white cursor-pointer rounded-md transition-colors"
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                <DropdownMenuItem
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 hover:text-red-700 dark:hover:text-red-300 cursor-pointer rounded-md transition-colors"
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
