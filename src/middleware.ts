import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access-token')?.value
  const { pathname } = req.nextUrl

  if (
    (pathname.startsWith('/company') || pathname.startsWith('/dashboard') || pathname.startsWith('/interview')
    || pathname.startsWith('/meeting') || pathname.startsWith('submission')) && !accessToken
  ) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/'
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/company/:path*', '/dashboard/:path*', '/interview/:path*', '/meeting/:path*', '/submission/:path*']
}
