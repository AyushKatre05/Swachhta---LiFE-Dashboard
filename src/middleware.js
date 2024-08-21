import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/login" || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = await getToken({ req: request });

  // * Protected routes for user
  const userProtectedRoutes = ["/"];

  // * Protected routes for admin
  const adminProtectedRoutes = ["/admin/dashboard"];

  if (
    token == null &&
    (userProtectedRoutes.includes(pathname) ||
      adminProtectedRoutes.includes(pathname))
  ) {
    return NextResponse.redirect(
      new URL(
        "/login?error=Please login first to access this route",
        request.url
      )
    );
  }

  //   * Get user from token
  const user = token?.user;

  // * if user tries to access admin routes
  if (adminProtectedRoutes.includes(pathname) && user?.role === "User") {
    return NextResponse.redirect(
      new URL(
        "/admin/login?error=Please login first to access this route.",
        request.url
      )
    );
  }

  //   * If admin tries to access user routes
  if (userProtectedRoutes.includes(pathname) && user?.role === "Admin") {
    return NextResponse.redirect(
      new URL(
        "/login?error=Please login first to access this route.",
        request.url
      )
    );
  }
}
