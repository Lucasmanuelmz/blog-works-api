const express = require('express');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const auth = require('./routes/users/auth');
const userRoute = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'))

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  res.send('Aplicativo iniciado com sucesso');
});
app.use('/auth', auth);
app.use('/', userRoute);
app.use('/', passport.authenticate('jwt', { session: false }), postRouter);
app.use('/', passport.authenticate('jwt', { session: false }), commentRouter);
app.use('/', passport.authenticate('jwt', { session: false }), categoryRouter);

module.exports = app;
