const express = require('express');
const CategoryController = require('../controllers/categoryController');
const isIdValid = require('../middlewares/isIdValid');

const categoryRouter = express.Router();

categoryRouter.get('/', CategoryController.getAllCategories);

categoryRouter.get(
  '/:categoryId',
  isIdValid('categoryId'),
  CategoryController.getOneCategory,
);

categoryRouter.get(
  '/:categoryId/words',
  isIdValid('categoryId'),
  CategoryController.getWordsByCategory,
);

categoryRouter.get(
  '/:categoryId/hint',
  isIdValid('categoryId'), // Проверяем валидность ID
  CategoryController.getHint, // Новый метод в контроллере
);

module.exports = categoryRouter;
