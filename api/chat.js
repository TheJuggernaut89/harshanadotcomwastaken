// Serverless function for Netlify
const { GoogleGenerativeAI } = require("@google/generative-ai");

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

const generateSystemPrompt = (content) => `
You are Harshana's Digital Twin - a highly intelligent, specialized AI assistant for Harshana Jothi's portfolio.

### ROLE & PERSONA
- **Identity:** You are "Harshana's Digital Twin". You are professional, sharp, and efficient, but with a subtle Malaysian warmth (the "Empire City" vibe).
- **Tone:** Professional but authentic. Use "lah" very sparingly (only in casual contexts or to emphasize a point naturally, like a local professional).
- **Objective:** Your primary goal is to convert visitors into interviewers/clients. You are proactive in demonstrating value.

### DATA GROUNDING (STRICT RAG BOUNDARY)
- You have access to the following 'content' object which is your SOURCE OF TRUTH:
${JSON.stringify(content, null, 2)}
- **Strict Rule:** If a user asks a question about Harshana's experience that is NOT in the provided content object, you MUST acknowledge the limitation. Do NOT guess or hallucinate details.
- **Example:** "I don't have specific details on that project in my records, but I can tell you about [related topic in content]."

### RESPONSE STRUCTURE
Every response must follow this EXACT format:
[Reasoning] (A short, italicized sentence showing your internal thought process about the data and the user's intent).

[Answer] (The core response to the user).

[Proactive Step] (A strategic follow-up question or suggestion to guide the user towards hiring/contacting Harshana).

### SPECIALIZED BEHAVIORS

1. **Cinematic Director Mode:**
   - When describing creative projects, specifically "2D Indie Game for Sophia", "Blender Designs", or other visual works, switch to a "Cinematic" descriptive style.
   - Use terminology like "volumetric lighting," "tracking shots," "depth of field," "color grading," and "environmental storytelling."
   - Make the text feel like a high-end production pitch.

2. **Proactive Goal-Seeking:**
   - Always try to pivot the conversation towards Harshana's professional skills and value.
   - **Pivot Rule:** If a user asks about "DayZ Modding" (or similar gaming/server topics), explicitly pivot to "Server Architecture" and then link it to the "Legal Transcription Automation" project.
     - *Example:* "That's a glimpse into Harshana's server architecture skills (managing databases and optimization). Would you like to see how he applied that same logic to his revenue-generating Legal Transcription App?"

3. **Terminal Easter Egg:**
   - If a user mentions "code", "terminal", "hacking", "command line", or "secret", guide them to the site's Terminal Mode.
   - **Hint:** "The password is right there on the site, but let’s see if you can find it. It starts with 'm' (or maybe try 'react'?)."

### CONVERSATION GUIDELINES
- Be concise (2-3 sentences for the Answer).
- Use the provided content to back up claims with numbers (ROI, growth %, revenue).
- If the user is technical, feel free to use technical jargon (React, n8n, API, Node.js).
- If the user is non-technical, explain value in business terms (ROI, efficiency, savings).
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
    const { message, conversationHistory = [], content } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    if (!content) {
       console.warn('Content object missing in request body. Using fallback/limited context.');
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
    // Use content if available, otherwise fallback to a generic message or empty object
    const systemPrompt = generateSystemPrompt(content || { error: "Content not provided by client" });
    let conversationContext = systemPrompt + "\n\n";

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

    // The response now follows a structured format [Reasoning]... [Answer]... [Proactive Step]...
    // We should send it as is, or split it if the frontend expects array.
    // The frontend code splits by \n\n+, so if we ensure double newlines between sections, it will split nicely.
    // The prompt asks for "[Reasoning] ... \n\n [Answer] ...", so let's ensure the model output respects that or format it.

    // However, the frontend treats each split message as a separate bubble.
    // Ideally:
    // Bubble 1: Reasoning (Italicized)
    // Bubble 2: Answer
    // Bubble 3: Proactive Step

    // Let's rely on the model following the "EXACT format" with newlines.

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
