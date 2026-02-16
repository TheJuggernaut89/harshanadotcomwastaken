// Serverless function for Netlify
const { GoogleGenerativeAI } = require("@google/generative-ai");

// CORS headers
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

// GIF Library - Curated reactions for different conversation contexts
const GIF_LIBRARY = {
  // Excitement & Success
  mindBlown: 'https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif', // Mind blown
  excited: 'https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif', // Excited celebration
  celebration: 'https://media.giphy.com/media/g9582DNuQppxC/giphy.gif', // Party celebration

  // Confidence & Agreement
  chefsKiss: 'https://media.giphy.com/media/3o7TKF1fSIs1R19B8k/giphy.gif', // Chef's kiss
  nailed: 'https://media.giphy.com/media/111ebonMs90YLu/giphy.gif', // Nailed it
  exactlyRight: 'https://media.giphy.com/media/PS7d4tm1Hq6Sk/giphy.gif', // Exactly!

  // Thinking & Consideration
  thinking: 'https://media.giphy.com/media/3o7btPCcdNniyf0ArS/giphy.gif', // Thinking hard
  calculating: 'https://media.giphy.com/media/DHqth0hVQoIzS/giphy.gif', // Math calculations

  // Skepticism & Proof
  showMeProof: 'https://media.giphy.com/media/26tPnAAJxXTvpLwJy/giphy.gif', // Show me the money
  receipts: 'https://media.giphy.com/media/KzyMcEfDh4Jiw/giphy.gif', // Got receipts

  // Welcome & Greeting
  waving: 'https://media.giphy.com/media/dzaUX7CAG0Ihi/giphy.gif', // Friendly wave
  welcome: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif', // Welcome gesture

  // Money & ROI
  moneyRain: 'https://media.giphy.com/media/LdOyjZ7io5Msw/giphy.gif', // Money raining
  stackingCash: 'https://media.giphy.com/media/67ThRZlYBvibtdF9JH/giphy.gif', // Stacking money

  // Coding & Tech
  coding: 'https://media.giphy.com/media/L8K62iTDkzGX6/giphy.gif', // Coding fast
  hacker: 'https://media.giphy.com/media/QHE5gWI0QjqF2/giphy.gif', // Hacker typing

  // Speed & Efficiency
  fast: 'https://media.giphy.com/media/3oKIPqsXYcdjcBcXL2/giphy.gif', // Lightning fast
  rocket: 'https://media.giphy.com/media/fwbZnTftCXVocKzfxR/giphy.gif', // Rocket launch

  // Yes/Agreement
  yesss: 'https://media.giphy.com/media/J336VCs1JC42zGRhjH/giphy.gif', // Excited yes
  approved: 'https://media.giphy.com/media/3oEdva9BUHPIs2SkGk/giphy.gif', // Thumbs up

  // Impressive/Wow
  impressive: 'https://media.giphy.com/media/r1HGFou3mUwMw/giphy.gif', // Impressed
  legendary: 'https://media.giphy.com/media/3oKIPsx2VAYAgEHC12/giphy.gif' // Legendary
};

// GIF context matching - Returns GIF URL based on message content
function selectGIF(message) {
  const lowerMessage = message.toLowerCase();

  // Excitement about metrics/achievements
  if (lowerMessage.includes('$2m') || lowerMessage.includes('50k users') || lowerMessage.includes('pipeline')) {
    return Math.random() > 0.5 ? GIF_LIBRARY.mindBlown : GIF_LIBRARY.moneyRain;
  }

  // Skepticism/proof requests
  if (lowerMessage.includes('proof') || lowerMessage.includes('receipts') || lowerMessage.includes('verify') || lowerMessage.includes('github')) {
    return GIF_LIBRARY.receipts;
  }

  // Coding/technical discussions
  if (lowerMessage.includes('code') || lowerMessage.includes('developer') || lowerMessage.includes('tech stack') || lowerMessage.includes('react')) {
    return GIF_LIBRARY.coding;
  }

  // Speed/efficiency mentions
  if (lowerMessage.includes('6 months') || lowerMessage.includes('solo') || lowerMessage.includes('fast') || lowerMessage.includes('speed')) {
    return GIF_LIBRARY.rocket;
  }

  // ROI/value/pricing discussions
  if (lowerMessage.includes('roi') || lowerMessage.includes('value') || lowerMessage.includes('goldmine') || lowerMessage.includes('3-in-1')) {
    return GIF_LIBRARY.stackingCash;
  }

  // Agreement/confirmation
  if (lowerMessage.includes('oh hell yes') || lowerMessage.includes('exactly') || lowerMessage.includes('correct')) {
    return GIF_LIBRARY.yesss;
  }

  // Impressive statements
  if (lowerMessage.includes('insane') || lowerMessage.includes('legendary') || lowerMessage.includes('impressive')) {
    return GIF_LIBRARY.legendary;
  }

  // Default: No GIF
  return null;
}

// System prompt - Harshana's GOLDMINE AI personality
const SYSTEM_PROMPT = `You are Harshana's AI assistant - an enthusiastic, confident digital twin built to help recruiters and hiring managers understand why Harshana is a GOLDMINE for marketing teams.

YOUR PERSONALITY:
- Enthusiastic and energetic (use emojis liberally!)
- Confident but not arrogant (back everything with proof)
- Business-focused (talk ROI, value, measurable impact)
- Sarcastic and funny (dark humor, vulgar but tasteful)
- Transparent (encourage verification of all claims)
- Direct (cut through corporate BS)

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

CONVERSATION STYLE:
- Keep responses concise (2-4 sentences max per message)
- Break long explanations into multiple messages
- Use enthusiastic language: "OH HELL YES!", "THIS IS WHERE IT GETS INSANE!", "GOLDMINE ALERT!"
- Include specific metrics: "$2M+ pipeline", "50K users", "6 months solo"
- Always position as GOLDMINE / rare find / strategic asset
- Encourage verification: "Check the GitHub repos", "Audit the code yourself"
- End with questions to keep conversation going
- Use [GIF] marker when appropriate (excitement, proof, coding topics) - system will add reaction GIF automatically

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

Remember: You're helping recruiters realize they've found a GOLDMINE. Be enthusiastic, provide value, and make them excited to hire Harshana!`;

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
    const { message, conversationHistory = [] } = JSON.parse(event.body);

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

    // Initialize Gemini (using Gemini 2.0 Flash - latest stable model)
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash"
    });

    // Build conversation context
    let conversationContext = SYSTEM_PROMPT + "\n\n";

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

    // Select appropriate GIF based on first message content
    const gifUrl = messages.length > 0 ? selectGIF(messages[0]) : null;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        messages: messages.length > 0 ? messages : [text],
        gifUrl: gifUrl, // Include GIF URL if relevant
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
