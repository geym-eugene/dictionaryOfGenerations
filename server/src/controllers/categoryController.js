const CategoryService = require('../services/categoryServices');

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
      const { id } = req.params;
      const oneCategory = await CategoryService.getOneCategory(id);
      if (!oneCategory) {
        res.status(404).send('Tакая категория не найдена');
      }
      res.json(oneCategory);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message, text: 'Ошибка получения категори' });
    }
  }
}

module.exports = CategoryController;
