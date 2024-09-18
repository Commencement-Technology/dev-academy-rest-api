const { body, param } = require("express-validator");

const validateBootcampId = [
  param("id")
    .notEmpty()
    .withMessage("Bootcamp ID is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid Bootcamp ID format"),
];

const validateCreateBootcamp = [
  body("name").notEmpty().withMessage("Bootcamp name is required"),
  body("description")
    .notEmpty()
    .withMessage("Bootcamp description is required"),
  body("website").optional().isURL().withMessage("Please provide a valid URL"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email address"),
  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),
  body("address").notEmpty().withMessage("Bootcamp address is required"),
  body("careers")
    .isArray()
    .withMessage("Careers should be an array of strings"),
];

const validateUpdateBootcamp = [
  param("id")
    .notEmpty()
    .withMessage("Bootcamp ID is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid Bootcamp ID format"),
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Bootcamp name cannot be empty"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Bootcamp description cannot be empty"),
  body("website").optional().isURL().withMessage("Please provide a valid URL"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email address"),
  body("phone")
    .optional()
    .isMobilePhone()
    .withMessage("Please provide a valid phone number"),
  body("address")
    .optional()
    .notEmpty()
    .withMessage("Bootcamp address cannot be empty"),
  body("careers")
    .optional()
    .isArray()
    .withMessage("Careers should be an array of strings"),
];

const validatePhotoUpload = [
  param("id")
    .notEmpty()
    .withMessage("Bootcamp ID is required")
    .bail()
    .isMongoId()
    .withMessage("Invalid Bootcamp ID format"),
];

module.exports = {
  validateBootcampId,
  validateCreateBootcamp,
  validateUpdateBootcamp,
  validatePhotoUpload,
};
