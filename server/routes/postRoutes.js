const express = require('express');
const router = express.Router();
const { createPost, getAllPosts } = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');
const upload = require('../config/cloudinaryConfig'); // Our multer setup

// --- Routes ---

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get('/', getAllPosts);

// @route   POST /api/posts
// @desc    Create a new post
// @access  Private
router.post('/', protect, upload.single('image'), createPost);

module.exports = router;