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
  NOT_FOUND: {
    statusCode: 404,
    message: "Resource not found",
  },
  FORBIDDEN: {
    statusCode: 403,
    message: "Forbidden: You don't have permission to access this resource",
  },
  BAD_REQUEST: {
    statusCode: 400,
    message:
      "Bad request: The server could not understand the request due to invalid syntax",
  },
  CONFLICT: {
    statusCode: 409,
    message:
      "Conflict: The request could not be completed due to a conflict with the current state of the resource",
  },
  UNPROCESSABLE_ENTITY: {
    statusCode: 422,
    message:
      "Unprocessable Entity: The server understands the content type of the request entity, but was unable to process the contained instructions",
  },
  TOO_MANY_REQUESTS: {
    statusCode: 429,
    message:
      "Too Many Requests: You have sent too many requests in a given amount of time",
  },
  SERVICE_UNAVAILABLE: {
    statusCode: 503,
    message:
      "Service Unavailable: The server is not ready to handle the request",
  },
  // Add more error types as needed
};

module.exports = ErrorType;
