import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./lib/auth";

const noAuthRoutes = ["/register", "/login"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuth = await isAuthenticated();

  if (isAuth && noAuthRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
