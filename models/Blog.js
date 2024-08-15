const mongoose=require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }],
    categories: [{
        type: String,
        trim: true
    }],
    
    published: {
        type: Boolean,
        default: false
    },
    comments: [{
        user: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    }
},{timestamps:true});


const Blog =mongoose.model('Blog',blogSchema);

module.exports=Blog;