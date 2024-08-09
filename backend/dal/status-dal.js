const db = require("../utils/connection-wrapper");
const logger = require("../utils/logger");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

const getStatusList = async () => {
  try {
    const sql = `SELECT s.id, s.status,c.color
                  FROM status s
                  INNER JOIN color c
                  on c.id=s.color_id;`;
    return await db.execute(sql);
  } catch (error) {
    logger.error(error);
    throw new ServerError(ErrorType.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = { getStatusList };
