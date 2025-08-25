const Post = require('../models/Post');

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        
        const author = req.user._id;

        const postData = {
            title,
            content,
            author, 
        };

        // If a file was uploaded, add its details to postData
        if (req.file) {
            postData.image = {
                url: req.file.path,
                public_id: req.file.filename,
            };
        }

        const newPost = await Post.create(postData);

        // Populate the author field before sending it back
        await newPost.populate('author', 'name');

        return res.status(201).json({ message: "Post created successfully", post: newPost });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'name') // Get the author's name
            .sort({ createdAt: -1 }); // Show newest posts first

        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createPost, getAllPosts };