import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  wpId: { type: Number, unique: true },
  slug: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: String,
  featuredImage: String,
  author: String,
  date: Date,
  importedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);