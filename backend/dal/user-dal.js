const db = require("../utils/connection-wrapper");
const logger = require("../utils/logger");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const login = async (userLoggedDetails) => {
  try {
    const { username, password } = userLoggedDetails;
    const parameters = [username, password];
    const sql = `SELECT u.id, u.first_name AS firstName, u.last_name AS lastName, s.status
              FROM user u
              INNER JOIN status s
              ON u.status_id = s.id
              WHERE u.user_name = ? AND u.password = ?;`;

    const res = await db.executeWithParameters(sql, parameters);
    if (res.length > 0) {
      return { success: true, user: res[0] };
    }
    return { success: false, message: "Invalid username or password" };
  } catch (error) {
    logger.error(`Error: dal_login: username:${username}, ${error.message}`);
    throw new ServerError(
      ErrorType.INTERNAL_SERVER_ERROR,
      "Database query failed",
    );
  }
};

const getAllUsers = async ({ id }) => {
  try {
    const sql = `SELECT u.id, u.first_name AS firstName, u.last_name AS lastName, s.status,s.id AS statusId
              FROM user u
              INNER JOIN status s
              ON u.status_id = s.id
              WHERE u.id!=?;`;
    const parameters = [id];
    return await db.executeWithParameters(sql, parameters);
  } catch (error) {
    logger.error(`Error: dal_getUserList: ${error.message}`);
    throw new ServerError(
      ErrorType.INTERNAL_SERVER_ERROR,
      "Database query failed",
    );
  }
};
const getUsersByValue = async ({ statusId, name, id }) => {
  try {
    // Start building the SQL query
    const statusIds = statusId ? statusId.split(",").map(Number) : null;

    let sql = `SELECT u.id, u.first_name AS firstName, u.last_name AS lastName, s.status, s.id AS statusId
              FROM user u
              INNER JOIN status s ON u.status_id = s.id
              WHERE u.id != ?`;

    // Array to hold the query parameters
    const parameters = [id];

    // Add conditions based on the presence of statusId and name
    if (statusIds && statusIds.length > 0) {
      sql += ` AND u.status_id IN (${statusIds.map(() => "?").join(",")})`;
      parameters.push(...statusIds);
    }

    if (name !== undefined && name !== null && name.trim() !== "") {
      sql += " AND (u.first_name LIKE ? OR u.last_name LIKE ?)";
      const nameParam = `%${name}%`;
      parameters.push(nameParam, nameParam);
    }

    // Execute the query with the constructed SQL and parameters
    return await db.executeWithParameters(sql, parameters);
  } catch (error) {
    logger.error(`Error: dal_getUserList: ${error.message}`);
    throw new ServerError(
      ErrorType.INTERNAL_SERVER_ERROR,
      "Database query failed",
    );
  }
};

module.exports = { login, getAllUsers, getUsersByValue };
