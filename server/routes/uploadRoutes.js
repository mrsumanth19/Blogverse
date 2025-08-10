import express from 'express';
import upload from '../middleware/upload.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/file', verifyToken, upload.single('file'), (req, res) => {
  res.status(200).json({ url: req.file.path });
});

export default router;
