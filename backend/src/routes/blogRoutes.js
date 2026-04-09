const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const { requireAuth, requireRole } = require('../middleware/auth');
const {
  listPublicBlogs,
  getPublicBlog,
  adminCreateBlog,
  adminListBlogs,
  adminUpdateBlog,
  adminDeleteBlog
} = require('../controllers/blogController');

const router = express.Router();

// Admin
router.get('/admin/all', requireAuth, requireRole('admin'), asyncHandler(adminListBlogs));
router.post('/admin', requireAuth, requireRole('admin'), asyncHandler(adminCreateBlog));
router.patch('/admin/:id', requireAuth, requireRole('admin'), asyncHandler(adminUpdateBlog));
router.delete('/admin/:id', requireAuth, requireRole('admin'), asyncHandler(adminDeleteBlog));

// Public
router.get('/', asyncHandler(listPublicBlogs));
router.get('/:slug', asyncHandler(getPublicBlog));

module.exports = { blogRoutes: router };

