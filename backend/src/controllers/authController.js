const { z } = require('zod');
const { User } = require('../models/User');
const { HttpError } = require('../utils/httpError');
const { signToken } = require('../utils/jwt');

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(6),
  role: z.enum(['student', 'instructor']).optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

const updateMeSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional()
});

async function register(req, res) {
  const data = registerSchema.parse(req.body);
  const existing = await User.findOne({ email: data.email });
  if (existing) throw new HttpError(409, 'Email already registered');

  const passwordHash = await User.hashPassword(data.password);
  const user = await User.create({
    name: data.name,
    email: data.email,
    phone: data.phone ?? '',
    role: data.role ?? 'student',
    passwordHash
  });

  const token = signToken({ sub: String(user._id), role: user.role });
  return res.status(201).json({ token, user });
}

async function login(req, res) {
  const data = loginSchema.parse(req.body);
  const user = await User.findOne({ email: data.email }).select('+passwordHash');
  if (!user || !user.isActive) throw new HttpError(401, 'Invalid credentials');

  const ok = await user.verifyPassword(data.password);
  if (!ok) throw new HttpError(401, 'Invalid credentials');

  const token = signToken({ sub: String(user._id), role: user.role });
  const safeUser = user.toJSON();
  return res.json({ token, user: safeUser });
}

async function me(req, res) {
  const safeUser = req.user.toJSON();
  return res.json({ user: safeUser });
}

async function updateMe(req, res) {
  const data = updateMeSchema.parse(req.body);
  const user = await User.findById(req.user._id);
  if (!user || !user.isActive) throw new HttpError(401, 'Invalid user');

  if (data.name !== undefined) user.name = data.name;
  if (data.phone !== undefined) user.phone = data.phone;
  await user.save();

  return res.json({ user: user.toJSON() });
}

module.exports = { register, login, me, updateMe };

