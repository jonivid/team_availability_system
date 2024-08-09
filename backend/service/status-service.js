const statusDb = require("../dal/status-dal");

const getStatusList = async () => {
  try {
    return await statusDb.getStatusList();
  } catch (error) {
    logger.error(error);
    throw new ServerError(ErrorType.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = { getStatusList };
