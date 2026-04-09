const { z } = require('zod');
const { User, roles } = require('../models/User');
const { HttpError } = require('../utils/httpError');

const createSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  role: z.enum(['student', 'instructor', 'admin']),
  password: z.string().min(6)
});

const updateSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  role: z.enum(['student', 'instructor', 'admin']).optional(),
  isActive: z.boolean().optional(),
  password: z.string().min(6).optional()
});

async function adminListUsers(req, res) {
  const role = req.query.role;
  const filter = {};
  if (role && roles.includes(String(role))) filter.role = String(role);
  const users = await User.find(filter).sort({ createdAt: -1 });
  res.json({ users });
}

async function adminCreateUser(req, res) {
  const data = createSchema.parse(req.body);
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new HttpError(409, 'Email already registered');
  const passwordHash = await User.hashPassword(data.password);
  const user = await User.create({
    name: data.name,
    email: data.email,
    phone: data.phone ?? '',
    role: data.role,
    passwordHash
  });
  res.status(201).json({ user });
}

async function adminUpdateUser(req, res) {
  const data = updateSchema.parse(req.body);
  const user = await User.findById(req.params.id).select('+passwordHash');
  if (!user) throw new HttpError(404, 'User not found');

  if (data.password) {
    user.passwordHash = await User.hashPassword(data.password);
  }
  if (data.name !== undefined) user.name = data.name;
  if (data.phone !== undefined) user.phone = data.phone;
  if (data.role !== undefined) user.role = data.role;
  if (data.isActive !== undefined) user.isActive = data.isActive;

  await user.save();
  res.json({ user: user.toJSON() });
}

async function adminDeleteUser(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) throw new HttpError(404, 'User not found');
  await User.deleteOne({ _id: user._id });
  res.json({ ok: true });
}

module.exports = { adminListUsers, adminCreateUser, adminUpdateUser, adminDeleteUser };

