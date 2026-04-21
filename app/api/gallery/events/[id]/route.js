import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/models/Event";

export async function GET(_req, { params }) {
  await connectDB();

  const { id } = await params;
  try {
    if (!id)
      return NextResponse.json(
        { success: false, error: "Invalid id" },
        { status: 400 },
      );

    const event = await Event.findById(id);
    if (!event)
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );

    return NextResponse.json({ success: true, data: event });
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
  if (!id)
    return NextResponse.json(
      { success: false, error: "Invalid id" },
      { status: 400 },
    );

  try {
    const body = await request.json();

    const event = await Event.findByIdAndUpdate(id, body, { new: true });
    if (!event)
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );

    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(_req, { params }) {
  await connectDB();

  const { id } = await params;
  if (!id)
    return NextResponse.json(
      { success: false, error: "Invalid id" },
      { status: 400 },
    );
    
  try {
    const event = await Event.findByIdAndDelete(id);
    if (!event)
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 },
      );
    return NextResponse.json({ success: true, message: "Event deleted" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
