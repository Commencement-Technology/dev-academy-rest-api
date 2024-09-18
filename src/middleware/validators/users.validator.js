const { body, param } = require("express-validator");

const validateCreateUser = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Provide a valid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .optional()
    .isIn(["user", "publisher", "admin"])
    .withMessage("Role must be one of 'user', 'publisher', or 'admin'"),
];

const validateUpdateUser = [
  param("id").notEmpty().withMessage("User ID is required").bail().isMongoId(),
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .bail()
    .isEmail()
    .withMessage("Provide a valid email"),
  body("role")
    .optional()
    .isIn(["user", "publisher", "admin"])
    .withMessage("Role must be one of 'user', 'publisher', or 'admin'"),
];

module.exports = {
  validateCreateUser,
  validateUpdateUser,
};
