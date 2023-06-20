'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Dev_user, { foreignKey: 'dev_user_id' });
      Comment.hasMany(models.Like, { foreignKey: 'comment_id' });
    }
  }
  Comment.init({
    id: DataTypes.INTEGER,
    content_id: DataTypes.STRING,
    content_url: DataTypes.STRING,
    parent_id: DataTypes.INTEGER,
    dev_user_id: DataTypes.INTEGER,
    body: DataTypes.STRING,
    total_likes: DataTypes.INTEGER,
    total_replies: DataTypes.INTEGER,
    is_reaction: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
    paranoid: true,
    timestamps: true,
    underscored: true,
  });
  return Comment;
};