'use strict';
const {
  Model
} = require('sequelize');

const IS_REACTION = 1;
const IS_NOT_REACTION = 0;

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static get IS_REACTION() { return IS_REACTION; }
    static get IS_NOT_REACTION() { return IS_NOT_REACTION; }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.DevUser, { foreignKey: 'dev_user_id' });
      Comment.hasMany(models.Like, { foreignKey: 'comment_id' });
    }
  }
  Comment.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    content_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content_url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    parent_id: DataTypes.BIGINT.UNSIGNED,
    dev_user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    total_likes: {
      type: DataTypes.BIGINT.UNSIGNED,
      defaultValue: 0
    },
    total_replies: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0
    },
    is_reaction: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Comment',
    paranoid: true,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    underscored: true,
  });
  return Comment
};