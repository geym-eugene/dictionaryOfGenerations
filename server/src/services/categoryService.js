const { Category, Word } = require('../../db/models');

class CategoryService {
  static async getAllCategories() {
    const allCategories = await Category.findAll();
    return allCategories;
  }

  static async getOneCategory(id) {
    const oneCategory = await Category.findByPk(id);
    return oneCategory;
  }

    static async getWordsByCategory(id) {
    const words = await Word.findAll({
      where: { categoryId: id },
    });
    return words;
  }
}

module.exports = CategoryService;
