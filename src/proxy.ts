import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'

import { authOptions } from '@/services/auth'

export async function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    if (pathname === '/auth/login') {
      return NextResponse.next({
        request: { headers: requestHeaders }
      })
    }

    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    const role = session.user?.role?.toLowerCase()

    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  requestHeaders.set('x-pathname', request.nextUrl.pathname)

  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
}

export const config = {
  matcher: ['/admin/:path*']
}
