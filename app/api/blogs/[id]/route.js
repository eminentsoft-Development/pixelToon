import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";

// ── GET — Single blogs ───────────────────────────────────────────────────────
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const blogs = await Blog.findById(id)
      .lean(); // plain JS object — no Mongoose document overhead

    if (!blogs) {
      return NextResponse.json({ error: "blogs not found" }, { status: 404 });
    }

    const response = NextResponse.json(blogs);

    // Published blogs can be edge-cached; drafts must not be cached
    if (blogs.isPublished) {
      response.headers.set(
        "Cache-Control",
        "public, s-maxage=120, stale-while-revalidate=600"
      );
    } else {
      response.headers.set("Cache-Control", "no-store");
    }

    return response;
  } catch (error) {
    console.error("blogs_GET_ERROR", error);
    return NextResponse.json({ error: "Error fetching blogs" }, { status: 500 });
  }
}

// ── PUT — Update blogs ───────────────────────────────────────────────────────
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    // Strip fields that must never be updated from the client
    const { _id, createdAt, updatedAt, __v, ...safeBody } = body;

    const blogs = await Blog.findByIdAndUpdate(
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

    if (!blogs) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("blogs_PUT_ERROR", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { error: "A blogs with this slug already exists." },
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

// ── DELETE — Remove blogs ────────────────────────────────────────────────────
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    // findByIdAndDelete returns the deleted doc — use it to confirm existence
    const deleted = await Blog.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json({ error: "blogs not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "blogs deleted successfully", id: deleted._id },
      { status: 200 }
    );
  } catch (error) {
    console.error("blogs_DELETE_ERROR", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}