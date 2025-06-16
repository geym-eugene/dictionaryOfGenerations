const express = require('express');
const CategoryController = require('../controllers/categoryController');
const isIdValid = require('../middlewares/isIdValid');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

const categoryRouter = express.Router();

categoryRouter.get('/', CategoryController.getAllCategories);

categoryRouter.get(
  '/:categoryId',
  isIdValid('categoryId'),
  CategoryController.getOneCategory,
);

  // это относится к лайкам
categoryRouter.get(
  '/:categoryId/words',
  isIdValid('categoryId'),
  verifyAccessToken,
  CategoryController.getWordsByCategory,
);

categoryRouter.get(
  '/:categoryId/hint',
  isIdValid('categoryId'), // Проверяем валидность ID
  CategoryController.getHint, // Новый метод в контроллере
);

module.exports = categoryRouter;
