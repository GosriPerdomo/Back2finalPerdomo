const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // 
    required: false // Permitir carritos sin owner
  }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;












