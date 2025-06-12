const UserService = require('../services/userService');

module.exports = class CategoryController {
  static async getAllUsers(req, res) {
    try {
      const allUsers = await UserService.getAllUsers();
      res.json(allUsers);
    } catch (err) {
      res.status(500).json({ message: err.message, text: 'Ошибка получения пользователей' });
    }
  }

  static async getOneUser(req, res) {
    try {
      const { id } = req.params;
      const oneUser = await UserService.getOneUser(id);
      if (!oneUser) {
        res.status(404).send('Tакой пользователь не найдена');
      }
      res.json(oneUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message, text: 'Ошибка получения пользователя' });
    }
  }

    static async getLikedWords(req, res) {
    try {
      const { id } = res.locals.user
      const likedWords = await UserService.getLikedWords(id);
      if (!likedWords) {
        return res.status(404).send('Нет таких слов');
      }
      res.status(200).json(likedWords);
    } catch (error) {
      if (error.message === 'Нет такого пользователя') {
        return res.status(404).send('Такой пользователь не найден');
      }
      res.status(500).json({ message: error.message, text: 'Не удалось получить слова' });
    }
  }
}