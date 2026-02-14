# Product Requirements Document (PRD)
## Harshana Jothi - Marketing Technologist Portfolio

**Version:** 2.0
**Date:** February 15, 2026
**Status:** Production - Active Deployment
**Live URL:** https://harshanajothiresume2026.netlify.app
**GitHub:** https://github.com/TheJuggernaut89/harshanadotcomwastaken.git

---

## 📋 Executive Summary

A next-generation interactive portfolio website designed to position Harshana Jothi as a "GOLDMINE" 3-in-1 hire: Marketing Technologist who codes, designs, and strategizes. The portfolio leverages AI-powered chatbot assistance, immersive animations, and data-driven storytelling to convert recruiters and hiring managers into conversations.

**Core Value Proposition:**
Transform passive portfolio browsing into active engagement through AI-assisted navigation, proving technical + marketing + creative capabilities in one seamless experience.

**Key Differentiator:**
While most portfolios are static resumes, this is an interactive marketing system that demonstrates the exact skills being sold—automation, AI integration, conversion optimization, and technical execution.

---

## 🎯 Problem Statement

### Current Pain Points in Traditional Portfolios:

1. **Passive Experience**: Static pages that don't engage or guide the visitor
2. **Information Overload**: Too much content, no clear navigation path
3. **Trust Gap**: Claims without proof (no interactive demos or live systems)
4. **Generic Positioning**: "Marketing manager" or "developer" - not unique
5. **No Conversion Tracking**: No way to know what resonates with visitors
6. **Mobile Unfriendly**: Complex portfolios break on mobile devices
7. **Slow Load Times**: Heavy images/videos kill engagement
8. **No Personalization**: Same experience for recruiters vs clients vs collaborators

### Target Audience:

- **Primary**: Hiring managers at tech companies, marketing agencies, startups
- **Secondary**: Recruiters, HR departments, talent acquisition teams
- **Tertiary**: Potential clients, business partners, collaborators

### User Personas:

**Persona 1: Tech Startup Hiring Manager (Alex)**
- Age: 32-45
- Challenge: Need someone who can do marketing AND build the tech stack
- Pain: Hiring 3 separate people costs RM 13,500/month + management overhead
- Goal: Find a "unicorn" marketer who codes
- Success: Convinced within 2 minutes that Harshana = 3 roles in 1

**Persona 2: Agency Recruiter (Sarah)**
- Age: 28-38
- Challenge: Screening 50+ candidates/week, needs quick evaluation
- Pain: Resumes all look the same, can't verify claims
- Goal: Identify standout talent fast
- Success: Portfolio AI chatbot answers all screening questions in real-time

**Persona 3: Marketing Director (David)**
- Age: 35-50
- Challenge: Marketing team drowning in manual work, needs automation
- Pain: Current team doesn't understand technical implementation
- Goal: Hire someone who can build revenue attribution systems
- Success: Sees proof of technical capability (live demos, GitHub, metrics)

---

## ✨ Core Features & User Journey

### **Complete User Journey:**

```
Landing (Intro Animation) → AI Chatbot Auto-Opens →
Hero Section (GOLDMINE Positioning) → Value Prop (3-in-1 Hire) →
Approach (How I Work) → About (Bento Grid) → Artwork Banner →
Skills (Interactive Timeline) → Journey (Case Studies) →
Projects (Portfolio Showcase) → Malaysian Platform (Side Project) →
AI Workforce (Tools Built) → Workflows (Automation Systems) →
Contact (Call to Action)
```

### **Feature Breakdown:**

---

#### **1. AI-Powered Assistant (FloatingAiAssistant)**

**What it does:**
- Auto-opens after 3 seconds with personalized greeting
- Uses Google Gemini AI for intelligent, context-aware responses
- Maintains conversation history for natural flow
- Typewriter effect (30ms/char) for human-like typing
- Positions Harshana as "GOLDMINE" 3-in-1 hire in every response

