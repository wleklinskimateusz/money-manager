import { NextRequest, NextResponse } from "next/server";

const authPaths = ["/login", "/signup"];

export function authMiddleware(request: NextRequest): NextResponse | undefined {
  const session = request.cookies.get("session");
  const { pathname } = request.nextUrl;

  if (!session && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return undefined;
}
