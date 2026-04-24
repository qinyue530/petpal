const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  openid: {
    type: DataTypes.STRING(64),
    unique: true,
    comment: '微信openid'
  },
  phone: {
    type: DataTypes.STRING(20),
    unique: true
  },
  username: {
    type: DataTypes.STRING(50)
  },
  avatar: {
    type: DataTypes.STRING(500)
  },
  desc: {
    type: DataTypes.TEXT
  },
  gender: {
    type: DataTypes.STRING(10)
  },
  role: {
    type: DataTypes.STRING(20),
    defaultValue: 'user',
    comment: 'user/merchant/admin'
  }
}, {
  tableName: 'users',
  paranoid: false
});
