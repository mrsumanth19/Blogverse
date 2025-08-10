import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  visibility: { type: String, enum: ['public', 'private'], default: 'public' },

  // New fields:
  images: [String],       // Array of Cloudinary image URLs
  videos: [String],       // Array of Cloudinary video URLs
  documents: [String],    // Array of PDF URLs
}, { timestamps: true });

export default mongoose.model('Blog', BlogSchema);