**Why it matters:**
- Guides visitors through portfolio like a personal tour guide
- Answers common screening questions instantly (saves recruiter time)
- Demonstrates AI integration capability (proof of technical skill)
- Increases engagement from passive viewing to active conversation
- Converts curiosity into conversation

**System Prompt Personality:**
- Enthusiastic, confident (not arrogant)
- Business-focused (ROI, value, measurable impact)
- Sarcastic, funny, dark humor (vulgar but tasteful)
- Backs every claim with specific examples and metrics
- Encourages verification (GitHub repos, live demos)

**Key Metrics Tracked:**
- $2M+ pipeline generated at Strateq
- 50K users, 100K+ sessions on legal transcription platform
- 7+ years combined experience (marketing + dev + AI)
- 429% Facebook growth, 178% Instagram growth
- 200+ posts/month delivered solo using automation

**Example Conversations:**
```
User: "Can Harshana code?"
AI: "OH HELL YES! 🚀 He built a legal transcription platform SOLO that hit 50K users in 6 months. We're talking React, Node.js, Python, n8n automation, API integrations. Check the GitHub repos—everything's verifiable. He doesn't just 'know how to code,' he ships production systems."

User: "What's his hourly rate?"
AI: "💎 GOLDMINE pricing: You'd pay RM 13,500/month for 3 separate people (marketer + dev + designer). Harshana = all three in one person. ROI is insane because everything he builds runs 24/7 and compounds value. Want specific numbers? Let's schedule a call."
```

**Technical Implementation:**
- Frontend: React component with typewriter animation
- Backend: Netlify serverless function (`api/chat.js`)
- AI Model: Google Gemini Pro (free tier: 60 req/min, 1500 req/day)
- Environment: GEMINI_API_KEY stored in Netlify env variables
- CORS: Configured in `netlify.toml`

---

#### **2. Hero Section (Hero-MarketingTechnologist)**

**What it does:**
- Animated text introduction: "Marketing Technologist", "Revenue Systems Builder", "Growth Engineer"
- Bold tagline: "I build marketing systems that drive measurable revenue"
- Clear positioning: "Most marketers can't code. Most developers don't understand marketing. I bridge that gap."
- Parallax background effects
- CTA buttons: "View Work", "Get in Touch"

**Why it matters:**
- First impression = most critical 3 seconds
- Instantly communicates unique value proposition
- Sets expectation: This is NOT a typical portfolio

**Key Stats Displayed:**
- 429% Facebook Growth
- 178% Instagram Growth
- 5+ Platforms Ready
- 6+ AI Tools Built

---

#### **3. Value Proposition Section**

**What it does:**
- Visual comparison: 3 separate hires vs 1 person
- Cost breakdown:
  - Social Media Manager: RM 5,500/month
  - Technical Developer: RM 4,500/month
  - Creative Designer: RM 3,500/month
  - **Total: RM 13,500/month**
  - **Harshana: RM 6,500/month = RM 7,000 savings + 0 management overhead**

**Why it matters:**
- Converts abstract value into concrete ROI
- Speaks the language of business (cost savings)
- Positions as strategic investment, not expense

**4 Core Differentiators:**
1. **I Build, Not Just Use** - Custom automation systems, AI tools, integrations
2. **Revenue, Not Just Engagement** - Attribution systems tracking social → sales
3. **3 Roles in 1 Person** - Marketer + Developer + Designer
4. **AI-Powered Efficiency** - 200+ posts/month solo using automation

---

#### **4. Approach Section**

**What it does:**
- Explains working methodology in 3 pillars:
  1. **Systems Builder** - Complete marketing systems with automation
  2. **Technical + Creative** - Rare combination of coding + design + strategy
  3. **Revenue-Focused** - Every campaign tracked from post to ringgit

**Why it matters:**
- Differentiates from "just a marketer" or "just a developer"
- Sets expectations for collaboration style
- Builds trust through transparency

---

#### **5. About Bento (AboutBento)**

