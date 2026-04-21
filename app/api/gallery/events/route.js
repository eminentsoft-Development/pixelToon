import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET() {
  await connectDB();
  try {
    const events = await Event.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: events });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  await connectDB();

  try {
    const { title, date, description } = await request.json();

    if (!title?.trim()) {
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 400 },
      );
    }
    if (!date) {
      return NextResponse.json(
        { success: false, error: "Date is required" },
        { status: 400 },
      );
    }

    const event = await Event.create({ title, date, description });
    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
