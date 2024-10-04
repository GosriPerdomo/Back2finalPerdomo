const Cart = require('../models/cart'); // Asegúrate de que la ruta al modelo sea correcta

const cartAuth = async (req, res, next) => {
  const { cid } = req.params; // Obtener el ID del carrito de los parámetros
  const userId = req.user._id; // Obtener el ID del usuario autenticado

  try {
    // Buscar el carrito por ID
    const cart = await Cart.findById(cid);

    // Verificar si el carrito existe
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    // Verificar si el usuario es el propietario del carrito
    if (!cart.owner || cart.owner.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Acceso denegado: no eres el propietario de este carrito' });
    }

    // Si el usuario es el propietario, continuar al siguiente middleware
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al verificar el propietario del carrito' });
  }
};

module.exports = cartAuth;
