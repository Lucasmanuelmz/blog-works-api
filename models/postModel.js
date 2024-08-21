const { DataTypes } = require('sequelize');
const Category = require('./categoryModel');
const User = require('./userModel');
const sequelize = require('../database/db');

const Post = sequelize.define(
  'Post', 
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: 'id'
      },
      allowNull: true 
    },
    authorId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'draft',
    },
    excerpt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    }
});

Category.hasMany(Post, { foreignKey: 'categoryId'});
Post.belongsTo(Category, {foreignKey: 'categoryId'});

User.hasMany(Post, {foreignKey: 'userId'});
Post.belongsTo(User, {foreignKey: 'userId'});

module.exports = Post;