**What it does:**
- Bento grid layout showcasing:
  - Personal story / background
  - Skills matrix (Technical, Creative, Marketing, Business)
  - Education credentials
  - Spotify integration (personal touch)
  - Profile images
  - Location & availability status

**Why it matters:**
- Modern, visually engaging layout
- Humanizes the candidate (not just resume bullet points)
- Shows personality through design choices

---

#### **6. Artwork Banner (ArtworkBanner)**

**What it does:**
- Horizontal scrolling carousel of creative work
- 10 AI-generated artwork pieces
- Smooth infinite loop animation
- Demonstrates design capability

**Why it matters:**
- Proves creative execution skills
- Shows AI tool proficiency (Midjourney, DALL-E)
- Visual break between dense information sections

---

#### **7. Skills Section (RadialOrbitalTimeline)**

**What it does:**
- Interactive timeline showing tool evolution over time
- Categories: Automation, AI, Analytics, Design, Platforms, Development
- Specific tools with years of experience
- Visual progression showing growth

**Why it matters:**
- Depth of experience visible at a glance
- Shows continuous learning and adaptation
- Specific tool names (not vague "social media")

**Tool Stack:**
- **Automation**: n8n, Zapier, Make.com, APIs, Webhooks
- **AI**: Claude, ChatGPT, Midjourney, DALL-E, Stable Diffusion
- **Analytics**: Google Analytics 4, Facebook Pixel, GTM, Data Studio
- **Design**: Adobe Premiere, Photoshop, After Effects, Illustrator, Figma
- **Platforms**: Meta Business Suite, TikTok, LinkedIn, XiaoHongShu, Buffer
- **Development**: React, JavaScript, HTML/CSS, Google Cloud, Git

---

#### **8. Journey Section (Case Studies)**

**What it does:**
- Chronological work experience with rich media
- Each case study includes:
  - Company name, role, duration
  - Key achievements with specific metrics
  - Image/video gallery (inline thumbnails + lightbox)
  - Challenges, solutions, results

**Featured Case Studies:**

**Cream of Creams (2024-Present)**
- **Role**: Marketing Technologist
- **Achievement**: 429% Facebook growth, 178% Instagram growth
- **Key Metric**: 2M+ impressions on viral campaigns
- **Media**: 5 images, 5 videos

**Junglewalla (2023-2024)**
- **Role**: Full-Stack Marketer
- **Achievement**: Multi-platform brand launch
- **Media**: 6 images, 8 videos

**Pserv Singapore (2022-2023)**
- **Role**: Customer Success & Social Media Manager
- **Achievement**: Integrated marketing systems
- **Media**: 4 images, 5 videos

**Certis Security (2021-2022)**
- **Role**: Marketing Coordinator
- **Achievement**: Corporate marketing foundation
- **Media**: 4 images

**Why it matters:**
- Proof through specific metrics (not vague claims)
- Visual storytelling more engaging than text
- Media galleries show quality of work execution

---

#### **9. Portfolio Section (Projects Showcase)**

**What it does:**
- Showcase 6 major projects with "Visionary Proposal" format
- Each project includes:
  - Concept description
  - "Genius Moment" (the strategic insight)
  - Elevator pitch
  - Current status

**Featured Projects:**

1. **Malaysian Marketing Platform**
   - Status: Operational & Scaling
   - 6 AI tools for local market (Kopitiam Oracle, Mamak Copy, etc.)

2. **Revenue Attribution Dashboard**
   - Status: Building at Cream of Creams
   - Tracks social media posts → actual revenue (RM)

3. **Viral Cheesecake Campaign**
   - Status: Viral Success (2M+ impressions)
   - 14 state-specific AI-generated visuals

4. **Legal Transcription Automation**
   - Status: Cash Flow Positive (50K users, 100K+ sessions)
   - End-to-end audio → verified legal transcript

5. **Spotify Recipe Songs**
   - Status: Concept (proof of creative thinking)
   - Playlist algorithm that matches recipes to songs

