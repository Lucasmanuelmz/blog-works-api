const { Router } = require('express');
const categoryRouter = Router();
const categoryController = require('../controllers/categoryController');

categoryRouter.get('/api/categories', categoryController.getCategories);
categoryRouter.get('/api/categories/:id', categoryController.getCategoryById);
categoryRouter.put('/api/categories', categoryController.updateCategory);
categoryRouter.delete('/api/categories', categoryController.deleteCategory);
categoryRouter.post('/api/categories', categoryController.createCategory);
module.exports = categoryRouter;