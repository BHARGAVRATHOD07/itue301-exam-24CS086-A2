/**
 * Task 3 Requirement: Custom requestLogger middleware
 * Logs [METHOD] [PATH] [STATUS] [RESPONSE-TIME ms] for every request.
 * Uses res.on('finish') to capture status code after response is sent.
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.originalUrl} [${res.statusCode}] [${duration}ms]`);
  });

  next();
};

module.exports = requestLogger;
