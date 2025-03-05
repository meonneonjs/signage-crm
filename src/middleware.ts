// Temporarily disabled Clerk middleware
// import { authMiddleware } from "@clerk/nextjs";

import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { prisma } from '@/lib/prisma';
import { hasPermission, Permission } from '@/lib/rbac';

// Export the auth middleware with public routes
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    "/",
    "/home",
    "/features",
    "/pricing",
    "/about",
    "/resources",
    "/blog",
    "/contact",
    "/api/public(.*)",
    "/brand/(.*)",
    "/security",
    "/privacy",
    "/terms",
    "/cookies",
    "/careers"
  ],
  ignoredRoutes: [
    "/brand/(.*)",
    "/((?!api|trpc))(_next|.+\\.[\\w]+$)",
    "/avatars/(.*)",
    "/logos/(.*)",
    "/icons/(.*)"
  ],
  // Ensure we're properly handling headers
  async afterAuth(auth, req) {
    // Handle after auth logic here if needed
  }
});

// Define route permissions
const routePermissions: Record<string, Permission[]> = {
  '/dashboard/settings/users': ['manage:users'],
  '/dashboard/settings/roles': ['manage:roles'],
  '/dashboard/settings/permissions': ['manage:permissions'],
  '/dashboard/settings/security': ['manage:security'],
  '/dashboard/settings/company': ['manage:company'],
  '/dashboard/settings/team': ['manage:team'],
  '/dashboard/settings/billing': ['manage:billing'],
  '/dashboard/settings/templates': ['manage:templates'],
  '/dashboard/settings/branding': ['manage:branding'],
  '/dashboard/settings/layout': ['manage:layout'],
  '/dashboard/settings/email': ['manage:email'],
  '/dashboard/settings/chat': ['manage:chat'],
  '/dashboard/settings/workflow': ['manage:workflows'],
  '/dashboard/settings/integrations': ['manage:integrations'],
  '/dashboard/settings/api': ['manage:api'],
  '/dashboard/settings/ai': ['manage:ai'],
  '/dashboard/settings/data': ['manage:data'],
  '/dashboard/reports': ['manage:reports'],
};

// Load balancing configuration
const regions = ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1']
const getOptimalRegion = (request: NextRequest) => {
  // Get client's region from Cloudflare headers or IP geolocation
  const cfCountry = request.headers.get('cf-ipcountry')
  const cfRegion = request.headers.get('cf-region')

  // Simple region mapping based on country/region
  if (cfCountry === 'US') {
    return cfRegion === 'CA' ? 'us-west-2' : 'us-east-1'
  } else if (cfCountry === 'GB' || cfCountry === 'DE') {
    return 'eu-west-1'
  } else if (cfCountry === 'SG' || cfCountry === 'JP') {
    return 'ap-southeast-1'
  }

  // Default to closest region based on latency
  return 'us-east-1'
}

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isApiRoute = request.nextUrl.pathname.startsWith('/api');
  const isStaticRoute = request.nextUrl.pathname.startsWith('/_next/static');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  // Allow public routes and API routes
  if (isAuthPage || isApiRoute || isStaticRoute) {
    return NextResponse.next();
  }

  // Only check authentication for admin routes
  if (isAdminRoute) {
    // Redirect to login if not authenticated
    if (!token) {
      const url = new URL('/auth/signin', request.url);
      url.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(url);
    }

    // Check if user has admin role
    if (token.role !== "ADMIN") {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Check route permissions for dashboard routes
  const pathname = request.nextUrl.pathname;
  const requiredPermissions = routePermissions[pathname];
  
  if (requiredPermissions) {
    const hasAccess = await hasPermission(token?.sub!, requiredPermissions[0]);
    if (!hasAccess) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  // Add performance monitoring headers
  const response = NextResponse.next();
  
  // Add cache control headers
  if (isStaticRoute) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  } else {
    response.headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  }

  // Add security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');

  // Add load balancing headers
  const optimalRegion = getOptimalRegion(request);
  response.headers.set('X-Region', optimalRegion);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 