const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const { requireAuth, requireRole } = require('../middleware/auth');
const {
  listPublicCourses,
  getPublicCourse,
  createCourse,
  listMyCourses,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  myEnrolledCourses,
  instructorEnrolledStudents
} = require('../controllers/courseController');

const router = express.Router();

// Public (client)
router.get('/', asyncHandler(listPublicCourses));

// Student
router.get('/me/enrollments', requireAuth, requireRole('student'), asyncHandler(myEnrolledCourses));
router.post('/:id/enroll', requireAuth, requireRole('student'), asyncHandler(enrollInCourse));

// Instructor / Admin
router.post('/instructor', requireAuth, requireRole('instructor', 'admin'), asyncHandler(createCourse));
router.get('/instructor/me', requireAuth, requireRole('instructor', 'admin'), asyncHandler(listMyCourses));
router.get('/instructor/:id/enrollments', requireAuth, asyncHandler(instructorEnrolledStudents));

// Instructor/Admin manage
router.patch('/:id', requireAuth, requireRole('instructor', 'admin'), asyncHandler(updateCourse));
router.delete('/:id', requireAuth, requireRole('instructor', 'admin'), asyncHandler(deleteCourse));

router.get('/:id', asyncHandler(getPublicCourse));

module.exports = { courseRoutes: router };

