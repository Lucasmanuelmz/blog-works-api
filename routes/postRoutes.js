const { Router } = require('express');
const postRouter = Router();
const postController = require('../controllers/postController');
const upload = require('../config/index');
const postValidation = require('../validation/postValidation');

postRouter.post('/api/posts', postValidation, upload.single('file'), postController.createPost);
postRouter.get('/api/posts', postController.getPosts);
postRouter.get('/api/posts/:id', postController.getPostById);
postRouter.put('/api/posts', postValidation, postController.updatePost);
postRouter.delete('/api/posts', postController.deletePost);

module.exports = postRouter;