import { NextResponse } from "next/server";
import Image from "@/models/Image";
import connectDB from "@/lib/mongodb";

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    const query = category ? { category } : {};
    const images = await Image.find(query).sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();
    const { url, category, alt, order } = body;

    if (!url || !category) {
      return NextResponse.json(
        { success: false, error: "url and category are required" },
        { status: 400 }
      );
    }

    const image = await Image.create({ url, category, alt: alt || "", order: order || 0 });
    return NextResponse.json({ success: true, data: image }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Bulk reorder
export async function PATCH(request) {
  await connectDB();
  try {
    const { items } = await request.json(); // [{ _id, order }]
    const ops = items.map(({ _id, order }) =>
      Image.findByIdAndUpdate(_id, { order })
    );
    await Promise.all(ops);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}