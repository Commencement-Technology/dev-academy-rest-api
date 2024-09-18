const { body, param } = require("express-validator");

const validateAddCourse = [
  body("title").notEmpty().withMessage("Course title is required"),
  body("description").notEmpty().withMessage("Course description is required"),
  body("weeks")
    .notEmpty()
    .withMessage("Course duration (in weeks) is required"),
  body("tuition")
    .notEmpty()
    .withMessage("Tuition fee is required")
    .bail()
    .isNumeric()
    .withMessage("Tuition must be a number"),
  body("minimumSkill")
    .notEmpty()
    .withMessage("Minimum skill is required")
    .isIn(["beginner", "intermediate", "advanced"])
    .withMessage(
      "Minimum skill must be one of 'beginner', 'intermediate', or 'advanced'"
    ),
  body("scholarhipsAvailable")
    .optional()
    .isBoolean()
    .withMessage("Scholarships available must be a boolean value"),
];

const validateUpdateCourse = [
  param("id")
    .notEmpty()
    .withMessage("Course ID is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid Course ID format"),
  body("title")
    .optional()
    .notEmpty()
    .withMessage("Course title cannot be empty"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Course description cannot be empty"),
  body("weeks")
    .optional()
    .notEmpty()
    .withMessage("Course duration cannot be empty"),
  body("tuition")
    .optional()
    .notEmpty()
    .withMessage("Tuition cannot be empty")
    .bail()
    .isNumeric()
    .withMessage("Tuition must be a number"),
  body("minimumSkill")
    .optional()
    .isIn(["beginner", "intermediate", "advanced"])
    .withMessage(
      "Minimum skill must be one of 'beginner', 'intermediate', or 'advanced'"
    ),
  body("scholarhipsAvailable")
    .optional()
    .isBoolean()
    .withMessage("Scholarships available must be a boolean value"),
];

module.exports = {
  validateAddCourse,
  validateUpdateCourse,
};
