const { Router } = require('express');
const postRouter = Router();
const postController = require('../controllers/postController')

postRouter.post('/api/posts', postController.createPost);
postRouter.get('/api/posts', postController.getPosts);
postRouter.get('/api/posts/:id', postController.getPostById);
postRouter.put('/api/posts', postController.updatePost);
postRouter.delete('/api/posts', postController.deletePost);

module.exports = postRouter;