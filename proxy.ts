import { NextRequest, NextResponse } from 'next/server'
import { i18nConfig } from '@/app/i18n/config'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameHasLocale = i18nConfig.locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  const locale = getLocale(request) ?? i18nConfig.defaultLocale
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

function getLocale(request: NextRequest): string | null {
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value
  if (localeCookie && i18nConfig.locales.includes(localeCookie as any)) {
    return localeCookie
  }

  const acceptLanguage = request.headers.get('accept-language')
  if (acceptLanguage) {
    const preferred = acceptLanguage.split(',')[0].split('-')[0]
    const match = i18nConfig.locales.find(locale =>
      locale.toLowerCase().startsWith(preferred.toLowerCase())
    )
    if (match) return match
  }
  return null
}
export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
}