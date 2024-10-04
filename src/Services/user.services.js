const usuarioDao = require('../dao/UsuarioDao');

class UserRepository {
  async findAll() {
    return await usuarioDao.findAll();
  }

  async findById(id) {
    return await usuarioDao.findById(id);
  }

  async findByEmail(email) {
    return await usuarioDao.findByEmail(email);
  }

  async save(usuario) {
    return await usuarioDao.save(usuario);
  }

  async update(id, usuarioActualizado) {
    return await usuarioDao.update(id, usuarioActualizado);
  }

  async delete(id) {
    return await usuarioDao.delete(id);
  }
}

module.exports = new UserRepository();
