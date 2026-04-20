import { NextResponse } from "next/server";
import Image from "@/models/Image";
import connectDB from "@/lib/mongodb";

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    const query = category ? { category } : {};
    const images = await Image.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();
    
    // Check if body is an array or a single object
    const dataToSave = Array.isArray(body) ? body : [body];

    // Validate entries
    for (const item of dataToSave) {
      if (!item.url || !item.category) {
        return NextResponse.json(
          { success: false, error: "URL and Category are required" },
          { status: 400 }
        );
      }
    }

    const images = await Image.insertMany(dataToSave);
    return NextResponse.json({ success: true, data: images }, { status: 201 });
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