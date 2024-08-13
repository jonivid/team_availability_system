const userDb = require("../dal/user-dal");
const Hashes = require("jshashes");
const SHA256 = new Hashes.SHA256();
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

const login = async (loginDetails) => {
  try {
    const password = loginDetails.password;
    loginDetails.password = SHA256.hex(password); 
    const loginResult = await userDb.login(loginDetails);
    if (loginResult.success) {
      const token = jwt.sign(
        {
          id: loginResult.user.id,
          username: loginDetails.username,
          firstName: loginResult.user.firstName,
          lastName: loginResult.user.lastName,
        },
        `${process.env.JWT_SECRET}`,
        { expiresIn: "1h" },
      );

      return {
        success: true,
        user: {
          ...loginResult.user,
          username: loginDetails.username,
        },
        token,
      };
    } else {
      throw new ServerError(ErrorType.UNAUTHORIZED, loginResult.message);
    }
  } catch (error) {
    if (error.errorType === ErrorType.UNAUTHORIZED) {
      throw error;
    } else {
      logger.error(error);
      throw new ServerError(ErrorType.INTERNAL_SERVER_ERROR, error.message);
    }
  }
};

const getAllUsers = async () => {
  try {
    return userDb.getAllUsers();
  } catch (error) {
    logger.error(error);
    throw new ServerError(ErrorType.INTERNAL_SERVER_ERROR, error.message);
  }
};
const getUsersByValue = async ({ statusId, name }) => {
  try {
    return userDb.getUsersByValue({ statusId, name });
  } catch (error) {
    logger.error(error);
    throw new ServerError(ErrorType.INTERNAL_SERVER_ERROR, error.message);
  }
};

const updateUserStatusService = async (userId, statusId) => {
  try {
    if (!userId || !statusId) {
      throw new ServerError(
        ErrorType.BAD_REQUEST,
        "Missing userId or statusId",
      );
    }
    const user = await userDb.getUserById(userId);
    if (!user) {
      throw new ServerError(ErrorType.NOT_FOUND, "User not found");
    }

    const updatedUser = await userDb.updateUserStatus(userId, statusId);

    return updatedUser;
  } catch (error) {
    logger.error(error);
    throw new ServerError(ErrorType.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = {
  login,
  getAllUsers,
  getUsersByValue,
  updateUserStatusService,
};
