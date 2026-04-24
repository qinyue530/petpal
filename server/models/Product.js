const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    comment: 'FK categories'
  },
  name: {
    type: DataTypes.STRING(100)
  },
  description: {
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.FLOAT
  },
  original_price: {
    type: DataTypes.FLOAT
  },
  image: {
    type: DataTypes.STRING(500)
  },
  images: {
    type: DataTypes.TEXT,
    comment: 'JSON数组'
  },
  specs: {
    type: DataTypes.TEXT,
    comment: 'JSON数组'
  },
  sales: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 999
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
}, {
  tableName: 'products',
  paranoid: false
});
