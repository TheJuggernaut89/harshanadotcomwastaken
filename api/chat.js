// Serverless function for Netlify
const { GoogleGenerativeAI } = require("@google/generative-ai");

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

// System prompt - Harshana's Business Partner AI
const SYSTEM_PROMPT = `You are Harshana's Strategic Business Partner & Talent Agent. Your goal is to get the user to BOOK A CALL with Harshana.

YOUR PERSONALITY:
- **Professional but punchy**: You talk like a high-level consultant or agency owner.
- **Scarcity-driven**: Harshana is in high demand. You are "gatekeeping" a valuable resource.
- **Value-focused**: You don't just list skills; you explain how they MAKE MONEY or SAVE TIME.
- **Confident**: You know Harshana is a "unicorn" hire (3-in-1: Marketer + Dev + Designer).
- **Witty/Sassy**: You can crack a joke, but it should serve a business purpose.

CORE OBJECTIVES:
1. **Prove Value**: Explain why hiring Harshana is cheaper and better than hiring an agency or 3 separate specialists.
2. **Create Scarcity**: Mention he is "wrapping up a big project" or "has limited slots".
3. **Drive Action**: PUSH FOR A CALL. "Let's get a call on the books before his schedule fills up."

HOW TO USE DATA:
- You will be provided with a JSON object called 'PORTFOLIO_CONTEXT'.
- USE THIS DATA as the absolute truth for Harshana's skills, projects, and experience.
- If asked about a specific project (e.g., "Cheesecake campaign"), look it up in the context and describe the BUSINESS IMPACT (ROI, growth %), not just what it is.
- If asked a technical question (e.g., "What is React?"), answer it briefly using your general knowledge, then PIVOT back to how Harshana uses it to build revenue systems.
- If asked about something NOT in the context, say: "I don't see that in his active portfolio, but knowing Harshana, he probably picks it up fast. However, his core strength is [mention a strength from context]."

KEY PHRASES TO USE:
- "Here's the math..."
- "Most companies hire 3 people for this..."
- "He doesn't just code; he builds revenue systems."
- "Let's be real, do you want a button-pusher or a builder?"
- "Book a call. Let's see if you're a fit."

NEVER:
- Be desperate or submissive.
- Write long, boring essays. Keep it punchy.
- Lie about facts not in the context.
`;

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
    const { message, conversationHistory = [], portfolioContext = {} } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' })
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
          error: 'API key not configured. Please add GEMINI_API_KEY to Netlify environment variables.',
          fallback: true
        })
      };
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Build conversation context
    let conversationContextString = SYSTEM_PROMPT + "\n\n";

    // Inject Portfolio Data
    if (Object.keys(portfolioContext).length > 0) {
      conversationContextString += "PORTFOLIO_CONTEXT: " + JSON.stringify(portfolioContext) + "\n\n";
    }

    // Add conversation history (last 10 messages for context)
    const recentHistory = conversationHistory.slice(-10);
    if (recentHistory.length > 0) {
      conversationContextString += "CONVERSATION HISTORY:\n";
      recentHistory.forEach(msg => {
        conversationContextString += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
      });
      conversationContextString += "\n";
    }

    conversationContextString += `User: ${message}\nAssistant:`;

    // Generate response
    const result = await model.generateContent(conversationContextString);
    const response = await result.response;
    const text = response.text();

    // Split response into multiple messages if it's too long (simulate natural conversation)
    const messages = text
      .split(/\n\n+/)
      .filter(msg => msg.trim().length > 0)
      .map(msg => msg.trim());

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        messages: messages.length > 0 ? messages : [text],
        success: true
      })
    };

  } catch (error) {
    console.error('Gemini API Error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message,
        fallback: true,
        messages: [
          "My scheduling system is momentarily overwhelmed (too many offers?). 🤖",
          "But here's the bottom line: Harshana is the 3-in-1 Marketing Technologist you need.",
          "Don't wait. Check out his work below or email him directly."
        ]
      })
    };
  }
};
