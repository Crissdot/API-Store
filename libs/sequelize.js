const { Sequelize } = require('sequelize');

const { config } = require('../config/config');
const { setupModels } = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = config.dbURL || `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : console.log,
}
if(config.isProd) {
  options.ssl = {
    rejectUnauthorized: false,
  }
}

const sequelize = new Sequelize(URI, options);

setupModels(sequelize);

module.exports = sequelize;
