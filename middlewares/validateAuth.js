const { body } = require('express-validator');

const validateAuth = [
  body('email')
    .trim() 
    .isEmail().withMessage('O e-mail deve ser um endereço válido.')
    .isLength({ min: 10, max: 100 }).withMessage('O e-mail deve ter entre 10 e 100 caracteres.'),
  
  body('password')
    .trim() 
    .matches(/^[a-zA-Z0-9!@#$%^&*()_+{}\[\]<>,:"'`.?/~-]+$/).withMessage('A senha deve conter apenas caracteres alfanuméricos e caracteres especiais permitidos.')
    .isLength({ min: 6, max: 100 }).withMessage('A senha deve ter entre 6 e 100 caracteres.')
];

module.exports = validateAuth;
