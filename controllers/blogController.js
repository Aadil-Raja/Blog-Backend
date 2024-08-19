const Blog = require('../models/Blog');

// Controller to handle creating a new blog post
exports.createBlog = async (req, res) => {
    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    });

    try {
        const newBlog = await blog.save();
        console.log("Blog created successfully");
        res.json(newBlog);
    } catch (err) {
        console.log("Error creating blog");
        res.status(500).json({ message: err.message });
    }
};

// Controller to handle updating a blog post by author
exports.updateBlogByAuthor = async (req, res) => {
    try {
        const updatedBlog = await Blog.findOneAndUpdate(
            { author: req.params.author },
            { content: req.body.content },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog by this author not found" });
        }

        res.json(updatedBlog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to handle getting all blogs with optional filters
exports.getBlogs = async (req, res) => {
    try {
        let query = {};

        if (req.query.author) {
            query.author = req.query.author;
        }
        if (req.query.startDate || req.query.endDate) {
            query.createdAt = {};
            if (req.query.startDate) {
                query.createdAt.$gte = new Date(req.query.startDate);
            }
            if (req.query.endDate) {
                query.createdAt.$lte = new Date(req.query.endDate);
            }
        }

        const blogs = await Blog.find(query);
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to handle getting blogs by author
exports.getBlogsByAuthor = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.params.author });

        if (blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found for this author" });
        }

        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to handle deleting a blog by author
exports.deleteBlogByAuthor = async (req, res) => {
    try {
        await Blog.deleteOne({ author: req.params.author });
        res.json({ message: "Blog deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
