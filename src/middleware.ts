import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/features/authentication/server/middleware";
import { localeMiddleware } from "@/locale/middleware";

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

export const middleware = composeMiddleware([localeMiddleware, authMiddleware]);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
