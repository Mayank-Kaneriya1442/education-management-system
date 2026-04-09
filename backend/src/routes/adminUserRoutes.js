const express = require('express');
const { asyncHandler } = require('../middleware/asyncHandler');
const { requireAuth, requireRole } = require('../middleware/auth');
const {
  adminListUsers,
  adminCreateUser,
  adminUpdateUser,
  adminDeleteUser
} = require('../controllers/userAdminController');

const router = express.Router();

router.use(requireAuth, requireRole('admin'));

router.get('/', asyncHandler(adminListUsers));
router.post('/', asyncHandler(adminCreateUser));
router.patch('/:id', asyncHandler(adminUpdateUser));
router.delete('/:id', asyncHandler(adminDeleteUser));

module.exports = { adminUserRoutes: router };

