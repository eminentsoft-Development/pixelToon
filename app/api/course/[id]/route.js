import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import mongoose from "mongoose";

// ── GET — Single Course ───────────────────────────────────────────────────────
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params; // This 'id' variable can now be a slug OR an ID

    // 1. Determine if we are searching by MongoDB ID or Slug
    const isObjectId = mongoose.Types.ObjectId.isValid(id);
    const query = isObjectId ? { _id: id } : { slug: id };

    // 2. Fetch the course
    const course = await Course.findOne(query).lean();

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    const response = NextResponse.json(course);

    // 3. Cache Logic (Same as before)
    if (course.isPublished) {
      response.headers.set(
        "Cache-Control",
        "public, s-maxage=120, stale-while-revalidate=600"
      );
    } else {
      response.headers.set("Cache-Control", "no-store");
    }

    return response;
  } catch (error) {
    console.error("COURSE_GET_ERROR", error);
    return NextResponse.json({ error: "Error fetching course" }, { status: 500 });
  }
}

// ── PUT — Update Course ───────────────────────────────────────────────────────
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    // Strip fields that must never be updated from the client
    const { _id, createdAt, updatedAt, __v, ...safeBody } = body;

    const course = await Course.findByIdAndUpdate(
      id,
      { $set: safeBody },
      {
        new: true,          // return updated document
        runValidators: true,
        lean: true,         // return plain JS object
        // Only return fields needed to confirm the update
        projection: {
          title:       1,
          slug:        1,
          isPublished: 1,
          isFeatured:  1,
          updatedAt:   1,
        },
      }
    );

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course);
  } catch (error) {
    console.error("COURSE_PUT_ERROR", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { error: "A course with this slug already exists." },
        { status: 409 }
      );
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return NextResponse.json({ error: messages.join(", ") }, { status: 422 });
    }

    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// ── DELETE — Remove Course ────────────────────────────────────────────────────
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    // findByIdAndDelete returns the deleted doc — use it to confirm existence
    const deleted = await Course.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Course deleted successfully", id: deleted._id },
      { status: 200 }
    );
  } catch (error) {
    console.error("COURSE_DELETE_ERROR", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}