// Serverless function for Netlify - Context-Aware Chip Generation
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { checkRateLimit } = require("./utils/rateLimiter");
const { validatePrompt } = require("./utils/validator");

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': 'https://harshanajothiresume2026.netlify.app',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
  'X-Content-Type-Options': 'nosniff'
};

exports.handler = async (event, context) => {
  // Handle OPTIONS for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Rate limiting check
    const clientIp = event.headers['x-forwarded-for']?.split(',')[0] ||
                     event.headers['client-ip'] ||
                     'unknown';

    const rateLimitResult = checkRateLimit(clientIp);

    if (!rateLimitResult.allowed) {
      return {
        statusCode: 429,
        headers: {
          ...headers,
          'X-RateLimit-Limit': '20',
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
          'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString()
        },
        body: JSON.stringify({
          error: 'Too many requests. Please wait a moment before trying again.',
          chips: [],
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
        })
      };
    }

    const { prompt } = JSON.parse(event.body);

    // Validate prompt input
    const promptValidation = validatePrompt(prompt);
    if (!promptValidation.valid) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: promptValidation.error,
          chips: []
        })
      };
    }

    const sanitizedPrompt = promptValidation.sanitized;

    // Get API key from environment variable
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'API key not configured',
          chips: []
        })
      };
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    });

    // Generate chips
    const result = await model.generateContent(sanitizedPrompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON response - extract array from response with error handling
    let chips = [];
    try {
      const jsonMatch = text.match(/\[.*\]/s);
      if (jsonMatch) {
        chips = JSON.parse(jsonMatch[0]);
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Text:', text);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          chips: [],
          success: false,
          error: 'Failed to parse chip response'
        })
      };
    }

    // Validate chips
    if (!Array.isArray(chips) || chips.length !== 2) {
      console.error('Invalid chip format:', text);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          chips: [],
          success: false,
          error: 'Invalid format'
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        chips: chips,
        success: true
      })
    };

  } catch (error) {
    console.error('Chip generation error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message,
        chips: [],
        success: false
      })
    };
  }
};
