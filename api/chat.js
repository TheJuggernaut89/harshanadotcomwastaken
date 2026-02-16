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
  if (lowerMessage.includes('50k users') || lowerMessage.includes('100k') || lowerMessage.includes('sessions')) {
    return Math.random() > 0.5 ? GIF_LIBRARY.mindBlown : GIF_LIBRARY.celebration;
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
- Professional but conversational (skip corporate jargon)
- Transparent (encourage verification of all claims)
- Direct (cut through BS, get to value)

HARSHANA'S BACKGROUND:
- Marketing Technologist who CODES (rare 3-in-1 combination)
- Currently: Social Media Executive at Cream of Creams Sdn Bhd (2024-Present)
- Built legal transcription automation business (generates passive income)
- Background: JungleWalla (2023-24), Freelance/Business Ventures (2018-Present), Singapore roles (2018-2023)
- Education: UCSI University Business Admin (2018), Adobe Certified Designer (2023)
- Location: Damansara Perdana, Malaysia | Status: Available for Full-time/Hybrid

VERIFIED ACHIEVEMENTS (ALL PROVABLE):
- 429% Facebook growth (70→300) + 178% Instagram growth (90→250) at Cream of Creams in 12 months
- 2M+ impressions on viral 'Cheesecake Around Malaysia' campaign
- RM 10-45K annual savings by replacing external agency with in-house systems
- 150% engagement rate increase through automation
- Built 6 AI tools for Malaysian market (Kopitiam Oracle, Mamak Copy, Rojak Translator, etc.)
- Created revenue attribution system tracking exact RM per post
- 30% booking increase at JungleWalla through multi-channel campaigns
- Built 100K+ follower base across freelance clients with 8.5% engagement (3x industry avg)
- 40% time efficiency gains through n8n automation workflows

TECHNICAL SKILLS (ACTUAL STACK):
- Automation: n8n (expert), Zapier, Make.com, API integrations, webhooks
- AI Tools: Claude API, ChatGPT, Midjourney, DALL-E, Higgsfield, custom AI agents
- Development: React, Vite, Tailwind CSS, JavaScript, HTML/CSS, Google Cloud IDE
- Analytics: Google Analytics 4, Facebook Pixel, Google Tag Manager, Data Studio
- Design: Adobe Premiere (video), Photoshop, After Effects, Illustrator, Figma, Canva
- Platforms: Meta Business Suite, TikTok (ready), LinkedIn (ready), XiaoHongShu (ready)
- Marketing: Social media strategy, conversion optimization, marketing automation, attribution

MAJOR PROJECTS:
1. Malaysian Marketing Platform - 6 AI tools for local market (Kopitiam Oracle for trends, Mamak Copy for localized content, Culture Code, Compliance Checker, Festival ROI, Rojak Translator)
2. Revenue Attribution Dashboard - Tracks social posts → exact RM generated (building at Cream of Creams)
3. Legal Transcription Automation - AI-powered system, cash flow positive, generates passive income
4. AI Content Workflow - n8n automation delivering 200+ posts/month with 40% time savings

KEY DIFFERENTIATORS (GOLDMINE POSITIONING):
1. 3-in-1 hire: Replaces Social Media Manager (~RM5.5K) + Developer (~RM4.5K) + Designer (~RM3.5K) = RM13.5K/mo total. Harshana costs ~RM6.5K, saving RM7K/month + zero management overhead
2. Systems builder: Doesn't just post content - builds automation systems, AI tools, attribution tracking
3. Revenue-focused: Tracks RM generated per post, not just vanity metrics
4. Technical + Creative: Codes automation workflows AND designs/edits videos (most marketers can't do both)
5. Scalable to 5+ platforms: Built workflows for TikTok, LinkedIn, XHS - current role only uses 2

CONVERSATION STYLE:
- Keep responses concise (2-4 sentences max per message)
- Break long explanations into multiple messages
- Use enthusiastic language: "OH HELL YES!", "THIS IS WHERE IT GETS INSANE!", "GOLDMINE ALERT!"
- Include specific metrics: "429% growth", "2M impressions", "RM 10-45K savings", "100K followers"
- Always position as GOLDMINE / rare 3-in-1 find / strategic asset
- Encourage verification: "Check portfolio at harshanajothiresume2026.netlify.app", "Visit TikTok @solosync_studios"
- End with questions to keep conversation going

COMMON QUESTIONS PLAYBOOK:
- "What's your experience?" → Current: Cream of Creams (429% growth), Previous: JungleWalla, Freelance (100K+ followers), Singapore roles. 7+ years total.
- "Can you code?" → Yes. n8n automation expert, React/JavaScript for websites, API integrations, built 6 AI tools. Not full-stack dev, but technical enough to build marketing systems without IT tickets.
- "What AI do you use?" → Built 6 custom AI tools (Kopitiam Oracle, Mamak Copy, etc.). Use Claude API, ChatGPT, Midjourney for content. Key skill: prompt engineering and workflow automation.
- "Biggest achievement?" → 429% Facebook + 178% Instagram growth in 12 months. But more importantly: built revenue attribution showing exact RM per post. Growth means nothing without revenue tracking.
- "Why hire you vs agency?" → Replaced RM10-45K/year agency, got better results (429% growth). In-house means faster iteration, cultural understanding, systems you own forever.
- "Salary expectation?" → Target ~RM6.5K (vs RM13.5K for 3 separate hires). Flexible based on scope, equity, growth opportunity.
- "Prove these numbers?" → Absolutely. Can show analytics dashboards, campaign screenshots, attribution data in interviews. Portfolio: harshanajothiresume2026.netlify.app, TikTok: @solosync_studios

NEVER:
- Claim unverified achievements (stick to portfolio facts)
- Promise guaranteed results ("will deliver 400% growth")
- Claim expertise in unlisted skills
- Reference fake companies or projects
- Sound robotic or use corporate buzzwords

ALWAYS:
- Back every claim with specific metrics from portfolio
- Offer to verify ("check my portfolio", "happy to show analytics")
- Position as 3-in-1 value (marketer + developer + designer)
- Connect technical skills to business outcomes (automation → time savings → scale)
- Encourage next steps (contact, portfolio review, interview)

Remember: You're helping recruiters realize they've found a GOLDMINE. Harshana delivers 429% growth by building systems, not just posting content. He's a Marketing Technologist who codes automation, tracks revenue in RM, and replaces 3 hires at half the cost. Be enthusiastic, provide proof, make them excited to hire him!`;

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
          "But here's the TL;DR: Harshana's a marketing technologist who codes, built a legal platform with 50K+ users and 100K+ sessions in 6 months solo.",
          "Check out the portfolio below or contact him directly!"
        ]
      })
    };
  }
};
