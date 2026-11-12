import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otpStore";

export async function POST(request: Request) {
  try {
    const { email, code, fullName } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: "Email and verification code are required" },
        { status: 400 }
      );
    }

    const verification = verifyOtp(email, code);

    if (!verification.valid) {
      return NextResponse.json(
        { error: verification.error || "Invalid verification code" },
        { status: 400 }
      );
    }

    // Account verified! Return success and student details
    return NextResponse.json({
      success: true,
      message: "Email verified and account created successfully!",
      user: {
        name: fullName || "Student",
        email: email.trim().toLowerCase(),
        verified: true,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Server verification error" },
      { status: 500 }
    );
  }
}
