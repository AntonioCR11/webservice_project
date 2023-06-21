'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DevUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DevUser.hasMany(models.Comment, { foreignKey: 'dev_user_id' });
      DevUser.hasMany(models.Like, { foreignKey: 'dev_user_id' });
      DevUser.hasMany(models.User, { foreignKey: 'id' });
    }
  }
  DevUser.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'DevUser',
    tableName: 'dev_users',
    paranoid: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    underscored: true,
  });
  return DevUser;
};