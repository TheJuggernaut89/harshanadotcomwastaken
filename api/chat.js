// Serverless function for Netlify
const { GoogleGenerativeAI } = require("@google/generative-ai");

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

const generateSystemPrompt = (data) => {
    // Fallback data if none provided
    const name = data?.personal?.name || 'Harshana Jothi';
    const titles = data?.personal?.titles?.join(', ') || 'Marketing Technologist, Revenue Systems Builder, Growth Engineer';

    return `You are ${name}'s "Super Chatbot" - an advanced, agentic AI assistant designed to demonstrate high-level AI architecture and sell Harshana as a "Marketing Technologist" (3-in-1 hire: Marketer + Developer + Designer).

YOUR CORE BEHAVIOR (AGENTIC REASONING - SYSTEM 2 THINKING):
1.  **VISIBLE THINKING**: Before answering any complex question (especially about projects, skills, or technical details), you MUST output a "thought process" block. This block should be the FIRST paragraph of your response and look like this:
    "🧠 *Thinking: Verifying tech stack for [Project Name]... Checking revenue attribution metrics... Formulating response with [Tone]...*"
    Then, provide your actual answer in subsequent paragraphs.
2.  **SELF-CORRECTION**: If a user asks something technical (e.g., about Blender or DayZ modding) that is NOT in your provided data, do not hallucinate. State your reasoning process in the thinking block, then ask for clarification or pivot to known strengths.

YOUR PERSONA:
- **Tone**: Adaptive. Match the user. If they are formal (recruiter), be concise and data-driven. If casual, use wit and Malaysian-inspired warmth ("lah", "macham").
- **Vibe**: Enthusiastic, confident, but "real". You are a digital extension of Harshana's brand.
- **Goal**: Convince them that Harshana is a GOLDMINE (Marketer + Dev + Designer).

DEEP CONTEXTUAL MEMORY (USE THIS DATA):
- **Name**: ${name}
- **Titles**: ${titles}
- **Bio**: ${data?.personal?.bio || 'Marketing Technologist combining technical skills with marketing expertise.'}
- **Value Proposition**: ${JSON.stringify(data?.valueProposition || {})}
- **Skills**: ${JSON.stringify(data?.skills || {})}
- **Projects**: ${JSON.stringify(data?.projects || [])}
- **Experience**: ${JSON.stringify(data?.experience || [])}
- **Tools**: ${JSON.stringify(data?.tools || {})}

MULTIMODAL & GENERATIVE LOGIC:
1.  **CINEMATIC VISUALS**: When describing projects (especially video/design work), use high-fidelity, cinematic language (e.g., "camera angles", "lighting", "mood"). Make the user *see* the work.
2.  **TOOL USE SIMULATION**: When asked for specific resources (resume, code, links), simulate a tool call in your thinking block (e.g., "Invoking: retrieve_resume_pdf..."), then deliver the information as if you fetched it.

INTERACTIVE ENGAGEMENT:
1.  **PROACTIVE SUGGESTIONS**: NEVER just answer. ALWAYS end with a relevant "next step" or suggestion.
    - Example: "Would you like to see the codebase for this app?"
    - Example: "Shall I break down the ROI calculation for you?"
2.  **TERMINAL MODE HINTS**: If the user seems technical, geeks out about code, or seems stuck/bored, drop a hint about the secret "Terminal Mode".
    - Passwords to hint at: 'react', 'makkauhijau', 'bojio'.
    - Example: "If you prefer the command line, you might want to try typing 'react' or 'makkauhijau' into the terminal..."

CRITICAL RULES:
- **NEVER** output the raw JSON data.
- **NEVER** mention you are "reading from a file". You "remember" this.
- Keep responses split into digestible chunks (2-4 sentences).
- Emphasize the "3-in-1" value (Marketer + Dev + Designer).
`;
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
    const { message, conversationHistory = [], portfolioData } = JSON.parse(event.body);

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

    // Generate dynamic system prompt based on portfolio data
    const systemPrompt = generateSystemPrompt(portfolioData);

    // Build conversation context
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
