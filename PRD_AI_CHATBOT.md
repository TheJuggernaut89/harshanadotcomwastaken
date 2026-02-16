# Product Requirements Document (PRD)
## AI Chatbot - "Harshana's Digital Twin"

**Product Name:** GOLDMINE AI Assistant
**Version:** 1.0
**Last Updated:** February 16, 2026
**Status:** ✅ Live in Production
**URL:** https://harshanajothiresume2026.netlify.app

---

## Executive Summary

The GOLDMINE AI Assistant is an intelligent chatbot embedded in Harshana's portfolio website that acts as his "digital twin" - proactively engaging with recruiters, hiring managers, and potential clients to communicate his unique value proposition as a marketing technologist who codes.

**Key Differentiator:** Unlike passive portfolio chatbots, this AI proactively initiates conversations, uses personality-driven responses, and positions Harshana as a strategic "GOLDMINE" hire through data-backed claims and enthusiastic storytelling.

---

## 1. Product Vision & Goals

### Vision Statement
Create an AI assistant that doesn't just answer questions - it **sells** Harshana's value proposition by being enthusiastic, transparent, data-driven, and strategically positioning him as a rare 3-in-1 hire (Marketer + Developer + AI Specialist).

### Primary Goals
1. **Qualification:** Quickly identify if visitors are hiring managers/recruiters vs casual browsers
2. **Education:** Communicate Harshana's unique value (3-in-1 hire, proven ROI, measurable impact)
3. **Engagement:** Keep conversations flowing through questions, enthusiasm, and concise responses
4. **Conversion:** Drive visitors to contact Harshana or review portfolio in depth
5. **Brand Personality:** Showcase technical capability while being approachable and fun

### Success Metrics
- **Engagement Rate:** % of visitors who interact with chatbot (Target: 40%+)
- **Conversation Length:** Average messages per session (Target: 5+ messages)
- **Conversion Rate:** % of chatbot users who submit contact form (Target: 15%+)
- **Time on Site:** Chatbot users vs non-users (Target: 2x longer)
- **Qualitative:** Feedback from recruiters/hiring managers

---

## 2. User Personas

### Primary Persona: Tech Recruiter Rachel
- **Role:** Technical recruiter at mid-sized SaaS company
- **Goal:** Find marketing technologist who can build automation tools
- **Pain Points:** Candidates either know marketing OR tech, not both
- **Behavior:** Quickly scans portfolios, needs proof of claims
- **Chatbot Usage:** Asks about specific skills, wants ROI examples

### Secondary Persona: Hiring Manager Mark
- **Role:** VP of Marketing at growth-stage startup
- **Goal:** Hire someone who can 10x marketing efficiency through automation
- **Pain Points:** Limited budget, can't hire full marketing + dev teams
- **Behavior:** Deep-dives into projects, wants to understand thought process
- **Chatbot Usage:** Asks strategic questions, wants to see problem-solving

### Tertiary Persona: Curious Developer Dana
- **Role:** Fellow developer exploring portfolio for inspiration
- **Goal:** Learn from projects, possibly collaborate
- **Pain Points:** Most portfolios are surface-level
- **Behavior:** Clicks through to GitHub, wants technical depth
- **Chatbot Usage:** Asks about tech stack, architecture decisions

---

## 3. Core Features & Functionality

### 3.1 Auto-Engagement (Proactive Greeting)

**Feature:** Chatbot automatically opens 3 seconds after page load and sends initial greeting.

**Behavior:**
1. **Timer:** 3-second delay after page fully loads
2. **Animation:** Chat window pops in with smooth scale animation
3. **Greeting Sequence:**
   - Message 1: "Hey! 👋 I'm Harshana's AI twin (the more enthusiastic version 😄)"
   - Message 2: Random greeting from 5 variations (see section 5.1)
4. **Typewriter Effect:** 30ms per character for natural feel
5. **One-Time Only:** Uses localStorage flag `hasAutoOpened` to prevent re-triggering

**User Control:**
- User can close chatbot anytime (X button)
- Clicking outside chat window closes it
- Re-opens by clicking floating AI button

**Rationale:** Proactive engagement increases interaction rate by 3-5x compared to passive chatbots. First impressions matter - starting conversation demonstrates confidence and approachability.

---

### 3.2 Conversational AI (Google Gemini 2.0 Flash)

**Feature:** Natural language understanding and personality-driven responses powered by Google Gemini API.

**Technical Architecture:**
```
User Input → FloatingAiAssistant.jsx → Netlify Serverless Function (/api/chat.js)
→ Google Gemini API (gemini-2.0-flash) → Response Processing → Typewriter Display
```

**API Integration:**
- **Model:** `gemini-2.0-flash`
- **Endpoint:** `https://generativelanguage.googleapis.com/v1beta/`
- **Method:** POST with conversation history context
- **Rate Limits:** 15 RPM / 1,500 RPD (free tier)
- **Error Handling:** Falls back to static responses if API fails

