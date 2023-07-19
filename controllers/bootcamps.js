const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      msg: 'Show all bootcamps',
      count: bootcamps.length,
      data: bootcamps,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with id ${req.params.id}`,
          404
        )
      );
    }
    res.status(200).json({
      success: true,
      msg: `Show bootcamp ${req.params.id}`,
      data: bootcamp,
    });
  } catch (err) {
    // res.status(400).json({
    //   success: false,
    //   error: err.message,
    // });
    next(err);
  }
};

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps/
// @access  Private
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res
      .status(201)
      .json({ success: true, msg: 'Created new bootcamp' });
  } catch (err) {
    next(err);
  }
};

// @desc    Update bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!bootcamp) {
      return next(
        new ErrorResponse(
          `Bootcamp not found with id ${req.params.id}`,
          404
        )
      );
    }
    res.status(200).json({
      success: true,
      msg: `Update bootcamp ${req.params.id}`,
      data: bootcamp,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({
      success: 'true',
      msg: `Deleted bootcamp ${bootcamp.name}`,
    });
  } catch (err) {
    next(err);
  }
};
