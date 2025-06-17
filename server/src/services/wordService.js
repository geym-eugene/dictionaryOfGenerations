const { Word } = require('../../db/models');

class WordService {
  static async getAllWords() {
    const allWords = await Word.findAll({
      where: {
        isModer: false,
      },
    });
    return allWords;
  }

  static async getOneWord(id) {
    const oneWord = await Word.findByPk(id);
    return oneWord;
  }

  static async createNewWord(data) {
    const createNewWord = await Word.create(data);
    return createNewWord;
  }

  static async editOneWord(id, data) {
    const word = await Word.findByPk(id);
    if (!word) {
      throw new Error('Такого слова нет');
    }
    const editedWord = await word.update(data);
    return editedWord;
  }

  static async deleteOneWord(id) {
    const word = await Word.findByPk(id);
    if (!word) {
      throw new Error('Такого слова нет');
    }
    const deletedWord = await word.destroy();
    return deletedWord;
  }
}

module.exports = WordService;
