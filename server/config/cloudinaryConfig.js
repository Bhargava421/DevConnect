const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const dotenv = require('dotenv');

dotenv.config();

// Configure Cloudinary with credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer to use Cloudinary for storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'DevConnect_Posts', // The name of the folder in Cloudinary
    allowed_formats: ['jpeg', 'png', 'jpg'], // Allowed image formats
    // You can add transformations here if you want
  },
});

// Create the Multer instance with the configured storage
const upload = multer({ storage: storage });

module.exports = upload;