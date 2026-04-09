const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { env } = require('./config/env');
const { errorHandler } = require('./middleware/errorHandler');
const { authRoutes } = require('./routes/authRoutes');
const { courseRoutes } = require('./routes/courseRoutes');
const { blogRoutes } = require('./routes/blogRoutes');
const { reviewRoutes } = require('./routes/reviewRoutes');
const { contactRoutes } = require('./routes/contactRoutes');
const { adminUserRoutes } = require('./routes/adminUserRoutes');

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ ok: true, name: 'education-management-system' }));

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/admin/users', adminUserRoutes);

app.use(errorHandler);

module.exports = { app };

