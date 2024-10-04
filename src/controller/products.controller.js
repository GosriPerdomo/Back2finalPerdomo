const ProductRepository = require("../Services/product.services");
const ProductDTO = require("../dto/productsDTO"); 


const createProduct = async (req, res) => {
  try {
    const product = await ProductRepository.create(req.body);
    res.status(201).json({ status: 'success', payload: product });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {

    const options = {
      limit: req.query.limit || 10, 
      page: req.query.page || 1,      
      sort: req.query.sort || 'asc',   
    };

    const result = await ProductRepository.findAll(options); 
    res.status(200).json(result); 
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Error retrieving products', details: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await ProductRepository.findById(req.params.pid);
    if (product) {
      const productDTO = new ProductDTO(product);
      res.status(200).json({ status: 'success', payload: productDTO });
    } else {
      res.status(404).json({ status: 'error', message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const success = await ProductRepository.deleteProduct(req.params.pid);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ status: 'error', message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

const updateProductQuantity = async (req, res) => {
  const { pid } = req.params;
  const { quantity } = req.body; 

  try {
    // Validar la cantidad
    if (quantity === undefined || quantity < 0) {
      return res.status(400).json({ message: 'La cantidad debe ser un número positivo' });
    }

    // Buscar el producto por ID
    const product = await ProductRepository.findById(pid);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Actualizar el stock del producto
    product.stock = quantity; // Asignar la nueva cantidad al stock
    await product.save(); // Guardar los cambios en la base de datos

    // Retornar la respuesta
    res.status(200).json({ message: 'Cantidad de producto actualizada con éxito', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la cantidad del producto' });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductQuantity
};

