const { ValidationError } = require('sequelize');

const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UsersService {

  async create(data) {
    try {
      const newUser = await models.User.create(data);
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
