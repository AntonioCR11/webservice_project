'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content_url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      parent_id: {
        type: Sequelize.INTEGER, // Change to Sequelize.INTEGER for self-referencing
        allowNull: true, // Allow null for the root comments without a parent
        references: {
          model: 'Comments', // Self-reference to the same table
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      dev_user_id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Dev_users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      body: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      total_likes: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      total_replies: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      is_reaction: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: Sequelize.DATE
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  }
};