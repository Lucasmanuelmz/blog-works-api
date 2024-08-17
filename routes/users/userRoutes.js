const userRoutes = require('express').Router();
const ddeleteController = require('../../controllers/users/delete');
const putController = require('../../controllers/users/put')
const getController = require('../../controllers/users/get')

userRoutes.get('/users', getController.getUsers)
userRoutes.get('/users/:id', getController.getUserById)
userRoutes.delete('/users', ddeleteController.deleteUser);
userRoutes.put('users', putController.updateUser)
module.exports = userRoutes;
