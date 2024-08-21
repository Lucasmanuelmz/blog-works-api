const { body } = require('express-validator');

const validationPost = [
  body('title')
    .trim()
    .notEmpty().withMessage('O título é obrigatório')
    .isLength({ min: 3, max: 100 }).withMessage('O título deve ter entre 3 e 100 caracteres'),
  body('body')
    .trim()
    .notEmpty().withMessage('O corpo do post é obrigatório')
    .isLength({ min: 10 }).withMessage('O corpo do post deve ter pelo menos 10 caracteres'),
  body('categoryId')
    .isInt().withMessage('A categoria deve ser um número inteiro válido'),
];

module.exports = validationPost;
