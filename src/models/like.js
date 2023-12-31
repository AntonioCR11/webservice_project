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
      Like.belongsTo(models.DevUser, { foreignKey: 'dev_user_id' });
      Like.belongsTo(models.Comment, { foreignKey: 'comment_id' });
    }
  }
  Like.init({
    dev_user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false
    },
    comment_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Like',
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
    underscored: true,
  });
  return Like;
};