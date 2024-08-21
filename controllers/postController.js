const Post = require('../models/postModel')
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const validationPost = require('../middlewares/expressValidatorPost');
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

exports.updatePost = [validationPost, asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(400).json({errors: errors.array()})
  }
  const { id, title, body, startTime, categoryId, authorId, status, excerpt, imageUrl } = req.body;

  if (!isNaN(id)) {
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
  } else {
    return res.status(400).json({ message: 'ID inválido' });
  }
})];

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

exports.createPost = [validationPost, asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    res.status(400).json({errors: errors.array()})
  }
  console.log("Os dados chegaram aqu i",req.body)
  const { title, body, startTime, categoryId, authorId, status, excerpt, imageUrl } = req.body;
  console.log('OS DADOS CHEGARAM COM SUCESSO: ', title, body, startTime, categoryId, authorId, status, excerpt, imageUrl)
  try {
    const verifyPostToCreate = await Post.findOne({
      where: { title: title, body: body }
    });
    
    if (!verifyPostToCreate) {
      console.log('Passou com sucesso, dados recebidos: ', title, body, startTime, categoryId, authorId, status, excerpt, imageUrl)

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
    console.log('Erro no servidor encontrado '+error)
    return res.status(500).json({ message: 'Erro no servidor ao criar o post' });
  }
})];
