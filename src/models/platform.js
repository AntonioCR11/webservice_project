'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Platform extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Platform.init({
    platform_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Platform',
    paranoid: true,
    timestamps: true,
    underscored: true,
  });
  return Platform;
};