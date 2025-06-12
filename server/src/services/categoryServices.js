const { Category } = require('../../db/models');

class CategoryService {
  static async getAllCategories() {
    const allCategories = await Category.findAll();
    return allCategories;
  }

  static async getOneCategory(id) {
    const oneCategory = await Category.findByPk(id);
    return oneCategory;
  }
}

module.exports = CategoryService;
