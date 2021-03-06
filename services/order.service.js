const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    if(!order) throw boom.notFound('Orden no encontrada');
    return order;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId,
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        },
      ]
    });

    return orders;
  }

  async create(userId) {
    const user = await models.User.findByPk(userId, {
      include: ['customer'],
    });

    const data = {
      customerId: user.customer.id,
    };

    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

}

module.exports = OrderService;
