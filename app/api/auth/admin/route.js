import { NextResponse } from "next/server";
import { SignJWT } from "jose"; // Lightweight JWT library

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request) {
  const { email, password } = await request.json();

  // 1. DATABASE CHECK (Placeholder)
  if (email !== "admin@pixeltoonzacademy.com" || password !== "password") {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // 2. CREATE ACCESS TOKEN (15 Mins)
  const accessToken = await new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(SECRET);

  // 3. CREATE REFRESH TOKEN (7 Days)
  const refreshToken = await new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);

  // 4. RETURN TOKENS TO SERVER ACTION
  return NextResponse.json({ accessToken, refreshToken });
}