6. **Symphony of the Forest**
   - Status: Award-Winning Campaign
   - Environmental awareness through AI art

**Why it matters:**
- Shows range: technical systems + creative campaigns + strategic thinking
- Demonstrates thought process ("Genius Moment")
- Provides conversation starters for interviews

---

#### **10. Malaysian Platform (Detailed Showcase)**

**What it does:**
- Dedicated section for cultural marketing platform
- Interactive demos of each AI tool:
  - **Kopitiam Oracle**: Trend prediction
  - **Mamak Copy**: Localized copywriting (Manglish/Mesra)
  - **Rojak Translator**: Content adaptation
  - **Festival ROI Calculator**: Cultural event planning
  - **Makcik Approval**: Compliance checking
- System architecture visualization
- Data processing pipeline diagrams

**Why it matters:**
- Proves technical execution (not just ideas)
- Shows cultural intelligence and local market understanding
- Demonstrates system architecture thinking

---

#### **11. AI Workforce Section**

**What it does:**
- Showcase 6+ AI tools built for marketing automation
- Each tool card shows:
  - Name, purpose, technology used
  - Specific problem it solves
  - Impact metrics (time saved, quality improvement)

**Example Tools:**
- Content Calendar Generator
- Caption Writer (multi-platform optimization)
- Image Description AI
- Trend Analyzer
- Engagement Predictor

**Why it matters:**
- Proves AI integration capability
- Shows automation mindset
- Demonstrates problem-solving approach

---

#### **12. Workflow Automation Section**

**What it does:**
- Visual diagrams of automated workflows built
- n8n automation examples
- API integrations showcase
- Before/After metrics (manual vs automated)

**Example Workflows:**
- Social media post → auto-distribution → engagement tracking → revenue attribution
- Content creation → AI enhancement → multi-platform adaptation → scheduling
- Lead capture → CRM integration → automated follow-up → conversion tracking

**Why it matters:**
- Demonstrates technical implementation
- Shows business process thinking
- Proves efficiency gains (200+ posts/month solo)

---

#### **13. Contact Section**

**What it does:**
- Email: jothiharshana188@gmail.com
- WhatsApp: +60 11 2964 9143
- Location: Damansara Perdana, Malaysia
- Status: Available for Full-time / Hybrid
- Social links: LinkedIn, GitHub
- Contact form (optional)

**Why it matters:**
- Clear call-to-action
- Multiple contact methods (visitor preference)
- Sets availability expectations

---

## 🎨 Design System

### **Visual Identity:**

