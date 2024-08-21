const express = require('express');
const passport = require('passport');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const auth = require('./routes/auth/auth');
const userRoute = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src')))
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  res.send('Aplicativo iniciado com sucesso');
});

app.use('/', auth);
app.use('/', userRoute);

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(passport.authenticate('jwt', { session: false }));
app.use('/', postRouter);
app.use('/', commentRouter);
app.use('/', categoryRouter);

module.exports = app;
