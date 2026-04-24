const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    comment: 'FK users'
  },
  topic_id: {
    type: DataTypes.INTEGER
  },
  content: {
    type: DataTypes.TEXT
  },
  images: {
    type: DataTypes.TEXT,
    comment: 'JSON数组'
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  comments_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'posts',
  paranoid: false
});
