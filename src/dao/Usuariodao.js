const User = require('../models/user');

class UsuarioDao {
  async findAll() {
    return await User.find();
  }

  async findById(id) {
    return await User.findById(id);
  }

  async findByEmail(email) {
    return await User.findOne({ email });
  }

  async save(usuario) {
    const nuevoUsuario = new User(usuario);
    return await nuevoUsuario.save();
  }

  async update(id, usuarioActualizado) {
    return await User.findByIdAndUpdate(id, usuarioActualizado, { new: true });
  }

  async delete(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UsuarioDao();




