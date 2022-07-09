'use strict';

const { OrderSchemaMigration, ORDER_TABLE } = require('./../models/order.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ORDER_TABLE, OrderSchemaMigration);
  },

  down: async (queryInterface) => {
    await queryInterface.drop(ORDER_TABLE);
  }
};
