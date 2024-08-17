const { Router } = require('express');
const commentRouter = Router();
const commentController = require('../../controllers/comments/index');

commentRouter.get('/posts/comments', commentController.getComments);
commentRouter.get('/posts/comments/:id', commentController.getCommentById);
commentRouter.put('/posts/comments', commentController.updateComment);
commentRouter.delete('/posts/comments', commentController.deleteComment);
commentRouter.post('/posts/comments', commentController.createComment);
module.exports = commentRouter;