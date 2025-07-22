import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { auth } from "@/auth";

const protectedRoutes = ["/jobSearch"];

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get("authjs.session-token")?.value;

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!!token && (pathname === "/login" || pathname === "/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
