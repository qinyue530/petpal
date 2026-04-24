const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.dialect,
  logging: config.db.logging,
  pool: config.db.pool,
  define: config.db.define
});

module.exports = sequelize;
