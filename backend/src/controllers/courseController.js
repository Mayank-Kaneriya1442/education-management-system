const { z } = require('zod');
const { Course } = require('../models/Course');
const { Enrollment } = require('../models/Enrollment');
const { HttpError } = require('../utils/httpError');

const courseCreateSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.number().nonnegative().optional(),
  duration: z.string().optional(),
  level: z.string().optional(),
  thumbnailUrl: z.string().url().optional().or(z.literal('')),
  isPublished: z.boolean().optional()
});

const courseUpdateSchema = courseCreateSchema.partial();

async function listPublicCourses(req, res) {
  const courses = await Course.find({ isPublished: true })
    .populate('instructor', 'name email role')
    .sort({ createdAt: -1 });
  res.json({ courses });
}

async function getPublicCourse(req, res) {
  const course = await Course.findOne({ _id: req.params.id, isPublished: true }).populate(
    'instructor',
    'name email role'
  );
  if (!course) throw new HttpError(404, 'Course not found');
  res.json({ course });
}

async function createCourse(req, res) {
  const data = courseCreateSchema.parse(req.body);
  const course = await Course.create({
    ...data,
    price: data.price ?? 0,
    duration: data.duration ?? '',
    level: data.level ?? '',
    thumbnailUrl: data.thumbnailUrl ?? '',
    isPublished: data.isPublished ?? true,
    instructor: req.user._id
  });
  res.status(201).json({ course });
}

async function listMyCourses(req, res) {
  const courses = await Course.find({ instructor: req.user._id }).sort({ createdAt: -1 });
  res.json({ courses });
}

async function updateCourse(req, res) {
  const data = courseUpdateSchema.parse(req.body);
  const course = await Course.findById(req.params.id);
  if (!course) throw new HttpError(404, 'Course not found');

  const isOwner = String(course.instructor) === String(req.user._id);
  const isAdmin = req.user.role === 'admin';
  if (!isOwner && !isAdmin) throw new HttpError(403, 'Forbidden');

  Object.assign(course, data);
  await course.save();
  res.json({ course });
}

async function deleteCourse(req, res) {
  const course = await Course.findById(req.params.id);
  if (!course) throw new HttpError(404, 'Course not found');

  const isOwner = String(course.instructor) === String(req.user._id);
  const isAdmin = req.user.role === 'admin';
  if (!isOwner && !isAdmin) throw new HttpError(403, 'Forbidden');

  await Course.deleteOne({ _id: course._id });
  await Enrollment.deleteMany({ course: course._id });
  res.json({ ok: true });
}

async function enrollInCourse(req, res) {
  const course = await Course.findOne({ _id: req.params.id, isPublished: true });
  if (!course) throw new HttpError(404, 'Course not found');

  const enrollment = await Enrollment.findOneAndUpdate(
    { student: req.user._id, course: course._id },
    { $setOnInsert: { status: 'enrolled' } },
    { new: true, upsert: true }
  );
  res.status(201).json({ enrollment });
}

async function myEnrolledCourses(req, res) {
  const enrollments = await Enrollment.find({ student: req.user._id, status: { $ne: 'cancelled' } })
    .populate({
      path: 'course',
      populate: { path: 'instructor', select: 'name email' }
    })
    .sort({ createdAt: -1 });
  res.json({ enrollments });
}

async function instructorEnrolledStudents(req, res) {
  const course = await Course.findById(req.params.id);
  if (!course) throw new HttpError(404, 'Course not found');
  const isAdmin = req.user.role === 'admin';
  const isOwner = String(course.instructor) === String(req.user._id);
  if (!isAdmin && !isOwner) throw new HttpError(403, 'Forbidden');

  const enrollments = await Enrollment.find({ course: course._id, status: { $ne: 'cancelled' } })
    .populate('student', 'name email phone role')
    .sort({ createdAt: -1 });
  res.json({ enrollments });
}

module.exports = {
  listPublicCourses,
  getPublicCourse,
  createCourse,
  listMyCourses,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  myEnrolledCourses,
  instructorEnrolledStudents
};

