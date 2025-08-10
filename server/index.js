import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import authRoutes from './routes/auth.js';
import blogRoutes from './routes/blog.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/upload', uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
