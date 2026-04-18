// app/api/gallery/events/route.js
import { NextResponse } from "next/server";
import Event from "@/models/Event";
import connectDB from "@/lib/mongodb";

export async function GET() {
  await connectDB();
  try {
    const events = await Event.find().sort({ date: -1 });
    return NextResponse.json({ success: true, data: events });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();
    const { title, description, date, images, coverImage, published } = body;

    if (!title) {
      return NextResponse.json({ success: false, error: "title is required" }, { status: 400 });
    }

    const event = await Event.create({
      title,
      description: description || "",
      date: date || new Date(),
      images: images || [],
      coverImage: coverImage || (images?.[0]?.url ?? ""),
      published: published ?? false,
    });

    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}