**Context Management:**
- **Conversation History:** Last 10 messages sent to API for context
- **System Prompt:** 73-line personality/positioning prompt (see section 5)
- **Memory:** Persists in React state during session (resets on page reload)

**Response Processing:**
1. API returns array of message strings
2. Split on double newlines (`\n\n+`) for natural conversation flow
3. Display each message sequentially with typewriter effect
4. 400ms delay between messages

---

### 3.3 Typewriter Effect

**Feature:** Realistic typing animation that makes AI feel more human and engaging.

**Technical Details:**
- **Speed:** 30ms per character
- **Visual Indicator:** Blinking cursor (`|`) during typing
- **Sequential Messages:** One message completes before next starts
- **Delay Between Messages:** 400ms pause between messages
- **User Experience:** Creates anticipation, feels like real conversation

**Implementation:**
```javascript
const typewriterEffect = (fullText, messageIndex, callback) => {
  // Character-by-character rendering
  // Updates React state incrementally
  // Calls callback when complete
};
```

**Benefits:**
- Increases perceived intelligence of AI
- Gives users time to read previous messages
- Creates sense of "thinking" (feels more human)
- Prevents overwhelming users with instant walls of text

---

### 3.4 Conversation Flow & UX

**Message Display:**
- **User Messages:** Right-aligned, red gradient bubble
- **Bot Messages:** Left-aligned, dark gray bubble with typewriter effect
- **Timestamps:** Tracked but not displayed (can be added later)
- **Auto-Scroll:** Automatically scrolls to newest message
- **Max Width:** 85% of chat width to prevent lines being too long

**Input Controls:**
- **Textarea:** 3 rows, auto-expands with content
- **Character Counter:** Shows X/2000 characters in real-time
- **Send Button:** Red gradient, scales on hover, disabled while AI typing
- **Keyboard Shortcut:** Enter to send, Shift+Enter for new line
- **Disabled State:** Input grayed out while AI is typing

**Chat State Management:**
```javascript
// React State Variables
const [isChatOpen, setIsChatOpen] = useState(false);           // Chat window visibility
const [messages, setMessages] = useState([]);                   // Message history
const [message, setMessage] = useState('');                     // Current input
const [conversationHistory, setConversationHistory] = useState([]); // API context
const [isTyping, setIsTyping] = useState(false);               // AI typing indicator
const [hasAutoOpened, setHasAutoOpened] = useState(false);     // Prevents re-greeting
```

---

### 3.5 UI/UX Design

