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

export async function GET(request) {
  try {
    await connectDB();

    // 1. Extract query parameters from the URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // 2. Fetch blogs and total count in parallel for better performance
    const [blogs, totalBlogs] = await Promise.all([
      Blog.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments(),
    ]);

    // 3. Return the data along with pagination metadata
    return NextResponse.json({
      blogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: page,
      totalItems: totalBlogs,
    });
  } catch (err) {
    console.error("BLOG_GET_ERROR:", err);
    return NextResponse.json(
      { message: "Failed to fetch blogs" }, 
      { status: 500 }
    );
  }
}