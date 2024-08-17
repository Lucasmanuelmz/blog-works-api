const User = require('../../models/userModel');
const asyncHandler = require('express-async-handler');

exports.getUsers = asyncHandler(async(req, res) => {
const users = await User.findAll();
if(users.length > 0) {
  res.status(200).json({users});
} else {
  res.status(404).json({message: 'Os usuários não foram encontrados no banco de dados'});
}
});

exports.getUserById = asyncHandler(async(req, res) => {
const id = parseInt(req.params.id);
if(!isNaN(id)) {
  const user = await User.findOne({where: {id: id}});
  if(user) {
  res.status(200).json({user})
  } else {
    res.status(404).json({message: 'Usuário não encontrado'})
  }
} else {
  res.status(400).json({message: 'O id deve ser um número'})
}
})