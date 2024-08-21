const { body } = require('express-validator');

const validationUser = [
  body('firstName') 
    .trim()
    .isAlpha().withMessage('O nome deve conter apenas caracteres alfabéticos')
    .isLength({ min: 3, max: 100 }).withMessage('O nome deve conter de 3 a 100 caracteres'),
  
  body('lastName')
    .trim()
    .isAlpha().withMessage('O sobrenome deve conter apenas caracteres alfabéticos')
    .isLength({ min: 3, max: 100 }).withMessage('O sobrenome deve conter de 3 a 100 caracteres'),
  
  body('username')
    .trim()
    .isAlphanumeric().withMessage('O nome de usuário deve conter apenas caracteres alfanuméricos')
    .isLength({ min: 3, max: 100 }).withMessage('O nome de usuário deve conter de 3 a 100 caracteres'),
  
  body('email')
    .trim()
    .isEmail().withMessage('O email deve ser válido')
    .isLength({ min: 6, max: 100 }).withMessage('O email deve conter de 6 a 100 caracteres'), 
  
  body('password')
    .trim()
    .matches(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]<>,:"'`.?/~-]+$/).withMessage('A senha deve conter apenas caracteres alfanuméricos e alguns caracteres especiais')
    .isLength({ min: 10, max: 100 }).withMessage('A senha deve conter de 10 a 100 caracteres'),
];

module.exports = validationUser;
