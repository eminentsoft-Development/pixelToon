// app/api/gallery/images/[id]/route.js
import { NextResponse } from "next/server";
import Image from "@/models/Image";
import connectDB from "@/lib/mongodb";

export async function GET(_, { params }) {
  await connectDB();

  const { id } = await params;

  try {
    const image = await Image.findById(id);
    if (!image)
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, data: image });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  const { id } = await params;

  try {
    const body = await request.json();
    const image = await Image.findByIdAndUpdate(id, body, { new: true });
    if (!image)
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, data: image });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(_, { params }) {
  await connectDB();

  const { id } = await params;
  console.log("Deleting image with ID:", id);
  try {
    const image = await Image.findByIdAndDelete(id);
    if (!image)
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, message: "Image deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
