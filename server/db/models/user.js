'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Word, {foreignKey: 'userId'})
      this.belongsToMany(models.Word, { through: models.Like, foreignKey: 'userId'});
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};