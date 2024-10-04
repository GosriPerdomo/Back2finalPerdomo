const cartRepository = require('../Services/cart.services');
const TicketDTO = require('../dto/ticketDTO');
const productRepository = require('../Services/product.services')
const CartDTO = require('../dto/cartDTO')



const createCart = async (req, res) => {
  try {
    const result = await cartRepository.create();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error creating cart', details: error.message });
  }
};

const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    // Siempre agregar 1 unidad del producto al carrito
    const quantity = 1;
    const result = await cartRepository.addProduct(cid, pid, quantity);
    
    res.status(result.status === 'success' ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error adding product to cart', details: error.message });
  }
};

const getAllCarts = async (req, res) => {
  try {
    const result = await cartRepository.findAll();
    res.status(200).json({ status: 'success', payload: result });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error retrieving carts', details: error.message });
  }
};

const getCartById = async (req, res) => {
  const { cid } = req.params;

  try {
    const result = await cartRepository.findById(cid);
    
    if (!result) {
      return res.status(404).json({ status: 'error', message: 'Cart not found' });
    }

    // Instancia el DTO con el resultado del repositorio
    const cartDTO = new CartDTO(result);

    // Devuelve la respuesta con el DTO
    res.status(200).json({ status: 'success', payload: cartDTO });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error retrieving cart', details: error.message });
  }
}

const updateProductQuantityInCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const result = await cartRepository.updateProductQuantity(cid, pid, quantity);
    res.status(result.status === 'success' ? 200 : 400).json(result);
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error updating product quantity', details: error.message });
  }
};

const removeProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const result = await cartRepository.removeProduct(cid, pid);
    res.status(result ? 200 : 404).json(result ? { status: 'success', message: 'Product removed from cart' } : { status: 'error', message: 'Cart not found' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error removing product from cart', details: error.message });
  }
};

const clearCart = async (req, res) => {
  const { cid } = req.params;

  try {
    const result = await cartRepository.clear(cid);
    res.status(result ? 200 : 404).json(result ? { status: 'success', message: 'Cart cleared' } : { status: 'error', message: 'Cart not found' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error clearing cart', details: error.message });
  }
};

const purchaseCart = async (req, res) => {
  try {
      const { cid } = req.params;

      const cart = await cartRepository.findById(cid);
      if (!cart) {
          return res.status(404).json({ message: 'Cart not found' });
      }

      let total = 0;
      const unavailableProducts = [];
      const purchasedProducts = [];


      for (let item of cart.products) {

          const productId = item.product._id; 


          const product = await productRepository.findById(productId);

          if (!product) {
              unavailableProducts.push(item.product.name); 
              continue; 
          }

          if (typeof product.stock !== 'number' || isNaN(product.stock)) {
              unavailableProducts.push(product.name);
              continue; 
          }


          if (product.stock < item.quantity) {
              unavailableProducts.push(product.name);
              continue; 
          }

          // Restar del stock
          product.stock -= item.quantity;

          if (isNaN(product.stock) || product.stock < 0) {
              throw new Error('Invalid stock value');
          }

          // Guardar el producto actualizado
          await productRepository.updateStock(product._id, product.stock);

          total += product.price * item.quantity;
          purchasedProducts.push({
              productId: product._id,
              quantity: item.quantity,
          });
      }

      if (purchasedProducts.length === 0) {
          return res.status(400).json({
              message: 'No hay productos disponibles',
              unavailableProducts,
          });
      }

      // Actualizar el carrito
      cart.products = cart.products.filter(item => {
          return !purchasedProducts.some(p => p.productId.toString() === item.product._id.toString());
      });

      await cart.save();

      // Crear el ticket aquí
      const ticket = await cartRepository.createTicket(total, req.user.email);
      const ticketDTO = new TicketDTO(ticket);

      res.status(200).json({
          message: 'Compra realizada exitosamente',
          total,
          unavailableProducts,
          ticket: ticketDTO,
      });

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing the purchase' });
  }
};


module.exports = {
  createCart,
  addProductToCart,
  getAllCarts,
  getCartById,
  updateProductQuantityInCart,
  removeProductFromCart,
  clearCart,
  purchaseCart
};


