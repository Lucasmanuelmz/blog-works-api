const { Router } = require('express');
const categoryRouter = Router();
const categoryController = require('../../controllers/categories/index');

categoryRouter.get('/categories', categoryController.getCategories);
categoryRouter.get('/categories/:id', categoryController.getCategoryById);
categoryRouter.put('/categories', categoryController.updateCategory);
categoryRouter.delete('/categories', categoryController.deleteCategory);
categoryRouter.post('/categories', categoryController.createCategory);
module.exports = categoryRouter;