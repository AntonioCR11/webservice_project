'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Like.belongsTo(models.Dev_user, { foreignKey: 'dev_user_id' });
      Like.belongsTo(models.Comment, { foreignKey: 'comment_id' });
    }
  }
  Like.init({
    dev_user_id: DataTypes.INTEGER,
    comment_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Like',
    timestamps: true,
    underscored: true,
  });
  return Like;
};