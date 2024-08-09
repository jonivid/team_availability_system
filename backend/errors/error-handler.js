const ServerError = require("../errors/server-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ServerError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
  console.error(err.message); // Log the error message
};

module.exports = errorHandler;
