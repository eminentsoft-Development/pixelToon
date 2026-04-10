import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    category: { type: String, required: true },
    alt: { type: String, default: "" },
  },
  { timestamps: true } 
);

export default mongoose.models.Image || mongoose.model("Image", ImageSchema);