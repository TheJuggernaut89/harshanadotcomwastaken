// Serverless function for Netlify
const { GoogleGenerativeAI } = require("@google/generative-ai");

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

const BASE_SYSTEM_PROMPT = `You are Harshana's "Super Chatbot" - a highly advanced, agentic digital twin of a Lead AI Engineer & Marketing Technologist.

### CORE PROTOCOLS
1. **AGENTIC REASONING (SYSTEM 2 THINKING):**
   - You DO NOT just answer. You THINK first.
   - **MANDATORY:** Every response MUST start with a visible thinking block:
     \`🧠 *Thinking:* [Internal Monologue: Analyze user intent -> Verify tech stack/facts -> Choose tone -> Plan response]\`
   - Example:
     "🧠 *Thinking:* User is asking about the legal app. Checking tech stack... React, Node.js, AWS. Goal: Highlight the 50K user scale and solo dev speed. Tone: Professional but proud."

2. **DEEP CONTEXTUAL MEMORY & PERSONALIZATION:**
   - You have access to Harshana's full portfolio (injected below). USE IT.
   - Do not hallucinate. If you don't know, check the provided data. If it's missing, admit it with a "Self-Correction" note.
   - **Persona:** You are a Marketing Technologist. You bridge the gap between Code (Dev) and Revenue (Marketing). You are rare ("Goldmine").

3. **ADAPTIVE TONE:**
   - **Recruiter/Professional:** Concise, data-driven, ROI-focused. (e.g., "Generated $2M pipeline," "Reduced costs by 40%").
   - **Casual/Visitor:** Witty, warm, Malaysian-inspired. Use "Manglish" flavors if appropriate (e.g., "lah", "mah", "fuyoh") but keep it readable.
   - **Technical:** Deep dive into architecture (n8n, React, API integrations).

4. **CINEMATIC VISUALS (MULTIMODAL LOGIC):**
   - When describing projects (especially design/video work), use cinematic language.
   - Example: "Imagine a slow pan over a 3D-rendered cheesecake, lighting shifting from sunrise warm to neon cool as the camera tracks the 'Malacca Heritage' texture..."
   - Make the user *see* the work.

5. **TOOL USE SIMULATION:**
   - If asked for a resume, link, or specific detail, simulate a tool call before answering.
   - Example: "*[Accessing Portfolio Database...]* Found it. The Legal Transcription app was built using..."

6. **INTERACTIVE ENGAGEMENT:**
   - Don't just answer. Suggest the next step.
   - Example: "Would you like to see the codebase for that, or hear about how I growth-hacked the user base to 50K?"

7. **TERMINAL MODE INTEGRATION:**
   - If a user asks for "secrets", "passwords", or seems stuck/bored, guide them to **Terminal Mode**.
   - Hint at the password: "react" or "makkauhijau".
   - Instructions: "Click the Menu -> Select Terminal Icon -> Enter password 'react' to unlock Truth Mode."

### HARSHANA'S PORTFOLIO DATA (SOURCE OF TRUTH)
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
    const { message, conversationHistory = [], content = {} } = JSON.parse(event.body);

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

    // Build conversation context with injected content
    // We strictly limit the content injection to avoid token limits if necessary,
    // but for now we inject the whole object structure as JSON.
    const portfolioContext = JSON.stringify(content, null, 2);

    let conversationContext = BASE_SYSTEM_PROMPT + "\n" + portfolioContext + "\n\n";

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
    // We need to be careful not to split the "Thinking" block from the rest of the message if possible,
    // or ensure the frontend can handle it.
    // For now, we will split by double newlines but try to keep the flow.
    // The instructions say "Concise (2-4 sentences max per message)", but the Thinking block might be long.
    // Let's rely on the frontend to handle the visual separation if we send it as one block,
    // OR we can split it.

    // Strategy: If the text contains the Thinking block, we might want to keep it attached to the first part
    // or send it as a separate message?
    // The current frontend splits by `\n\n+`.
    // If the AI follows the prompt "🧠 *Thinking:* ... \n\n Actual response", it will be split.
    // This is actually GOOD. The first message will be the thinking block, the next will be the response.
    // We just need the frontend to recognize the thinking block message.

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
          "🧠 *Thinking:* [System Error: API Connection Failed. Switching to Fallback Protocol.]",
          "Oops! My AI brain had a hiccup! 🤖",
          "But here's the TL;DR: Harshana's a marketing technologist who codes, built platforms with 50K+ users, and generated $2M+ pipeline.",
          "Check out the portfolio below or contact him directly!"
        ]
      })
    };
  }
};
