"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleAdminLogin(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      return { success: false, message: "Invalid credentials. Access denied." };
    }

    const { accessToken, refreshToken } = await res.json();
    const cookieStore = await cookies();

    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 15,
    });

    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/", 
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true, message: "Access Granted" };
  } catch (error) {
    return { success: false, message: "Server connection failed." };
  }
}

export async function handleLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
  redirect("/admin/login");
}
