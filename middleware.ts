import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware() {
    // Custom middleware logic can go here
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect all /dashboard, /modules, /tools, /progress routes
        const path = req.nextUrl.pathname

        // Allow access to auth pages without login
        if (
          path.startsWith('/signin') ||
          path.startsWith('/signup') ||
          path.startsWith('/reset-password')
        ) {
          return true
        }

        // Require authentication for app routes
        if (
          path.startsWith('/dashboard') ||
          path.startsWith('/modules') ||
          path.startsWith('/tools') ||
          path.startsWith('/progress') ||
          path.startsWith('/library') ||
          path.startsWith('/community') ||
          path.startsWith('/settings') ||
          path.startsWith('/analytics') ||
          path.startsWith('/help')
        ) {
          return !!token
        }

        // Allow all other routes (marketing pages)
        return true
      },
    },
    pages: {
      signIn: '/signin',
      error: '/signin',
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
