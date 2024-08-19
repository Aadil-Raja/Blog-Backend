const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');  // Ensure correct path
const auth = require('../middleware/auth');

router.post('/', auth,blogController.createBlog);  // Ensure you're passing functions, not an object
router.put('/:author',auth ,blogController.updateBlogByAuthor);
router.get('/articles', blogController.getBlogs);
router.get('/:author', blogController.getBlogsByAuthor);
router.delete('/:author', auth,blogController.deleteBlogByAuthor);

module.exports = router;

