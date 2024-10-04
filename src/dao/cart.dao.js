const mongoose = require('mongoose');
const Cart = require('../models/cart');
const Product = require('../models/products');

const create = async () => {
  const cart = new Cart();
  return await cart.save();
};

const addProduct = async (cid, pid) => {
  try {
    const cartId = mongoose.Types.ObjectId(cid);
    const productId = mongoose.Types.ObjectId(pid);
    
    const cart = await Cart.findById(cartId);
    if (!cart) {
      return { status: 'error', message: 'Cart not found' };
    }

    const product = await Product.findById(productId);
    if (!product) {
      return { status: 'error', message: 'Product not found' };
    }

    // Verificar el stock
    if (product.stock < 1) {
      return { status: 'error', message: 'Product out of stock' };
    }

    // Buscar si el producto ya existe en el carrito
    const productIndex = cart.products.findIndex(p => p.product.toString() === productId.toString());

    if (productIndex > -1) {
      // Si el producto ya está en el carrito, incrementa la cantidad
      cart.products[productIndex].quantity += 1;
    } else {
      // Si el producto no está en el carrito, agrégalo con cantidad 1
      cart.products.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    return { status: 'success', message: 'Product added to cart successfully' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

const findAll = async () => {
  return await Cart.find().populate('products.product'); // Asegúrate de poblar aquí si es necesario
};

const findById = async (id) => {
  const cart = await Cart.findById(id).populate('products.product');

  // Si el carrito no se encuentra, devuelve null
  if (!cart) {
    return null;
  }

  // Omite el campo `stock` y muestra el campo `quantity`
  cart.products = cart.products.map(p => ({
    product: {
      _id: p.product._id,
      name: p.product.name,
      description: p.product.description,
      price: p.product.price,
      category: p.product.category,
    },
    quantity: p.quantity,
  }));

  return cart; // Retorna el carrito modificado
};

const updateProductQuantity = async (cid, pid, quantity) => {
  try {
    const cart = await Cart.findById(cid);
    if (!cart) {
      return { status: 'error', message: 'Cart not found' };
    }

    const productIndex = cart.products.findIndex(p => p.product.toString() === pid);

    if (productIndex > -1) {
      // Actualizar la cantidad del producto en el carrito
      cart.products[productIndex].quantity = quantity;
      await cart.save();
      return { status: 'success', message: 'Product quantity updated successfully' };
    } else {
      return { status: 'error', message: 'Product not found in cart' };
    }
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

const removeProduct = async (cid, pid) => {
  const cart = await Cart.findById(cid);
  if (!cart) return null;

  cart.products = cart.products.filter(p => p.product.toString() !== pid);
  return await cart.save();
};

const clear = async (cid) => {
  const cart = await Cart.findById(cid);
  if (!cart) return null;

  cart.products = [];
  return await cart.save();
};

module.exports = {
  create,
  addProduct,
  findAll,
  findById,
  updateProductQuantity,
  removeProduct,
  clear,
};











