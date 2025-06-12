const WordService = require('../services/wordsServices');

class WordController {
  static async getAllWords(req, res) {
    try {
      const allWords = await WordService.getAllWords();
      res.status(200).json(allWords);
    } catch (err) {
      res.status(500).json({ message: err.message, text: 'Ошибка получения слов' });
    }
  }

  static async getOneWord(req, res) {
    try {
      const { id } = req.params;
      const word = await WordService.getOneWord(id);
      if (!word) {
        res.status(404).send('Такое слово не найден');
      }
      res.status(200).json(word);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message, text: 'Ошибка получения слова' });
    }
  }

  static async createNewWord(req, res) {
    try {
      const { name, description, isModer, categoryId, userId } = req.body;
      const newWord = await WordService.createNewWord({
        name,
        description,
        isModer,
        categoryId,
        userId,
      });
      res.status(201).json(newWord);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message, text: 'Ошибка создания слова' });
    }
  }

  static async editOneWord(req, res) {
    try {
      const { id } = req.params;
      const { name, description, isModer, categoryId, userId } = req.body;
      const editedWord = await WordService.editOneWord(id, {
        name,
        description,
        isModer,
        categoryId,
        userId,
      });
      res.status(200).json(editedWord);
    } catch (err) {
      if (err.message === 'Такого слова нет') {
        res.status(404).send('Такое слово не найдео');
      }
      res.status(500).json({ message: err.message, text: 'Ошибка получения слова' });
    }
  }

  static async deleteOneWord(req, res) {
    try {
      const { id } = req.params;
      const deletedWord = await WordService.deleteOneWord(id);
      res.status(204).json(deletedWord);
    } catch (err) {
      if (err.message === 'Такого слова нет') {
        res.status(404).send('Такое слово не найдено');
      }
      res.status(500).json({ message: err.message, text: 'Ошибка получения слова' });
    }
  }
}

module.exports = WordController;
