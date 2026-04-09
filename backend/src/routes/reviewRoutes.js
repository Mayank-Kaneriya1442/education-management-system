const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const { requireAuth, requireRole } = require('../middleware/auth');
const {
  listApprovedForCourse,
  createReview,
  getMyReviews,
  adminListReviews,
  adminUpdateReviewStatus,
  adminDeleteReview
} = require('../controllers/reviewController');

const router = express.Router();

// Student (specific path before parameterized)
router.get('/me', requireAuth, requireRole('student'), asyncHandler(getMyReviews));

// Public
router.get('/course/:courseId', asyncHandler(listApprovedForCourse));

// Student
router.post('/', requireAuth, requireRole('student'), asyncHandler(createReview));

// Admin
router.get('/admin', requireAuth, requireRole('admin'), asyncHandler(adminListReviews));
router.patch('/admin/:id/status', requireAuth, requireRole('admin'), asyncHandler(adminUpdateReviewStatus));
router.delete('/admin/:id', requireAuth, requireRole('admin'), asyncHandler(adminDeleteReview));

module.exports = { reviewRoutes: router };

