const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Merchant', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100)
  },
  description: {
    type: DataTypes.TEXT
  },
  address: {
    type: DataTypes.STRING(200)
  },
  phone: {
    type: DataTypes.STRING(20)
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 4.5
  },
  image: {
    type: DataTypes.STRING(500)
  },
  longitude: {
    type: DataTypes.FLOAT
  },
  latitude: {
    type: DataTypes.FLOAT
  },
  user_id: {
    type: DataTypes.INTEGER,
    comment: 'FK users'
  }
}, {
  tableName: 'merchants',
  paranoid: false
});
