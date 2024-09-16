const crypto = require("crypto");
const asyncHandler = require("../middleware/async");
const sendEmail = require("../utils/sendEmail");
const User = require("../models/User");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../utils/responseHandler");

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return sendErrorResponse(res, 400, "Please provide all required fields");
  }
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendTokenResponse(user, 200, "User registered succesfully", res);
});

// @desc      Login user
// @route     POST /api/v1/auth/login
// @access    Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendErrorResponse(res, 400, "Please provide all required field");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return sendErrorResponse(res, 401, "Invalid credentials");
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return sendErrorResponse(res, 401, "Invalid credentials");
  }

  sendTokenResponse(user, 200, "User logged in succesfully", res);
});

// @desc      Log user out / clear cookie
// @route     GET /api/v1/auth/logout
// @access    Private
const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  return sendSuccessResponse(res, 200, "User logged out successfully");
});

// @desc      Get current logged in user
// @route     POST /api/v1/auth/me
// @access    Private
const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  return sendSuccessResponse(res, 200, "User retrieved successfully", {
    data: user,
  });
});

// @desc      Update user details
// @route     PUT /api/v1/auth/updatedetails
// @access    Private
const updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    ...(req.body.name && { name: req.body.name }),
    ...(req.body.email && { email: req.body.email }),
  };

  const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
    new: true,
    runValidators: true,
  });

  return sendSuccessResponse(res, 200, "User details updated successfully", {
    data: user,
  });
});

// @desc      Update password
// @route     PUT /api/v1/auth/updatepassword
// @access    Private
const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.matchPassword(req.body.currentPassword))) {
    return sendErrorResponse(res, 401, "Password is incorrect");
  }

  user.password = req.body.newPassword;
  await user.save();

  sendTokenResponse(user, 200, "Password updated successfully", res);
});

// @desc      Forgot password
// @route     POST /api/v1/auth/forgotpassword
// @access    Public
const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return sendErrorResponse(res, 404, "There is no user with that email");
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });

    return sendSuccessResponse(res, 200, "Email sent");
  } catch (err) {
    console.log(err);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return sendErrorResponse(res, 500, "Email could not be sent");
  }
});

// @desc      Reset password
// @route     PUT /api/v1/auth/resetpassword/:resettoken
// @access    Public
const resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resettoken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return sendErrorResponse(res, 400, "Invalid token");
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, "Password reset succesfully", res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, message, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.cookie("token", token, options);
  sendSuccessResponse(res, statusCode, message, {
    token,
  });
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword,
  forgotPassword,
  resetPassword,
};
