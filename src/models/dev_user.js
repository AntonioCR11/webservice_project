'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dev_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Dev_user.hasMany(models.Comment, { foreignKey: 'dev_user_id' });
      Dev_user.hasMany(models.Like, { foreignKey: 'dev_user_id' });
    }
  }
  Dev_user.init({
    id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dev_user',
    paranoid: true,
    timestamps: true,
    underscored: true,
  });
  return Dev_user;
};