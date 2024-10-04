class ProductDTO {
    constructor(product) {
      this.id = product._id;
      this.name = product.name;
      this.description = product.description;
      this.price = product.price;
      this.stock = product.stock;
    }
  }
  
  module.exports = ProductDTO;
  