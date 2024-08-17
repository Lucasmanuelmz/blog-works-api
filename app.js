const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const passport = require('./middlewares/passport');
const auth = require('./routes/users/auth');
const userRoute = require('./routes/users/userRoutes');
const signupRouter = require('./controllers/users/post');
const categoryRouter = require('./routes/category/categoryController');
const postRouter = require('./routes/posts');
const commentRouter = require('./routes/comments');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next()
})
app.use('/auth', auth);
app.use('/users', signupRouter.createUser);
app.use('/', passport.authenticate('jwt', {session: false}), userRoute)
app.get('/', (req, res) => {
  res.send('Aplicativo iniciado com sucesso')
});
app.use('/', categoryRouter);
app.use('/', postRouter);
app.use('/', commentRouter);
app.listen(PORT,() => console.log('Servidor iniciado com sucesso! ', PORT));