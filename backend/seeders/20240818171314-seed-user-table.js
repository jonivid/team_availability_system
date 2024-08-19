"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("user", [
      {
        user_name: "yvidal",
        password:
          "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92", // hashed password
        first_name: "yehonatan",
        last_name: "vidal",
        status_id: 3,
        status_updated_at: "2024-08-15 12:42:43",
      },
      {
        user_name: "acohen",
        password:
          "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
        first_name: "avi",
        last_name: "cohen",
        status_id: 2,
        status_updated_at: "2024-08-15 12:43:22",
      },
      {
        user_name: "dtesler",
        password:
          "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
        first_name: "diana",
        last_name: "tesler",
        status_id: 4,
        status_updated_at: "2024-08-15 12:43:22",
      },
      {
        user_name: "ymorris",
        password:
          "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
        first_name: "yossi",
        last_name: "morris",
        status_id: 1,
        status_updated_at: "2024-08-09 07:41:41",
      },
      {
        user_name: "drodin",
        password:
          "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92",
        first_name: "danny",
        last_name: "rodin",
        status_id: 3,
        status_updated_at: "2024-08-15 12:42:43",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user", null, {});
  },
};
