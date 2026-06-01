import { NextResponse } from "next/server";
import Course from "@/models/Course";
import connectDB from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Verify slug exists in body before saving
    if (!body.slug) {
      return NextResponse.json({ error: "Slug is missing from request" }, { status: 400 });
    }

    const course = await Course.create(body);
    return NextResponse.json(course, { status: 201 });

  } catch (error) {
    console.error("SAVE_ERROR", error);

    // Handle Duplicate Slug (Mongo Error 11000)
    if (error.code === 11000) {
      return NextResponse.json({ error: "This URL Slug is already taken." }, { status: 409 });
    }

    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}


export async function GET(req) {
  try {
    await connectDB();
const { searchParams } = new URL(req.url);
    
    // 1. Pagination parameters
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // 2. Build the Filters object
    const query = {};
    
    // Handle Search (matches the 'search' param from frontend)
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      query.title = { $regex: searchQuery, $options: "i" }; // Case-insensitive search
    }

    // Handle Status (matches the 'status' param from frontend)
    const statusQuery = searchParams.get("status");
    if (statusQuery === "published") {
      query.isPublished = true;
    } else if (statusQuery === "draft") {
      query.isPublished = false;
    } 
    const [courses, totalCourses] = await Promise.all([
      Course.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Course.countDocuments(query),
    ]);

    return NextResponse.json({
      courses,
      totalPages: Math.ceil(totalCourses / limit),
      currentPage: page,
      totalItems: totalCourses,
    });
  } catch (error) {
    console.error("Course fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
  }
}