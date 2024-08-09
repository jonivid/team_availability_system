const ErrorType = {
  UNAUTHORIZED: {
    statusCode: 401,
    message: "Unauthorized access",
  },
  VALIDATION_ERROR: {
    statusCode: 400,
    message: "Validation error",
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: "An unexpected error occurred",
  },
  // Add more error types as needed
};

module.exports = ErrorType;
