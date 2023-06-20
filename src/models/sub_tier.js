'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sub_tier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sub_tier.belongsTo(models.Subscription, { foreignKey: 'tier_id' });
    }
  }
  Sub_tier.init({
    id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    duration: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sub_tier',
    underscored: true,
  });
  return Sub_tier;
};