const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Pet', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    comment: 'FK users'
  },
  name: {
    type: DataTypes.STRING(50)
  },
  type: {
    type: DataTypes.STRING(30)
  },
  breed: {
    type: DataTypes.STRING(50)
  },
  gender: {
    type: DataTypes.STRING(10)
  },
  birthday: {
    type: DataTypes.DATE
  },
  weight: {
    type: DataTypes.FLOAT
  },
  avatar: {
    type: DataTypes.STRING(500)
  }
}, {
  tableName: 'pets',
  paranoid: false
});
