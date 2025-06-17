const UserService = require('../services/userService');

module.exports = class CategoryController {
  static async getAllUsers(req, res) {
    try {
      const allUsers = await UserService.getAllUsers();
      res.json(allUsers);
    } catch (err) {
      res
        .status(500)
        .json({ message: err.message, text: 'Ошибка получения пользователей' });
    }
  }

  static async getOneUser(req, res) {
    try {
      const { userId } = req.params;
      const oneUser = await UserService.getOneUser(userId);
      if (!oneUser) {
        res.status(404).send('Tакой пользователь не найдена');
      }
      res.json(oneUser);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: err.message, text: 'Ошибка получения пользователя' });
    }
  }

  static async getLikedWords(req, res) {
    try {
      const { id } = res.locals.user;
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

  static async createLike(req, res) {
    try {
      const { id } = res.locals.user;
      const { wordId } = req.body;
      const created = await UserService.createLike(id, wordId);
      if (!created) {
        return res.status(404).send('Нет удалось создать лайк');
      }
      res.status(200).json(created);
    } catch (error) {
      if (error.message === 'Нет такого пользователя') {
        return res.status(404).send('Такой пользователь не найден');
      }
      res.status(500).json({ message: error.message, text: 'Не удалось получить лайки' });
    }
  }

    static async deleteLike(req, res) {
    try {
      const { id } = res.locals.user;
      const { wordId } = req.params;
      const destroy = await UserService.deleteLike(id, wordId);
      
      if (!destroy) {
        return res.status(404).send('Нет удалось удалить лайк');
      }
      res.status(200).json(destroy);
    } catch (error) {
      if (error.message === 'Нет такого пользователя') {
        return res.status(404).send('Такой пользователь не найден');
      }
      res.status(500).json({ message: error.message, text: 'Не удалось удалить лайки' });
    }
  }
};



