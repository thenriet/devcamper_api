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
const { protect } = require('../middlewares/auth');

// Create a route with express
router.route('/').get(getCourses).post(protect, addCourse);
router
  .route('/:id')
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
