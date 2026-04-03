import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: "" },
      },
    ],
    // Arrays for dynamic fields
    whyThisCourse: [{ value: { type: String } }],
    acquireItems: [{ value: { type: String } }],
    benefits: [{ value: { type: String } }],
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
    // Status
    isPublished: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    // SEO
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    canonicalUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);