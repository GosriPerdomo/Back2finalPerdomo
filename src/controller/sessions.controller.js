const passport = require('passport');

const current = (req, res) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error(err); // Agregar logs para rastrear el error
      return res.status(500).json({ status: 'error', message: 'Internal server error' });
    }

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Not authenticated' });
    }

    // Responde con los datos del usuario
    res.json({ status: 'success', payload: user });
  })(req, res);
};

module.exports = {
  current
};


