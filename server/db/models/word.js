'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, { foreignKey: 'categoryId' });
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsToMany(models.User, { through: models.Like, foreignKey: 'wordId' });
    }
  }
  Word.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      isModer: DataTypes.BOOLEAN,
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Word',
    },
  );
  return Word;
};
