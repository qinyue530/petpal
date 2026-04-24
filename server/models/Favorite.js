const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Favorite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    comment: 'FK users'
  },
  target_id: {
    type: DataTypes.INTEGER
  },
  target_type: {
    type: DataTypes.STRING(20),
    comment: 'product/post/service'
  }
}, {
  tableName: 'favorites',
  paranoid: false
});
