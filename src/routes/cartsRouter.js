const express = require('express');
const router = express.Router();
const cartsController = require('../controller/carts.controller');
const cartAuth = require('../middlewares/cartAuth');
const passport = require('passport');

// Crear un nuevo carrito
router.post('/', cartsController.createCart);

// Agregar producto al carrito
router.post('/:cid/products/:pid', passport.authenticate('jwt', { session: false }), cartAuth, cartsController.addProductToCart);

// Obtener todos los carritos
router.get('/', cartsController.getAllCarts);

// Obtener un carrito por ID
router.get('/:cid', cartsController.getCartById);

// Actualizar la cantidad de un producto en el carrito
router.put('/:cid/products/:pid', passport.authenticate('jwt', { session: false }), cartAuth, cartsController.updateProductQuantityInCart);

// Eliminar un producto del carrito
router.delete('/:cid/products/:pid', passport.authenticate('jwt', { session: false }), cartAuth, cartsController.removeProductFromCart);

// Eliminar todos los productos del carrito
router.delete('/:cid', passport.authenticate('jwt', { session: false }), cartAuth, cartsController.clearCart);

// Nueva ruta para realizar la compra de todos los productos del carrito
router.post('/:cid/purchase', passport.authenticate('jwt', { session: false }),cartAuth, cartsController.purchaseCart);

module.exports = router;








