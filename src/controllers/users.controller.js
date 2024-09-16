const asyncHandler = require("../middleware/async");
const User = require("../models/User");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../utils/responseHandler");

const getUsers = asyncHandler(async (req, res, next) => {
  sendSuccessResponse(
    res,
    200,
    "Users retrieved successfully",
    res.advancedResults
  );
});

const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return sendErrorResponse(
      res,
      404,
      `No user found with the id of ${req.params.id}`
    );
  }

  sendSuccessResponse(res, 200, "User retrieved successfully", { data: user });
});

const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  sendSuccessResponse(res, 201, "User created successfully", { data: user });
});

const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return sendErrorResponse(
      res,
      404,
      `No user found with the id of ${req.params.id}`
    );
  }

  sendSuccessResponse(res, 200, "User updated successfully", { data: user });
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return sendErrorResponse(
      res,
      404,
      `No user found with the id of ${req.params.id}`
    );
  }

  sendSuccessResponse(res, 200, "User deleted successfully", {});
});

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
