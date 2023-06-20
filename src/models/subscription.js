'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subscription.belongsTo(models.User, { foreignKey: 'user_id' });
      Subscription.hasOne(models.Sub_tier, { foreignKey: 'tier_id' });
    }
  }
  Subscription.init({
    id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    tier_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    transaction_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Subscription',
    underscored: true,
  });
  return Subscription;
};