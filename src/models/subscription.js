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
      // define association here
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
  });
  return Subscription;
};