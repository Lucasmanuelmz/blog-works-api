const { Router } = require('express');
const commentRouter = Router();
const commentController = require('../controllers/commentController');
const validateComments = require('../validation/validadeComments')

commentRouter.get('/api/posts/comments', commentController.getComments);
commentRouter.get('/api/posts/:id/comments', commentController.getComments);
commentRouter.put('/api/posts/comments', validateComments,  commentController.updateComment);
commentRouter.delete('/api/posts/comments', commentController.deleteComment);
commentRouter.post('/api/posts/:id/comments', validateComments, commentController.createComment);
module.exports = commentRouter;