require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST, // Should be 'db', not '127.0.0.1'
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST, // Should be 'db'
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
  },
};
