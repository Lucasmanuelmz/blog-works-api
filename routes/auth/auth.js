const { Router } = require('express');
const userRoute = Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const validateAuth = require('../../validation/validateAuth');
const { validationResult } = require('express-validator');

userRoute.post('/api/auth/login', validateAuth, (req, res, next) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Algo deu errado', user });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_PASSWORD,
      { expiresIn: '1h' }
    );

    return res.json({ user, token });
  })(req, res, next);
});

userRoute.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: 'Você saiu da sua conta com sucesso!' });
  });
});

module.exports = userRoute;
