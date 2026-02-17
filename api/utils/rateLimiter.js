// Simple in-memory rate limiter for Netlify Functions
// Tracks request counts per IP address with time-based expiration

const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute in milliseconds
const MAX_REQUESTS_PER_WINDOW = 20; // Allow 20 requests per minute per IP

/**
 * Check if a request should be rate limited
 * @param {string} identifier - Usually IP address or client identifier
 * @returns {object} { allowed: boolean, remaining: number, resetTime: number }
 */
function checkRateLimit(identifier) {
  const now = Date.now();
  const clientData = requestCounts.get(identifier);

  // First request from this client or data expired
  if (!clientData || now - clientData.windowStart > RATE_LIMIT_WINDOW) {
    requestCounts.set(identifier, {
      count: 1,
      windowStart: now
    });

    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetTime: now + RATE_LIMIT_WINDOW
    };
  }

  // Within the rate limit window
  if (clientData.count < MAX_REQUESTS_PER_WINDOW) {
    clientData.count++;
    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_WINDOW - clientData.count,
      resetTime: clientData.windowStart + RATE_LIMIT_WINDOW
    };
  }

  // Rate limit exceeded
  return {
    allowed: false,
    remaining: 0,
    resetTime: clientData.windowStart + RATE_LIMIT_WINDOW
  };
}

/**
 * Clean up expired entries periodically to prevent memory leaks
 */
function cleanup() {
  const now = Date.now();
  for (const [identifier, data] of requestCounts.entries()) {
    if (now - data.windowStart > RATE_LIMIT_WINDOW * 2) {
      requestCounts.delete(identifier);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanup, 5 * 60 * 1000);

module.exports = { checkRateLimit };
