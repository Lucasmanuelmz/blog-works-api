const Category = require('../../models/categoryModel');
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');

exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.findAll();

  if (categories.length === 0) {
    return res.status(404).json({ message: 'Nenhuma categoria encontrada' });
  }
  return res.status(200).json({ categories });
});

exports.getCategoryById = asyncHandler(async (req, res) => {
  const id = parseInt(req.params.id);

  const category = await Category.findByPk(id);

  if (!category) {
    return res.status(404).json({ message: 'Esta categoria não existe' });
  }

  return res.status(200).json({ category });
});

exports.updateCategory = asyncHandler(async (req, res) => {
  const { id, name, position, row } = req.body;

  if (!isNaN(id)) {
    const verifyCategoryToUpdate = await Category.findByPk(id);

    if (verifyCategoryToUpdate) {
      await Category.update(
        {
          name: name,
          slug: slugify(name),
          position: position,
          row: row,
        },
        { where: { id: id } } 
      );

      return res.status(200).json({ message: 'Categoria atualizada com sucesso' });
    } else {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
  } else {
    return res.status(400).json({ message: 'ID inválido' });
  }
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const id = parseInt(req.body.id);

  const category = await Category.findOne({ where: { id: id } });

  if (category) {
    await Category.destroy({ where: { id: id } });
    return res.status(204).send();
  } else {
    return res.status(404).json({ message: 'Categoria não encontrada' });
  }
});

exports.createCategory = asyncHandler(async (req, res) => {
  const { name, position, row } = req.body;

    const verifyCategoryToCreate = await Category.findOne({
      where: {name: name}
    });

    if (!verifyCategoryToCreate) {
      await Category.create(
        {
          name: name,
          slug: slugify(name),
          position: position,
          row: row,
        }
      );
      return res.status(201).json({ message: 'Categoria criada com sucesso' });
    } else {
      return res.status(400).json({ message: 'Categoria não foi criada'});
    }
});
