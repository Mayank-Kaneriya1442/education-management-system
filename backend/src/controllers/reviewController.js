const { z } = require('zod');
const { Review } = require('../models/Review');
const { Course } = require('../models/Course');
const { HttpError } = require('../utils/httpError');

const createSchema = z.object({
  courseId: z.string().min(1),
  rating: z.number().min(1).max(5),
  comment: z.string().optional()
});

const statusSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected'])
});

async function listApprovedForCourse(req, res) {
  const reviews = await Review.find({ course: req.params.courseId, status: 'approved' })
    .populate('student', 'name')
    .sort({ createdAt: -1 });
  res.json({ reviews });
}

async function createReview(req, res) {
  const data = createSchema.parse(req.body);
  const course = await Course.findOne({ _id: data.courseId, isPublished: true });
  if (!course) throw new HttpError(404, 'Course not found');

  const review = await Review.findOneAndUpdate(
    { course: course._id, student: req.user._id },
    {
      $set: {
        rating: data.rating,
        comment: data.comment ?? '',
        status: 'pending'
      }
    },
    { upsert: true, new: true }
  );

  res.status(201).json({ review });
}

async function getMyReviews(req, res) {
  const reviews = await Review.find({ student: req.user._id })
    .populate('course', 'title')
    .sort({ createdAt: -1 });
  res.json({ reviews });
}

async function adminListReviews(req, res) {
  const status = req.query.status;
  const filter = {};
  if (status && ['pending', 'approved', 'rejected'].includes(String(status))) {
    filter.status = String(status);
  }
  const reviews = await Review.find(filter)
    .populate('student', 'name email')
    .populate('course', 'title')
    .sort({ createdAt: -1 });
  res.json({ reviews });
}

async function adminUpdateReviewStatus(req, res) {
  const data = statusSchema.parse(req.body);
  const review = await Review.findById(req.params.id);
  if (!review) throw new HttpError(404, 'Review not found');
  review.status = data.status;
  await review.save();
  res.json({ review });
}

async function adminDeleteReview(req, res) {
  const review = await Review.findById(req.params.id);
  if (!review) throw new HttpError(404, 'Review not found');
  await Review.deleteOne({ _id: review._id });
  res.json({ ok: true });
}

module.exports = {
  listApprovedForCourse,
  createReview,
  getMyReviews,
  adminListReviews,
  adminUpdateReviewStatus,
  adminDeleteReview
};

