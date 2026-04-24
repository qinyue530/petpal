const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Vaccine', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pet_id: {
    type: DataTypes.INTEGER,
    comment: 'FK pets'
  },
  name: {
    type: DataTypes.STRING(100)
  },
  date: {
    type: DataTypes.DATEONLY
  },
  next_date: {
    type: DataTypes.DATEONLY
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  remark: {
    type: DataTypes.STRING(200)
  }
}, {
  tableName: 'vaccines',
  paranoid: false
});
