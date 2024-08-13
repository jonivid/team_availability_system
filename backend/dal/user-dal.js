const db = require("../utils/connection-wrapper");
const logger = require("../utils/logger");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

const login = async (userLoggedDetails) => {
  try {
    const { username, password } = userLoggedDetails;
    const parameters = [username, password];
    const sql = `SELECT u.id, u.first_name AS firstName, u.last_name AS lastName, s.status,s.id as statusId, c.color as statusColor
              FROM user u
              INNER JOIN status s
              ON u.status_id = s.id
              INNER JOIN color c
              ON c.id = s.color_id
              WHERE u.user_name = ? AND u.password = ?;`;

    const res = await db.executeWithParameters(sql, parameters);
    if (res.length > 0) {
      return { success: true, user: res[0] };
    }
    // Return a failure without throwing an exception
    return { success: false, message: "Invalid username or password" };
  } catch (error) {
    logger.error(`Error: dal_login: username:${username}, ${error.message}`);
    throw new ServerError(
      ErrorType.INTERNAL_SERVER_ERROR,
      "Database query failed",
    );
  }
};

const getAllUsers = async () => {
  try {
    const sql = `SELECT u.id, u.first_name AS firstName, u.last_name AS lastName, s.status,s.id AS statusId, c.color
              FROM user u
              INNER JOIN status s
              ON u.status_id = s.id
              INNER JOIN color c
              ON c.id = s.color_id;`;
    return await db.execute(sql);
  } catch (error) {
    logger.error(`Error: dal_get_user_list: ${error.message}`);
    throw new ServerError(
      ErrorType.INTERNAL_SERVER_ERROR,
      "Database query failed",
    );
  }
};
const getUsersByValue = async ({ statusId, name}) => {
  try {
    // Start building the SQL query
    const statusIds = statusId ? statusId.split(",").map(Number) : null;

    let sql = `SELECT u.id, u.first_name AS firstName, u.last_name AS lastName, s.status, s.id AS statusId, c.color
              FROM user u
              INNER JOIN status s
              ON u.status_id = s.id
              INNER JOIN color c
              ON c.id = s.color_id`;

    // Array to hold the query parameters
    const parameters = [];

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
    logger.error(`Error: dal_get_user_list: ${error.message}`);
    throw new ServerError(
      ErrorType.INTERNAL_SERVER_ERROR,
      "Database query failed",
    );
  }
};

const updateUserStatus = async (userId, statusId) => {
  try {
    const sql = `UPDATE user SET status_id = ? WHERE id = ?`;
    const parameters = [statusId, userId];

    const result = await db.executeWithParameters(sql, parameters);
    if (result.affectedRows === 0) {
      throw new Error("Failed to update user status");
    }
    return getUserById(userId);
  } catch (error) {
    logger.error(`Error: dal_update_user_status: ${error.message}`);
    throw new Error("Failed to update user status");
  }
};

const getUserById = async (userId) => {
  try {
    const sql = `SELECT u.id, u.first_name AS firstName, u.last_name AS lastName, s.status, s.id AS statusId, c.color
              FROM user u
              INNER JOIN status s
              ON u.status_id = s.id
              INNER JOIN color c
              ON c.id = s.color_id
              WHERE u.id = ?`;
    const params = [userId];
    const res = await db.executeWithParameters(sql, params);

    return res.length ? res[0] : null;
  } catch (error) {
    logger.error(`Error: dal_get_user_by_id: ${error.message}`);
    throw new Error("Failed to fetch user data");
  }
};

module.exports = {
  login,
  getAllUsers,
  getUsersByValue,
  updateUserStatus,
  getUserById,
};
