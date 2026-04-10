"use server";

import connectDB from "@/lib/mongodb";
import Image from "@/models/Image";


export async function fetchGalleryItems({ category, skip = 0, limit = 12 }) {
  await connectDB();

  const filter = category && category !== "All" ? { category } : {};

  try {
    const images = await Image.find(filter)
      .sort({ createdAt: -1 }) // Sort by timestamp (newest first)
      .skip(skip)
      .limit(limit)
      .lean();

    return images.map((img) => ({
      id: img._id.toString(),
      src: img.url,
      thumb: img.url, // Using same URL for thumb to keep DB light
      category: img.category,
      title: img.alt || "Gallery Image",
      // Since we removed 'aspect', we can calculate it or default it:
      aspect: "square", 
    }));
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}