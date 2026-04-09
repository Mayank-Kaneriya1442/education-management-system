const { ZodError } = require('zod');
const { HttpError } = require('../utils/httpError');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.issues.map((i) => ({
        path: i.path.join('.'),
        message: i.message
      }))
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message,
      details: err.details
    });
  }

  const status = typeof err?.status === 'number' ? err.status : 500;
  return res.status(status).json({
    message: status === 500 ? 'Internal server error' : String(err?.message ?? 'Error')
  });
}

module.exports = { errorHandler };

