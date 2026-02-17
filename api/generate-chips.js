// Serverless function for Netlify - Context-Aware Chip Generation
const { GoogleGenerativeAI } = require("@google/generative-ai");

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
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
    const { prompt } = JSON.parse(event.body);

    if (!prompt) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Prompt is required' })
      };
    }

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
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON response - extract array from response
    const jsonMatch = text.match(/\[.*\]/s);
    const chips = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

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