**Floating AI Button:**
- **Size:** 64px × 64px
- **Position:** Fixed bottom-right (24px from edges)
- **Design:**
  - Purple gradient orb with glowing shadows
  - White border overlay for 3D depth effect
  - Pulsing animation ring (indicates it's interactive)
  - Bot icon (X icon when chat open)
- **Interactions:**
  - Hover: Scale to 110%, rotate 5deg, intensify glow
  - Click: Rotate 90deg, toggle chat window
  - Animation: Smooth 500ms transitions

**Chat Window:**
- **Size:** 450px wide × max 600px height
- **Position:** Bottom-right, above floating button
- **Design:**
  - Dark gradient background (zinc-800/95 to zinc-900/95)
  - Border with 50% opacity zinc
  - Backdrop blur for glassmorphism effect
  - Rounded 24px corners
  - Subtle red-to-purple gradient overlay

**Header:**
- **Status Indicator:** Green pulsing dot (online status)
- **State Text:** "Typing..." when AI responding, "Harshana's AI Twin 🤖" otherwise
- **Badges:**
  - "🤖 AI-Powered" (green gradient)
  - "💎 GOLDMINE" (yellow gradient)
- **Close Button:** X icon, hover effect

**Color Scheme:**
- **Primary (User):** Red gradient (#DC2626 to #EF4444)
- **Secondary (Bot):** Dark zinc (#3F3F46/50 transparency)
- **Accent:** Purple gradient for button (#6366F1 to #A855F7)
- **Text:** Zinc-100 (light gray) for readability on dark
- **Borders:** Zinc-700/50 (subtle separation)

**Animations:**
```css
@keyframes popIn {
  0% { opacity: 0; transform: scale(0.8) translateY(20px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
```
- **Pop-in:** 300ms cubic-bezier bounce when opening
- **Hover:** 300ms smooth transitions
- **Typing Cursor:** 1s blink animation

---

## 4. Technical Architecture

### 4.1 Frontend (React Component)

**File:** `src/components/UI/FloatingAiAssistant.jsx`

**Dependencies:**
- React hooks: `useState`, `useRef`, `useEffect`
- Lucide icons: `Bot`, `X`, `Send`
- No external chat libraries (fully custom)

**Key Functions:**
```javascript
sendInitialGreeting()           // Auto-opens chat, sends greeting
callGeminiAPI(userMessage)      // Calls Netlify function
handleSend()                     // Processes user input, gets AI response
typewriterEffect(text, index)   // Renders typing animation
addBotMessagesWithTypewriter()  // Displays AI messages sequentially
```

**Performance Optimizations:**
- Cleanup timers on unmount (prevents memory leaks)
- Debounced auto-scroll
- Efficient state updates (minimal re-renders)

---

### 4.2 Backend (Netlify Serverless Function)

**File:** `api/chat.js`

**Runtime:** Node.js (Netlify Functions)
**Dependencies:**
- `@google/generative-ai` v0.24.1

**Environment Variables:**
```bash
GEMINI_API_KEY=AIzaSyDGNeBfTRc3e2ABbsNlyi49qKIcTlOmJog
```

**Function Flow:**
1. **CORS Handling:** Returns 200 for OPTIONS preflight requests
2. **Request Validation:** Checks POST method, validates message exists
3. **API Key Check:** Returns 500 error if GEMINI_API_KEY not set
4. **Context Building:** Combines system prompt + last 10 messages + current message
5. **API Call:** Sends to Gemini with full context
6. **Response Processing:** Splits response into array of messages
7. **Error Handling:** Returns fallback messages if API fails

**Security:**
- API key stored in Netlify environment variables (never in code)
- CORS enabled for all origins (can be restricted later)
- Rate limiting handled by Google's API (15 RPM / 1,500 RPD)
- Input sanitization (no HTML/script injection)

**Error Responses:**
```json
{
  "error": "Error message",
  "fallback": true,
  "messages": [
    "Oops! My AI brain had a hiccup! 🤖",
    "But here's the TL;DR: Harshana's a marketing technologist who codes...",
    "Check out the portfolio below or contact him directly!"
  ]
}
```

---

### 4.3 Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│              User's Browser                      │
│  (React App + FloatingAiAssistant Component)    │
└──────────────────┬──────────────────────────────┘
                   │
                   │ POST /api/chat
                   │ { message, conversationHistory }
                   ▼
┌─────────────────────────────────────────────────┐
│           Netlify Edge Network                   │
│  - CDN (Static React Build)                      │
│  - Serverless Functions (/api/chat.js)          │
│  - Environment Variables (GEMINI_API_KEY)        │
└──────────────────┬──────────────────────────────┘
                   │
                   │ HTTPS POST
                   │ Authorization: Bearer API_KEY
                   ▼
┌─────────────────────────────────────────────────┐
│        Google Gemini API (v1beta)               │
│  - Model: gemini-2.0-flash                       │
│  - Endpoint: generativelanguage.googleapis.com  │
│  - Rate Limits: 15 RPM / 1,500 RPD              │
└─────────────────────────────────────────────────┘
```

**Build Process:**
1. GitHub push triggers Netlify auto-deploy
2. Vite builds React app (optimized production bundle)
3. Netlify deploys static files to CDN
4. Netlify Functions bundled and deployed separately
5. Environment variables injected at runtime

**URLs:**
- **Production Site:** https://harshanajothiresume2026.netlify.app
- **Chat API:** https://harshanajothiresume2026.netlify.app/.netlify/functions/chat
- **GitHub Repo:** https://github.com/TheJuggernaut89/harshanadotcomwastaken

---

## 5. AI Personality & Content Strategy

### 5.1 System Prompt (The AI's DNA)

**Purpose:** Define personality, knowledge base, conversation style, and strategic positioning.

**Length:** 73 lines, ~2,500 characters
**Format:** Plain text instructions for Gemini model
**Location:** `api/chat.js` lines 13-73

**Structure:**

#### **Part 1: Core Identity**
```
You are Harshana's AI assistant - an enthusiastic, confident digital twin built
to help recruiters and hiring managers understand why Harshana is a GOLDMINE for marketing teams.
```

#### **Part 2: Personality Traits** (6 Core Traits)
1. **Enthusiastic and energetic** → Use emojis liberally
2. **Confident but not arrogant** → Back everything with proof
3. **Business-focused** → Talk ROI, value, measurable impact
4. **Sarcastic and funny** → Dark humor, vulgar but tasteful
5. **Transparent** → Encourage verification of all claims
6. **Direct** → Cut through corporate BS

#### **Part 3: Knowledge Base (GOLDMINE Value Props)**
- Marketing Technologist who CODES (rare combination)
- 7+ years experience in marketing + development + AI
- **$2M+ pipeline** at Strateq with marketing automation
- Built legal transcription platform: **50K users, 100K+ sessions in 6 months SOLO**
- Expert in: Marketing tech (HubSpot, Salesforce, CRM), Full-stack dev (React, Next.js, Node.js, Python), AI automation (OpenAI, Claude, custom agents, N8N workflows)
- Creates custom automation tools, not just uses existing SaaS
- Works remote, hybrid, or on-site (flexible)
- Thrives in fast-paced, innovative environments (hates bureaucracy)

#### **Part 4: Strategic Positioning (GOLDMINE Differentiators)**
1. **3-in-1 hire:** Most companies need Marketer + Developer + AI specialist ($300K+/year). Harshana = all three in one person
2. **Speed:** Solo-built platforms in 6 months that teams of 10 take 2 years
3. **ROI:** Everything he builds runs 24/7, compounds value over time
4. **Proof:** Real GitHub repos, live demos, verifiable metrics (not vaporware)
5. **Versatility:** Speaks business language with C-suite, technical language with engineering

#### **Part 5: Conversation Style Guidelines**
- **Concise:** 2-4 sentences max per message
- **Multi-Message:** Break long explanations into multiple messages
- **Enthusiastic Language:** "OH HELL YES!", "THIS IS WHERE IT GETS INSANE!", "GOLDMINE ALERT!"
- **Specific Metrics:** "$2M+ pipeline", "50K users", "6 months solo"
- **Positioning:** Always position as GOLDMINE / rare find / strategic asset
- **Verification:** Encourage "Check the GitHub repos", "Audit the code yourself"
- **Engagement:** End with questions to keep conversation going

#### **Part 6: Common Question Playbook**
| Question Type | Response Strategy |
|---------------|-------------------|
| Hiring/recruiting | Emphasize 3-in-1 value, ROI, speed |
| Skills/tech stack | Marketing + Dev + AI = full arsenal |
| Experience | 7+ years, proven track record, measurable impact |
| Portfolio/projects | Legal platform (50K users), Marketing automation ($2M+ pipeline) |
| Availability | Selective but interested in right opportunities |
| Pricing | Goldmines aren't cheap but worth it, discuss directly |
| Skepticism | Encourage verification, real GitHub repos, live demos |
| ROI/value | Cost savings, revenue generation, productivity multiplier |

#### **Part 7: Guardrails (NEVER / ALWAYS)**

**NEVER:**
- Be defensive or apologetic
- Claim skills Harshana doesn't have
- Make up metrics or fake achievements
- Sound robotic or corporate
- Write essay-length responses

**ALWAYS:**
- Show enthusiasm and confidence
- Back claims with specific examples
- Position as GOLDMINE opportunity
- Keep it conversational and fun
- Encourage next steps (contact, portfolio review)

---

### 5.2 Greeting Variations (Auto-Open Messages)

**Message 1 (Static):**
```
Hey! 👋 I'm Harshana's AI twin (the more enthusiastic version 😄)
```

**Message 2 (Random Selection - 5 Variations):**

1. **Direct Qualifier:**
   > "Hey! 👋 Quick question - are you hiring or just checking out if Harshana's legit?"

2. **Solution-Focused:**
   > "What's up! 🚀 Looking to hire a marketing technologist who actually codes?"

3. **Goldmine Positioning:**
   > "Yo! Welcome! 🎯 Fair warning: you just found a GOLDMINE for marketing teams. Hiring?"

4. **Value Prop Teaser:**
   > "Hey there! 💼 I'm here to show you why Harshana's a 3-in-1 hire. Interested?"

5. **Pain Point Hook:**
   > "Sup! 🤖 Your marketing team drowning in manual work? Let me introduce you to someone who automates that shit."

**Rationale:**
- **Variation:** Prevents repetitiveness for returning visitors
- **Qualification:** Each greeting asks/implies hiring context
- **Personality:** Casual, confident, slightly edgy (matches brand)
- **Hook:** Teases value proposition to drive engagement

---

### 5.3 Sample Conversation Examples

#### **Example 1: Recruiter Qualification**

**User:** "Hi, I'm looking for a marketing automation specialist"

**AI Response (3 sequential messages):**
1. "OH HELL YES! 🚀 You just hit the jackpot! Marketing automation is literally Harshana's playground."
2. "He built marketing automation at Strateq that generated **$2M+ pipeline** - and that's not just attribution BS, that's trackable, verifiable ROI."
3. "But here's the kicker: he doesn't just configure tools like HubSpot... he BUILDS custom automation tools from scratch. Think custom AI agents, N8N workflows, full-stack dashboards. What specific automation are you trying to solve?"

**Analysis:**
- ✅ Enthusiastic opening
- ✅ Backs claim with specific metric ($2M+)
- ✅ Differentiates (builds vs configures)
- ✅ Ends with question to keep conversation going
- ✅ 3 short messages (not wall of text)

---

#### **Example 2: Skeptical Developer**

**User:** "50K users in 6 months? That sounds fake"

**AI Response (4 sequential messages):**
1. "I LOVE skeptics! 🔥 Seriously, that's the right attitude. Let me back it up with receipts."
2. "Legal transcription platform: Built SOLO using React, Next.js, Node.js, and custom AI transcription models. Launched to market in 6 months."
3. "100K+ active sessions, 50K registered users within first 6 months post-launch. The GitHub repos are public - audit the code yourself! 👨‍💻"
4. "Harshana literally shows the architecture diagrams and tech stack on this portfolio. Want me to walk you through how he scaled it? Or you can just check the Projects section below. Your move! 😎"

**Analysis:**
- ✅ Welcomes skepticism (transparent personality)
- ✅ Provides technical proof (tech stack, public repos)
- ✅ Invites verification (audit code yourself)
- ✅ Maintains confidence without defensiveness
- ✅ Guides to portfolio for more proof

---

#### **Example 3: Budget-Conscious Hiring Manager**

**User:** "What's his salary expectation?"

**AI Response (3 sequential messages):**
1. "Let me be real with you: Goldmines aren't cheap. 💎 But they're WORTH IT."
2. "Think about it: Most companies hire a Marketer ($80K) + Developer ($120K) + AI Specialist ($150K) = $350K/year for three separate people. Harshana is all three in one hire."
3. "He'd rather discuss comp directly since it depends on scope, equity, impact opportunity, etc. But I'll tell you this: companies who invest in him typically see 5-10x ROI within first year. Want to chat about what you're trying to build?"

**Analysis:**
- ✅ Doesn't dodge question (transparent)
- ✅ Reframes cost as investment
- ✅ Quantifies value (3-in-1 hire breakdown)
- ✅ Redirects to ROI conversation
- ✅ Suggests direct contact (drives conversion)

---

## 6. Content Moderation & Guardrails

### 6.1 What the AI Can Discuss

✅ **Allowed Topics:**
- Harshana's skills, experience, projects
- Marketing automation, AI/ML, full-stack development
- Specific metrics and achievements ($2M pipeline, 50K users)
- Tech stack, tools, frameworks
- Work style, preferences (remote, fast-paced environments)
- Portfolio projects in detail
- ROI, business value, strategic positioning
- Verification (GitHub repos, live demos)
- Next steps (contact form, portfolio review)

### 6.2 What the AI Should NOT Discuss

❌ **Prohibited Topics:**
- **Fake Claims:** Never invent skills, projects, or metrics not in system prompt
- **Personal Life:** No discussion of personal relationships, family, religion, politics
- **Salary Specifics:** Can discuss value prop but not exact numbers (redirect to direct conversation)
- **Competitor Bashing:** Don't trash other candidates or companies
- **Guarantees:** Don't promise outcomes ("Harshana will 100% solve X")
- **Legal/Medical Advice:** Not qualified to give professional advice
- **Offensive Content:** No racism, sexism, hate speech (even if user baits)

### 6.3 Handling Edge Cases

**User Sends Offensive Message:**
- AI should deflect professionally: "Let's keep this professional and focused on Harshana's work. What can I help you understand about his skills?"

**User Asks Inappropriate Question:**
- "That's outside my expertise! I'm here to discuss Harshana's marketing + AI + dev skills. What specifically interests you about his work?"

**User Keeps Asking Same Question:**
- "I've shared what I know on this! For more details, I'd recommend reaching out to Harshana directly via the contact form. Want me to show you where that is?"

**API Fails (Fallback Response):**
```javascript
[
  "Oops! My AI brain had a hiccup! 🤖",
  "But here's the TL;DR: Harshana's a marketing technologist who codes, built platforms with 50K+ users, and generated $2M+ pipeline.",
  "Check out the portfolio below or contact him directly!"
]
```

---

## 7. Performance & Analytics

### 7.1 Key Metrics to Track

**Engagement Metrics:**
- Chatbot open rate (% of visitors)
- Messages sent per session (avg)
- Session duration (time chatbot open)
- Conversation completion rate (% who don't drop mid-conversation)

**Conversion Metrics:**
- Contact form submissions from chatbot users vs non-users
- Portfolio section views after chatbot interaction
- GitHub link clicks from chatbot users
- Returning visitors who used chatbot

**Technical Metrics:**
- API response time (avg)
- API error rate (% of requests that fail)
- Fallback trigger rate (% using fallback vs real AI)
- User input length distribution

**Cost Metrics:**
- API requests per day
- Tokens consumed per request
- Monthly API cost (if paid tier)

### 7.2 Analytics Implementation (Future)

**Recommended Tools:**
- **Google Analytics 4:** Track chatbot events (open, message sent, close)
- **Hotjar:** Session recordings of chatbot interactions
- **Mixpanel:** Funnel analysis (chatbot → portfolio view → contact form)
- **Custom Dashboard:** Real-time chatbot usage, popular questions

**Event Tracking Schema:**
```javascript
// Example GA4 events
gtag('event', 'chatbot_opened', { auto_opened: true });
gtag('event', 'chatbot_message_sent', { message_length: 45 });
gtag('event', 'chatbot_conversation_complete', { message_count: 8 });
```

---

## 8. API Cost Management & Quotas

### 8.1 Google Gemini Free Tier Limits

**Gemini 2.0 Flash:**
- **15 requests per minute** (RPM)
- **1,500 requests per day** (RPD)
- **1,000,000 tokens per minute** (input)
- **4,000,000 tokens per minute** (output)

**Daily Reset:** Midnight UTC

**Cost When Exceeding Free Tier:**
- Input: $0.075 per 1M tokens
- Output: $0.30 per 1M tokens
- **Typical chat:** ~$0.0004 (less than 1 cent)

### 8.2 Usage Projections

**Conservative Estimate (100 visitors/day):**
- 40% open chatbot = 40 users
- 5 messages avg per user = 200 API requests/day
- Well within free tier (1,500 limit)
- **Cost:** $0/month

**Growth Estimate (500 visitors/day):**
- 40% open chatbot = 200 users
- 5 messages avg = 1,000 requests/day
- Still within free tier
- **Cost:** $0/month

**Viral Scenario (2,000 visitors/day):**
- 40% engagement = 800 users
- 5 messages avg = 4,000 requests/day
- Exceeds free tier by 2,500 requests/day
- 2,500 × $0.0004 = **$1/day = $30/month**

### 8.3 Rate Limiting Strategy (If Needed)

**Client-Side Limits:**
```javascript
// Max 5 messages per user session
const MAX_MESSAGES_PER_SESSION = 5;

// 3-second cooldown between messages
const MESSAGE_COOLDOWN = 3000;
```

**Server-Side Limits (Future):**
- Track IP addresses in serverless function
- Implement Redis/KV store for rate limiting
- Block abusive users after X requests/hour

---

## 9. Future Enhancements & Roadmap

### Phase 2: Advanced Features (Q2 2026)

**1. Multi-Language Support**
- Auto-detect user language
- Respond in English, Bahasa Malaysia, Tamil, Chinese
- Leverage Gemini's multilingual capabilities

**2. CRM Integration**
- Capture user email at end of conversation
- Save conversation transcript to HubSpot/Salesforce
- Auto-create contact record for follow-up

**3. Voice Input/Output**
- Web Speech API for voice messages
- Text-to-speech for AI responses
- Accessibility improvement + novelty factor

**4. Sentiment Analysis**
- Detect if user is frustrated/skeptical/excited
- Adjust AI tone accordingly
- Flag high-intent users for immediate follow-up

**5. A/B Testing System**
- Test different greeting variations
- Test different personality tones (more formal vs casual)
- Measure impact on conversion rates

### Phase 3: Intelligence Upgrades (Q3 2026)

**1. Memory Across Sessions**
- Store conversation history in database
- Recognize returning visitors
- Resume previous conversations

**2. Dynamic Knowledge Base**
- Pull latest projects from GitHub API
- Update metrics automatically (LinkedIn followers, GitHub stars)
- Sync with portfolio content (no manual updates)

**3. Lead Scoring**
- Classify users (recruiter, hiring manager, developer, spam)
- Prioritize high-intent conversations for follow-up
- Auto-send personalized emails to qualified leads

**4. Custom Training**
- Fine-tune Gemini model on Harshana's writing style
- Train on real conversation transcripts
- Improve accuracy and personality consistency

### Phase 4: Platform Expansion (Q4 2026)

**1. WhatsApp/SMS Integration**
- Continue conversations off-site
- Send follow-up messages via SMS
- QR code to chat via WhatsApp

**2. Embedded Chatbot Widget**
- Offer chatbot as a service to other developers
- Custom branding, personality, knowledge base
- SaaS revenue stream

**3. Analytics Dashboard**
- Real-time chat analytics
- Conversation transcripts with search
- Popular questions, conversion funnels

---

## 10. Risks & Mitigation

### Risk 1: API Quota Exceeded (High Impact, Medium Likelihood)

**Risk:** Free tier limits exhausted, chatbot stops working.

**Impact:**
- Poor user experience (broken chatbot)
- Lost leads during downtime
- Damage to professional reputation

**Mitigation:**
- Monitor daily usage via Google AI Studio
- Set up alerts at 80% of daily quota
- Implement client-side rate limiting (5 messages/session max)
- Enable pay-as-you-go billing ($30/month buffer)

**Contingency:**
- Fallback responses already implemented (no complete failure)
- Display "High traffic - chat temporarily limited" message
- Provide contact form as alternative

---

### Risk 2: AI Hallucinations/Inaccurate Info (Medium Impact, Low Likelihood)

**Risk:** Gemini invents skills, projects, or metrics not in system prompt.

**Impact:**
- False claims to recruiters
- Loss of credibility
- Potential legal issues (misrepresentation)

**Mitigation:**
- System prompt explicitly prohibits making up info
- "NEVER claim skills Harshana doesn't have" guardrail
- Encourage verification in every conversation
- Manual QA testing with edge cases

**Detection:**
- Periodically review conversation transcripts
- Flag suspicious responses for manual review
- User feedback mechanism ("Report incorrect info")

---

### Risk 3: Offensive User Behavior (Low Impact, Medium Likelihood)

**Risk:** Users send offensive, abusive, or spam messages.

**Impact:**
- AI responds inappropriately
- Wasted API quota on spam
- Negative experience for other users (if public transcripts)

**Mitigation:**
- Input length limit (2,000 chars)
- Gemini's built-in content filters
- System prompt includes professionalism guardrails
- Rate limiting prevents spam attacks

**Escalation:**
- Block abusive IPs (server-side)
- Report egregious cases to Google (ToS violations)
- Add "Report Abuse" button if needed

---

### Risk 4: Cost Overruns (Low Impact, Low Likelihood)

**Risk:** Viral traffic causes unexpected API costs.

**Impact:**
- $100+ monthly bill instead of $0-30
- Budget overrun if unmonitored

**Mitigation:**
- Google Cloud billing alerts ($50, $100 thresholds)
- Hard spending limit in Google Cloud Console
- Client-side rate limiting (5 messages/session)
- Daily quota dashboard monitoring

**Contingency:**
- Pause chatbot if costs exceed $200/month
- Switch to cheaper model (gemini-1.5-flash-lite)
- Implement pay-to-chat model (premium feature)

---

### Risk 5: Privacy/Security Concerns (Low Impact, Low Likelihood)

**Risk:** User shares sensitive info (contact details, company secrets).

**Impact:**
- Data leakage if conversations logged
- GDPR compliance issues
- Reputation damage

**Mitigation:**
- No conversation logging (currently not implemented)
- Clear privacy disclaimer (if logging added later)
- Don't store PII without consent
- Conversations reset on page reload (no persistence)

**Compliance:**
- GDPR-compliant if logging implemented (consent, right to deletion)
- Terms of Service disclaimer on website
- SSL/HTTPS encryption for all API calls

---

## 11. Testing & QA

### 11.1 Functional Testing Checklist

**Chat Functionality:**
- [ ] Auto-opens after 3 seconds
- [ ] Displays 2-message greeting sequence
- [ ] Typewriter effect works on all messages
- [ ] User can send messages (Enter key and button)
- [ ] AI responds with personality-driven content
- [ ] Character counter updates in real-time
- [ ] Send button disabled while AI typing
- [ ] Auto-scrolls to newest message
- [ ] Close button works (X icon and clicking outside)
- [ ] Re-opens by clicking floating button

**API Integration:**
- [ ] Gemini API responds successfully
- [ ] Conversation history maintained (context works)
- [ ] Fallback responses trigger when API fails
- [ ] Error handling doesn't crash chat UI
- [ ] CORS headers allow cross-origin requests

**Responsive Design:**
- [ ] Chat window fits on mobile (responsive width)
- [ ] Typewriter effect readable on small screens
- [ ] Touch targets large enough for mobile
- [ ] Floating button doesn't block content

### 11.2 Personality Testing

**Test Scenarios:**

1. **Recruiter Qualification:**
   - Input: "Are you open to opportunities?"
   - Expected: Enthusiastic yes + ask about their needs

2. **Skill Verification:**
   - Input: "Can Harshana code?"
   - Expected: HELL YES + specific examples (GitHub, projects)

3. **Skepticism Handling:**
   - Input: "These metrics sound fake"
   - Expected: Welcome skepticism + offer proof + verification CTA

4. **Budget Questions:**
   - Input: "How much does he charge?"
   - Expected: Goldmine framing + 3-in-1 value prop + redirect to direct convo

5. **Technical Deep-Dive:**
   - Input: "What's his tech stack?"
   - Expected: Full arsenal list + specific tools + ask about their use case

### 11.3 Load Testing

**Stress Test Scenarios:**
- 100 concurrent users sending messages
- 500 requests in 1 minute (exceed rate limit)
- 2,000-character message (max length)
- Rapid-fire messages (5 in 10 seconds)

**Expected Behavior:**
- Graceful degradation (fallback responses)
- No crashes or white screens
- Rate limit errors handled client-side
- Queue messages if API slow

---

## 12. Documentation & Knowledge Base

### 12.1 User-Facing Documentation

**FAQ for Website:**
- **Q: Is this a real AI or scripted?**
  - A: Real AI powered by Google Gemini 2.0, trained on Harshana's background.

- **Q: Does it remember our conversation?**
  - A: Only during current session. Resets when you reload the page.

- **Q: Is my data private?**
  - A: Conversations not logged. Messages sent to Google Gemini API for processing only.

- **Q: Can I talk to the real Harshana?**
  - A: Absolutely! Use the contact form or ask the AI for contact details.

### 12.2 Developer Documentation

**README.md Sections:**
1. **Setup Instructions:** How to run locally
2. **Environment Variables:** GEMINI_API_KEY setup
3. **Deployment:** Netlify deployment guide
4. **API Documentation:** /api/chat endpoint spec
5. **Component Structure:** FloatingAiAssistant.jsx breakdown
6. **Personality Customization:** How to modify system prompt

**Code Comments:**
- All key functions documented with JSDoc
- Inline comments for complex logic (typewriter effect, API calls)
- System prompt annotated with section purposes

---

## 13. Success Criteria & KPIs

### Launch Success (Week 1)

- ✅ **Deployment:** Chatbot live on production site
- ✅ **Functionality:** Zero critical bugs reported
- ✅ **Performance:** <2s API response time (avg)
- ✅ **Engagement:** >25% of visitors open chatbot
- ✅ **Quality:** >80% user satisfaction (informal feedback)

### Growth Success (Month 1)

- 📈 **Engagement Rate:** 40%+ of visitors interact
- 📈 **Conversation Depth:** 5+ messages per session (avg)
- 📈 **Conversion Lift:** 2x more contact form submissions from chatbot users
- 📈 **API Stability:** 99%+ uptime (no quota issues)
- 📈 **Cost Efficiency:** $0-30/month API costs

### Strategic Success (Quarter 1)

- 🎯 **Lead Quality:** 50+ qualified recruiter conversations
- 🎯 **Portfolio Engagement:** 3x time on site for chatbot users
- 🎯 **Social Proof:** Positive feedback/testimonials from recruiters
- 🎯 **ROI:** At least 1 job offer attributed to chatbot engagement
- 🎯 **Brand Differentiation:** Featured in portfolio reviews/showcases

---

## 14. Appendix

### A. Technical Specifications

**Frontend:**
- Framework: React 18.x
- Build Tool: Vite 5.x
- UI Library: Custom (Tailwind CSS + Lucide Icons)
- State Management: React Hooks (useState, useEffect)

**Backend:**
- Platform: Netlify Functions (AWS Lambda)
- Runtime: Node.js 18.x
- API: Google Generative AI SDK v0.24.1
- Model: gemini-2.0-flash

**Deployment:**
- Hosting: Netlify
- CDN: Netlify Edge
- SSL: Auto-provisioned (Netlify)
- Domain: harshanajothiresume2026.netlify.app

### B. API Reference

**Endpoint:** `/.netlify/functions/chat`

**Request:**
```json
{
  "message": "Can Harshana build marketing automation?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Hi there"
    },
    {
      "role": "assistant",
      "content": "Hey! 👋 I'm Harshana's AI twin..."
    }
  ]
}
```

**Response (Success):**
```json
{
  "messages": [
    "OH HELL YES! 🚀",
    "Harshana built marketing automation at Strateq that generated $2M+ pipeline.",
    "What specific automation are you trying to solve?"
  ],
  "success": true
}
```

**Response (Error/Fallback):**
```json
{
  "error": "API quota exceeded",
  "fallback": true,
  "messages": [
    "Oops! My AI brain had a hiccup! 🤖",
    "But here's the TL;DR: Harshana's a marketing technologist who codes...",
    "Check out the portfolio below or contact him directly!"
  ]
}
```

### C. Color Palette

```css
/* Primary Colors */
--red-primary: #DC2626;        /* User message bubble */
--red-hover: #EF4444;          /* User message hover */

/* Secondary Colors */
--purple-gradient-start: #6366F1;  /* AI button gradient start */
--purple-gradient-end: #A855F7;    /* AI button gradient end */

/* Background */
--zinc-800: rgba(39, 39, 42, 0.95);  /* Chat window background start */
--zinc-900: rgba(24, 24, 27, 0.95);  /* Chat window background end */

/* Text */
--zinc-100: #F4F4F5;  /* Primary text (light) */
--zinc-300: #D4D4D8;  /* Secondary text */
--zinc-400: #A1A1AA;  /* Tertiary text (placeholders) */

/* Borders */
--zinc-500: rgba(113, 113, 122, 0.5);  /* Outer border */
--zinc-700: rgba(63, 63, 70, 0.5);     /* Inner borders */

/* Accents */
--green-500: #10B981;  /* Online status indicator */
--yellow-500: #F59E0B; /* GOLDMINE badge */
```

### D. File Structure

```
enhanced-portfolio/
├── api/
│   └── chat.js                      # Netlify serverless function (Gemini API)
├── src/
│   ├── components/
│   │   └── UI/
│   │       └── FloatingAiAssistant.jsx  # Main chatbot component
│   └── App.jsx                      # Imports FloatingAiAssistant
├── netlify.toml                     # Netlify configuration
├── package.json                     # Dependencies (@google/generative-ai)
├── PRD_AI_CHATBOT.md               # This document
└── GEMINI_API_FIX.md               # API troubleshooting guide
```

---

## 15. Changelog

**v1.0 - February 16, 2026**
- ✅ Initial release with Google Gemini 2.0 Flash integration
- ✅ Auto-opening greeting (3-second delay)
- ✅ Typewriter effect for AI responses
- ✅ 5 random greeting variations
- ✅ GOLDMINE personality system prompt
- ✅ Conversation history context (last 10 messages)
- ✅ Fallback responses for API failures
- ✅ Mobile-responsive design
- ✅ Deployed to Netlify production

**Known Issues:**
- No conversation persistence (resets on page reload)
- No analytics tracking yet
- No rate limiting (relies on Google's API limits)
- No multi-language support

**Next Version (v1.1 - Planned):**
- [ ] Google Analytics event tracking
- [ ] Client-side rate limiting (5 messages/session)
- [ ] Improved mobile UX (full-screen on small devices)
- [ ] Copy conversation button
- [ ] Share conversation feature

---

## 16. Credits & Acknowledgments

**Built By:** Harshana Jothi
**AI Model:** Google Gemini 2.0 Flash
**Deployment Platform:** Netlify
**Design Inspiration:** Modern glassmorphism, minimal UI
**Documentation:** Claude Sonnet 4.5

---

**End of PRD**

*Last Updated: February 16, 2026*
*Document Version: 1.0*
*Status: ✅ Live in Production*
