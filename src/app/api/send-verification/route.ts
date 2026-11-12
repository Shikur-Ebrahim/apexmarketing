import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const { email, code } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const verificationCode = code || Math.floor(100000 + Math.random() * 900000).toString();

    const result = await sendVerificationEmail({
      to: email,
      verificationCode,
    });

    if ("error" in result && result.error) {
      return NextResponse.json(
        { error: result.error.message || "Failed to send email via provider." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result,
      message: "Verification email sent successfully",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to send email";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
