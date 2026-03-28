import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  console.log("Refresh Reached!!!");
  if (!refreshToken)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // 1. VERIFY REFRESH TOKEN
    const { payload } = await jwtVerify(refreshToken, SECRET);

    // 2. GENERATE NEW TOKENS (Rotation)
    const newAccessToken = await new SignJWT({
      email: payload.email,
      role: "admin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("15m")
      .sign(SECRET);

    const newRefreshToken = await new SignJWT({ email: payload.email })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(SECRET);

    // 3. ASSIGN NEW COOKIES
    const response = NextResponse.json({ success: true });

    response.cookies.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15, // Matching your 10s test
      path: "/", // Explicitly set to root
    });
    response.cookies.set("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/", // CHANGE THIS FROM "/api/auth/refresh" TO "/"
    });

    return response;
  } catch (e) {
    return NextResponse.json(
      { error: "Invalid Refresh Token" },
      { status: 401 },
    );
  }
}
