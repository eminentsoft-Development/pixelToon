import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    // 1. Check if a blog with this slug already exists
    const existingBlog = await Blog.findOne({ slug: body.slug });
    if (existingBlog) {
      return NextResponse.json(
        { message: "A blog with this URL slug already exists." }, 
        { status: 400 }
      );
    }

    // 2. Create the blog entry
    const blog = await Blog.create(body);

    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    console.error("BLOG_POST_ERROR:", err);
    
    // Return the specific error message for the Toast description
    return NextResponse.json(
      { message: err.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}

// Simple GET all for the dashboard
export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(blogs);
  } catch (err) {
    return NextResponse.json({ message: "Failed to fetch blogs" }, { status: 500 });
  }
}