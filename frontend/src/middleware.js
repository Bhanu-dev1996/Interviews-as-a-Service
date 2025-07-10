import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/auth/login", "/auth/register"];

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for authentication token
  const cookieToken = request.cookies.get("token");
  const headerToken = request.headers.get("authorization");

  const token =
    (cookieToken && cookieToken.value) ||
    (headerToken && headerToken.replace("Bearer ", ""));

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Role-based route protection
  const userRoleCookie = request.cookies.get("userRole");
  const userRole = userRoleCookie && userRoleCookie.value;

  if (pathname.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (pathname.startsWith("/interviewer") && userRole !== "interviewer") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (pathname.startsWith("/candidate") && userRole !== "candidate") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
