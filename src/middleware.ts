import { NextResponse } from 'next/server';
import { locales, getLocaleFromPath } from './utils/i18n';

export function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Check if the path already contains a locale
  const existingLocale = locales.find(locale => pathname.startsWith(`/${locale}`));

  if (existingLocale) {
    // Locale is present in the URL, set it in cookie and proceed
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', existingLocale);
    return response;
  }

  // Skip static files or API routes
  if (pathname.includes('.')) {
    return NextResponse.next();
  }

  // No locale found, determine based on your logic
  const locale = getLocaleFromPath(pathname);

  // Redirect to localized path
  const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set('NEXT_LOCALE', locale); // Save locale in cookie

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};