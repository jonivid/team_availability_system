"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("color", [
      { color: "#FFB347" },
      { color: "#FFD1DC" },
      { color: "#77DD77" },
      { color: "#D3D3D3" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("color", null, {});
  },
};
