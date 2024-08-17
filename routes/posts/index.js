const { Router } = require('express');
const postRouter = Router();
const postController = require('../../controllers/post/index');

postRouter.get('/posts', postController.getPosts);
postRouter.get('/posts/:id', postController.getPostById);
postRouter.put('/posts', postController.updatePost);
postRouter.delete('/posts', postController.deletePost);
postRouter.post('/posts', postController.createPost);
module.exports = postRouter;