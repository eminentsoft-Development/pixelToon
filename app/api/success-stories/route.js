import { NextResponse } from "next/server";
import SuccessStory from "@/models/SuccessStory";
import connectDB from "@/lib/mongodb";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 2;
  const skip = (page - 1) * limit;

  try {
    const [stories, total] = await Promise.all([
      SuccessStory.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      SuccessStory.countDocuments(),
    ]);

    return NextResponse.json({
      success: true,
      data: stories,
      meta: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

export async function POST(req) {
  await connectDB();
  try {
    const { posters } = await req.json(); // Array of { imageUrl, altText }

    if (!posters || !Array.isArray(posters)) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 },
      );
    }

    const newEntries = await SuccessStory.insertMany(posters);
    return NextResponse.json({ success: true, data: newEntries });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
