const CategoryService = require('../services/categoryService');

class CategoryController {
  static async getAllCategories(req, res) {
    try {
      const allCategories = await CategoryService.getAllCategories();
      res.json(allCategories);
    } catch (err) {
      res.status(500).json({ message: err.message, text: 'Ошибка получения категорий' });
    }
  }

  static async getOneCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const oneCategory = await CategoryService.getOneCategory(categoryId);
      if (!oneCategory) {
        res.status(404).send('Tакая категория не найдена');
      }
      res.json(oneCategory);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message, text: 'Ошибка получения категори' });
    }
  }

  static async getWordsByCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const words = await CategoryService.getWordsByCategory(categoryId);
      if (!words) {
        return res.status(404).send('Нет таких слов');
      }
      res.status(200).json(words);
    } catch (error) {
      if (error.message === 'Нет такой категории') {
        return res.status(404).send('Такая категория не найдена');
      }
      res.status(500).json({ message: error.message, text: 'Не удалось получить слова' });
    }
  }
}

module.exports = CategoryController;
