const { z } = require('zod');
const { Blog } = require('../models/Blog');
const { HttpError } = require('../utils/httpError');

const createSchema = z.object({
  title: z.string().min(3),
  slug: z
    .string()
    .min(3)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  excerpt: z.string().optional(),
  content: z.string().min(20),
  coverImageUrl: z.string().url().optional().or(z.literal('')),
  isPublished: z.boolean().optional()
});

const updateSchema = createSchema.partial();

async function listPublicBlogs(req, res) {
  const blogs = await Blog.find({ isPublished: true })
    .populate('author', 'name email role')
    .sort({ createdAt: -1 });
  res.json({ blogs });
}

async function getPublicBlog(req, res) {
  const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true }).populate(
    'author',
    'name email role'
  );
  if (!blog) throw new HttpError(404, 'Blog not found');
  res.json({ blog });
}

async function adminCreateBlog(req, res) {
  const data = createSchema.parse(req.body);
  const existing = await Blog.findOne({ slug: data.slug });
  if (existing) throw new HttpError(409, 'Slug already used');
  const blog = await Blog.create({
    ...data,
    excerpt: data.excerpt ?? '',
    coverImageUrl: data.coverImageUrl ?? '',
    isPublished: data.isPublished ?? true,
    author: req.user._id
  });
  res.status(201).json({ blog });
}

async function adminListBlogs(req, res) {
  const blogs = await Blog.find({}).populate('author', 'name email').sort({ createdAt: -1 });
  res.json({ blogs });
}

async function adminUpdateBlog(req, res) {
  const data = updateSchema.parse(req.body);
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new HttpError(404, 'Blog not found');

  if (data.slug && data.slug !== blog.slug) {
    const existing = await Blog.findOne({ slug: data.slug });
    if (existing) throw new HttpError(409, 'Slug already used');
  }

  Object.assign(blog, data);
  await blog.save();
  res.json({ blog });
}

async function adminDeleteBlog(req, res) {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new HttpError(404, 'Blog not found');
  await Blog.deleteOne({ _id: blog._id });
  res.json({ ok: true });
}

module.exports = {
  listPublicBlogs,
  getPublicBlog,
  adminCreateBlog,
  adminListBlogs,
  adminUpdateBlog,
  adminDeleteBlog
};

