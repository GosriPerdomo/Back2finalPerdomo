
const authorizationMiddleware = (req, res, next) => {

  const userRole = req.user?.role;

  // Comprobamos si el usuario es admin
  if (userRole === 'admin') {
      return next(); // Si es admin, continuar con la siguiente función
  } else {
      return res.status(403).json({ message: 'Acceso denegado. Se requiere rol de administrador.' });
  }
};

module.exports = authorizationMiddleware;












