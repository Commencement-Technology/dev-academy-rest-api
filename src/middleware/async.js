const { sendErrorResponse } = require("../utils/response");
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch((err) => {
    return sendErrorResponse(
      res,
      500,
      "An unexpected error occurred",
      err.message
    );
  });

module.exports = asyncHandler;
