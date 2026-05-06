"use server";

import connectDB from "@/lib/mongodb";
import Course from "@/models/Course";

export async function getCoursesForSelect() {
  try {
    await connectDB();

    const courses = await Course.find(
      { isPublished: true },
      { title: 1, _id: 0 }
    ).sort({ createdAt: -1 });

    return {
      success: true,
      data: courses.map((course) => course.title),
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      data: [],
    };
  }
}