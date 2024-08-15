const db = require("../utils/connection-wrapper");
const logger = require("../utils/logger");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const dbName = process.env.DB_NAME;

const getStatusList = async () => {
  try {
    const sql = `SELECT s.id, s.status, c.color
                  FROM ${dbName}.status s
                  INNER JOIN ${dbName}.color c
                  ON c.id = s.color_id;`;
    return await db.execute(sql);
  } catch (error) {
    logger.error(error);
    throw new ServerError(ErrorType.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = { getStatusList };
