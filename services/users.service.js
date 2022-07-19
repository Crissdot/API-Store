const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const { models } = require('../libs/sequelize');

class UsersService {

  async create(data) {
    try {
      const hash = await bcrypt.hash(data.password, 10);
      const newUser = await models.User.create({
        ...data,
        password: hash,
      });
      delete newUser.dataValues.password;
      return newUser;
    } catch {
      throw boom.conflict('Email ocupado');
    }
  }

  async find() {
    const data = await models.User.findAll({
      include: ['customer'],
    });
    return data;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user) throw boom.notFound('Usuario no encontrado');
    return user;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const updatedUser = user.update(changes);
    return updatedUser;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return {id};
  }

}

module.exports = UsersService;
