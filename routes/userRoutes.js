const userRoutes = require('express').Router();
const userController = require('../controllers/userController');
const passport = require('../middlewares/passport');
const validateUser = require('../validation/userValidation')

userRoutes.post('/api/users', validateUser,  userController.createUser)
userRoutes.get('/api/users',  passport.authenticate('jwt', {session: false}), userController.getUsers)
userRoutes.get('/api/users/:id',  passport.authenticate('jwt', {session: false}), userController.getUserById)
userRoutes.delete('/api/users/:id',  passport.authenticate('jwt', {session: false}), userController.deleteUser);
userRoutes.put('/api/users/:id', validateUser, passport.authenticate('jwt', {session: false}), userController.updateUser)
module.exports = userRoutes;
