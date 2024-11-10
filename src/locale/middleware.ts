import { NextRequest, NextResponse } from "next/server";
import { Locale, locales } from "./locale";

export function localeMiddleware(
  request: NextRequest,
): NextResponse | undefined {
  const { pathname } = request.nextUrl;
  let defaultLocale = locales[0] as Locale;

  const lang = request.cookies.get("lang")?.value;

  if (lang && locales.includes(lang as Locale)) {
    defaultLocale = lang as Locale;
  }

  const locale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!locale) {
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    request.cookies.set("lang", defaultLocale);
    return NextResponse.redirect(request.nextUrl);
  }

  request.cookies.set("lang", locale);

  return undefined;
}
