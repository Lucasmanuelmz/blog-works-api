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
        model: Post,  // Referência direta ao modelo
        key: 'id'
      },
      allowNull: false 
    },
    username: {
      type: DataTypes.STRING,
      references: {
        model: User,  // Referência direta ao modelo
        key: 'username'
      },
      allowNull: false 
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,  // Referência direta ao modelo
        key: 'id'
      },
      allowNull: false 
    }
  },
  {
    timestamps: true 
  }
);

// Definindo associações
Comment.belongsTo(Post, { foreignKey: 'postId' });
Post.hasMany(Comment, { foreignKey: 'postId' });

Comment.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Comment, { foreignKey: 'userId' });

// Sincronizar o modelo com o banco de dados (em desenvolvimento, use com cuidado)
Comment.sync({ force: true });

module.exports = Comment;
