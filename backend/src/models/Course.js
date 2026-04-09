const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, default: 0 },
    duration: { type: String, default: '' },
    level: { type: String, default: '' },
    thumbnailUrl: { type: String, default: '' },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = { Course };

