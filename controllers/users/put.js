const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const asynchandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.updateUser = asynchandler(async (req, res) => {
  const { id, firstName, lastName, email, username, password} = req.body;
  
  const verifyUser = await User.findOne({where: {id: id}});

   if(!verifyUser) { 
    return res.status(404).json({
      message: 'Usuário não encontrado no banco de dados'
    })
   }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await User.update({
    firstName: firstName,
    lastName: lastName,
    email: email, 
    username: username,
    password: hashedPassword,
  });
  
  if (user) {
    const userGet = {
      _id: user.id,
      email: user.email
    }
    const token = await jwt.sign(userGet, process.env.SECRET_PASSWORD, {expiresIn: '1h'});

    return res.status(200).json({ message: 'Usuário atualizado e logado com sucesso',
      token: token
     });
  } else {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});
