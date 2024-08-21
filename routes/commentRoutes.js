const { Router } = require('express');
const commentRouter = Router();
const commentController = require('../controllers/commentController');

commentRouter.get('/api/posts/comments', commentController.getComments);
commentRouter.get('/api/posts/:id/comments', commentController.getComments);
commentRouter.put('/api/posts/comments', commentController.updateComment);
commentRouter.delete('/api/posts/comments', commentController.deleteComment);
commentRouter.post('/api/posts/:id/comments', commentController.createComment);
module.exports = commentRouter;