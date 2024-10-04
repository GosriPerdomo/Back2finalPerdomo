const productDao = require('../dao/product.dao');
const Product = require('../models/products');
const mongoose = require('mongoose');

class ProductRepository {
  async create(data) {
    return await productDao.create(data);
  }

  async findAll(options) {
    return await productDao.findAll(options);
  }

  async findById(id) {
    return await productDao.findById(id);
  }

  async deleteProduct(id) {
    return await productDao.deleteProduct(id);
  }

  async updateStock(id, quantity) {
    const product = await productDao.findById(id);
    if (!product) throw new Error('Product not found');
    product.stock = quantity;
    return await product.save();
  }
}

module.exports = new ProductRepository();
