import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  console.log('Proxy running for:', pathname);
  
  // Allow public access to login and forgot-password pages - NO REDIRECT
  if (pathname === '/login' || pathname === '/forgot-password' || 
      pathname === '/admin/login' || pathname === '/admin/forgot-password') {
    console.log('Allowing public access to:', pathname);
    return NextResponse.next();
  }

  // For all other admin routes, check authentication
  const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET 
  });

  console.log('Token found:', !!token);

  // If not authenticated, redirect to login
  if (!token) {
    console.log('No token, redirecting to login');
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  console.log('Authenticated, allowing access');
  // Allow authenticated access
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
