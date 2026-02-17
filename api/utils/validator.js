// Input validation utilities for API endpoints

/**
 * Sanitize and validate user message input
 * @param {string} message - User message to validate
 * @returns {object} { valid: boolean, sanitized: string, error: string }
 */
function validateMessage(message) {
  // Check if message exists and is a string
  if (!message || typeof message !== 'string') {
    return {
      valid: false,
      sanitized: '',
      error: 'Message must be a non-empty string'
    };
  }

  // Trim and check length
  const sanitized = message.trim();

  if (sanitized.length === 0) {
    return {
      valid: false,
      sanitized: '',
      error: 'Message cannot be empty'
    };
  }

  if (sanitized.length > 2000) {
    return {
      valid: false,
      sanitized: '',
      error: 'Message exceeds maximum length of 2000 characters'
    };
  }

  // Check for potential injection attempts (basic XSS/script tags)
  const dangerousPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi, // onclick, onload, etc.
    /<iframe/gi
  ];

  for (const pattern of dangerousPatterns) {
    if (pattern.test(sanitized)) {
      return {
        valid: false,
        sanitized: '',
        error: 'Message contains potentially dangerous content'
      };
    }
  }

  return {
    valid: true,
    sanitized: sanitized,
    error: null
  };
}

/**
 * Validate conversation history array
 * @param {Array} history - Conversation history to validate
 * @returns {object} { valid: boolean, sanitized: Array, error: string }
 */
function validateConversationHistory(history) {
  if (!Array.isArray(history)) {
    return {
      valid: true, // Allow missing history
      sanitized: [],
      error: null
    };
  }

  // Limit history to reasonable size
  if (history.length > 50) {
    return {
      valid: false,
      sanitized: [],
      error: 'Conversation history exceeds maximum length'
    };
  }

  // Validate each history item
  const sanitized = [];
  for (const item of history) {
    if (!item || typeof item !== 'object') {
      continue; // Skip invalid items
    }

    if (!item.role || !item.content) {
      continue; // Skip incomplete items
    }

    if (!['user', 'assistant', 'model'].includes(item.role)) {
      continue; // Skip invalid roles
    }

    if (typeof item.content !== 'string' || item.content.length > 5000) {
      continue; // Skip invalid or too long content
    }

    sanitized.push({
      role: item.role,
      content: item.content.trim()
    });
  }

  return {
    valid: true,
    sanitized: sanitized,
    error: null
  };
}

/**
 * Validate prompt for chip generation
 * @param {string} prompt - Prompt to validate
 * @returns {object} { valid: boolean, sanitized: string, error: string }
 */
function validatePrompt(prompt) {
  if (!prompt || typeof prompt !== 'string') {
    return {
      valid: false,
      sanitized: '',
      error: 'Prompt must be a non-empty string'
    };
  }

  const sanitized = prompt.trim();

  if (sanitized.length === 0) {
    return {
      valid: false,
      sanitized: '',
      error: 'Prompt cannot be empty'
    };
  }

  if (sanitized.length > 3000) {
    return {
      valid: false,
      sanitized: '',
      error: 'Prompt exceeds maximum length'
    };
  }

  return {
    valid: true,
    sanitized: sanitized,
    error: null
  };
}

module.exports = {
  validateMessage,
  validateConversationHistory,
  validatePrompt
};
