import { NextRequest, NextResponse } from "next/server";
import { locales } from "./locale";

export function localeMiddleware(
  request: NextRequest,
): NextResponse | undefined {
  const { pathname } = request.nextUrl;
  const locale = locales.find(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!locale) {
    request.nextUrl.pathname = `/${locales[0]}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  return undefined;
}
