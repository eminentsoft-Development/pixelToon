import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: Date, default: Date.now },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: "" },
        order: { type: Number, default: 0 },
      },
    ],
    coverImage: { type: String, default: "" },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);