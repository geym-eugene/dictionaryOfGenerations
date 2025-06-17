const express = require('express');
const WordController = require('../controllers/wordController');
const isIdValid = require('../middlewares/isIdValid');
const verifyAccessToken = require('../middlewares/verifyAccessToken')

const wordRouter = express.Router();
const categoryRouter = express.Router();

wordRouter.get('/', WordController.getAllWords);

wordRouter.get('/:wordId', isIdValid('wordId'), WordController.getOneWord);

wordRouter.post('/', WordController.createNewWord);

wordRouter.patch('/:wordId', isIdValid('wordId'), verifyAccessToken, WordController.editOneWord);

wordRouter.delete('/:wordId', isIdValid('wordId'), verifyAccessToken, WordController.deleteOneWord);

module.exports = wordRouter;
