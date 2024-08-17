const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
  password:{
   type: DataTypes.STRING,
   allowNull: false
  },
});

User.sync({ alter: true });

module.exports = User;
