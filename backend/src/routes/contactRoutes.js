const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const { requireAuth, requireRole } = require('../middleware/auth');
const {
  createContactMessage,
  adminListContactMessages,
  adminUpdateContactStatus,
  adminDeleteContactMessage
} = require('../controllers/contactController');

const router = express.Router();

// Public
router.post('/', asyncHandler(createContactMessage));

// Admin
router.get('/admin', requireAuth, requireRole('admin'), asyncHandler(adminListContactMessages));
router.patch('/admin/:id/status', requireAuth, requireRole('admin'), asyncHandler(adminUpdateContactStatus));
router.delete('/admin/:id', requireAuth, requireRole('admin'), asyncHandler(adminDeleteContactMessage));

module.exports = { contactRoutes: router };

