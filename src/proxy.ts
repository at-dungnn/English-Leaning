import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user?.role;

  // Redirect preserving the real request host (works behind Vercel's proxy).
  const redirectTo = (path: string) => {
    const url = nextUrl.clone();
    url.pathname = path;
    url.search = "";
    return NextResponse.redirect(url);
  };

  // Admin area: must be logged in AND be an ADMIN.
  if (nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn) return redirectTo("/login");
    if (role !== "ADMIN") return redirectTo("/dashboard");
    return NextResponse.next();
  }

  // Learner area: must be logged in.
  if (!isLoggedIn) return redirectTo("/login");

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/decks/:path*",
    "/study/:path*",
    "/materials/:path*",
    "/admin/:path*",
  ],
};
