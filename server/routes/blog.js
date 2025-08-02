import express from 'express';
import { createBlog, getAllBlogs, getMyBlogs } from '../controllers/blogController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create blog (protected)
router.post('/', verifyToken, createBlog);

// Public blogs
router.get('/', getAllBlogs);

// User-specific blogs (private + public)
router.get('/my-blogs', verifyToken, getMyBlogs);

export default router;
