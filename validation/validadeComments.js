const {body} = require('express-validator');

const validateComment = [
  body('comment')
    .trim() 
    .optional() 
    .isLength({ min: 1, max: 500 })
    .withMessage('O comentário deve ter entre 1 e 500 caracteres'),
];

module.exports = validateComment;