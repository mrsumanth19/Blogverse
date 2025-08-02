import Blog from '../models/Blog.js';

export const createBlog = async (req, res) => {
  try {
    const { title, content, tags, visibility } = req.body;
    const newBlog = new Blog({
      title,
      content,
      tags,
      visibility,
      author: req.user.id, // user info added by verifyToken
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (err) {
    console.error('Create blog error:', err);
    res.status(500).json({ error: 'Failed to create blog' });
  }
};
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ visibility: 'public' }) // ✅ filter here
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
};

// Get all blogs by the logged-in user
export const getMyBlogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const blogs = await Blog.find({ author: userId })
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch your blogs' });
  }
};
