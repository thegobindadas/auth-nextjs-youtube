import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 


export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;
 
    const isPublicPath = path === '/login' || path === '/signup' || path === '/resend-verification' || 
                         path === '/verify-email' || path === '/forgot-password' || path === '/forgot-password-success'
                         path === '/reset-password';
 

    const token = request.cookies.get('token')?.value || '';
 
    
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }
 
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}



export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/resend-verification',
    '/profile',
    '/verify-email',
    '/forgot-password',
    '/forgot-password-success',
    '/reset-password',
  ]
}