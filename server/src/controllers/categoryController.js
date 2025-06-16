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

  static async getHint(req, res) {
    try {
      const { categoryId } = req.params;
      const { wordId } = req.query;

      if (!wordId) {
        return res.status(400).json({
          success: false,
          error: 'Не указан wordId в параметрах запроса',
        });
      }

      const result = await CategoryService.getHint(categoryId, wordId);

      if (!result.success) {
        return res.status(404).json(result);
      }

      res.json(result);
    } catch (error) {
      console.error('Error in getHint controller:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Внутренняя ошибка сервера',
      });
    }
  }


  // это относится к лайкам
  static async getWordsByCategory(req, res) {
    try {
      const { categoryId } = req.params;
      const { id } = res.locals.user
      const words = await CategoryService.getWordsByCategory(categoryId, id);
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
