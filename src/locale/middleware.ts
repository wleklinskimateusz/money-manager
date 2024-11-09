import { NextRequest, NextResponse } from "next/server";
import { Locale, locales } from "./locale";

export function localeMiddleware(
  request: NextRequest,
): NextResponse | undefined {
  const { pathname } = request.nextUrl;
  let defaultLocale = locales[0] as Locale;

  // check in headers
  const lang = request.headers.get("accept-language")?.split(",")[0];
  if (lang && locales.includes(lang as Locale)) {
    defaultLocale = lang as Locale;
  }

  const locale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!locale) {
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  // if different locale than in headers change the headers
  if (locale !== defaultLocale) request.headers.set("accept-language", locale);

  return undefined;
}
