const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
require('dotenv').config();
const User = require('../models/userModel');

passport.use(new LocalStrategy({ usernameField: 'email' }, 
  (email, password, done) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return done(null, false, { error: 'Email or password error' });
        }

        bcrypt.compare(password, user.password)
          .then(isMatch => {
            if (!isMatch) {
              return done(null, false, { error: 'Email or password error' });
            }
            return done(null, user);
          })
          .catch(err => done(err, false));
      })
      .catch(error => done(error, false));
  }
));

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_PASSWORD,
};

passport.use(new JwtStrategy(options, (payload, done) => {
  User.findByPk(payload.id)
    .then(user => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(error => done(error, false));
}));

module.exports = passport;
