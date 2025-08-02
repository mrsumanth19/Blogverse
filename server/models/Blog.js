import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  visibility: { type: String, enum: ['public', 'private'], default: 'public' }
}, { timestamps: true });

export default mongoose.model('Blog', BlogSchema);
