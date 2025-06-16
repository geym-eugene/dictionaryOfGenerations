const { Category, Word, User } = require('../../db/models');
const UserMessage = require('../models/UserMessage');
const SystemMessage = require('../models/SystemMessage');
const aiService = require('./AIService');

class CategoryService {
  static async getAllCategories() {
    const allCategories = await Category.findAll();
    return allCategories;
  }

  static async getOneCategory(id) {
    const oneCategory = await Category.findByPk(id);
    return oneCategory;
  }

  // это относится к лайкам
  static async getWordsByCategory(id, userId) {
    const words = await Word.findAll({
      include: [{ model: User, as: 'usersWhoLiked' }],
      where: { categoryId: id, isModer: true },
    });

    const data = JSON.parse(JSON.stringify(words)).map((word) => ({
      ...word,
      likesCount: word.usersWhoLiked.length,
      isLiked: !!word.usersWhoLiked.find((like) => like.id === userId),
      usersWhoLiked: undefined,
    }));
    return data;
  }

  static async getHint(categoryId, wordId) {
    try {
      // Проверяем существование слова в категории
      const word = await Word.findOne({
        where: {
          id: wordId,
          categoryId: categoryId,
        },
      });

      if (!word) {
        throw new Error('Слово не найдено в указанной категории');
      }

      // Генерируем промпт для AI
      const messages = [
        new SystemMessage(
          'Ты эксперт по сленгу разных поколений (зумеры, бумеры, миллениалы). ' +
            'Сгенерируй одно естественное предложение, использующее это слово в контексте.\n\n' +
            `Слово: ${word.name}\n` +
            `Описание: ${word.description || 'нет описания'}`,
        ),
        new UserMessage('Придумай пример использования этого слова в предложении.'),
      ];

      // Получаем ответ от AI
      const aiResponse = await aiService.chatCompletions(messages);
      return {
        success: true,
        hint: aiResponse.content,
        word: {
          id: word.id,
          name: word.name,
        },
      };
    } catch (error) {
      console.error('Error in getHint:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}

module.exports = CategoryService;
