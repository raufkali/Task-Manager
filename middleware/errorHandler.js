const errorHandler = (err, req, res, next) => {
  let statusCode =
    res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || "Something went wrong";

  // Customize message based on status code
  switch (statusCode) {
    case 400:
      message = "Bad Request";
      break;
    case 401:
      message = "Unauthorized";
      break;
    case 403:
      message = "Forbidden";
      break;
    case 404:
      message = "Not Found";
      break;
    case 409:
      message = "Conflict";
      break;
    case 429:
      message = "Too Many Requests";
      break;
    case 500:
    default:
      message = "Internal Server Error";
      break;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    code: statusCode,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
