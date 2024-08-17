const { Router } = require('express');
const userRoute = Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

userRoute.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (error, user, info) => {
    if (error || !user) {
      return res.status(400).json({
        message: 'Alguma coisa esta errada',
        info: info || error
      });
    }

    const token = jwt.sign(
      { sub: user._id, email: user.email }, 
      process.env.SECRET_PASSWORD,
      { expiresIn: '1h' }
    );

    return res.json({ user, token });
  })(req, res, next);
});

module.exports = userRoute;
