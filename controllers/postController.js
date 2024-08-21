const Post = require('../models/postModel')
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const { validationResult } = require('express-validator');

exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.findAll();

  if (posts.length === 0) {
    return res.status(404).json({ message: 'Nenhuma post encontrado' });
  }
  return res.status(200).json({ posts });
});

exports.getPostById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  const post = await Post.findByPk(id);

  if (!post) {
    return res.status(404).json({ message: 'Este post não existe' });
  }

  return res.status(200).json({ post });
});

exports.updatePost = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
  return res.status(400).json({errors: errors.array()})
  }

  const { id, title, body, 
    startTime, categoryId, authorId, 
    status, excerpt } = req.body;

  const imageUrl = req.file;

    const verifyPostToUpdate = await Post.findByPk(id);

    if (verifyPostToUpdate) {
      await Post.update(
        {
          title: title,
          body: body,
          slug: slugify(title),
          startTime,
          categoryId,
          authorId,
          status,
          excerpt,
          imageUrl
        },
        { where: { id: id } } 
      );

      return res.status(200).json({ message: 'Post atualizado com sucesso' });
    } else {
      return res.status(404).json({ message: 'Post não encontrado' });
    }
});

exports.deletePost = asyncHandler(async (req, res) => {
  const id = parseInt(req.body.id);

  const post = await Post.findOne({ where: { id: id } });

  if (post) {
    await Post.destroy({ where: { id: id } });
    return res.status(204).send();
  } else {
    return res.status(404).json({ message: 'Post não encontrado' });
  }
});

exports.createPost = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const { title, body, startTime, categoryId, 
    authorId, status, excerpt } = req.body;
   const imageUrl = req.file;

  try {
    const verifyPostToCreate = await Post.findOne({
      where: { title: title, body: body }
    });
    
    if (!verifyPostToCreate) {

      const post = await Post.create({
        title: title,
        body: body,
        slug: slugify(title),
        startTime,
        categoryId,
        authorId,
        status,
        excerpt,
        imageUrl
      });

     if(!post){ return res.status(400).json({message: 'Nenhum post foi criado, tente novamente'})}

      return res.status(201).json({ message: 'Post criado com sucesso', post });
    } else {
      return res.status(400).json({ message: 'Post não foi criado, já existe um post com o mesmo título e conteúdo.' });
    }
  } catch(error) {
    return res.status(500).json({ message: 'Erro no servidor ao criar o post' });
  }
});
