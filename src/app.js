const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./db/db');
const productRouter = require('./routes/products');
const cartRouter = require('./routes/cartsRouter');
const sessionRouter = require('./routes/sessions');
const usuariosRouter = require('./routes/usuarios');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const authorizationMiddleware = require('./middlewares/auth.middleware'); 
const UserRepository = require('./Services/product.services');// Asegúrate de que la ruta sea correcta
require('./config/passport');



const app = express();
app.use(express.json());
app.use(cookieParser());

// Conectar a la base de datos
connectDB();

// Inicializar Passport
app.use(passport.initialize());

// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/usuarios', usuariosRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});









