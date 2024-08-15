const express=require("express");
const Blog = require("../models/Blog");
const router =express.Router();

router.post("/",async(req,res)=>{
    const blog=new Blog({
        title:req.body.title,
        author :req.body.author,
        content:req.body.content
       
    });
    try{
        const newBlog =await blog.save();
        console.log("working");
        res.json(newBlog);
    }
    catch(err)
    {
        console.log("error");
        res.json({ message: err.message });
    }
})
router.get('/:author', async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.params.author });
        
        if (blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found for this author" });
        }
        
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports=router;