const path = require("path");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamp");
const {
  sendSuccessResponse,
  sendErrorResponse,
} = require("../utils/responseHandler");

const getBootcamps = asyncHandler(async (req, res, next) => {
  sendSuccessResponse(
    res,
    200,
    "Bootcamps retrieved successfully",
    res.advancedResults
  );
});

const getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return sendErrorResponse(
      res,
      404,
      `Bootcamp not found with id of ${req.params.id}`
    );
  }

  sendSuccessResponse(res, 200, "Bootcamp retrieved successfully", {
    data: bootcamp,
  });
});

const createBootcamp = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

  if (publishedBootcamp && req.user.role !== "admin") {
    return sendErrorResponse(
      res,
      400,
      `The user with ID ${req.user.id} has already published a bootcamp`
    );
  }

  const bootcamp = await Bootcamp.create(req.body);
  sendSuccessResponse(res, 201, "Bootcamp created successfully", {
    data: bootcamp,
  });
});

const updateBootcamp = asyncHandler(async (req, res, next) => {
  let bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return sendErrorResponse(
      res,
      404,
      `Bootcamp not found with id of ${req.params.id}`
    );
  }

  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return sendErrorResponse(
      res,
      401,
      `User ${req.params.id} is not authorized to update this bootcamp`
    );
  }

  bootcamp = await Bootcamp.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  sendSuccessResponse(res, 200, "Bootcamp updated successfully", {
    data: bootcamp,
  });
});

const deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return sendErrorResponse(
      res,
      404,
      `Bootcamp not found with id of ${req.params.id}`
    );
  }

  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return sendErrorResponse(
      res,
      401,
      `User ${req.params.id} is not authorized to delete this bootcamp`
    );
  }

  await bootcamp.remove();
  sendSuccessResponse(res, 200, "Bootcamp deleted successfully", {});
});

const bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return sendErrorResponse(
      res,
      404,
      `Bootcamp not found with id of ${req.params.id}`
    );
  }

  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return sendErrorResponse(
      res,
      401,
      `User ${req.params.id} is not authorized to update this bootcamp`
    );
  }

  if (!req.files) {
    return sendErrorResponse(res, 400, `Please upload a file`);
  }

  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    return sendErrorResponse(res, 400, `Please upload an image file`);
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return sendErrorResponse(
      res,
      400,
      `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`
    );
  }

  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return sendErrorResponse(res, 500, `Problem with file upload`);
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
    sendSuccessResponse(res, 200, "Photo uploaded successfully", {
      data: file.name,
    });
  });
});

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampPhotoUpload,
};
