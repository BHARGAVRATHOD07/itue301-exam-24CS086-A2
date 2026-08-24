/**
 * Task 3 & Task 5 Requirement: Global Error-Handling Middleware
 * Returns structured JSON instead of a raw error stack.
 * Catches Mongoose ValidationError cleanly.
 */
const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Error:', err);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Task 5 Hint: Mongoose ValidationError formatting
  if (err.name === 'ValidationError') {
    statusCode = 400;
    const errors = Object.values(err.errors).map(e => e.message);
    message = `Validation Error: ${errors.join(', ')}`;
  } else if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate field value entered (email already exists)';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = `Invalid ID format: ${err.value}`;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
