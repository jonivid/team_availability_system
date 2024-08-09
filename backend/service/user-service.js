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
    loginDetails.password = SHA256.hex(password); // Ensure password is hashed correctly

    const loginResult = await userDb.login(loginDetails);
    if (loginResult.success) {
      const token = jwt.sign(
        {
          id: loginResult.user.id,
          username: loginDetails.username,
          firstName: loginResult.user.firstName,
          lastName: loginResult.user.lastName,
          status: loginResult.user.status,
        },
        `${process.env.JWT_SECRET}`,
        { expiresIn: "1h" }, // Optional: Token expiration time
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
      throw new ServerError(ErrorType.UNAUTHORIZED);
    }
  } catch (error) {
    logger.error(error);
    throw new ServerError(ErrorType.INTERNAL_SERVER_ERROR, error.message);
  }
};

const getAllUsers = async ({ id }) => {
  try {
    return userDb.getAllUsers({ id });
  } catch (error) {
    logger.error(error);
    throw new ServerError(ErrorType.INTERNAL_SERVER_ERROR, error.message);
  }
};
const getUsersByValue = async ({ statusId, name, id }) => {
  try {
    return userDb.getUsersByValue({ statusId, name, id });
  } catch (error) {
    logger.error(error);
    throw new ServerError(ErrorType.INTERNAL_SERVER_ERROR, error.message);
  }
};

module.exports = { login, getAllUsers, getUsersByValue };
