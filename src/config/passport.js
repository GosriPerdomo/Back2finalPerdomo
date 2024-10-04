const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/user');

const secretKey = process.env.JWT_SECRET_KEY || 'tareacoder';

// Opciones para la estrategia JWT
const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([extractJwtFromCookie]),
  secretOrKey: secretKey,
};

// Función para extraer el JWT de las cookies
function extractJwtFromCookie(req) {
  return req.cookies && req.cookies.jwt ? req.cookies.jwt : null;
}

// Estrategia JWT
passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;




