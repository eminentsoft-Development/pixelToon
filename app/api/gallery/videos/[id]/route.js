// app/api/gallery/videos/[id]/route.js
import { NextResponse } from "next/server";
import Video from "@/models/Video";
import connectDB from "@/lib/mongodb";

function extractYoutubeId(input) {
  const m = input.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return m ? m[1] : input.trim();
}

export async function GET(_, { params }) {
  await connectDB();
  try {
    const video = await Video.findById(params.id);
    if (!video) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: video });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  await connectDB();
  try {
    const body = await request.json();
    if (body.youtubeId) {
      body.youtubeId = extractYoutubeId(body.youtubeId);
      body.thumbnail = `https://i.ytimg.com/vi/${body.youtubeId}/maxresdefault.jpg`;
      body.url = `https://www.youtube.com/watch?v=${body.youtubeId}`;
    }
    const video = await Video.findByIdAndUpdate(params.id, body, { new: true });
    if (!video) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, data: video });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  await connectDB();
  try {
    const video = await Video.findByIdAndDelete(params.id);
    if (!video) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true, message: "Video deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}