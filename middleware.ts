import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
  const session = getSessionCookie(request);

  const { pathname } = request.nextUrl;

  // halaman protected
  const protectedRoutes = ["/user", "/admin", "/kasir"];

  if (pathname === "/auth/login" || pathname === "/auth/register") {
    if (session) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !session) {
    const loginUrl = new URL("/auth/login", request.url);

    loginUrl.searchParams.set("callbackUrl", request.url);

    return NextResponse.redirect(loginUrl);
  }

  if (isProtected && session) {
    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    if (pathname === "/kasir") {
      return NextResponse.redirect(new URL("/kasir/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*", "/kasir/:path*", "/user/:path*"],
};
