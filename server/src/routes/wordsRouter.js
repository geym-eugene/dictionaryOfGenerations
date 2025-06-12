const express = require('express');
const WordController = require('../controllers/wordsController');
const isIdValid = require('../middlewares/isIdValid');

const wordsRouter = express.Router();

wordsRouter.get('/', WordController.getAllWords);

wordsRouter.get('/:id', isIdValid, WordController.getOneWord);

wordsRouter.post('/', WordController.createNewWord);

wordsRouter.patch('/:id',isIdValid, WordController.editOneWord);

wordsRouter.delete('/:id', isIdValid, WordController.deleteOneWord);

module.exports = wordsRouter;
