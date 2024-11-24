import { navigation } from "@/navigation/url";
import { NextRequest, NextResponse } from "next/server";

const authPaths = [navigation.login, navigation.signup];

export function authMiddleware(request: NextRequest): NextResponse | undefined {
  const session = request.cookies.get("session");
  const { pathname } = request.nextUrl;

  if (!session && !authPaths.some((path) => pathname.includes(path))) {
    return NextResponse.redirect(new URL(navigation.login, request.url));
  }

  return undefined;
}
