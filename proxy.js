import { NextResponse } from "next/server";

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token");
  const refreshToken = request.cookies.get("refresh_token");

  if (pathname === "/admin/login") {
    if (accessToken || refreshToken) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    if (!accessToken && refreshToken) {
      const refreshRes = await fetch(
        new URL("/api/auth/refresh", request.url),
        {
          method: "POST",
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
        },
      );

      if (refreshRes.ok) {
        const response = NextResponse.next();
        const setCookie = refreshRes.headers.get("set-cookie");
        if (setCookie) {
          response.headers.set("set-cookie", setCookie);
        }
        return response;
      }
    }

    // Hard Guard: No session at all -> send to login
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Ensure the matcher covers your admin panel and your login page
  matcher: ["/admin/:path*"],
};
