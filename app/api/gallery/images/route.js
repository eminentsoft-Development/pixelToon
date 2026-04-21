import { NextResponse } from "next/server";
import Image from "@/models/Image";
import connectDB from "@/lib/mongodb";

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 12; // Items per page
  const skip = (page - 1) * limit;

  try {
    const query = category ? { category } : {};

    // Fetch data and total count in parallel
    const [images, total] = await Promise.all([
      Image.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Image.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: images,
      pagination: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
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
          { status: 400 },
        );
      }
    }

    const images = await Image.insertMany(dataToSave);
    return NextResponse.json({ success: true, data: images }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

// Bulk reorder
export async function PATCH(request) {
  await connectDB();
  try {
    const { items } = await request.json(); // [{ _id, order }]
    const ops = items.map(({ _id, order }) =>
      Image.findByIdAndUpdate(_id, { order }),
    );
    await Promise.all(ops);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
