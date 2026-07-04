import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

// 1. Link your .env cloud credentials
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Set up Multer RAM buffer storage
const storage = multer.memoryStorage();

// 3. Strict File Filter: Block anything that isn't an image
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file format. Please upload an image.'), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Cap file sizes at 5MB
    fileFilter
});

export { cloudinary, upload };