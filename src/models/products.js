// models/product.js
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  stock: { type: Number, required: true, min: 0 },
});

// Añadir el plugin de paginación
productSchema.plugin(mongoosePaginate);

// Exportar el modelo
module.exports = mongoose.model('Product', productSchema);



