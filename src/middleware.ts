import { NextResponse, type NextRequest } from 'next/server';
import { getAuthCookies } from '@/utils/cookies';

const PUBLIC_PATHS = ['/terms-and-conditions', '/privacy-policy'];

const NO_AUTH_PATHS = [
  '/login',
  '/signup',
  '/signup/verify-otp',
  '/signup/complete-profile',
  '/forgot-password',
];

const isPathMatch = (pathname: string, paths: string[]) =>
  paths.some(path => pathname.startsWith(path));

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)', { source: '/' }],
};

export const middleware = async (request: NextRequest) => {
  const authCookies = await getAuthCookies();
  const pathname = request.nextUrl.pathname;
  const headers = new Headers(request.headers);
  const token = authCookies?.accessToken;
  const user = authCookies?.user;

  headers.set('x-current-path', pathname);

  // Skip middleware if request is part of a Next server action.
  if (request.headers.get('next-action') !== null) {
    return NextResponse.next();
  }

  // Route checks
  const isPublicRoute = isPathMatch(pathname, PUBLIC_PATHS);
  const isNoAuthRoute = isPathMatch(pathname, NO_AUTH_PATHS);
  const isAuthenticated = Boolean(token && user);

  // Always allow public paths
  if (isPublicRoute) {
    return NextResponse.next({ headers });
  }

  // Allow no-auth paths only if not authenticated
  if (isNoAuthRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next({ headers });
  }

  // For all other paths, require authentication
  if (!isAuthenticated) {
    const requestPath = pathname + request.nextUrl.search;
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    if (requestPath !== '/') {
      redirectUrl.searchParams.set('next', requestPath);
    }
    return NextResponse.redirect(redirectUrl);
  }

  // Check admin access
  if (pathname.startsWith('/admin')) {
    if (user?.type !== 'admin') {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/'; 
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Check super-admin access
  if (pathname.startsWith('/super-admin')) {
    if (user?.type !== 'superAdmin') {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/'; 
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Default: allow
  return NextResponse.next({ headers });
};
