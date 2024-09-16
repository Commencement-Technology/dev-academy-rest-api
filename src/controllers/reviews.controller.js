const asyncHandler = require("../middleware/async");
const Review = require("../models/Review");
const Bootcamp = require("../models/Bootcamp");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../utils/responseHandler");

const getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });

    return sendSuccessResponse(res, 200, "Reviews retrieved successfully", {
      count: reviews.length,
      data: reviews,
    });
  } else {
    sendSuccessResponse(
      res,
      200,
      "Reviews retrieved successfully",
      res.advancedResults
    );
  }
});

const getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  if (!review) {
    return sendErrorResponse(
      res,
      404,
      `No review found with the id of ${req.params.id}`
    );
  }

  sendSuccessResponse(res, 200, "Review retrieved successfully", {
    data: review,
  });
});

const addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return sendErrorResponse(
      res,
      404,
      `No bootcamp with the id of ${req.params.bootcampId}`
    );
  }

  const review = await Review.create(req.body);

  sendSuccessResponse(res, 201, "Review added successfully", { data: review });
});

const updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return sendErrorResponse(
      res,
      404,
      `No review with the id of ${req.params.id}`
    );
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return sendErrorResponse(res, 401, `Not authorized to update review`);
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  sendSuccessResponse(res, 200, "Review updated successfully", {
    data: review,
  });
});

const deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    return sendErrorResponse(
      res,
      404,
      `No review with the id of ${req.params.id}`
    );
  }

  // Make sure review belongs to user or user is admin
  if (review.user.toString() !== req.user.id && req.user.role !== "admin") {
    return sendErrorResponse(res, 401, `Not authorized to delete review`);
  }

  await review.remove();

  sendSuccessResponse(res, 200, "Review deleted successfully", {});
});

module.exports = {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
};
