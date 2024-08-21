const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const Post = require('./postModel');
const User = require('./userModel');

const Comment = sequelize.define(
  'Comment',
  {
    comment: {
      type: DataTypes.TEXT,
      allowNull: true 
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: Post, 
        key: 'id'
      },
      allowNull: false 
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,  
        key: 'id'
      },
      allowNull: false 
    }
  },
  {
    timestamps: true 
  }
);


Comment.belongsTo(Post, { foreignKey: 'postId' });
Post.hasMany(Comment, { foreignKey: 'postId' });

Comment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId' });

module.exports = Comment;
