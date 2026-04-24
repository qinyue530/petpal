const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Service', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  merchant_id: {
    type: DataTypes.INTEGER,
    comment: 'FK merchants'
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
  duration: {
    type: DataTypes.INTEGER,
    comment: '分钟'
  },
  image: {
    type: DataTypes.STRING(500)
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
}, {
  tableName: 'services',
  paranoid: false
});
