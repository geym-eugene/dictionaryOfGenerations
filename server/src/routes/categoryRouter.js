const express = require('express');
const CategoryController = require('../controllers/categoryController');
const isIdValid = require('../middlewares/isIdValid');

const categoryRouter = express.Router();

categoryRouter.get('/', CategoryController.getAllCategories);

categoryRouter.get('/:categoryId', isIdValid('categoryId'), CategoryController.getOneCategory);

module.exports = categoryRouter;
