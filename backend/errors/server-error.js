class ServerError extends Error {
  constructor(errorType, message = errorType.message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = errorType.statusCode;
    this.errorType = errorType;
  }
}

module.exports = ServerError;
