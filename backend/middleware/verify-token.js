const jwt = require("jsonwebtoken");
const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
      throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    const token = authorizationHeader.split(" ")[1]; // Assuming the token is in the format "Bearer <token>"
    if (!token) {
      throw new ServerError(ErrorType.UNAUTHORIZED);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
      }
      req.user = decoded; // Attach the decoded token payload to the request object
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;
