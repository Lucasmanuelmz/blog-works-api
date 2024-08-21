const Comment = require('../models/commentsModel');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');

exports.getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.findAll();
  if (comments.length === 0) {
    return res.status(404).json({ message: 'Nenhum comentario encontrado' });
  }
  return res.status(200).json({ comments });
});

exports.getCommentById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);
  const comment = await Comment.findByPk(id);
  if (!comment) {
    return res.status(404).json({ message: 'Este comentario não existe' });
  }
  return res.status(200).json({ comment });
});

exports.updateComment = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
   return res.status(400).json({errors: errors.array()});
  }

  const {id,  comment, postId, userId } = req.body;
  if (!isNaN(id)) {

    const verifyCommentToUpdate = await Comment.findByPk(id);

    if (verifyCommentToUpdate) {
      await Category.update(
        {
          comment,
          postId,
          userId
        },
        { where: { id: id } } 
      );
      return res.status(200).json({ message: 'Comentario atualizado com sucesso' });
    } else {
      return res.status(404).json({ message: 'Comentario não encontrado' });
    }
  } else {
    return res.status(400).json({ message: 'ID inválido' });
  }
});

exports.deleteComment = asyncHandler(async (req, res) => {
  const id = parseInt(req.body.id);

  const comment = await Comment.findOne({ where: { id: id } });

  if (comment) {
    await Comment.destroy({ where: { id: id } });
    return res.status(204).send();
  } else {
    return res.status(404).json({ message: 'Comentario não encontrado' });
  }
});

exports.createComment = asyncHandler(async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
   return res.status(400).json({errors: errors.array()});
  }

  const { comment, postId, userId} = req.body;
  try{
    if(comment !== undefined && !isNaN(postId) && !isNaN(userId)) {
      await Comment.create(
        {
          comment,
          postId,
          userId
        }
      );
      return res.status(201).json({ message: 'Comentario criado com sucesso' });
    } else {
     return res.status(409).json({message: 'Os dados recebidos nao sao compativeis com os requeridos'})
    }   
  } catch(error) {
    return res.status(500).json({message: 'Erro no servidor'})
  }
});

