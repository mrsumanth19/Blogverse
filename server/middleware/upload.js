import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = 'blog_uploads';

    let resource_type = 'auto';
    if (file.mimetype === 'application/pdf') {
      resource_type = 'raw'; // ✅ correct for PDFs
    } else if (file.mimetype.startsWith('video/')) {
      resource_type = 'video';
    }

    return {
      folder,
      resource_type,
      format: undefined, // Let Cloudinary auto-detect
    };
  },
});

const upload = multer({ storage });
export default upload;
