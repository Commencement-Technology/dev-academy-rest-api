const express = require("express");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses.controller");

const {
  validateAddCourse,
  validateUpdateCourse,
} = require("../middleware/validators/courses.validator");

const Course = require("../models/Course");

const router = express.Router({ mergeParams: true });

const advancedResults = require("../middleware/advancedResults2");
const { protect, authorize } = require("../middleware/auth");

/**
 * @swagger
 * /api/v1/bootcamps/{bootcampId}/courses:
 *   get:
 *     summary: Get all courses for a specific bootcamp
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: bootcampId
 *         required: true
 *         schema:
 *           type: string
 *         description: Bootcamp ID
 *     responses:
 *       200:
 *         description: Courses retrieved successfully
 *       404:
 *         description: No bootcamp found with the given ID
 *   post:
 *     summary: Add a course to a specific bootcamp
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bootcampId
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
 *             required:
 *               - title
 *               - description
 *               - weeks
 *               - tuition
 *               - minimumSkill
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               weeks:
 *                 type: number
 *               tuition:
 *                 type: number
 *               minimumSkill:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course added successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(protect, authorize("publisher", "admin"), validateAddCourse, addCourse);

/**
 * @swagger
 * /api/v1/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course retrieved successfully
 *       404:
 *         description: No course found with the given ID
 *   put:
 *     summary: Update a course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               weeks:
 *                 type: number
 *               tuition:
 *                 type: number
 *               minimumSkill:
 *                 type: string
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       401:
 *         description: Unauthorized to update course
 *       404:
 *         description: Course not found
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       401:
 *         description: Unauthorized to delete course
 *       404:
 *         description: Course not found
 */
router
  .route("/:id")
  .get(getCourse)
  .put(
    protect,
    authorize("publisher", "admin"),
    validateUpdateCourse,
    updateCourse
  )
  .delete(protect, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
