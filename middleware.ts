// middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { languages, defaultLanguage } from '@/i18n/settings'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Удалете leading slash и вземете първата част (ако има)
  const pathnameSegments = pathname.split('/').filter(Boolean)
  const localeCandidate = pathnameSegments[0]

  if (!pathnameSegments.length) {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = `/${defaultLanguage}`
    return NextResponse.redirect(newUrl)
  }

  if (!languages.includes(localeCandidate as any)) {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = `/${defaultLanguage}${pathname}`
    return NextResponse.redirect(newUrl)
  }

  // Ако всичко е окей, продължи нормално
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|robots.txt|sitemap.xml).*)',
  ],
}