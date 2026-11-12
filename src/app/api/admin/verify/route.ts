import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("apex_admin_auth")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));

    if (decoded.role === "admin") {
      return NextResponse.json({
        authenticated: true,
        admin: { email: decoded.email, role: "SuperAdmin" },
      });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
