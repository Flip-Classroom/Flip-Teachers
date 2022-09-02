import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    PUBLIC_FILE.test(pathname)
  )
    return NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  if (request.cookies.get("flip_classroom_auth_teachers") === undefined) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (
    request.nextUrl.href.includes("teacherId") &&
    request.cookies.get("flip_classroom_auth_teachers")
  ) {
    return NextResponse.next();
  }
}
