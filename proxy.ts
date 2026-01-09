import { NextRequest, NextResponse } from "next/server";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/api/auth") ||
    pathname === "/login" ||
    pathname === "/verify" ||
    pathname === "/" ||
    pathname === "/register" ||
    pathname === "/forgot/email" ||
    pathname === "/forgot/new-password"
  ) {
    return NextResponse.next();
  }
  const token = request.cookies.get("next-auth.session-token");
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
