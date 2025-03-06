import { authMiddleware } from '@clerk/nextjs';

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/home',
  '/features',
  '/pricing',
  '/about',
  '/contact',
  '/blog(.*)',
  '/resources(.*)',
  '/api/webhooks(.*)',
];

// Routes that should be ignored by the middleware
const ignoredRoutes = [
  '/_next(.*)',
  '/favicon.ico',
  '/api/webhooks(.*)',
  '/api/uploadthing',
  '/((?!api|trpc))(_next.*|.+.[w]+$)',
];

export default authMiddleware({
  publicRoutes,
  ignoredRoutes,
  afterAuth(auth, req) {
    // Handle authentication
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL('/sign-in', req.url);
      signInUrl.searchParams.set('redirect_url', req.url);
      return Response.redirect(signInUrl);
    }

    // Redirect from auth pages if already signed in
    if (auth.userId && (req.nextUrl.pathname === '/sign-in' || req.nextUrl.pathname === '/sign-up')) {
      const redirectUrl = new URL('/crm', req.url);
      return Response.redirect(redirectUrl);
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}; 