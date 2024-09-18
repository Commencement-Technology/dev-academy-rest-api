const { body, param } = require("express-validator");

const validateAddReview = [
  body("title").notEmpty().withMessage("Review title is required"),
  body("text").notEmpty().withMessage("Review text is required"),
  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .bail()
    .isFloat({ min: 1, max: 10 })
    .withMessage("Rating must be a number between 1 and 10"),
];

const validateUpdateReview = [
  param("id")
    .notEmpty()
    .withMessage("Review ID is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid Review ID format"),
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Review title cannot be empty"),
  body("text").optional().notEmpty().withMessage("Review text cannot be empty"),
  body("rating")
    .optional()
    .isFloat({ min: 1, max: 10 })
    .withMessage("Rating must be a number between 1 and 10"),
];

module.exports = {
  validateAddReview,
  validateUpdateReview,
};
