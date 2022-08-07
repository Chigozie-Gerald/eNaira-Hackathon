"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Products", "UserNIN", {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "NIN",
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Products", "UserNIN");
  },
};
