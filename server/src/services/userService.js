const { User, Word, Like } = require('../../db/models');

module.exports = class UserService {
  static async getAllUsers() {
    const allUsers = await User.findAll();
    return allUsers;
  }

  static async getOneUser(id) {
    const oneUser = await User.findByPk(id);
    return oneUser;
  }

  static async createLike(id, wordId) {
    const created = await Like.create({ userId: id, wordId: wordId });
    return created;
  }

  static async deleteLike(id, wordId) {
    const deleted = await Like.destroy({
      where: { userId: id, wordId: wordId },
    });
    return deleted;
  }

  // получаем все лайкнутные слова юзера

  static async getLikedWords(id) {
    const userWithWords = await User.findAll({
      where: { id },
      include: [{ model: Word, as: 'likedWords' }],
    });
    console.log(userWithWords, '-----__--_-');
    return userWithWords[0].likedWords;
  }

  // получаем все слова которые добавил пользователь

  static async getWordsOfUser(id) {
    const words = await Word.findAll({
      where: { userId: id },
    });
    return words;
  }
};
