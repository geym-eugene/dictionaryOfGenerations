'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Categories',
      [
        { id: 1, categoryName: 'Зумеры' },
        { id: 2, categoryName: 'Бумеры' },
        { id: 3, categoryName: 'Миллениалы' },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'admin',
          email: 'admin@admin.ru',
          hashedPassword: await bcrypt.hash('admin', 10),
          isAdmin: true,
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Words',
      [
        {
          name: 'Альтушка',
          description:
            'Девушка, которая всячески пытается выделиться своим внешним видом: носит темную одежду и вызывающие аксессуары, ярко красится, обладает пирсингом и/или тату.',
          isModer: true,
          categoryId: 1,
        },
        {
          name: 'Скуф',
          description:
            'Мужчина за 30, который плохо одевается, лысеет, имеет лишний вес и не увлекается ничем, кроме видеоигр и/или просмотра телевизора.',
          isModer: true,
          categoryId: 1,
        },
        {
          name: 'Нормис',
          description: 'Ничем не выделяющийся человек без специфических интересов.',
          isModer: true,
          categoryId: 1,
        },
        {
          name: 'Добро',
          description: 'Это слово обычно говорят вместо «ладно» или «договорились».',
          isModer: true,
          categoryId: 2,
        },
        {
          name: 'Получка',
          description: 'Заработная плата',
          isModer: true,
          categoryId: 2,
        },
        {
          name: 'Котлы',
          description: 'Именно так люди постарше иногда называют наручные часы.',
          isModer: true,
          categoryId: 2,
        },
        { name: 'Ава', description: 'Аватар в профиле', isModer: true, categoryId: 3 },
        { name: 'Лол', description: 'Очень смешно', isModer: true, categoryId: 3 },
        {
          name: 'Свэг',
          description: 'Стиль, уверенность, харизма и крутой вид',
          isModer: true,
          categoryId: 3,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Likes', null, {});
    await queryInterface.bulkDelete('Words', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
