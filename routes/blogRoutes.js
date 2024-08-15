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
router.put('/:author', async (req, res) => {
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
});

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

router.delete('/:author', async (req, res) => {
    try {
         await Blog.deleteOne({ author: req.params.author });
        
       
        
        res.json({message:"deleted"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports=router;