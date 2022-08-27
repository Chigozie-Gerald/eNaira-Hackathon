"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Products", "UserBVN", {
      type: Sequelize.DataTypes.STRING,
      references: {
        model: "Users",
        key: "BVN",
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Products", "UserBVN");
  },
};
