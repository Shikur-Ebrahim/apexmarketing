import { NextResponse } from "next/server";
import { initialStudentEvidence } from "@/lib/data";
import { StudentEvidence } from "@/lib/types";

// In-memory persistent array for the session (or can sync with Firestore)
let evidenceStore: StudentEvidence[] = [...initialStudentEvidence];

export async function GET() {
  return NextResponse.json({ success: true, data: evidenceStore });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newEvidence: StudentEvidence = {
      id: `ev-${Date.now()}`,
      studentName: body.studentName || "Anonymous Student",
      avatar:
        body.avatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
      resultTitle: body.resultTitle || "High Performance Result",
      metric: body.metric || "Verified Result",
      metricType: body.metricType || "Revenue",
      courseTitle: body.courseTitle || "Apex Marketing Course",
      testimonial: body.testimonial || "Great course and results!",
      proofImageUrl:
        body.proofImageUrl ||
        "https://res.cloudinary.com/ujbsqmo3/image/upload/v1794472184/apexmarketing/logo.jpg",
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      verified: true,
    };

    evidenceStore.unshift(newEvidence);

    return NextResponse.json({
      success: true,
      message: "Student evidence added successfully",
      data: newEvidence,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to add student evidence" },
      { status: 500 }
    );
  }
}
