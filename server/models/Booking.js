const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    comment: 'FK users'
  },
  service_id: {
    type: DataTypes.INTEGER,
    comment: 'FK services'
  },
  pet_id: {
    type: DataTypes.INTEGER,
    comment: 'FK pets'
  },
  merchant_id: {
    type: DataTypes.INTEGER,
    comment: 'FK merchants'
  },
  date: {
    type: DataTypes.DATEONLY
  },
  time: {
    type: DataTypes.STRING(10)
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'pending',
    comment: 'pending/confirmed/completed/cancelled'
  },
  remark: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'bookings',
  paranoid: false
});
