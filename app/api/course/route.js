import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";

export async function POST(req) {
  try {
    await dbConnect();
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
    await dbConnect();
    const { searchParams } = new URL(req.url);
    
    // Pagination parameters
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    // Filters
    const query = {};
    if (searchParams.get("published") === "true") query.isPublished = true;
    if (searchParams.get("q")) {
      query.title = { $regex: searchParams.get("q"), $options: "i" };
    }

    // Execute count and find in parallel
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
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}