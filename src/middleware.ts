import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Common URL redirects for misspellings and old URLs
const redirectMap: Record<string, string> = {
    '/resize': '/tools/resize',
    '/compress': '/tools/compress',
    '/crop': '/tools/crop',
    '/convert': '/tools/convert',
    '/tool/resize': '/tools/resize',
    '/tool/compress': '/tools/compress',
    '/tool/crop': '/tools/crop',
    '/tool/convert': '/tools/convert',
    '/image-resize': '/tools/resize',
    '/image-compress': '/tools/compress',
    '/image-crop': '/tools/crop',
    '/image-convert': '/tools/convert',
};

export async function middleware(request: NextRequest) {
    const session = await auth();
    const pathname = request.nextUrl.pathname;

    // Check for redirect mappings
    if (redirectMap[pathname]) {
        const redirectUrl = new URL(redirectMap[pathname], request.url);
        return NextResponse.redirect(redirectUrl, 301); // Permanent redirect
    }

    // Protected routes
    const protectedRoutes = ['/dashboard'];
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    );

    // Redirect to login if accessing protected route without session
    if (isProtectedRoute && !session) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
