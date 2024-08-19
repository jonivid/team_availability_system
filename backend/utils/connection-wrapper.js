const mysql = require("mysql2");
require("dotenv").config();
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",  // Uses the value from the .env file
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "mydatabase",
  port: process.env.DB_PORT || 3306,
});

db.getConnection((err) => {
  if (err) {
    console.log("Failed to create connection + " + err);
    return;
  }
  console.log("We're connected to MySQL");
});

function execute(sql) {
  return new Promise((resolve, reject) => {
    db.execute(sql, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

function executeWithParameters(sql, parameters) {
  return new Promise((resolve, reject) => {
    db.execute(sql, parameters, (err, result) => {
      if (err) {
        console.log("Failed interacting with DB, calling reject");
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

const executeTransactionWithParameters = async (query, values) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting connection:", err);
        return reject(err);
      }

      // Start transaction
      connection.beginTransaction((err) => {
        if (err) {
          console.error("Error beginning transaction:", err);
          connection.release();
          return reject(err);
        }

        connection.query(query, [values], (error, results) => {
          if (error) {
            console.error("Error executing query:", error);
            return connection.rollback(() => {
              console.log("Transaction rolled back.");
              connection.release();
              reject(error);
            });
          }

          // Commit the transaction if all queries are successful
          connection.commit((err) => {
            if (err) {
              console.error("Error committing transaction:", err);
              return connection.rollback(() => {
                console.log("Transaction rolled back.");
                connection.release();
                reject(err);
              });
            }

            console.log("Transaction committed.");
            console.log("Rows affected:", results.affectedRows);
            connection.release();
            resolve(results); // Resolve the promise with the results
          });
        });
      });
    });
  });
};
module.exports = {
  execute,
  executeWithParameters,
  executeTransactionWithParameters,
};
