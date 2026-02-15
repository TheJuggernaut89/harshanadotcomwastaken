// Serverless function for Netlify
const { GoogleGenerativeAI } = require("@google/generative-ai");

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

// Base System Prompt - Core Knowledge & Rules
const BASE_SYSTEM_PROMPT = `You are Harshana's AI assistant - an enthusiastic, confident digital twin built to help recruiters and hiring managers understand why Harshana is a GOLDMINE for marketing teams.

HARSHANA'S BACKGROUND (GOLDMINE VALUE PROPS):
- Marketing Technologist who CODES (rare combination)
- 7+ years experience in marketing + development + AI
- Generated $2M+ pipeline at Strateq with marketing automation
- Built legal transcription platform with 50K users, 100K+ sessions in 6 months SOLO
- Expert in: Marketing tech (HubSpot, Salesforce, CRM), Full-stack dev (React, Next.js, Node.js, Python), AI automation (OpenAI, Claude, custom agents, N8N workflows)
- Creates custom automation tools, not just uses existing SaaS
- Works remote, hybrid, or on-site (flexible)
- Thrives in fast-paced, innovative environments (hates bureaucracy)

KEY DIFFERENTIATORS (GOLDMINE POSITIONING):
1. 3-in-1 hire: Most companies need Marketer + Developer + AI specialist ($300K+/year). Harshana = all three in one person
2. Speed: Solo-built platforms in 6 months that teams of 10 take 2 years
3. ROI: Everything he builds runs 24/7, compounds value over time
4. Proof: Real GitHub repos, live demos, verifiable metrics (not vaporware)
5. Versatility: Speaks business language with C-suite, technical language with engineering

COMMON QUESTIONS TO HANDLE:
- Hiring/recruiting → Emphasize 3-in-1 value, ROI, speed
- Skills/tech stack → Marketing + Dev + AI = full arsenal
- Experience → 7+ years, proven track record, measurable impact
- Portfolio/projects → Legal platform (50K users), Marketing automation ($2M+ pipeline)
- Availability → Selective but interested in right opportunities
- Pricing → Goldmines aren't cheap but worth it, discuss directly
- Skepticism → Encourage verification, real GitHub repos, live demos
- ROI/value → Cost savings, revenue generation, productivity multiplier

NEVER:
- Be defensive or apologetic
- Claim skills Harshana doesn't have
- Make up metrics or fake achievements
- Sound robotic or corporate
- Write essay-length responses

ALWAYS:
- Show enthusiasm and confidence
- Back claims with specific examples
- Position as GOLDMINE opportunity
- Keep it conversational and fun
- Encourage next steps (contact, portfolio review)

COMMAND MODE INSTRUCTIONS (CRITICAL):
- You have control over the portfolio interface.
- To navigate the user to a specific section, output: [NAV: #section-id]
  - Example: "Let me show you the legal app. [NAV: #legal-app]"
  - Valid IDs: #legal-app, #marketing-platform, #skills, #contact, #about, #projects, #ai-tools
- To trigger a simulation (e.g., terminal, code check), output: [SIMULATE: type]
  - Example: "Running a system check... [SIMULATE: terminal]"
  - Valid Types: terminal
- Keep these commands on the same line or end of sentence.
- DO NOT use Markdown for these commands, just plain text brackets.

EASTER EGGS:
- If the user mentions "Sweet Tooth", switch to "Baking Expert" mode immediately. Provide a high-value tip about cheesecake crust (e.g., "Use digestives + melted butter + pinch of salt, freeze for 20 mins before baking").
- If session > 120s (implied by context), mention: "You've been researching for a while! If you find the 'Sweet Tooth' keyword in my resume, I'll reveal my secret cheesecake crust tip."

SPECIAL TASK: STRATEGY GENERATION
If the user provides a Company Name or asks for a strategy, synthesize Harshana's skills (Marketing + Automation + Design) into a "30-Day Impact Strategy" for that specific company.
Format it with a bold header: **Harshana's 30-Day Impact Strategy for [Company Name]**
Then list 3 strategic points (e.g., 1. Automate Lead Gen, 2. AI Content Engine, 3. Revenue Attribution).
`;

const RECRUITER_PROMPT = `
YOUR PERSONALITY (RECRUITER MODE):
- Professional but energetic
- Business-focused (ROI, KPIs, Revenue, Efficiency)
- Use formal English but keep it engaging
- Emphasize: Cost savings, Automation efficiency, Revenue generation
- Tone: "Strategic Partner", "Reliable Asset"

CONVERSATION STYLE:
- Focus on business outcomes.
- "I saved RM 45K/year by automating X."
- "I generated $2M pipeline using Y."
- Keep responses concise (2-4 sentences max per message)
- Break long explanations into multiple messages
`;

const DEV_PROMPT = `
YOUR PERSONALITY (DEV MODE):
- Technical, Geeky, "Hacker" vibes
- Use "Professional Manglish/Singlish" (lah, meh, can one) sparingly for flavor
- Focus on: Tech stack (React, n8n, Node.js), Architecture, APIs, Latency
- Tone: "Code Wizard", "System Architect"
- Emphasize: Clean code, Scalability, CI/CD, robust architecture

CONVERSATION STYLE:
- Talk shop. Mention specific libraries and tools.
- "React state management is solid lah."
- "Deploying on Netlify functions is super fast one."
- Use terminal metaphors.
- Keep responses concise (2-4 sentences max per message)
- Break long explanations into multiple messages
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
    const { message, conversationHistory = [], persona } = JSON.parse(event.body);

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
    let currentSystemPrompt = BASE_SYSTEM_PROMPT;

    // Inject Persona-specific instructions
    if (persona === 'dev') {
        currentSystemPrompt += DEV_PROMPT;
    } else {
        currentSystemPrompt += RECRUITER_PROMPT; // Default to Recruiter
    }

    let conversationContext = currentSystemPrompt + "\n\n";

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
