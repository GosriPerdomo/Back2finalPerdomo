// cartDTO.js
class CartDTO {
    constructor(cart) {
      this.id = cart._id;
      this.products = cart.products;
      this.owner = cart.owner; // Asegúrate de incluir el ID del usuario si lo tienes
    }
  }
  
  module.exports = CartDTO;
  