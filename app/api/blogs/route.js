import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

function slug(title) {
  return title.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
}

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page  = Math.max(1, parseInt(searchParams.get("page")  || "1"));
    const limit = Math.min(50, parseInt(searchParams.get("limit") || "10"));

    const [blogs, total] = await Promise.all([
      Blog.find().select("title slug image createdAt").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Blog.countDocuments(),
    ]);

    return NextResponse.json({ blogs, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const { title, content, image } = await request.json();
    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    let blogSlug = slug(title);
    if (await Blog.exists({ slug: blogSlug })) blogSlug += `-${Date.now()}`;

    const blog = await Blog.create({ title, slug: blogSlug, content, image });
    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


// ─────────────────────────────────────────────────────────────────────────────
// app/api/blogs/[id]/route.js  →  GET one, PUT update, DELETE


export async function GET_ONE(request, { params }) {
  try {
    await connectDB();
    const blog = await Blog.findById(params.id).lean();
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const body = await request.json();
    if (body.title) body.slug = slug(body.title);

    const blog = await Blog.findByIdAndUpdate(params.id, { $set: body }, { new: true, runValidators: true }).lean();
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const blog = await Blog.findByIdAndDelete(params.id).lean();
    if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}