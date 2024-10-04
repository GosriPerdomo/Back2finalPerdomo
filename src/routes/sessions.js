const express = require('express');
const router = express.Router();
const passport = require('passport'); // Importar passport
const UserDTO = require('../dto/userDTO'); // Importar el DTO
const usuarioController = require('../controller/UsuarioController');
const authenticate = require('../middlewares/auth.middleware');
const UserRepository = require('../Services/user.services');

// Ruta para obtener el usuario actual usando autenticación
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (!req.user) return res.status(401).send({ message: 'Unauthorized' });

  const userDTO = new UserDTO(req.user); 
  return res.status(200).send(userDTO); // Enviar el DTO como respuesta
});

// Middleware para proteger rutas
const authenticateAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only' });
  }
  next();
};

// Rutas CRUD
router.get('/', usuarioController.obtenerUsuarios);
router.get('/:id', usuarioController.obtenerUsuarioPorId);
router.post('/register', usuarioController.registrarUsuario);
router.post('/login', usuarioController.loginUsuario);
router.get('/current', authenticate, usuarioController.obtenerUsuarioPorId); 
router.put('/:id', authenticate, authenticateAdmin, usuarioController.actualizarUsuario); 
router.delete('/:id', authenticate, authenticateAdmin, usuarioController.eliminarUsuario); 

module.exports = router;




