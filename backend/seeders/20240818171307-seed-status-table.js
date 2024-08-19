"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("status", [
      {
        status: "Working",
        color_id: 3,
      },
      {
        status: "Working Remotely",
        color_id: 2,
      },
      {
        status: "On Vacation",
        color_id: 4,
      },
      {
        status: "Business Trip",
        color_id: 1,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("status", null, {});
  },
};
