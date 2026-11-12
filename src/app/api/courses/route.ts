import { NextResponse } from "next/server";
import { initialCourses } from "@/lib/data";
import { Course } from "@/lib/types";

let coursesStore: Course[] = [...initialCourses];

export async function GET() {
  return NextResponse.json({ success: true, courses: coursesStore });
}

export async function POST(request: Request) {
  try {
    const { courseId, price, originalPrice } = await request.json();

    if (!courseId || price === undefined) {
      return NextResponse.json(
        { error: "Course ID and new price are required" },
        { status: 400 }
      );
    }

    const index = coursesStore.findIndex((c) => c.id === courseId);
    if (index === -1) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const numericPrice = Number(price);
    const numericOriginalPrice = originalPrice ? Number(originalPrice) : numericPrice * 2;

    coursesStore[index] = {
      ...coursesStore[index],
      price: numericPrice,
      originalPrice: numericOriginalPrice,
    };

    return NextResponse.json({
      success: true,
      message: `Price for "${coursesStore[index].title}" updated to ${numericPrice} ETB!`,
      course: coursesStore[index],
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to update course price" },
      { status: 500 }
    );
  }
}
