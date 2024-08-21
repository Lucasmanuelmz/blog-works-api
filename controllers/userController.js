const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const {validationResult} = require('express-validator');

exports.getUsers = asyncHandler(async(req, res) => {
try {
const users = await User.findAll();
if(users.length > 0) {
 return res.status(200).json({users});
} else {
 return res.status(404).json({message: 'Os usuários não foram encontrados no banco de dados'});
}
} catch(error) {
  return res.status(500).json({message: 'Erro no servidor'})
}
});

exports.getUserById = asyncHandler(async(req, res) => {
const id = parseInt(req.params.id);
try{
if(!isNaN(id)) {
  const user = await User.findByPk(id);
  if(user) {
  return res.status(200).json({user})
  } else {
  return res.status(404).json({message: 'Usuário não encontrado'})
  }
} else {
  return res.status(400).json({message: 'O id deve ser um número'})
} } catch(error) {
  return res.status(500).json({message: 'Erro no servidor'})
}
});

exports.createUser = asyncHandler(async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
   return res.status(400).json({errors: errors.array()})
  }

  const { firstName, lastName, username, email, password } = req.body;
try {
  const verifyUser = await User.findOne({
      where: {email: email}
    });

  if(verifyUser) {
    return res.status(400).json({message: 'Este usuário já existe'})
  };

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    username: username,
    email: email,
    password: hashedPassword, 
  }); 
  if (user) {
    const userGet ={
      id: user.id,
      email: user.email
    }

    const token = jwt.sign(userGet, process.env.SECRET_PASSWORD, {expiresIn: '1h'});

    return res.status(201).json({
      message: 'Usuário criado com sucesso',
      token: token
    });

  } else {
   return res.status(500).json({ message: 'Erro no servidor' });
  }
}catch(error) {
  return res.status(500).json({message: 'Erro no servidor'})
}
});

exports.updateUser = asyncHandler(async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
   return res.status(400).json({errors: errors.array()})
  }

  const { id, firstName, lastName, email, username} = req.body;
  try {
  const verifyUser = await User.findOne({where: {id: id}});

   if(!verifyUser) { 
    return res.status(404).json({
      message: 'Usuário não encontrado no banco de dados'
    })
   }
  
  const user = await User.update({
    firstName: firstName,
    lastName: lastName,
    email: email, 
    username: username,
  }, {where: {id: id}});
  
  if (user) {
    const userGet = {
      id: user.id,
      email: user.email
    }
    const token = await jwt.sign(userGet, process.env.SECRET_PASSWORD, {expiresIn: '1h'});

    return res.status(200).json({ message: 'Usuário atualizado e logado com sucesso',
      token: token
     });
  } else {
   return res.status(500).json({ message: 'Erro no servidor' });
  }
} catch(error) {
  return res.status(500)
}
});

exports.deleteUser = asyncHandler(async(req, res) => {
  const id = parseInt(req.body.id);
  if(!isNaN(id)) {
  await User.destroy({where: {id}})
  return res.status(201).json({message: 'Usuário apagado com sucesso'})
  } else {
   return res.status(404).json({message: 'Usuário não encontrado'})
  }
})