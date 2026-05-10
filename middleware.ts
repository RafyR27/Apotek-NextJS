import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function middleware(request: NextRequest) {
  const session = getSessionCookie(request);

  const { pathname } = request.nextUrl;

  // halaman auth
  const authRoutes = ["/auth/login", "/auth/register"];

  // halaman protected
  const protectedRoutes = [
    "/profile",
    "/cart",
    "/history",
    "/admin",
    "/kasir",
    "/upload-prescription",
  ];

  if (authRoutes.includes(pathname) && session) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !session) {
    const loginUrl = new URL("/auth/login", request.url);

    loginUrl.searchParams.set("callbackUrl", encodeURIComponent(request.url));

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/admin/:path*",
    "/kasir/:path*",
    "/profile/:path*",
    "/cart/:path*",
    "/upload-prescription/:path*",
    "/history/:path*",
  ],
};
