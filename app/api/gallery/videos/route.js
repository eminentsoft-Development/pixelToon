import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Video from "@/models/Video";

function extractYoutubeId(url) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}

export async function GET() {
  await connectDB();
  try {
    const videos = await Video.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: videos });
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
    const { title, url } = await request.json();
    const youtubeId = extractYoutubeId(url);

    if (!youtubeId) {
      return NextResponse.json(
        { success: false, error: "Invalid YouTube URL" },
        { status: 400 },
      );
    }

    const video = await Video.create({
      title: title || "Untitled Video",
      youtubeId,
      url: `https://www.youtube.com/watch?v=${youtubeId}`,
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
    });

    return NextResponse.json({ success: true, data: video }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
