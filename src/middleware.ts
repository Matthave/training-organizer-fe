import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import isTokenExpired from "@/utils/isTokenExpired";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;
  const { tokenExpired } = await isTokenExpired();

  const isAuthPage = pathname === "/";
  const isDashboard = pathname.startsWith("/dashboard");

  if (token && !tokenExpired) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (isDashboard) {
      return NextResponse.next();
    }
  }

  if (!token || tokenExpired) {
    if (isDashboard) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
