import { NextResponse } from "next/server";
import Course from "@/models/Course";
import Blog from "@/models/Blog";
import connectDB from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();

    // 1. Get counts for stats cards
    const [courseCount, blogCount, featuredCourses, recentCourses, recentBlogs] = await Promise.all([
      Course.countDocuments(),
      Blog.countDocuments(),
      Course.countDocuments({ isFeatured: true }),
      Course.find().sort({ createdAt: -1 }).limit(3).select("title slug isPublished createdAt"),
      Blog.find().sort({ createdAt: -1 }).limit(3).select("title slug isPublished createdAt"),
    ]);

    // 2. Combine and sort recent activity
    const recentActivity = [
      ...recentCourses.map(c => ({ ...c.toObject(), type: "Course" })),
      ...recentBlogs.map(b => ({ ...b.toObject(), type: "Blog" }))
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      stats: {
        courses: courseCount,
        blogs: blogCount,
        featured: featuredCourses,
      },
      recentActivity: recentActivity.slice(0, 5) // top 5 overall
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}