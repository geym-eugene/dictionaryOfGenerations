const express = require('express');
const WordController = require('../controllers/wordController');
const isIdValid = require('../middlewares/isIdValid');

const wordRouter = express.Router();

wordRouter.get('/', WordController.getAllWords);

wordRouter.get('/:wordId', isIdValid('wordId'), WordController.getOneWord);

wordRouter.post('/', WordController.createNewWord);

wordRouter.patch('/:wordId', isIdValid('wordId'), WordController.editOneWord);

wordRouter.delete('/:wordId', isIdValid('wordId'), WordController.deleteOneWord);

module.exports = wordRouter;
