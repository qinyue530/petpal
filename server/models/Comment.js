const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    comment: 'FK users'
  },
  post_id: {
    type: DataTypes.INTEGER,
    comment: 'FK posts'
  },
  product_id: {
    type: DataTypes.INTEGER
  },
  content: {
    type: DataTypes.TEXT
  },
  rating: {
    type: DataTypes.INTEGER
  },
  parent_id: {
    type: DataTypes.INTEGER,
    comment: '自关联'
  }
}, {
  tableName: 'comments',
  paranoid: false
});
