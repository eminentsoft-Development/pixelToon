// app/api/gallery/videos/route.js
import { NextResponse } from "next/server";
import Video from "@/models/Video";
import connectDB from "@/lib/mongodb";

function extractYoutubeId(input) {
  // Accept raw ID or full URL
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
  ];
  for (const p of patterns) {
    const m = input.match(p);
    if (m) return m[1];
  }
  return input.trim(); // Assume raw ID
}

export async function GET() {
  await connectDB();
  try {
    const videos = await Video.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json({ success: true, data: videos });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const body = await request.json();
    const { title, youtubeId: rawId, order } = body;

    if (!title || !rawId) {
      return NextResponse.json(
        { success: false, error: "title and youtubeId are required" },
        { status: 400 }
      );
    }

    const youtubeId = extractYoutubeId(rawId);
    const thumbnail = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
    const url = `https://www.youtube.com/watch?v=${youtubeId}`;

    const video = await Video.create({ title, youtubeId, thumbnail, url, order: order || 0 });
    return NextResponse.json({ success: true, data: video }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request) {
  await dbConnect();
  try {
    const { items } = await request.json();
    await Promise.all(items.map(({ _id, order }) => Video.findByIdAndUpdate(_id, { order })));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}