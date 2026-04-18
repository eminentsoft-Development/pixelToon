// app/api/gallery/events/[id]/route.js
import { NextResponse } from "next/server";
import Event from "@/models/Event";
import connectDB from "@/lib/mongodb";

export async function GET(_, { params }) {
  await connectDB();
  try {
    const event = await Event.findById(params.id);
    if (!event) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  try {
    const body = await request.json();
    // Auto-set coverImage from first image if not provided
    if (!body.coverImage && body.images?.length > 0) {
      body.coverImage = body.images[0].url;
    }
    const event = await Event.findByIdAndUpdate(params.id, body, { new: true });
    if (!event) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  await connectDB();
  try {
    const event = await Event.findByIdAndDelete(params.id);
    if (!event) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Event deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// Add images to an existing event
export async function PATCH(request, { params }) {
  await connectDB();
  try {
    const { action, images, imageIndex } = await request.json();

    const event = await Event.findById(params.id);
    if (!event) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });

    if (action === "addImages") {
      event.images.push(...images);
    } else if (action === "removeImage") {
      event.images.splice(imageIndex, 1);
    } else if (action === "reorderImages") {
      event.images = images; // Full replacement with new order
    } else if (action === "togglePublish") {
      event.published = !event.published;
    }

    if (event.images.length > 0 && !event.coverImage) {
      event.coverImage = event.images[0].url;
    }

    await event.save();
    return NextResponse.json({ success: true, data: event });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}