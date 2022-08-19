"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      BVN: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      createdAt: Sequelize.DataTypes.DATE,
      updatedAt: Sequelize.DataTypes.DATE,
      deletedAt: Sequelize.DataTypes.DATE,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
