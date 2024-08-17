const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const asynchandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.createUser = asynchandler(async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  const verifyUser = await User.findOne({
      where: {email: email}
    });

  if(verifyUser) {
    res.status(400).json({message: 'Este usuário já existe'})
  };

  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    password: hashedPassword, 
  }); 
  if (user) {
    const userGet ={
      _id: user.id,
      email: user.email
    }

    const token = jwt.sign(userGet, process.env.SECRET_PASSWORD, {expiresIn: '1h'});

    return res.status(201).json({
      message: 'Usuário criado com sucesso',
      token: token
    });

  } else {
    res.status(500).json({ message: 'Erro no servidor' });
  }
});
