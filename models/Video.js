// models/Video.js
import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    youtubeId: { type: String, required: true },
    thumbnail: String, // Sharpest version: maxresdefault
    url: String,       // Full link for convenience
  },
  { timestamps: true }
);

export default mongoose.models.Video || mongoose.model("Video", VideoSchema);