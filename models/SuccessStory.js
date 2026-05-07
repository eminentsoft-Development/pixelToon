import mongoose from "mongoose";

const SuccessStorySchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    altText: { type: String, default: "Placement Success Poster" },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.SuccessStory || mongoose.model("SuccessStory", SuccessStorySchema);