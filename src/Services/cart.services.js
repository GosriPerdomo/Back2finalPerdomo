const cartDao = require('../dao/cart.dao');
const Product = require('../models/products'); 
const Ticket = require('../models/ticket')

class CartRepository {
  async create() {
    return await cartDao.create();
  }

  async addProduct(cid, pid) {
    const product = await Product.findById(pid);
  
    if (!product) {
      return { status: 'error', message: 'Product not found' };
    }
  
    if (product.stock < 1) {
      return { status: 'error', message: 'Product out of stock' };
    }

    return await cartDao.addProduct(cid, pid); // Agrega 1 al carrito sin necesidad de pasar la cantidad
  }

  async findAll() {
    return await cartDao.findAll();
  }

  async findById(id) {
    return await cartDao.findById(id);
  }

  async updateProductQuantity(cid, pid, quantity) {
    return await cartDao.updateProductQuantity(cid, pid, quantity);
  }

  async removeProduct(cid, pid) {
    return await cartDao.removeProduct(cid, pid);
  }

  async clear(cid) {
    return await cartDao.clear(cid);
  }

  async createTicket(total, purchaser) {
    const ticketData = {
      purchase_datetime: new Date(),
      amount: total,
      purchaser: purchaser,
    };
    return await Ticket.create(ticketData);
  }
}

module.exports = new CartRepository();


