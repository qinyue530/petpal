const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: DataTypes.INTEGER,
    comment: 'FK orders'
  },
  product_id: {
    type: DataTypes.INTEGER,
    comment: 'FK products'
  },
  product_name: {
    type: DataTypes.STRING(100)
  },
  product_image: {
    type: DataTypes.STRING(500)
  },
  spec: {
    type: DataTypes.STRING(100)
  },
  price: {
    type: DataTypes.FLOAT
  },
  quantity: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'order_items',
  paranoid: false
});
