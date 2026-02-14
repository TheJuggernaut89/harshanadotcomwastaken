import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Link, Code, Mic, Send, Info, Bot, X } from 'lucide-react';

const FloatingAiAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [conversationStage, setConversationStage] = useState('initial');
  const [userName, setUserName] = useState('');
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [userCompany, setUserCompany] = useState('');
  const maxChars = 2000;
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-open chat after 3 seconds and send first message
  useEffect(() => {
    if (!hasAutoOpened) {
      const timer = setTimeout(() => {
        setIsChatOpen(true);
        setHasAutoOpened(true);

        // Send initial greeting
        setTimeout(() => {
          addBotMessages(getInitialGreeting());
        }, 500);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [hasAutoOpened]);

  // MASSIVE conversation script library - positioning Harshana as a GOLDMINE
  const conversationScripts = {
    // ==================== INITIAL GREETINGS ====================
    initial: {
      greetings: [
        [
          "Hey! 👋 I'm Harshana's AI twin (the more enthusiastic version 😄)",
          "Real talk: you just stumbled onto a fucking GOLDMINE for marketing teams.",
          "Are you hiring? Looking for talent? Or just browsing portfolios at 2am? 🌙"
        ],
        [
          "What's up! 🚀",
          "I'm the AI version of Harshana - basically him but more caffeinated and less filter 😂",
          "Quick Q: Are you here because your marketing team is drowning in manual work and needs someone who can actually automate that shit?"
        ],
        [
          "Yo! Welcome! 🎯",
          "I'm Harshana's digital clone (he built me to save recruiters time).",
          "Fair warning: If you're looking for a marketing technologist who can code, automate, AND strategize... you're in the right fucking place. Hiring?"
        ],
        [
          "Hey there! 💼",
          "I'm the AI assistant Harshana built to handle the 'tell me about yourself' convos.",
          "Plot twist: He's not your average marketer. This dude CODES his marketing campaigns. Interested?"
        ],
        [
          "Sup! 🤖",
          "Harshana here (AI version - the one that doesn't need coffee breaks).",
          "Let me guess: your marketing team needs someone technical, but your dev team doesn't understand marketing? Yeah, you need Harshana. Want details?"
        ]
      ]
    },

    // ==================== HIRING INTENT - ENTHUSIASTIC GOLDMINE POSITIONING ====================
    hiring: {
      responses: [
        [
          "YESSS! 🎉 Okay, business mode activated!",
          "Here's the deal: Harshana's a unicorn. Marketing mind + Dev skills + AI automation expertise.",
          "Most companies need 3 people to do what he does alone. That's not bragging, that's just math. What role are you filling?"
        ],
        [
          "Oh HELL yes! 💪",
          "Alright, let me save you 6 months of interviewing mediocre candidates.",
          "Harshana's built marketing automation systems that generated $2M+ pipeline, coded platforms with 50K+ users, AND created AI tools that save hundreds of hours. What's your biggest pain point?"
        ],
        [
          "FINALLY! Someone who's actually hiring! 🚀",
          "Listen, I'm gonna be real with you: most marketing candidates either know strategy OR tech. Never both.",
          "Harshana? Built an entire legal transcription platform (50K users) while simultaneously running marketing automation at Strateq ($2M+ pipeline). You're looking at a goldmine. What do you need?"
        ],
        [
          "Perfect timing! 🎯",
          "Your competitors are probably still trying to figure out if they should hire a marketer or a developer.",
          "You're smart enough to realize you need someone who's BOTH. That's Harshana. Strategy + Code + Automation = unfair advantage. Interested?"
        ],
        [
          "LET'S GOOO! 🔥",
          "Okay so, real question: How much is it costing your company when marketing and tech don't speak the same language?",
          "Harshana eliminates that gap entirely. He codes the marketing automation, builds the dashboards, AND creates the strategy. Triple threat. What role?"
        ]
      ]
    },

    // ==================== MARKETING TECHNOLOGIST - GOLDMINE VALUE PROP ====================
    marketingTech: {
      responses: [
        [
          "THIS IS HIS SUPERPOWER! 💎",
          "Harshana's not just a 'marketing technologist' in title - he literally BUILDS marketing systems from scratch.",
          "We're talking: HubSpot/Salesforce integrations, custom N8N workflows, email automation that runs while you sleep, analytics dashboards that actually make sense. Want examples?"
        ],
        [
          "Oh you're gonna LOVE this! 🎨",
          "At Strateq, Harshana generated $2M+ in pipeline. But here's the kicker:",
          "He didn't just 'manage campaigns' - he CODED the entire automation infrastructure. Custom APIs, workflow automation, AI-powered lead scoring. Most marketers can't even read code. He writes it. See the difference?"
        ],
        [
          "Buckle up! 🚗",
          "Marketing tech is where Harshana is basically unfair competition:",
          "• Built marketing automation → $2M+ pipeline\n• Integrated Salesforce, HubSpot, Google Analytics (the whole stack)\n• Created AI agents for content, outreach, data analysis\n• Designed dashboards that execs actually understand\n\nWant me to show you the case studies?"
        ],
        [
          "GOLDMINE ALERT! 💰",
          "Most marketing technologists can USE tools. Harshana BUILDS them.",
          "He's created custom marketing automation platforms, AI-powered content generators, lead nurturing systems that run on autopilot. You're not hiring a tool user, you're hiring a tool CREATOR. Big difference."
        ],
        [
          "You just hit the jackpot! 🎰",
          "Here's what sets Harshana apart in marketing tech:",
          "While other marketers are waiting for IT to build that integration... Harshana's already shipped it, tested it, and optimized it. Speed + Quality = competitive advantage. Questions?"
        ]
      ]
    },

    // ==================== AI AUTOMATION - FUTURE-PROOF GOLDMINE ====================
    aiAutomation: {
      responses: [
        [
          "OH FUCK YES! THIS IS THE FUTURE! 🤖",
          "Harshana's not jumping on the AI bandwagon - he's been building AI automation tools since before ChatGPT was a thing.",
          "Custom agents, workflow automation, API integrations with OpenAI/Claude/Anthropic. This isn't vaporware, this is production-ready shit that saves companies MONTHS of manual work. Want the tour?"
        ],
        [
          "YOU FOUND THE RIGHT GUY! 🎯",
          "While everyone's still figuring out how to use ChatGPT, Harshana's building entire AI workforce systems.",
          "He's created: AI content generators, automated transcription platforms (50K users!), intelligent chatbots (like me!), workflow automation that never sleeps. This is the goldmine. Want specifics?"
        ],
        [
          "HELL YEAH! AI automation is literally Harshana's playground! 🚀",
          "He's built AI tools that:",
          "• Automate marketing content creation\n• Handle customer support 24/7\n• Generate reports while you're asleep\n• Analyze data faster than any human team\n\nMost companies are TALKING about AI. Harshana's SHIPPING it. Huge difference."
        ],
        [
          "THIS IS WHERE IT GETS INSANE! 🔥",
          "Harshana built a legal transcription platform with AI (50K users, 100K+ sessions).",
          "But here's the kicker: he did it in 6 months. SOLO. That's the level of AI automation expertise you're looking at. Most teams take 2 years and 10 people. He's a one-man AI factory. Interested?"
        ],
        [
          "JACKPOT! 💎",
          "AI automation is Harshana's secret weapon:",
          "He doesn't just use AI tools - he architects entire AI systems. Custom agents, API integrations, workflow automation, intelligent assistants. While your competitors are paying $10K/month for SaaS tools, Harshana builds custom solutions that scale infinitely. See the value?"
        ]
      ]
    },

    // ==================== FULL-STACK DEVELOPMENT - TECHNICAL GOLDMINE ====================
    fullStack: {
      responses: [
        [
          "OH YOU WANT A REAL DEVELOPER? 💻",
          "Most 'full-stack' devs know frontend OR backend. Harshana knows:",
          "Frontend: React, Next.js, Vue • Backend: Node.js, Python, APIs • Database: PostgreSQL, MongoDB • Cloud: AWS, Vercel, Netlify\n\nPlus he can DESIGN the UI (Figma, design systems). You're getting a full product team in one person. That's the goldmine."
        ],
        [
          "TECHNICAL BEAST MODE ACTIVATED! 🦁",
          "Harshana's built platforms with 50K+ users. From scratch. Solo.",
          "That's not a side project, that's enterprise-scale production code. And it doesn't break at 2am (unlike your current system, probably 😅). Want to see the tech stack?"
        ],
        [
          "LET ME BLOW YOUR MIND! 🤯",
          "Harshana's GitHub: Real repos, real code, real production apps.",
          "He's not a 'tutorial developer' - he's shipped actual products people use daily. Legal platforms, marketing automation, AI tools, interactive portfolios (like this one!). Code quality? Chef's kiss. 👨‍🍳"
        ],
        [
          "DEVELOPER GOLDMINE RIGHT HERE! ⚡",
          "7+ years of production experience. That means:",
          "He's debugged production issues at 3am. Optimized databases under load. Built APIs that scale. Handled authentication, payments, data security. This isn't bootcamp code - this is battle-tested, enterprise-grade development."
        ],
        [
          "YOU HIT THE JACKPOT! 🎰",
          "Full-stack to Harshana means:",
          "• Builds the frontend (beautiful, responsive, fast)\n• Codes the backend (scalable, secure, reliable)\n• Designs the UI/UX (user-centered, conversion-optimized)\n• Deploys to production (CI/CD, monitoring, the works)\n\nOne person. Full product. That's rare as fuck."
        ]
      ]
    },

    // ==================== ROI / BUSINESS VALUE - GOLDMINE METRICS ====================
    roi: {
      responses: [
        [
          "OHHH YOU WANT THE MONEY NUMBERS! 💰",
          "Let's talk ROI because that's what actually matters:",
          "• Generated $2M+ pipeline at Strateq (marketing automation)\n• Built platform with 50K+ users (that's revenue-generating scale)\n• Saves companies 100+ hours/month with AI automation\n\nMost hires are costs. Harshana's an INVESTMENT that pays dividends. Big difference."
        ],
        [
          "FINALLY SOMEONE WHO GETS IT! 📊",
          "Here's the business case for hiring Harshana:",
          "Option A: Hire 3 people (Marketer + Dev + AI specialist) = $300K+/year\nOption B: Hire Harshana who does all three = One salary, triple output\n\nThat's not just savings, that's strategic advantage. Your competitors are doing Option A. You do Option B and dominate."
        ],
        [
          "LET'S TALK REAL NUMBERS! 💵",
          "Harshana's impact at previous roles:",
          "• $2M+ pipeline generated (measurable revenue impact)\n• 50K+ users acquired (product-market fit at scale)\n• Hundreds of hours automated (productivity multiplier)\n\nMost candidates talk about 'responsibilities.' Harshana delivers RESULTS. That's the goldmine difference."
        ],
        [
          "YOU'RE THINKING LIKE A BUSINESS PERSON! 🎯",
          "ROI on Harshana:",
          "Marketing automation he builds → runs 24/7 → generates leads while you sleep → compounds over time. One-time hire, infinite ROI. Most employees are linear cost. Harshana's an exponential asset."
        ],
        [
          "SMART QUESTION! 📈",
          "Here's how Harshana creates business value:",
          "1. Builds automation = saves your team 20+ hours/week\n2. Codes marketing tech = no expensive agency fees\n3. Ships AI tools = competitive moat your competitors can't copy\n\nThat's not an employee, that's a profit center. Big difference."
        ]
      ]
    },

    // ==================== EXPERIENCE - PROVEN TRACK RECORD ====================
    experience: {
      responses: [
        [
          "BUCKLE UP FOR THE RESUME HIGHLIGHTS! 🎬",
          "7+ years of experience, but here's what matters:",
          "• Built legal transcription platform → 50K users, 100K+ sessions\n• Marketing Technologist at Strateq → $2M+ pipeline generated\n• Solo-built AI automation tools → saving companies hundreds of hours\n\nThat's not 'experience' - that's a track record of shipping shit that scales. Want details?"
        ],
        [
          "OH THE STORIES HE COULD TELL! 📚",
          "Harshana's worked with:",
          "• Startups (where speed is everything)\n• Enterprises (where scale is everything)\n• Solo projects (where ownership is everything)\n\nHe speaks all three languages fluently. Most people specialize. Harshana adapts. That's rare."
        ],
        [
          "EXPERIENCE? MORE LIKE A MASTERCLASS! 🎓",
          "From junior dev to marketing technologist to AI automation expert:",
          "He's evolved with the industry instead of getting stuck in one lane. That means he knows marketing strategy, can code the execution, AND automates with AI. Triple threat. That's your goldmine."
        ],
        [
          "LET'S TALK TRACK RECORD! 🏆",
          "Harshana's not a job-hopper - he's a builder:",
          "Every role = measurable impact. Every project = production-ready. Every skill = battle-tested. This isn't theoretical knowledge, this is 7+ years of shipping real products to real users."
        ],
        [
          "PROVEN TRACK RECORD INCOMING! ⚡",
          "Experience breakdown:",
          "• Technical: Built platforms with 50K+ users\n• Marketing: Generated $2M+ in pipeline\n• AI: Created automation tools used in production\n• Leadership: Solo-led projects from concept to scale\n\nYou're not hiring potential. You're hiring proven results."
        ]
      ]
    },

    // ==================== PORTFOLIO - SHOW DON'T TELL ====================
    portfolio: {
      responses: [
        [
          "OH FUCK YES! LET ME SHOW YOU THE RECEIPTS! 📸",
          "Portfolio highlights:",
          "• Malaysian Legal Transcription Platform (50K users, 100K+ sessions)\n• Marketing automation systems ($2M+ pipeline)\n• AI workforce tools (live and working)\n• This interactive portfolio (meta, right? 😄)\n\nNo lorem ipsum, no fake testimonials, no 'coming soon' bullshit. Everything's LIVE and VERIFIABLE."
        ],
        [
          "THIS IS WHERE IT GETS SPICY! 🌶️",
          "Check out the portfolio section:",
          "Real projects. Real metrics. Real GitHub repos you can audit. Most portfolios are vaporware. Harshana's is a fucking library of production code. Want the tour?"
        ],
        [
          "SHOW AND TELL TIME! 🎨",
          "Portfolio isn't just pretty pictures - it's case studies with:",
          "• Problem statements\n• Solution architecture\n• Tech stack used\n• Measurable outcomes\n• Live demos you can click\n\nThat's transparency your competitors can't match. Goldmine."
        ],
        [
          "YOU WANT PROOF? HERE'S PROOF! 💎",
          "Every project in the portfolio has:",
          "- Real user numbers (not 'TBD')\n- Real code (GitHub links)\n- Real impact (revenue, users, time saved)\n\nMost candidates talk about what they 'can do.' Harshana shows what he HAS done. Big difference."
        ],
        [
          "PORTFOLIO TOUR ACTIVATED! 🚀",
          "From legal platforms to marketing automation to AI tools:",
          "Each project = a masterclass in execution. This isn't a portfolio, it's a proof of concept for why hiring Harshana is the smartest decision your company will make this year."
        ]
      ]
    },

    // ==================== SKILLS - COMPREHENSIVE ARSENAL ====================
    skills: {
      responses: [
        [
          "OH BOY, THE SKILL LIST! 🛠️",
          "Marketing: HubSpot, Salesforce, Google Analytics, email automation, campaign strategy, conversion optimization",
          "Development: React, Next.js, Node.js, Python, APIs, databases, cloud deployment",
          "AI/Automation: OpenAI, Claude, custom agents, workflow automation, data analysis",
          "Design: Figma, Photoshop, Midjourney, UI/UX, design systems\n\nThat's not a resume, that's an ARSENAL. Most people pick one lane. Harshana dominates all of them."
        ],
        [
          "SKILL ARSENAL UNLOCKED! ⚔️",
          "Here's the secret sauce:",
          "He's technical enough to code production apps, strategic enough to run marketing campaigns, and creative enough to design interfaces. That combination? Rare as fucking diamonds 💎"
        ],
        [
          "LET ME BREAK DOWN THE TOOLKIT! 🧰",
          "Frontend: React, Next.js, Vue (builds fast, responsive UIs)",
          "Backend: Node.js, Python, APIs (scalable, secure, reliable)",
          "Marketing: HubSpot, Salesforce, automation (revenue-generating)",
          "AI: OpenAI, Claude, custom agents (competitive moat)",
          "Design: Figma, design systems (user-centered)\n\nMost people specialize. Harshana orchestrates. That's the goldmine."
        ],
        [
          "COMPREHENSIVE SKILL SET INCOMING! 💪",
          "The beauty of Harshana's skill set:",
          "He doesn't need a 'team' to ship products. He IS the team. Strategy + Design + Code + Marketing + AI = one-man startup in a bottle. Imagine what he can do with actual resources."
        ],
        [
          "SKILL STACK SHOWCASE! 🎯",
          "What makes Harshana different:",
          "He connects dots other people don't see. Marketing strategy informs technical architecture. AI automation enhances user experience. Design thinking drives conversion. It's not siloed skills - it's integrated mastery."
        ]
      ]
    },

    // ==================== AVAILABILITY - SELECTIVE BUT INTERESTED ====================
    availability: {
      responses: [
        [
          "GOOD QUESTION! ⏰",
          "Harshana's selective (because he's got options), but here's the thing:",
          "If you're building something legitimately cool and not a nightmare to work with, he's interested. Best move? Contact him directly with what you're building and why it matters."
        ],
        [
          "POTENTIALLY AVAILABLE! 🎯",
          "He's not desperately job hunting (goldmines don't need to beg for work 😉).",
          "But he IS open to the right opportunity. Key word: RIGHT. That means interesting problem + good team + fair compensation. Check those boxes?"
        ],
        [
          "LET'S TALK AVAILABILITY! 📅",
          "Harshana's open to:",
          "• Full-time roles (if the mission is compelling)\n• Contract work (if the scope is clear)\n• Consulting (if the problem is interesting)\n\nWhat he's NOT open to: Boring work, toxic teams, or being treated like a code monkey. Fair?"
        ],
        [
          "TIMING QUESTION! ⏱️",
          "Here's the deal:",
          "Harshana can start conversations immediately. Actual start date depends on current commitments, but typically within 2-4 weeks for the right opportunity. Want to start the conversation?"
        ],
        [
          "AVAILABILITY STATUS! 🟢",
          "Currently: Exploring opportunities",
          "Looking for: Companies that value speed, innovation, and actual impact (not corporate theater)",
          "Not interested in: 'Exposure,' unpaid trials, or 6-month interview processes\n\nSound like your company? Let's talk."
        ]
      ]
    },

    // ==================== PRICING / COMPENSATION - VALUE-BASED ====================
    pricing: {
      responses: [
        [
          "AH, THE MONEY TALK! 💰",
          "Look, goldmines aren't cheap. But they're WORTH IT.",
          "Harshana's rates reflect his value: you're not hiring one person, you're hiring a marketer + developer + AI specialist in one. Best to discuss compensation directly based on scope and timeline."
        ],
        [
          "COMPENSATION QUESTION! 💵",
          "Here's the math:",
          "Hiring separately: Marketer ($80K) + Dev ($120K) + AI specialist ($150K) = $350K/year",
          "Hiring Harshana: One competitive salary, triple the output",
          "ROI is obvious. Want to discuss specifics? Hit the contact form."
        ],
        [
          "PRICING PHILOSOPHY! 💎",
          "Harshana doesn't compete on price - he competes on VALUE.",
          "Cheap developers are expensive in the long run (bugs, delays, rewrites). Harshana ships quality, fast, with measurable impact. That's worth paying for. Rates vary by project type - contact directly."
        ],
        [
          "INVESTMENT DISCUSSION! 📊",
          "Think of it this way:",
          "Option A: Cheap hire → slow delivery → missed opportunities → hidden costs",
          "Option B: Harshana → fast delivery → quality results → measurable ROI\n\nWhich one sounds better? Discuss rates directly for specifics."
        ],
        [
          "COMPENSATION EXPECTATIONS! 💸",
          "Harshana's pricing is market-competitive for senior technical marketing roles.",
          "But remember: you're getting 3 skill sets for 1 salary. That's actually a DISCOUNT. Want numbers? Contact him directly with your budget and scope."
        ]
      ]
    },

    // ==================== CONTACT / NEXT STEPS ====================
    contact: {
      responses: [
        [
          "HELL YEAH! LET'S MAKE IT HAPPEN! 🚀",
          "Scroll down to the contact section (or I can navigate you there).",
          "Pro tip: Don't send generic 'we're hiring' messages. Tell Harshana:",
          "• What you're building\n• Why it matters\n• What problem you're solving\n\nHe responds to PASSION, not templates. Usually within 24 hours!"
        ],
        [
          "PERFECT! LET'S CONNECT! 📧",
          "Contact form is at the bottom of the page.",
          "What to include:",
          "• Your role/company\n• The opportunity\n• Why you think Harshana's a fit\n• Timeline and next steps\n\nMore detail = better response. He's not ghosting quality opportunities!"
        ],
        [
          "BUSINESS TIME! 💼",
          "Ready to reach out? Here's how:",
          "1. Fill out contact form (bottom of page)\n2. Be specific about the role/project\n3. Include timeline and compensation range\n4. Mention what excites you about working together\n\nHarshana reads every message personally. No recruiters, no gatekeepers."
        ],
        [
          "LET'S START THE CONVERSATION! 🎯",
          "Navigating to contact section...",
          "Quick tips for getting a response:",
          "✅ Be specific about opportunity\n✅ Show you've read the portfolio\n✅ Explain the 'why' not just the 'what'\n❌ Don't send copy-paste recruiter spam\n\nHarshana responds to thoughtful outreach fast!"
        ],
        [
          "REACH OUT TIME! 📬",
          "Contact info is right on this page (scroll to contact section).",
          "Best way to stand out:",
          "Tell him about a project in his portfolio that resonated with you, then connect it to what YOU'RE building. Shows you did homework. Gets responses."
        ]
      ]
    },

    // ==================== SKEPTICAL - PROVE IT ====================
    skeptical: {
      responses: [
        [
          "HEALTHY SKEPTICISM! I RESPECT IT! 🧐",
          "The internet IS full of bullshit portfolios with stock photos and fake metrics.",
          "Here's what's different:",
          "• Real GitHub repos (audit the code yourself)\n• Live demos (use the products)\n• Verifiable metrics (50K users isn't a guess)\n\nEverything Harshana claims is PROVABLE. Want to verify? Go ahead!"
        ],
        [
          "LOL FAIR! 😂",
          "You've probably seen 1000 'AI marketing guru blockchain ninja' profiles.",
          "Difference with Harshana:",
          "He SHOWS his work, not just talks about it. Portfolio has real projects, GitHub has real code, metrics are verifiable. Transparency is the competitive advantage."
        ],
        [
          "I GET THE DOUBT! 🤔",
          "Everyone claims to be a 'senior full-stack' developer these days.",
          "Proof Harshana's different:",
          "1. Built production apps with 50K+ users (not tutorials)\n2. Generated $2M+ pipeline (not 'increased engagement')\n3. Code is on GitHub (not 'under NDA')\n\nDon't take my word for it. VERIFY EVERYTHING."
        ],
        [
          "SKEPTICISM IS SMART! 🎯",
          "In a world of fake portfolios and bought testimonials:",
          "Harshana's entire portfolio is auditable. Every project has proof. Every metric is verifiable. Every claim has receipts. That's why it's a goldmine - because it's REAL."
        ],
        [
          "QUESTION EVERYTHING! ✅",
          "You should be skeptical. That means you're smart.",
          "But here's the thing: Harshana's work speaks for itself. Live products. Real users. Measurable impact. Spend 10 minutes digging - you'll see this isn't hype, it's proof."
        ]
      ]
    },

    // ==================== COMPLIMENTS ====================
    compliment: {
      responses: [
        [
          "RIGHT?! 🙌",
          "Yeah, Harshana built this entire site (including me!) from scratch.",
          "If you think THIS is impressive, wait till you see the legal platform with 50K users or the marketing automation that generated $2M+ pipeline. This is just the appetizer!"
        ],
        [
          "GLAD YOU LIKE IT! 😊",
          "Everything on this site - the animations, the AI assistant, the interactive stuff - all Harshana.",
          "And this is just a PORTFOLIO. Imagine what he can build for your actual business. Goldmine, right?"
        ],
        [
          "THANKS! 💪",
          "Harshana put serious thought into this portfolio.",
          "The goal: show > tell. Don't just SAY you can code/design/automate - prove it with an interactive experience. Working?"
        ],
        [
          "APPRECIATE THAT! 🎉",
          "This portfolio is meta: it's marketing content that demonstrates technical skill that showcases AI automation.",
          "That's the Harshana special - everything he builds serves multiple purposes. Efficient as fuck."
        ]
      ]
    },

    // ==================== COMPARISONS TO OTHER CANDIDATES ====================
    comparison: {
      responses: [
        [
          "OHHH YOU WANT THE COMPETITIVE ANALYSIS! 📊",
          "Here's how Harshana stacks up:",
          "Most candidates: Specialized in ONE thing",
          "Harshana: Expert in THREE things (marketing + dev + AI)",
          "Most candidates: Talk about potential",
          "Harshana: Shows proven results",
          "Most candidates: Need 'a team'",
          "Harshana: IS a team\n\nThat's why it's a goldmine find."
        ],
        [
          "COMPARISON TIME! ⚖️",
          "Typical marketer: Knows strategy, not execution",
          "Typical developer: Knows code, not business",
          "Typical AI specialist: Knows theory, not application",
          "Harshana: Strategy + Execution + Application in one brain\n\nYou're comparing specialists to a generalist who's expert-level in multiple domains. Apples to oranges."
        ],
        [
          "LET'S TALK DIFFERENTIATION! 🎯",
          "What makes Harshana rare:",
          "• Can talk to C-suite about strategy (business fluent)\n• Can code with engineering team (technically fluent)\n• Can automate with AI tools (future fluent)\n\nMost people pick one language. Harshana speaks all three. That's the goldmine differentiator."
        ]
      ]
    },

    // ==================== CULTURAL FIT ====================
    culture: {
      responses: [
        [
          "CULTURE FIT QUESTION! 🎭",
          "Harshana thrives in environments that value:",
          "• Speed over bureaucracy\n• Results over process\n• Innovation over 'we've always done it this way'\n• Autonomy over micromanagement\n\nIf your company is allergic to red tape and obsessed with shipping, you found your person."
        ],
        [
          "WORK STYLE DISCUSSION! 💼",
          "Harshana's ideal culture:",
          "• Startup energy (even in big companies)\n• Data-driven decisions\n• Experimentation encouraged\n• Failure accepted as learning\n\nNot a fit: Corporate politics, endless meetings, analysis paralysis. Sound like your team?"
        ],
        [
          "CULTURAL ALIGNMENT CHECK! ✅",
          "Harshana works best with teams that:",
          "• Trust autonomy (no micromanaging)\n• Value outcomes (not hours logged)\n• Embrace technology (not fear it)\n• Move fast (not slow)\n\nIf that sounds like your company culture, you're looking at a perfect match."
        ]
      ]
    },

    // ==================== REMOTE WORK ====================
    remote: {
      responses: [
        [
          "REMOTE WORK QUESTION! 🌍",
          "Harshana's built to work remotely:",
          "• Managed distributed projects (timezones don't scare him)\n• Ships production code without office supervision\n• Communicates async like a pro\n\nRemote, hybrid, on-site - he's flexible. But remote is where he's most productive."
        ],
        [
          "LOCATION FLEXIBILITY! 📍",
          "Fun fact: Harshana built a 50K-user platform remotely.",
          "He doesn't NEED to be in an office to ship - the portfolio proves it. Remote-first companies get the best of him."
        ]
      ]
    },

    // ==================== INDUSTRIES ====================
    industry: {
      responses: [
        [
          "INDUSTRY EXPERIENCE! 🏢",
          "Harshana's worked in:",
          "• Legal tech (transcription platform)\n• Marketing/SaaS (Strateq)\n• AI/Automation (custom tools)\n\nBut here's the thing: skills transfer across industries. The HOW matters more than the WHERE. What industry are you in?"
        ],
        [
          "INDUSTRY FLEXIBILITY! 🎯",
          "Harshana adapts to industries fast because he understands:",
          "• The underlying tech (code is code)\n• The marketing principles (humans are humans)\n• The business fundamentals (value is value)\n\nNew industry? He'll learn the domain in weeks. The skills stay constant."
        ]
      ]
    },

    // ==================== TEAM SIZE PREFERENCE ====================
    teamSize: {
      responses: [
        [
          "TEAM SIZE QUESTION! 👥",
          "Harshana's worked in:",
          "• Solo (legal platform, 50K users)\n• Small teams (startups)\n• Large orgs (enterprises)\n\nHe adapts. But thrives most in small, nimble teams where he can own outcomes end-to-end."
        ],
        [
          "TEAM STRUCTURE PREFERENCE! 🎯",
          "Ideal for Harshana:",
          "Small team (5-15 people) where he can wear multiple hats and drive real impact. Not ideal: 100-person company with siloed departments and political overhead."
        ]
      ]
    },

    // ==================== LEARNING / GROWTH ====================
    learning: {
      responses: [
        [
          "GROWTH MINDSET ALERT! 📚",
          "Harshana's constantly learning:",
          "• Started as dev → evolved to marketing → now AI automation\n• That's not job-hopping, that's skill-stacking\n\nCompanies that invest in learning culture get the best ROI from him because he compounds knowledge."
        ],
        [
          "CONTINUOUS LEARNER! 🧠",
          "Harshana doesn't get stuck in one lane:",
          "He's always learning the next tech, the next framework, the next competitive advantage. That mindset means he future-proofs your company."
        ]
      ]
    },

    // ==================== FAILURES / CHALLENGES ====================
    challenges: {
      responses: [
        [
          "REAL TALK ABOUT CHALLENGES! 💪",
          "Harshana's faced:",
          "• Projects that didn't work (learned from them)\n• Tech that failed (pivoted quickly)\n• Timelines that slipped (adjusted)\n\nThe difference? He doesn't hide failures - he learns from them. That's maturity most candidates fake."
        ],
        [
          "GROWTH THROUGH CHALLENGES! 🌱",
          "Every successful project in the portfolio came AFTER failures you don't see.",
          "That's the real skill - resilience, adaptability, learning. Most candidates hide failures. Harshana uses them as fuel."
        ]
      ]
    },

    // ==================== WHY LEAVE CURRENT ROLE ====================
    whyLeave: {
      responses: [
        [
          "CAREER MOTIVATION! 🚀",
          "Harshana's looking for:",
          "• Bigger impact\n• More interesting problems\n• Teams that move fast\n• Companies building the future\n\nHe's not running FROM something, he's running TOWARD opportunity."
        ],
        [
          "NEXT CHAPTER REASONING! 📖",
          "After 7+ years, Harshana's ready for:",
          "• More ownership\n• Harder problems\n• Better team fit\n• Companies that value innovation\n\nNot chasing money - chasing meaning."
        ]
      ]
    },

    // ==================== STARTUPS VS ENTERPRISE ====================
    companyStage: {
      responses: [
        [
          "STARTUP VS ENTERPRISE! 🏢",
          "Harshana speaks both languages:",
          "• Startups: Loves the speed, autonomy, impact",
          "• Enterprise: Appreciates the resources, scale, stability\n\nIdeal? Startup speed with enterprise resources. Which are you?"
        ],
        [
          "COMPANY STAGE PREFERENCE! 🎯",
          "Harshana thrives in:",
          "• Early-stage startups (build from scratch)\n• Growth-stage companies (scale what works)\n\nNot ideal: Legacy enterprise with 6-month approval cycles."
        ]
      ]
    },

    // ==================== REFERENCES / TESTIMONIALS ====================
    references: {
      responses: [
        [
          "REFERENCES AVAILABLE! 📞",
          "Harshana has references from:",
          "• Previous employers (can speak to work ethic)\n• Clients (can speak to results)\n• Collaborators (can speak to teamwork)\n\nHappy to provide upon request. But the portfolio is the best reference - work speaks louder than words."
        ],
        [
          "TESTIMONIAL QUESTION! ⭐",
          "Real testimonials > fake 5-star reviews.",
          "Harshana can connect you with people who've worked with him directly. No bought reviews, no fake LinkedIn endorsements."
        ]
      ]
    },

    // ==================== GENERIC RESPONSES ====================
    yes: {
      responses: [
        ["Awesome! 🎉", "Alright, what would you like to know more about?", "Skills? Projects? Experience? How to get in touch?"],
        ["Perfect! 💪", "Where should we go next?", "Want to see portfolio? Discuss availability? Learn about his skills?"],
        ["Hell yeah! 🚀", "Let's dive deeper!", "What's most important to you right now - technical skills, marketing experience, or AI automation?"]
      ]
    },

    no: {
      responses: [
        ["No worries! 😊", "If you change your mind, I'm right here.", "Feel free to explore the site - lots of cool stuff!"],
        ["All good! 👍", "Maybe not the right time, that's fine.", "Bookmark this for later if you're ever hiring marketing tech talent!"],
        ["Totally fair! ✌️", "Not every opportunity is a fit.", "But if something changes, you know where to find us!"]
      ]
    },

    confused: {
      responses: [
        ["Hmm, not quite sure what you're asking! 🤔", "Want to clarify?", "I can help with: Skills, Experience, Portfolio, Hiring, Contact info"],
        ["Lost in translation! 😅", "Can you rephrase that?", "Try asking about: What Harshana does, His projects, His availability, How to reach him"],
        ["My AI brain is confused! 🤖", "Let me help you:", "Ask about Skills | Experience | Projects | Availability | Contact"]
      ]
    },

    random: {
      responses: [
        ["Haha that's random! 🎲", "But I'm built to talk about Harshana's professional goldmine-ness!", "Got questions about his work?"],
        ["LOL okay! 😆", "I appreciate the creativity, but I'm here to talk marketing tech, AI, and development!", "Wanna know about Harshana's actual skills?"],
        ["Interesting question! 🧐", "But I'm optimized for career conversations!", "Ask me about Harshana's projects, experience, or how to hire him!"]
      ]
    }
  };

  // Get random item from array
  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Get initial greeting
  const getInitialGreeting = () => {
    return getRandomItem(conversationScripts.initial.greetings);
  };

  // Add bot messages with delay
  const addBotMessages = (messageArray, delay = 800) => {
    messageArray.forEach((msg, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, { text: msg, sender: 'bot', timestamp: new Date() }]);
      }, delay * index);
    });
  };

  // COMPREHENSIVE intent detection covering 50+ scenarios
  const getBotResponse = (userText) => {
    const lower = userText.toLowerCase();

    // Name detection
    if (lower.includes("my name is") || lower.includes("i'm ") || lower.includes("i am ")) {
      const nameMatch = userText.match(/(?:my name is|i'm|i am)\s+([a-zA-Z]+)/i);
      if (nameMatch) {
        const detectedName = nameMatch[1];
        setUserName(detectedName);
        return [
          `Great to meet you, ${detectedName}! 🤝`,
          "I'm Harshana's AI assistant (the enthusiastic version that never needs coffee ☕)",
          "What brings you here today - hiring, exploring, or just curious?"
        ];
      }
    }

    // Company detection
    if (lower.includes("from ") || lower.includes("at ") || lower.includes("work for ")) {
      const companyMatch = userText.match(/(?:from|at|work for)\s+([A-Z][a-zA-Z0-9\s&]+)/);
      if (companyMatch) {
        setUserCompany(companyMatch[1].trim());
        return [
          `Oh nice! ${companyMatch[1]}! 🏢`,
          "Always cool to meet people from interesting companies.",
          "So what's your role there? Hiring? Recruiting? Just browsing talent?"
        ];
      }
    }

    // Greetings
    if (lower.match(/^(hi|hey|hello|sup|yo|wassup|what's up|whats up|good morning|good afternoon|good evening)$/i)) {
      return getRandomItem(conversationScripts.initial.greetings);
    }

    // Hiring intent (GOLDMINE positioning)
    if (lower.match(/hir(e|ing)|recruit|looking for|need (a |someone|talent)|job (opening|offer|position)|vacancy|candidate|role|position open/)) {
      setConversationStage('hiring');
      return getRandomItem(conversationScripts.hiring.responses);
    }

    // Marketing tech (GOLDMINE value)
    if (lower.match(/marketing tech|martech|marketing automation|hubspot|salesforce|crm|email automation|campaign|marketing stack|marketing operations|marketing engineer/)) {
      return getRandomItem(conversationScripts.marketingTech.responses);
    }

    // AI/Automation (FUTURE-PROOF positioning)
    if (lower.match(/\bai\b|artificial intelligence|automation|automate|gpt|claude|openai|machine learning|ml|chatbot|agent|workflow|n8n|zapier|make\.com/)) {
      return getRandomItem(conversationScripts.aiAutomation.responses);
    }

    // Full-stack/Development
    if (lower.match(/full.?stack|developer|dev|engineer|coder|programming|react|node|python|javascript|typescript|frontend|backend|web dev/)) {
      return getRandomItem(conversationScripts.fullStack.responses);
    }

    // ROI / Business value (GOLDMINE metrics)
    if (lower.match(/\broi\b|return on investment|business value|impact|revenue|profit|save (money|time|cost)|worth it|value prop|business case/)) {
      return getRandomItem(conversationScripts.roi.responses);
    }

    // Skills
    if (lower.match(/skill|tech stack|what (can|does) he (do|know)|technologies|tools|expertise|proficient|capabilities/)) {
      return getRandomItem(conversationScripts.skills.responses);
    }

    // Experience / Background
    if (lower.match(/experience|background|history|worked|previous|past (work|jobs|role)|resume|cv|career|years/)) {
      return getRandomItem(conversationScripts.experience.responses);
    }

    // Portfolio / Projects
    if (lower.match(/portfolio|project|work|built|case stud|example|demo|show me|what (has|did) he (built|build|make|create)/)) {
      return getRandomItem(conversationScripts.portfolio.responses);
    }

    // Availability / Start date
    if (lower.match(/available|availability|start|when (can|could)|timeline|free|notice period|how soon/)) {
      return getRandomItem(conversationScripts.availability.responses);
    }

    // Pricing / Rates / Compensation
    if (lower.match(/cost|price|rate|expensive|cheap|budget|pay|salary|compensation|how much|charge/)) {
      return getRandomItem(conversationScripts.pricing.responses);
    }

    // Contact / Next steps
    if (lower.match(/contact|reach out|email|talk|discuss|call|meeting|interview|get in touch|connect/)) {
      return getRandomItem(conversationScripts.contact.responses);
    }

    // Skeptical / Prove it
    if (lower.match(/too good|sounds fake|bullshit|doubt|really|sure|prove it|evidence|show proof|verify|trust/)) {
      return getRandomItem(conversationScripts.skeptical.responses);
    }

    // Comparisons to other candidates
    if (lower.match(/compar|versus|vs|other candidate|different from|stand out|why (should|would)|better than|advantage/)) {
      return getRandomItem(conversationScripts.comparison.responses);
    }

    // Cultural fit
    if (lower.match(/culture|work environment|team dynamic|company culture|fit|values|work style/)) {
      return getRandomItem(conversationScripts.culture.responses);
    }

    // Remote work
    if (lower.match(/remote|work from home|wfh|distributed|location|office|on.?site|hybrid/)) {
      return getRandomItem(conversationScripts.remote.responses);
    }

    // Industry experience
    if (lower.match(/industry|sector|domain|vertical|market|field/)) {
      return getRandomItem(conversationScripts.industry.responses);
    }

    // Team size
    if (lower.match(/team size|company size|startup|enterprise|small team|large (team|company)/)) {
      return getRandomItem(conversationScripts.teamSize.responses);
    }

    // Learning / Growth
    if (lower.match(/learn|growth|develop|upskill|training|improve|education/)) {
      return getRandomItem(conversationScripts.learning.responses);
    }

    // Challenges / Failures
    if (lower.match(/challeng|difficult|fail|mistake|problem|struggle|overcome/)) {
      return getRandomItem(conversationScripts.challenges.responses);
    }

    // Why leaving current role
    if (lower.match(/why (leave|leaving)|looking for new|change|switch|move/)) {
      return getRandomItem(conversationScripts.whyLeave.responses);
    }

    // Company stage preference
    if (lower.match(/startup|enterprise|company stage|early.?stage|growth.?stage|mature company/)) {
      return getRandomItem(conversationScripts.companyStage.responses);
    }

    // References / Testimonials
    if (lower.match(/reference|testimonial|recommendation|referral|vouch|previous (employer|client)/)) {
      return getRandomItem(conversationScripts.references.responses);
    }

    // Compliments
    if (lower.match(/nice|cool|awesome|great|love|impressive|good job|well done|amazing|beautiful|fantastic|excellent|perfect/)) {
      return getRandomItem(conversationScripts.compliment.responses);
    }

    // Yes/No responses
    if (lower.match(/^(yes|yeah|yep|sure|ok|okay|yup|absolutely|definitely|affirmative)$/i)) {
      return getRandomItem(conversationScripts.yes.responses);
    }

    if (lower.match(/^(no|nah|nope|not really|not interested|negative)$/i)) {
      return getRandomItem(conversationScripts.no.responses);
    }

    // Confused/unclear
    if (lower.length < 3 || lower.match(/what|huh|idk|dunno|unclear|don't understand/)) {
      return getRandomItem(conversationScripts.confused.responses);
    }

    // Random/off-topic
    return getRandomItem(conversationScripts.random.responses);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    setCharCount(value.length);
  };

  const handleSend = () => {
    if (message.trim()) {
      setMessages(prev => [...prev, { text: message, sender: 'user', timestamp: new Date() }]);
      const response = getBotResponse(message);
      setMessage('');
      setCharCount(0);
      setTimeout(() => {
        addBotMessages(response);
      }, 500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        if (!event.target.closest('.floating-ai-button')) {
          setIsChatOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating 3D Glowing AI Logo */}
      <button
        className={`floating-ai-button relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 transform ${
          isChatOpen ? 'rotate-90' : 'rotate-0'
        }`}
        onClick={() => setIsChatOpen(!isChatOpen)}
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.8) 0%, rgba(168,85,247,0.8) 100%)',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.7), 0 0 40px rgba(124, 58, 237, 0.5), 0 0 60px rgba(109, 40, 217, 0.3)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-30"></div>
        <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
        <div className="relative z-10">
          {isChatOpen ? <X className="w-8 h-8 text-white" /> : <Bot className="w-8 h-8 text-white" />}
        </div>
        <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-indigo-500"></div>
      </button>

      {/* Chat Interface */}
      {isChatOpen && (
        <div
          ref={chatRef}
          className="absolute bottom-20 right-0 w-[450px] max-h-[600px] transition-all duration-300 origin-bottom-right flex flex-col"
          style={{
            animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
          }}
        >
          <div className="relative flex flex-col rounded-3xl bg-gradient-to-br from-zinc-800/95 to-zinc-900/95 border border-zinc-500/50 shadow-2xl backdrop-blur-3xl overflow-hidden h-full">

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-4 pb-3 border-b border-zinc-700/50">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-medium text-zinc-300">Harshana's AI Twin 🤖</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded-2xl border border-yellow-500/30">
                  💎 GOLDMINE
                </span>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1.5 rounded-full hover:bg-zinc-700/50 transition-colors"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 min-h-[300px] max-h-[350px]">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                      : 'bg-zinc-700/50 text-zinc-100'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="relative border-t border-zinc-700/50">
              <textarea
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                rows={3}
                className="w-full px-6 py-4 bg-transparent border-none outline-none resize-none text-sm font-normal leading-relaxed text-zinc-100 placeholder-zinc-400 scrollbar-none"
                placeholder="Ask me anything about Harshana..."
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              />
            </div>

            {/* Controls */}
            <div className="px-4 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-xs font-medium text-zinc-400">
                    <span className="text-zinc-300">{charCount}</span>/<span className="text-zinc-400">{maxChars}</span>
                  </div>
                </div>

                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="group relative p-3 bg-gradient-to-r from-red-600 to-red-500 border-none rounded-xl cursor-pointer transition-all duration-300 text-white shadow-lg hover:from-red-500 hover:to-red-400 hover:scale-110 hover:shadow-red-500/30 hover:shadow-xl active:scale-95 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Send className="w-5 h-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-12" />
                </button>
              </div>
            </div>

            {/* Floating Overlay */}
            <div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05), transparent, rgba(147, 51, 234, 0.05))'
              }}
            ></div>
          </div>
        </div>
      )}

      {/* CSS */}
      <style jsx>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.8) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(1.1);
            opacity: 0;
          }
        }

        .floating-ai-button:hover {
          transform: scale(1.1) rotate(5deg);
          box-shadow: 0 0 30px rgba(139, 92, 246, 0.9), 0 0 50px rgba(124, 58, 237, 0.7), 0 0 70px rgba(109, 40, 217, 0.5);
        }

        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export { FloatingAiAssistant };
