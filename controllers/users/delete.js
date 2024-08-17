const User = require('../../models/userModel');
const asyncHandler = require('express-async-handler');

exports.deleteUser = asyncHandler(async(req, res) => {
  const id = parseInt(req.req.body);
  if(!isNaN(id)) {
  await User.destroy({where: {id}})
  res.status(201).json({message: 'Usuário apagado com sucesso'})
  } else {
    res.status(404).json({message: 'Usuário não encontrado'})
  }
})