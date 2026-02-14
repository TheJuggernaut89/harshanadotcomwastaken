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
  const [isTyping, setIsTyping] = useState(false);
  const maxChars = 2000;
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typewriterTimers = useRef([]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Cleanup typewriter timers on unmount
  useEffect(() => {
    return () => {
      typewriterTimers.current.forEach(timer => clearTimeout(timer));
    };
  }, []);

  // Auto-open chat after 3 seconds and send first message
  useEffect(() => {
    if (!hasAutoOpened) {
      const timer = setTimeout(() => {
        setIsChatOpen(true);
        setHasAutoOpened(true);

        // Send initial greeting with typewriter effect
        setTimeout(() => {
          addBotMessagesWithTypewriter(getInitialGreeting());
        }, 500);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [hasAutoOpened]);

  // Typewriter effect for a single message
  const typewriterEffect = (fullText, messageIndex, callback) => {
    let currentText = '';
    let charIndex = 0;
    const typingSpeed = 30; // milliseconds per character

    const typeNextChar = () => {
      if (charIndex < fullText.length) {
        currentText += fullText[charIndex];

        // Update the message with current typed text
        setMessages(prev => {
          const newMessages = [...prev];
          if (newMessages[messageIndex]) {
            newMessages[messageIndex] = {
              ...newMessages[messageIndex],
              text: currentText,
              isTyping: true
            };
          }
          return newMessages;
        });

        charIndex++;
        const timer = setTimeout(typeNextChar, typingSpeed);
        typewriterTimers.current.push(timer);
      } else {
        // Typing complete for this message
        setMessages(prev => {
          const newMessages = [...prev];
          if (newMessages[messageIndex]) {
            newMessages[messageIndex] = {
              ...newMessages[messageIndex],
              isTyping: false
            };
          }
          return newMessages;
        });

        if (callback) callback();
      }
    };

    typeNextChar();
  };

  // Add bot messages with typewriter effect
  const addBotMessagesWithTypewriter = (messageArray, initialDelay = 500) => {
    setIsTyping(true);

    const addMessageSequentially = (index) => {
      if (index >= messageArray.length) {
        setIsTyping(false);
        return;
      }

      const currentMessage = messageArray[index];

      // Add empty message placeholder
      const messageIndex = messages.length + index;
      setMessages(prev => [...prev, {
        text: '',
        sender: 'bot',
        timestamp: new Date(),
        isTyping: true
      }]);

      // Wait a bit before typing (simulates "thinking")
      setTimeout(() => {
        typewriterEffect(currentMessage, messageIndex, () => {
          // Wait before next message
          setTimeout(() => {
            addMessageSequentially(index + 1);
          }, 400);
        });
      }, initialDelay);
    };

    addMessageSequentially(0);
  };

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

    // All other conversation scripts remain the same...
    // (Keeping response structure identical for: experience, portfolio, skills, availability, pricing, contact, skeptical, comparison, culture, remote, industry, teamSize, learning, challenges, whyLeave, companyStage, references, compliment, yes, no, confused, random)

    experience: {
      responses: [
        ["BUCKLE UP FOR THE RESUME HIGHLIGHTS! 🎬", "7+ years of experience, but here's what matters:", "• Built legal transcription platform → 50K users, 100K+ sessions\n• Marketing Technologist at Strateq → $2M+ pipeline generated\n• Solo-built AI automation tools → saving companies hundreds of hours\n\nThat's not 'experience' - that's a track record of shipping shit that scales. Want details?"]
      ]
    },

    portfolio: {
      responses: [
        ["OH FUCK YES! LET ME SHOW YOU THE RECEIPTS! 📸", "Portfolio highlights:", "• Malaysian Legal Transcription Platform (50K users, 100K+ sessions)\n• Marketing automation systems ($2M+ pipeline)\n• AI workforce tools (live and working)\n• This interactive portfolio (meta, right? 😄)\n\nNo lorem ipsum, no fake testimonials, no 'coming soon' bullshit. Everything's LIVE and VERIFIABLE."]
      ]
    },

    skills: {
      responses: [
        ["OH BOY, THE SKILL LIST! 🛠️", "Marketing: HubSpot, Salesforce, Google Analytics, email automation, campaign strategy, conversion optimization", "Development: React, Next.js, Node.js, Python, APIs, databases, cloud deployment\nAI/Automation: OpenAI, Claude, custom agents, workflow automation, data analysis\nDesign: Figma, Photoshop, Midjourney, UI/UX, design systems\n\nThat's not a resume, that's an ARSENAL. Most people pick one lane. Harshana dominates all of them."]
      ]
    },

    availability: {
      responses: [
        ["GOOD QUESTION! ⏰", "Harshana's selective (because he's got options), but here's the thing:", "If you're building something legitimately cool and not a nightmare to work with, he's interested. Best move? Contact him directly with what you're building and why it matters."]
      ]
    },

    pricing: {
      responses: [
        ["AH, THE MONEY TALK! 💰", "Look, goldmines aren't cheap. But they're WORTH IT.", "Harshana's rates reflect his value: you're not hiring one person, you're hiring a marketer + developer + AI specialist in one. Best to discuss compensation directly based on scope and timeline."]
      ]
    },

    contact: {
      responses: [
        ["HELL YEAH! LET'S MAKE IT HAPPEN! 🚀", "Scroll down to the contact section (or I can navigate you there).", "Pro tip: Don't send generic 'we're hiring' messages. Tell Harshana:\n• What you're building\n• Why it matters\n• What problem you're solving\n\nHe responds to PASSION, not templates. Usually within 24 hours!"]
      ]
    },

    skeptical: {
      responses: [
        ["HEALTHY SKEPTICISM! I RESPECT IT! 🧐", "The internet IS full of bullshit portfolios with stock photos and fake metrics.", "Here's what's different:\n• Real GitHub repos (audit the code yourself)\n• Live demos (use the products)\n• Verifiable metrics (50K users isn't a guess)\n\nEverything Harshana claims is PROVABLE. Want to verify? Go ahead!"]
      ]
    },

    comparison: {
      responses: [
        ["OHHH YOU WANT THE COMPETITIVE ANALYSIS! 📊", "Here's how Harshana stacks up:", "Most candidates: Specialized in ONE thing\nHarshana: Expert in THREE things (marketing + dev + AI)\nMost candidates: Talk about potential\nHarshana: Shows proven results\nMost candidates: Need 'a team'\nHarshana: IS a team\n\nThat's why it's a goldmine find."]
      ]
    },

    culture: {
      responses: [
        ["CULTURE FIT QUESTION! 🎭", "Harshana thrives in environments that value:", "• Speed over bureaucracy\n• Results over process\n• Innovation over 'we've always done it this way'\n• Autonomy over micromanagement\n\nIf your company is allergic to red tape and obsessed with shipping, you found your person."]
      ]
    },

    remote: {
      responses: [
        ["REMOTE WORK QUESTION! 🌍", "Harshana's built to work remotely:", "• Managed distributed projects (timezones don't scare him)\n• Ships production code without office supervision\n• Communicates async like a pro\n\nRemote, hybrid, on-site - he's flexible. But remote is where he's most productive."]
      ]
    },

    industry: {
      responses: [
        ["INDUSTRY EXPERIENCE! 🏢", "Harshana's worked in:", "• Legal tech (transcription platform)\n• Marketing/SaaS (Strateq)\n• AI/Automation (custom tools)\n\nBut here's the thing: skills transfer across industries. The HOW matters more than the WHERE. What industry are you in?"]
      ]
    },

    teamSize: {
      responses: [
        ["TEAM SIZE QUESTION! 👥", "Harshana's worked in:", "• Solo (legal platform, 50K users)\n• Small teams (startups)\n• Large orgs (enterprises)\n\nHe adapts. But thrives most in small, nimble teams where he can own outcomes end-to-end."]
      ]
    },

    learning: {
      responses: [
        ["GROWTH MINDSET ALERT! 📚", "Harshana's constantly learning:", "• Started as dev → evolved to marketing → now AI automation\n• That's not job-hopping, that's skill-stacking\n\nCompanies that invest in learning culture get the best ROI from him because he compounds knowledge."]
      ]
    },

    challenges: {
      responses: [
        ["REAL TALK ABOUT CHALLENGES! 💪", "Harshana's faced:", "• Projects that didn't work (learned from them)\n• Tech that failed (pivoted quickly)\n• Timelines that slipped (adjusted)\n\nThe difference? He doesn't hide failures - he learns from them. That's maturity most candidates fake."]
      ]
    },

    whyLeave: {
      responses: [
        ["CAREER MOTIVATION! 🚀", "Harshana's looking for:", "• Bigger impact\n• More interesting problems\n• Teams that move fast\n• Companies building the future\n\nHe's not running FROM something, he's running TOWARD opportunity."]
      ]
    },

    companyStage: {
      responses: [
        ["STARTUP VS ENTERPRISE! 🏢", "Harshana speaks both languages:", "• Startups: Loves the speed, autonomy, impact\n• Enterprise: Appreciates the resources, scale, stability\n\nIdeal? Startup speed with enterprise resources. Which are you?"]
      ]
    },

    references: {
      responses: [
        ["REFERENCES AVAILABLE! 📞", "Harshana has references from:", "• Previous employers (can speak to work ethic)\n• Clients (can speak to results)\n• Collaborators (can speak to teamwork)\n\nHappy to provide upon request. But the portfolio is the best reference - work speaks louder than words."]
      ]
    },

    compliment: {
      responses: [
        ["RIGHT?! 🙌", "Yeah, Harshana built this entire site (including me!) from scratch.", "If you think THIS is impressive, wait till you see the legal platform with 50K users or the marketing automation that generated $2M+ pipeline. This is just the appetizer!"]
      ]
    },

    yes: {
      responses: [
        ["Awesome! 🎉", "Alright, what would you like to know more about?", "Skills? Projects? Experience? How to get in touch?"]
      ]
    },

    no: {
      responses: [
        ["No worries! 😊", "If you change your mind, I'm right here.", "Feel free to explore the site - lots of cool stuff!"]
      ]
    },

    confused: {
      responses: [
        ["Hmm, not quite sure what you're asking! 🤔", "Want to clarify?", "I can help with: Skills, Experience, Portfolio, Hiring, Contact info"]
      ]
    },

    random: {
      responses: [
        ["Haha that's random! 🎲", "But I'm built to talk about Harshana's professional goldmine-ness!", "Got questions about his work?"]
      ]
    }
  };

  // Get random item from array
  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // Get initial greeting
  const getInitialGreeting = () => {
    return getRandomItem(conversationScripts.initial.greetings);
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

    // Hiring intent
    if (lower.match(/hir(e|ing)|recruit|looking for|need (a |someone|talent)|job (opening|offer|position)|vacancy|candidate|role|position open/)) {
      setConversationStage('hiring');
      return getRandomItem(conversationScripts.hiring.responses);
    }

    // Marketing tech
    if (lower.match(/marketing tech|martech|marketing automation|hubspot|salesforce|crm|email automation|campaign|marketing stack|marketing operations|marketing engineer/)) {
      return getRandomItem(conversationScripts.marketingTech.responses);
    }

    // AI/Automation
    if (lower.match(/\bai\b|artificial intelligence|automation|automate|gpt|claude|openai|machine learning|ml|chatbot|agent|workflow|n8n|zapier|make\.com/)) {
      return getRandomItem(conversationScripts.aiAutomation.responses);
    }

    // Full-stack/Development
    if (lower.match(/full.?stack|developer|dev|engineer|coder|programming|react|node|python|javascript|typescript|frontend|backend|web dev/)) {
      return getRandomItem(conversationScripts.fullStack.responses);
    }

    // ROI / Business value
    if (lower.match(/\broi\b|return on investment|business value|impact|revenue|profit|save (money|time|cost)|worth it|value prop|business case/)) {
      return getRandomItem(conversationScripts.roi.responses);
    }

    // Skills
    if (lower.match(/skill|tech stack|what (can|does) he (do|know)|technologies|tools|expertise|proficient|capabilities/)) {
      return getRandomItem(conversationScripts.skills.responses);
    }

    // Experience
    if (lower.match(/experience|background|history|worked|previous|past (work|jobs|role)|resume|cv|career|years/)) {
      return getRandomItem(conversationScripts.experience.responses);
    }

    // Portfolio
    if (lower.match(/portfolio|project|work|built|case stud|example|demo|show me|what (has|did) he (built|build|make|create)/)) {
      return getRandomItem(conversationScripts.portfolio.responses);
    }

    // Availability
    if (lower.match(/available|availability|start|when (can|could)|timeline|free|notice period|how soon/)) {
      return getRandomItem(conversationScripts.availability.responses);
    }

    // Pricing
    if (lower.match(/cost|price|rate|expensive|cheap|budget|pay|salary|compensation|how much|charge/)) {
      return getRandomItem(conversationScripts.pricing.responses);
    }

    // Contact
    if (lower.match(/contact|reach out|email|talk|discuss|call|meeting|interview|get in touch|connect/)) {
      return getRandomItem(conversationScripts.contact.responses);
    }

    // Skeptical
    if (lower.match(/too good|sounds fake|bullshit|doubt|really|sure|prove it|evidence|show proof|verify|trust/)) {
      return getRandomItem(conversationScripts.skeptical.responses);
    }

    // Comparisons
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

    // Industry
    if (lower.match(/industry|sector|domain|vertical|market|field/)) {
      return getRandomItem(conversationScripts.industry.responses);
    }

    // Team size
    if (lower.match(/team size|company size|startup|enterprise|small team|large (team|company)/)) {
      return getRandomItem(conversationScripts.teamSize.responses);
    }

    // Learning
    if (lower.match(/learn|growth|develop|upskill|training|improve|education/)) {
      return getRandomItem(conversationScripts.learning.responses);
    }

    // Challenges
    if (lower.match(/challeng|difficult|fail|mistake|problem|struggle|overcome/)) {
      return getRandomItem(conversationScripts.challenges.responses);
    }

    // Why leaving
    if (lower.match(/why (leave|leaving)|looking for new|change|switch|move/)) {
      return getRandomItem(conversationScripts.whyLeave.responses);
    }

    // Company stage
    if (lower.match(/startup|enterprise|company stage|early.?stage|growth.?stage|mature company/)) {
      return getRandomItem(conversationScripts.companyStage.responses);
    }

    // References
    if (lower.match(/reference|testimonial|recommendation|referral|vouch|previous (employer|client)/)) {
      return getRandomItem(conversationScripts.references.responses);
    }

    // Compliments
    if (lower.match(/nice|cool|awesome|great|love|impressive|good job|well done|amazing|beautiful|fantastic|excellent|perfect/)) {
      return getRandomItem(conversationScripts.compliment.responses);
    }

    // Yes/No
    if (lower.match(/^(yes|yeah|yep|sure|ok|okay|yup|absolutely|definitely|affirmative)$/i)) {
      return getRandomItem(conversationScripts.yes.responses);
    }

    if (lower.match(/^(no|nah|nope|not really|not interested|negative)$/i)) {
      return getRandomItem(conversationScripts.no.responses);
    }

    // Confused
    if (lower.length < 3 || lower.match(/what|huh|idk|dunno|unclear|don't understand/)) {
      return getRandomItem(conversationScripts.confused.responses);
    }

    // Random
    return getRandomItem(conversationScripts.random.responses);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    setCharCount(value.length);
  };

  const handleSend = () => {
    if (message.trim() && !isTyping) {
      setMessages(prev => [...prev, { text: message, sender: 'user', timestamp: new Date() }]);
      const response = getBotResponse(message);
      setMessage('');
      setCharCount(0);

      setTimeout(() => {
        addBotMessagesWithTypewriter(response, 600);
      }, 300);
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
                <span className="text-xs font-medium text-zinc-300">
                  {isTyping ? 'Typing...' : "Harshana's AI Twin 🤖"}
                </span>
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
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {msg.text}
                      {msg.isTyping && <span className="inline-block w-1 h-4 ml-1 bg-zinc-100 animate-pulse">|</span>}
                    </p>
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
                disabled={isTyping}
                className="w-full px-6 py-4 bg-transparent border-none outline-none resize-none text-sm font-normal leading-relaxed text-zinc-100 placeholder-zinc-400 scrollbar-none disabled:opacity-50"
                placeholder={isTyping ? "Wait for me to finish typing..." : "Ask me anything about Harshana..."}
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
                  disabled={!message.trim() || isTyping}
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
