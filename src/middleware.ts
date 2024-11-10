import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/features/authentication/server/middleware";
import { localeMiddleware } from "@/locale/middleware";
import { navigation } from "./navigation/url";

type MiddlewareFunction = (request: NextRequest) => NextResponse | undefined;

function composeMiddleware(middlewares: MiddlewareFunction[]) {
  return async (request: NextRequest) => {
    for (const middleware of middlewares) {
      const result = middleware(request);
      if (result) return result;
    }
    return NextResponse.next();
  };
}

const redirectToDashboard = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const locale = request.cookies.get("lang")?.value;

  if (pathname === `/${locale}`) {
    return NextResponse.redirect(new URL(navigation.dashboard, request.url));
  }
  return undefined;
};

export const middleware = composeMiddleware([
  localeMiddleware,
  authMiddleware,
  redirectToDashboard,
]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
