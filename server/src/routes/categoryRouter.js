const express = require('express');
const CategoryController = require('../controllers/categoryController');
const isIdValid = require('../middlewares/isIdValid');

const categoryRouter = express.Router();

categoryRouter.get('/', CategoryController.getAllCategories);

categoryRouter.get('/:categoryId', isIdValid('categoryId'), CategoryController.getOneCategory);

categoryRouter.get('/:categoryId/words', isIdValid('categoryId'), CategoryController.getWordsByCategory);

module.exports = categoryRouter;
