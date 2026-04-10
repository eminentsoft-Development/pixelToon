"use server"

import connectDB from "@/lib/mongodb";
import Video from "@/models/Video";

export async function fetchVideoGallery({ skip = 0, limit = 30 }) {
  await connectDB();
  try {
    const videos = await Video.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    return videos.map(vid => ({
      id: vid._id.toString(),
      src: vid.thumbnail, // Using the high-quality YT thumbnail
      youtubeId: vid.youtubeId,
      title: vid.title,
      type: "video"
    }));
  } catch (error) {
    console.error("Video Fetch Error:", error);
    return [];
  }
}