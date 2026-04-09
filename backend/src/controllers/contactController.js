const { z } = require('zod');
const { ContactMessage } = require('../models/ContactMessage');
const { HttpError } = require('../utils/httpError');

const createSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(10)
});

const statusSchema = z.object({
  status: z.enum(['new', 'read', 'closed'])
});

async function createContactMessage(req, res) {
  const data = createSchema.parse(req.body);
  const msg = await ContactMessage.create({
    name: data.name,
    email: data.email,
    subject: data.subject ?? '',
    message: data.message
  });
  res.status(201).json({ message: msg });
}

async function adminListContactMessages(req, res) {
  const status = req.query.status;
  const filter = {};
  if (status && ['new', 'read', 'closed'].includes(String(status))) filter.status = String(status);
  const messages = await ContactMessage.find(filter).sort({ createdAt: -1 });
  res.json({ messages });
}

async function adminUpdateContactStatus(req, res) {
  const data = statusSchema.parse(req.body);
  const msg = await ContactMessage.findById(req.params.id);
  if (!msg) throw new HttpError(404, 'Message not found');
  msg.status = data.status;
  await msg.save();
  res.json({ message: msg });
}

async function adminDeleteContactMessage(req, res) {
  const msg = await ContactMessage.findById(req.params.id);
  if (!msg) throw new HttpError(404, 'Message not found');
  await ContactMessage.deleteOne({ _id: msg._id });
  res.json({ ok: true });
}

module.exports = {
  createContactMessage,
  adminListContactMessages,
  adminUpdateContactStatus,
  adminDeleteContactMessage
};

