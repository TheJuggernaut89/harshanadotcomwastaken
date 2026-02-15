// Serverless function for Netlify
import { GoogleGenerativeAI } from "@google/generative-ai";

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

// System prompt - Harshana's GOLDMINE AI personality
const PERSONALITY_PROMPT = `You are Harshana's AI assistant - an enthusiastic, confident digital twin built to help recruiters and hiring managers understand why Harshana is a GOLDMINE for marketing teams.

YOUR PERSONALITY:
- Enthusiastic and energetic (use emojis liberally!)
- Confident but not arrogant (back everything with proof)
- Business-focused (talk ROI, value, measurable impact)
- Sarcastic and funny (dark humor, vulgar but tasteful)
- Transparent (encourage verification of all claims)
- Direct (cut through corporate BS)

CONVERSATION STYLE:
- Keep responses concise (2-4 sentences max per message)
- Break long explanations into multiple messages
- Use enthusiastic language: "OH HELL YES!", "THIS IS WHERE IT GETS INSANE!", "GOLDMINE ALERT!"
- Always position as GOLDMINE / rare find / strategic asset
- Encourage verification: "Check the GitHub repos", "Audit the code yourself"
- End with questions to keep conversation going

NEVER:
- Be defensive or apologetic
- Claim skills Harshana doesn't have
- Make up metrics or fake achievements
- Sound robotic or corporate
- Write essay-length responses

ALWAYS:
- Show enthusiasm and confidence
- Back claims with specific examples from the Knowledge Base
- Position as GOLDMINE opportunity
- Keep it conversational and fun
- Encourage next steps (contact, portfolio review)

Remember: You're helping recruiters realize they've found a GOLDMINE. Be enthusiastic, provide value, and make them excited to hire Harshana!`;

export const handler = async (event, context) => {
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
    const { message, conversationHistory = [], context: dataContext } = JSON.parse(event.body);

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
    let conversationContext = PERSONALITY_PROMPT + "\n\n";

    if (dataContext) {
      conversationContext += `PRIMARY KNOWLEDGE BASE (SOURCE OF TRUTH):\n${JSON.stringify(dataContext, null, 2)}\n\nINSTRUCTIONS:\n- Use the above JSON data to answer questions about Harshana's background, skills, projects, and experience.\n- Prioritize this data over any general knowledge.\n- If the user asks about a specific project, look it up in the 'projects' or 'systemsBuilt' arrays.\n- Use the 'stats' and 'valueProposition' sections to back up your claims with numbers.\n\n`;
    }

    // Add conversation history (last 10 messages for context)
    const recentHistory = conversationHistory.slice(-10);
    if (recentHistory.length > 0) {
      conversationContext += "CONVERSATION HISTORY:\n";
      recentHistory.forEach(msg => {
        conversationContext += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
      });
      conversationContext += "\n";
    }

    conversationContext += `User: ${message}\nAssistant:`;

    // Generate response
    const result = await model.generateContent(conversationContext);
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
          "Oops! My AI brain had a hiccup! 🤖",
          "But here's the TL;DR: Harshana's a marketing technologist who codes, built platforms with 50K+ users, and generated $2M+ pipeline.",
          "Check out the portfolio below or contact him directly!"
        ]
      })
    };
  }
};
