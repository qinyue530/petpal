const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define('Post', {
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
  comments: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'posts',
  paranoid: false
});

// 定义关联关系
Post.associate = function(models) {
  Post.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
};

module.exports = Post;
