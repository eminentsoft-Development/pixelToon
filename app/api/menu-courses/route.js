import connectDB from "@/lib/mongodb";
import Course from "@/models/Course"; // Ensure you have a Course model
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    // Fetch only title and slug/path to optimize performance
    const courses = await Course.find({}, "title slug description").lean();

    const formattedCourses = courses.map((course) => ({
      title: course.title,
      path: `/courses/${course.slug}`,
      description: course.description,
    }));

    return NextResponse.json(formattedCourses);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching courses" }, { status: 500 });
  }
}