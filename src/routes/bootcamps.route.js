const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps.controller");

const {
  validateCreateBootcamp,
  validateUpdateBootcamp,
  validatePhotoUpload,
} = require("../middleware/validators/bootcamps.validator");

const Bootcamp = require("../models/Bootcamp");

const courseRouter = require("./courses.route");
const reviewRouter = require("./reviews.route");

const router = express.Router();

const advancedResults = require("../middleware/advancedResults2");
const { protect, authorize } = require("../middleware/auth");

router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewRouter);

/**
 * @swagger
 * /api/v1/bootcamps/{id}/photo:
 *   put:
 *     summary: Upload photo for a bootcamp
 *     tags: [Bootcamps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bootcamp ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Photo uploaded successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized to upload photo
 *       404:
 *         description: Bootcamp not found
 */
router
  .route("/:id/photo")
  .put(
    protect,
    authorize("publisher", "admin"),
    validatePhotoUpload,
    bootcampPhotoUpload
  );

/**
 * @swagger
 * /api/v1/bootcamps:
 *   get:
 *     summary: Get all bootcamps
 *     tags: [Bootcamps]
 *     responses:
 *       200:
 *         description: Bootcamps retrieved successfully
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new bootcamp
 *     tags: [Bootcamps]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: object
 *               user:
 *                 type: string
 *     responses:
 *       201:
 *         description: Bootcamp created successfully
 *       400:
 *         description: Bad request
 */
router.route("/").get(advancedResults(Bootcamp, "courses"), getBootcamps).post(
  protect,
  authorize("publisher", "admin"),
  validateCreateBootcamp, // Added validator for creating bootcamp
  createBootcamp
);

/**
 * @swagger
 * /api/v1/bootcamps/{id}:
 *   get:
 *     summary: Get a single bootcamp by ID
 *     tags: [Bootcamps]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bootcamp ID
 *     responses:
 *       200:
 *         description: Bootcamp retrieved successfully
 *       404:
 *         description: Bootcamp not found
 *   put:
 *     summary: Update bootcamp details
 *     tags: [Bootcamps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bootcamp ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Bootcamp updated successfully
 *       401:
 *         description: Unauthorized to update bootcamp
 *       404:
 *         description: Bootcamp not found
 *   delete:
 *     summary: Delete a bootcamp
 *     tags: [Bootcamps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bootcamp ID
 *     responses:
 *       200:
 *         description: Bootcamp deleted successfully
 *       401:
 *         description: Unauthorized to delete bootcamp
 *       404:
 *         description: Bootcamp not found
 */
router
  .route("/:id")
  .get(getBootcamp)
  .put(
    protect,
    authorize("publisher", "admin"),
    validateUpdateBootcamp,
    updateBootcamp
  )
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

module.exports = router;
