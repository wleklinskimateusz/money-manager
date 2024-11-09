import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const authPaths = ["/login", "/signup"];

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");
  const { pathname } = request.nextUrl;

  if (!session && !authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && authPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
