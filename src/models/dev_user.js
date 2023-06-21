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
    }
  }
  DevUser.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'DevUser',
    tableName: 'dev_users',
    paranoid: true,
    timestamps: true,
    underscored: true,
  });
  return DevUser;
};