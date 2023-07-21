const express = require('express');

const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courses');

const router = express.Router({ mergeParams: true });
// mergeparams allow the reroute from the bootcamp router and getting the params (bootcampId)

// Include other resources router
const { protect, authorize } = require('../middlewares/auth');

// Create a route with express
router
  .route('/')
  .get(getCourses)
  .post(protect, authorize('publisher', 'admin'), addCourse);
router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('publisher', 'admin'), updateCourse)
  .delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;