**Color Palette:**
- Primary: Red gradient (#DC2626 → #EF4444)
- Secondary: Purple/Indigo (#6366F1 → #A855F7)
- Background: Dark navy (#0A0F1C) / White (light mode)
- Accent: Gold (#FBBF24) for "GOLDMINE" messaging

**Typography:**
- Headings: Bold, large, gradient text
- Body: Clean sans-serif, high contrast
- Code: Monospace font for technical sections

**Animation Philosophy:**
- Subtle, professional (not distracting)
- Parallax scrolling for depth
- Typewriter effect for AI responses
- Smooth transitions (Framer Motion)

---

## 🔧 Technical Architecture

### **Frontend Stack:**

```
React 18.3.1
├── Vite 5.4.0 (Build tool)
├── Tailwind CSS 3.4.10 (Styling)
├── Framer Motion 12.23.26 (Animations)
├── React Router 7.11.0 (Navigation)
├── Lucide React 0.562.0 (Icons)
├── Lenis 1.3.17 (Smooth scroll)
└── Yet Another React Lightbox 3.27.0 (Media galleries)
```

### **AI Integration:**

```
Backend: Netlify Serverless Functions
├── api/chat.js (Google Gemini API endpoint)
├── @google/generative-ai 0.24.1
├── Model: gemini-pro
└── Environment: GEMINI_API_KEY (Netlify env vars)
```

### **Deployment:**

```
Platform: Netlify
├── Auto-deploy from GitHub main branch
├── Build command: npm run build
├── Publish directory: dist
├── Functions directory: api
└── Environment variables: GEMINI_API_KEY
```

### **Performance Optimizations:**

- Code splitting (React.lazy for route-based)
- Image optimization (WebP format, lazy loading)
- Asset compression (Vite production build)
- CDN delivery (Netlify edge network)
- Minimal third-party dependencies

---

## 📊 Success Metrics

### **Primary KPIs:**

1. **Engagement Rate**
   - Target: 60%+ visitors interact with AI chatbot
   - Measurement: Chatbot open rate + message count

2. **Time on Site**
   - Target: Average 4+ minutes
   - Measurement: Google Analytics

3. **Conversion Rate (Contact)**
   - Target: 5%+ visitors reach contact section
   - Measurement: Scroll depth tracking

4. **AI Chatbot Effectiveness**
   - Target: 80%+ questions answered without fallback
   - Measurement: API success rate

### **Secondary Metrics:**

- Mobile vs Desktop traffic split
- Most visited sections (heat mapping)
- Bounce rate by landing source
- Social sharing rate
- GitHub repo clicks (proof of work)

---

## 🚀 Roadmap & Future Enhancements

### **Phase 1: Current (Production)**
✅ AI chatbot with Google Gemini
✅ Interactive portfolio sections
✅ Case study galleries
✅ Malaysian Platform showcase
✅ Mobile responsive design

### **Phase 2: Immediate (Next 30 days)**
- [ ] Add GitHub repo links to projects
- [ ] Integrate real-time analytics dashboard
- [ ] Add blog section (technical articles)
- [ ] LinkedIn testimonials integration
- [ ] Email capture for newsletter

### **Phase 3: Medium-term (60-90 days)**
- [ ] A/B testing framework for conversion optimization
- [ ] Personalized content based on visitor source (recruiter vs client)
- [ ] Video introduction (30-sec elevator pitch)
- [ ] Case study deep-dives (separate pages)
- [ ] Project filtering by category/technology

### **Phase 4: Long-term (6 months)**
- [ ] Multi-language support (English, Malay, Chinese)
- [ ] AI chatbot personalization (remembers visitor preferences)
- [ ] Live project demos (interactive sandboxes)
- [ ] Automated case study generation from new projects
- [ ] Integration with CRM for lead management

---

## 🎯 Positioning Strategy

### **Core Messaging:**

**Headline:** "Marketing Technologist - I Build Revenue Systems, Not Just Campaigns"

**Elevator Pitch:**
"I'm a 3-in-1 hire: I code (React, n8n, APIs), design (Adobe certified), and strategize (marketing funnels). While most marketers use off-the-shelf tools, I build custom automation systems that run 24/7. I've generated $2M+ pipeline, built platforms with 50K users, and grown social media 429%. Companies hire 3 people for this—I deliver it in one."

**Key Differentiators:**
1. **Technical Execution** - Builds systems, not just campaigns
2. **Measurable Impact** - Revenue attribution, not vanity metrics
3. **AI-Powered Scale** - 200+ posts/month solo using automation
4. **Proven Track Record** - $2M+ pipeline, 50K users, 429% growth

### **Target Positioning:**

**For Tech Startups:**
"The marketing hire who can also build your tech stack"

**For Marketing Agencies:**
"The automation specialist who makes your team 10x more productive"

**For SMBs:**
"The 3-in-1 hire that saves you RM 7,000/month + management overhead"

---

## 🔐 Security & Privacy

- No user tracking without consent (GDPR compliant)
- API keys secured in environment variables
- HTTPS enforced (Netlify SSL)
- No PII storage (chatbot conversations ephemeral)
- CORS properly configured
- Rate limiting on AI API (60 req/min)

---

## 📱 Mobile Optimization

- Responsive design (mobile-first approach)
- Touch-friendly UI (larger tap targets)
- Optimized images for mobile bandwidth
- Reduced animations on low-end devices
- AI chatbot adapts to screen size
- Hamburger menu for navigation

---

## 🧪 Testing Strategy

### **Browser Compatibility:**
- Chrome 90+ (primary)
- Firefox 88+ (secondary)
- Safari 14+ (iOS compatibility)
- Edge 90+ (corporate users)

### **Device Testing:**
- Desktop (1920x1080, 1366x768)
- Tablet (iPad, Android tablets)
- Mobile (iPhone, Android phones)

### **Performance Testing:**
- Lighthouse score: 90+ (Performance, Accessibility, Best Practices, SEO)
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Cumulative Layout Shift: <0.1

---

## 💰 ROI Justification

### **Portfolio Development Cost:**
- **Time Investment**: 80 hours (design + development + content)
- **Third-party Costs**: $0 (free tier services)
  - Netlify: Free tier (100GB bandwidth/month)
  - Google Gemini: Free tier (1500 requests/day)
  - GitHub: Free repo hosting

### **Expected Returns:**
- **Time Saved**: 20+ hours/month (automated screening via AI chatbot)
- **Conversion Rate**: 5% contact rate = 1 conversation per 20 visitors
- **Salary Impact**: Single hire at RM 6,500/month vs 3 hires at RM 13,500/month
- **Annual ROI**: Infinite (one hire pays for entire career)

---

## 📞 Support & Maintenance

### **Deployment Process:**
1. Code changes pushed to GitHub main branch
2. Netlify auto-builds and deploys
3. AI chatbot updated via system prompt changes
4. Content updates via `content.js` modifications

### **Monitoring:**
- Netlify deployment status
- Google Gemini API quota usage
- Analytics (visitor count, engagement)
- Error logging (console errors, API failures)

### **Content Update Frequency:**
- Projects: Add new project every 2-3 months
- Skills: Update tool stack quarterly
- Journey: Add new case study when changing jobs
- AI Chatbot: Refresh personality monthly

---

## ✅ Acceptance Criteria

### **Functional Requirements:**
- ✅ Portfolio loads in <3 seconds on 4G connection
- ✅ AI chatbot responds within 2 seconds
- ✅ All images lazy-load correctly
- ✅ Mobile navigation works on all devices
- ✅ Contact form/links functional
- ✅ No console errors in production
- ✅ Smooth scrolling and animations

### **Non-Functional Requirements:**
- ✅ Lighthouse score 90+ across all categories
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- ✅ SEO optimized (meta tags, structured data)
- ✅ 99.9% uptime (Netlify SLA)

---

## 🎓 Lessons Learned

### **What Worked:**
- AI chatbot dramatically increased engagement
- Specific metrics (429% growth) > vague claims
- Visual storytelling (galleries) > text-heavy descriptions
- "GOLDMINE" positioning resonates with decision-makers
- Parallax effects add depth without being distracting

### **What to Improve:**
- Add more GitHub repo links (prove technical capability)
- Include video testimonials from clients
- Create downloadable case study PDFs
- Add blog section for thought leadership
- Integrate LinkedIn recommendations directly

---

## 📚 Appendix

### **Related Documentation:**
- `README.md` - Setup and deployment instructions
- `CHATBOT_PERSONALITY_GUIDE.md` - AI assistant customization
- `ANALYTICS_GUIDE.md` - Tracking and metrics
- `CUSTOMIZATION_CHECKLIST.md` - Personalization options

### **External Resources:**
- Google Gemini API Docs: https://ai.google.dev/docs
- Netlify Functions: https://docs.netlify.com/functions/overview/
- React Best Practices: https://react.dev/learn
- Framer Motion: https://www.framer.com/motion/

---

**End of PRD**

*Last Updated: February 15, 2026*
*Author: Claude Sonnet 4.5 (AI Assistant)*
*Owner: Harshana Jothi*
