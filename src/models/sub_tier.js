'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubTier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SubTier.hasMany(models.Subscription, { foreignKey: 'tier_id' });
    }
  }
  SubTier.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'SubTier',
    tableName: 'sub_tiers',
    timestamps: false,
    underscored: true,
  });
  return SubTier;
};