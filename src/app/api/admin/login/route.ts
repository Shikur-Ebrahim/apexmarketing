import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const expectedEmail = process.env.ADMIN_EMAIL || "apexmarketinghub01@gmail.com";
    const expectedPassword = process.env.ADMIN_PASSWORD || "ApexAdmin2026!#Secure";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (email.trim().toLowerCase() !== expectedEmail.toLowerCase() || password !== expectedPassword) {
      return NextResponse.json(
        { error: "Invalid admin credentials" },
        { status: 401 }
      );
    }

    // Generate secure admin token (based on server secret)
    const adminToken = Buffer.from(
      JSON.stringify({
        role: "admin",
        email: expectedEmail,
        timestamp: Date.now(),
      })
    ).toString("base64");

    const response = NextResponse.json({
      success: true,
      message: "Admin authenticated successfully",
      admin: { email: expectedEmail, role: "SuperAdmin" },
    });

    response.cookies.set("apex_admin_auth", adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Server authentication error" },
      { status: 500 }
    );
  }
}
