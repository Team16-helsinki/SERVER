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
      // define association here
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: { msg: `Username already in use` },
      validate: {
        notEmpty: { msg: `Username field cannot be left empty` }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};