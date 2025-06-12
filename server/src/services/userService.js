const { User, Word } = require('../../db/models');

module.exports = class UserService {
  static async getAllUsers() {
    const allUsers = await User.findAll();
    return allUsers;
  }

  static async getOneUser(id) {
    const oneUser = await User.findByPk(id);
    return oneUser;
  }

  // получаем все лайкнутные слова юзера

  static async getLikedWords(id) {
    const userWithWords = await User.findAll({
      where: { id },
      include: [{ model: Word, as: 'likedWords' }],
    });
    console.log(userWithWords);
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
