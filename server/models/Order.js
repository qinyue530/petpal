const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    comment: 'FK users'
  },
  order_no: {
    type: DataTypes.STRING(32),
    unique: true
  },
  total_price: {
    type: DataTypes.FLOAT
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'pending',
    comment: 'pending/paid/shipped/completed/cancelled'
  },
  address: {
    type: DataTypes.STRING(300)
  },
  phone: {
    type: DataTypes.STRING(20)
  },
  remark: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'orders',
  paranoid: false
});
