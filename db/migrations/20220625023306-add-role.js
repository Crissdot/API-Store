'use strict';

const { UserSchema, USER_TABLE } = require('./../models/user.model');

module.exports = {
  async up (queryInterface) {
    const userTable = await queryInterface.describeTable(USER_TABLE);
    if(!userTable.role) {
      await queryInterface.addColumn(USER_TABLE, 'role', UserSchema.role);
    }
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'role');
  }
};
