import Video from "../models/Video.js";
import connectDB from "../lib/mongodb.js";

const videoUrls = [
  "https://youtu.be/ZYp64zxq2cc?si=AyKTili-EYwUKY9v",
  "https://youtu.be/MeHAVbCTlis?si=ebVvS7K_kiBBCJvZ",
  "https://youtu.be/Cc3cZjK_suk?si=qLqEq_Uwth3NBAFx",
  "https://youtu.be/78_hIxFWGQo?si=a1UsMJY-9Vfd9szH",
  "https://youtu.be/Y5j2vjHz99c?si=2fjdTqRo18hcOBlE",
  "https://youtu.be/hYUCBytldCs?si=9dDDg6gPnhtNP3zc",
  "https://youtu.be/PlhHqaeJnjo?si=HVrW96_0ls56IxnH",
  "https://youtu.be/25FSyCl6yKw?si=HiFyFqnLCveVR8Rs",
  "https://youtu.be/Cuwmv-d1-xc?si=lsoa3qky2wQ8f9wq",
  "https://youtu.be/Cuwmv-d1-xc?si=Et8WdTixVCOsYV8h",
  "https://youtu.be/Gy8P4iI8zms?si=BfwGY7SXN-wecRW3",
  "https://youtu.be/pSmlO4SHx7o?si=TQFLv4OuK-iJW3xw",
  "https://youtu.be/tSPpP6XWBME?si=MEoy_z2Kwp9uKBcn",
  "https://youtu.be/TaxCu6-YgfE?si=BfQoi3i7QBWjFeld",
  "https://youtu.be/fTRo1jecddg?si=joRBzG5wGwKITxSY",
  "https://youtu.be/d0KrpGHatEw?si=3GOy6zT-0lcsVbej",
  "https://youtu.be/-X_NEAXQykc?si=wCWDv6SklhvvrTzu",
  "https://youtu.be/Hz6NoMwfRns?si=gxlEKC96QvFwGwmt",
  "https://youtu.be/2yv5vX2WuSo?si=85jmmDMAM1YH1X-d",
  "https://youtu.be/fRiKFe8_G4A?si=xeFe95KvIJPisUtd",
  "https://youtu.be/f8f0PfRpcd4?si=XbUDc5mGdmtuiXu6",
];

/**
 * Fetches the video title using YouTube's oEmbed API.
 */
async function getYoutubeMetadata(id) {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
    );
    if (!response.ok) throw new Error("Metadata fetch failed");
    const data = await response.json();
    return data.title;
  } catch (error) {
    console.warn(`Could not fetch title for ${id}, using fallback.`);
    return "Pixeltoonz Student Project"; 
  }
}

/**
 * Checks YouTube's image servers for the highest available resolution.
 * Fallback order: Max Res -> Standard Def -> High Quality -> Default
 */
async function getBestThumbnail(id) {
  const resolutions = ["maxresdefault", "sddefault", "hqdefault"];

  for (const res of resolutions) {
    const url = `https://img.youtube.com/vi/${id}/${res}.jpg`;
    try {
      const response = await fetch(url, { method: "HEAD" });
      if (response.ok) return url;
    } catch (err) {
      continue;
    }
  }

  return `https://img.youtube.com/vi/${id}/default.jpg`;
}

async function uploadVideos() {
  try {
    await connectDB();
    console.log("Connected to Database. Starting upload...");

    for (const url of videoUrls) {
      // 1. Extract ID from various URL formats
      const youtubeId = url.split("/").pop().split("?")[0];

      // 2. Avoid duplicates: Check if video already exists
      const existing = await Video.findOne({ youtubeId });
      if (existing) {
        console.log(`⏩ Skipping (Already exists): ${youtubeId}`);
        continue;
      }

      // 3. Fetch Title and the best available Thumbnail
      console.log(`⏳ Processing: ${youtubeId}...`);
      const title = await getYoutubeMetadata(youtubeId);
      const thumbnail = await getBestThumbnail(youtubeId);

      // 4. Save to DB
      await Video.create({
        title,
        youtubeId,
        thumbnail,
        url: `https://www.youtube.com/watch?v=${youtubeId}`,
        category: "students-life",
      });

      console.log(`✅ Saved: ${title}`);
    }

    console.log("🚀 All Videos processed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Fatal Error during upload:", error);
    process.exit(1);
  }
}

uploadVideos();