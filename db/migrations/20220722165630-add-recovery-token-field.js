'use strict';

const { UserSchema, USER_TABLE } = require('./../models/user.model');

module.exports = {
  async up (queryInterface) {
    const userTable = await queryInterface.describeTable(USER_TABLE);
    if(!userTable.recoveryToken) {
      await queryInterface.addColumn(USER_TABLE, 'recovery_token', UserSchema.recoveryToken);
    }
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  }
};
