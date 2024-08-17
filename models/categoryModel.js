const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'); 
const User = require('./userModel'); 

const Category = sequelize.define(
  'Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  row: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,
});
 
User.hasMany(Category, { foreignKey: 'userId' }); 

module.exports = Category;
