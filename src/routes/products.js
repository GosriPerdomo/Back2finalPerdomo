const express = require('express');
const router = express.Router();
const productController = require('../controller/products.controller');
const authorizationMiddleware = require('../middlewares/auth.middleware');
const passport = require('passport');
const Product = require('../models/products'); 

// Crear un nuevo producto - Solo administradores
router.post('/',passport.authenticate('jwt', { session: false }), authorizationMiddleware, productController.createProduct);

// Obtener todos los productos con paginación y filtros
router.get('/', productController.getAllProducts);

// Obtener un producto por ID
router.get('/:pid', productController.getProductById);

// Eliminar un producto por ID - Solo administradores
router.delete('/:pid', passport.authenticate('jwt', { session: false }), authorizationMiddleware, productController.deleteProductById);

// Ruta para actualizar la cantidad de un producto
router.put('/:pid', passport.authenticate('jwt', { session: false }), authorizationMiddleware, productController.updateProductQuantity);



module.exports = router;






