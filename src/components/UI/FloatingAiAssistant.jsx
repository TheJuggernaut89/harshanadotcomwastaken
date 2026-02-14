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

  // 30 different conversation scripts with dark humor and vulgar language
  const conversationScripts = {
    initial: {
      greetings: [
        ["Yo! 👋", "I'm Harshana's AI assistant (way cooler than ChatGPT, I promise).", "Quick question - you here to hire someone who actually ships shit, or just window shopping? 🛒"],
        ["Hey there! 😊", "Welcome to Harshana's digital resume on steroids.", "So what's the deal - looking for a dev who won't ghost you after the first sprint? 💼"],
        ["Sup! 🤖", "I'm the AI assistant that Harshana built to save you time.", "Are you hiring, or did you just stumble here by accident? 😂"],
        ["What's up! 👾", "I'm here to help you figure out if Harshana's the right fit for your team.", "Hiring mode activated, or just browsing? 🎯"],
      ]
    },

    hiring: {
      responses: [
        ["Ooh, business time! 💼", "Alright, let me save you some time scrolling through this whole damn site.", "What kind of unicorn are you hunting for?"],
        ["Hell yeah! 🚀", "Finally, someone who's actually hiring and not just collecting resumes like Pokémon cards.", "What's your biggest pain point right now?"],
        ["Nice! 😎", "So you're looking for someone who can actually build stuff that doesn't break at 2am?", "What role are you trying to fill?"],
        ["Perfect! 💪", "Let's cut through the BS - what specific skills are you looking for?", "Marketing tech? AI automation? Full-stack? Something else entirely?"],
      ]
    },

    marketingTech: {
      responses: [
        ["Smart choice! 🎯", "Harshana's literally built marketing automation systems that generated $2M+ in pipeline.", "Not the 'we increased engagement by 300%' bullshit - actual revenue. Want to see the receipts?"],
        ["Fucking brilliant! 💡", "The guy's automated everything from Salesforce → HubSpot migrations to full N8N workflows.", "Check out his portfolio - real numbers, real results, zero corporate fluff."],
        ["Oh hell yes! 🔥", "Marketing automation is literally Harshana's bread and butter.", "He's built systems that run on autopilot while you sleep. Want me to show you the good stuff?"],
      ]
    },

    aiAutomation: {
      responses: [
        ["NOW we're talking! 🤖", "Harshana's built AI agents that aren't just ChatGPT wrappers with a fancy UI.", "We're talking custom workflows, API integrations, the whole nine yards. Interested?"],
        ["Ah, a person of culture! 🎩", "AI automation is where the magic happens.", "Harshana's built stuff that saves companies literal months of manual work. Want the tour?"],
        ["Finally! 🙌", "Someone who gets it - AI isn't just a buzzword, it's a weapon.", "Check out his AI Workforce section. Shit will blow your mind."],
      ]
    },

    fullStack: {
      responses: [
        ["Solid choice! 💻", "Harshana's a full-stack dev who actually understands BOTH frontend AND backend.", "Not one of those 'I dabble in React' types. Want to see his tech stack?"],
        ["Nice! 🛠️", "Frontend: React, Next.js, Vue. Backend: Node.js, Python, all the APIs.", "Plus he can make it look pretty too (Figma, design systems, the works). Impressive, right?"],
        ["Good taste! 👨‍💻", "Harshana builds stuff that scales without falling apart when you hit traffic.", "7+ years of experience, so he's seen some shit. Want the full breakdown?"],
      ]
    },

    skills: {
      responses: [
        ["Oh boy, strap in! 🎢", "The guy's like a Swiss Army knife:", "Frontend (React, Next.js) • Backend (Node.js, Python) • AI (OpenAI, Claude) • Marketing (HubSpot, Salesforce) • Design (Figma, Photoshop)... fuck, the list goes on."],
        ["Buckle up! 🚗", "This dude's skill set is stupid long:", "He codes, he designs, he automates, he strategizes. Basically a one-man agency without the agency bullshit."],
        ["*cracks knuckles* 💪", "Here's the arsenal:", "- Builds web apps that don't suck\n- Automates boring shit with AI\n- Makes marketing tech actually work\n- Designs stuff that looks professional\n- Doesn't disappear when bugs happen"],
      ]
    },

    experience: {
      responses: [
        ["Alright, here's the highlight reel! 🎬", "7+ years in the game. Built a legal transcription platform (50K users). Generated $2M+ pipeline as Marketing Technologist.", "Has worked with startups AND enterprises, so he speaks both languages fluently."],
        ["Dude's been around! 👴", "Started as a dev, evolved into a marketing technologist, now builds AI automation.", "The journey's wild - check out his timeline. It's not your typical 'I learned to code in 3 months' story."],
        ["Experience? Oh he's got it! 📚", "From building platforms that scale to 50K+ users, to creating marketing systems that print money.", "Real projects, real impact, not just participation trophies."],
      ]
    },

    portfolio: {
      responses: [
        ["NOW we're getting to the good shit! 🎨", "Check out the Malaysian Legal Platform - 50K users, 100K+ sessions, built in 6 months.", "Or the AI automation tools that save companies hundreds of hours. This isn't vaporware, it's live and working."],
        ["Hell yes, let me show you! 👀", "Portfolio's got case studies with actual metrics (not the fake 'increased conversion by 1000%' crap).", "GitHub repos you can audit, live demos you can break. Transparency FTW!"],
        ["You're gonna love this! 😍", "Real projects, real code, real results.", "None of that 'coming soon' or 'under NDA' bullshit. Everything's verifiable."],
      ]
    },

    availability: {
      responses: [
        ["He's selective about projects! 🎯", "(Translation: doesn't work with assholes or people who think 'exposure' is payment 😂)", "But if you're building cool shit and not a nightmare to work with, yeah he's interested."],
        ["Good question! ⏰", "He's open to the right opportunity.", "Best bet: hit him up with what you're building. Pro tip: mention the PROBLEM you're solving, not just 'need a developer'."],
        ["Potentially! 🤔", "He's not desperately job hunting (got options), but always down for interesting projects.", "Shoot your shot - worst case, he says no. Best case, you get someone who won't bail after 2 weeks."],
      ]
    },

    skeptical: {
      responses: [
        ["LOL fair! 😂", "The internet IS full of bullshit portfolio sites with stock photos and fake testimonials.", "Here's the difference: Harshana actually SHOWS his work. GitHub repos, live demos, case studies with real metrics. Go ahead, verify everything!"],
        ["Healthy skepticism! 🧐", "I respect that. You've probably seen 1000 'senior full-stack AI blockchain guru' profiles.", "Check out the portfolio section - real code you can audit, real projects you can use. None of that lorem ipsum shit."],
        ["I get it! 🙄", "Everyone's a 'rockstar ninja' developer these days.", "Difference is, Harshana's built stuff people actually use. Not just tutorial projects or abandoned GitHub repos."],
      ]
    },

    pricing: {
      responses: [
        ["Ah, the money question! 💰", "Look, good talent isn't cheap, and cheap talent isn't good (you've learned that the hard way, haven't you? 😅)", "Best to discuss rates directly - depends on scope, timeline, commitment level. Hit the contact form!"],
        ["Straight to business! 💵", "Rates vary based on project complexity and timeline.", "But real talk: you get what you pay for. Would you rather pay peanuts and get monkeys, or invest in someone who'll actually deliver?"],
        ["The eternal question! 🤑", "Pricing depends on what you need - full-time? Part-time? Project-based?", "Contact him directly and he'll give you a straight answer. No games, no 'it depends' dance."],
      ]
    },

    contact: {
      responses: [
        ["Hell yeah! 🎉", "Alright, scroll down to the contact section or I can take you there.", "Fill out the form - Harshana usually responds within 24 hours (way faster than your current dev team ships features, I bet 😂)"],
        ["Let's do it! 🚀", "Contact form's right there at the bottom.", "Just don't send a generic 'we need a developer' message. Tell him what you're building and why it matters!"],
        ["Perfect! 📧", "Shooting to the contact section in 3... 2... 1...", "Pro tip: the more specific you are about your needs, the better response you'll get!"],
      ]
    },

    confused: {
      responses: [
        ["Hmm, not sure I follow! 🤔", "Want me to clarify something specific?", "I can tell you about Harshana's skills, experience, projects, or just point you to the right section."],
        ["Lost in the sauce? 😅", "No worries, happens to everyone.", "What are you actually trying to find out? Skills? Projects? How to hire him?"],
        ["Okay so... 🧐", "That's either really deep or I'm just too dumb to understand 😂", "Can you rephrase that? Or pick from: Skills | Experience | Portfolio | Contact"],
      ]
    },

    random: {
      responses: [
        ["Haha, that's... random! 🎲", "I'm here to help you figure out if Harshana's right for your team, not to discuss... that.", "Got any actual questions about his work?"],
        ["LOL okay! 😆", "Creative question, but I'm built for talking about dev/marketing/AI stuff.", "Wanna know about Harshana's skills instead?"],
        ["*scratches digital head* 🤖", "I... don't have a good answer for that one.", "But I CAN tell you about Harshana's projects, tech stack, or experience. Interested?"],
      ]
    },

    compliment: {
      responses: [
        ["Right?! 😎", "Yeah, Harshana built this whole site (including me) from scratch.", "Guy's got skills. Want to see more of what he's built?"],
        ["Glad you like it! 🙌", "Everything on this site - the animations, the AI assistant (that's me!), the interactive stuff - all Harshana.", "Check out his portfolio for even cooler shit!"],
        ["Thanks! 💪", "Harshana put serious work into this portfolio.", "If you think THIS is impressive, wait till you see his actual client projects!"],
      ]
    },

    insult: {
      responses: [
        ["Ouch! 😢", "I'm just trying to help you find talent, no need to be a dick about it.", "But hey, if you're not interested, that's cool. Close the chat and have a nice day! ✌️"],
        ["Well damn! 🙄", "Someone woke up on the wrong side of the bed.", "Look, if you're not hiring, that's fine. But don't take it out on the AI assistant, yeah?"],
        ["Brutal! 💀", "I've got thick digital skin though.", "Real talk - if this site isn't your vibe, there are 1000 other devs out there. No hard feelings!"],
      ]
    },

    job_offer: {
      responses: [
        ["YOOO! 🎊", "That's what I like to hear!", "Scroll down to the contact form and shoot Harshana the details. He'll get back to you ASAP!"],
        ["Holy shit! 🎉", "Okay okay, business time!", "Hit up the contact section with the deets - role, timeline, compensation range. Let's make this happen!"],
        ["LFG! 🚀", "Love to see it!", "Drop the info in the contact form and Harshana will reach out. Don't forget to mention what you're building!"],
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

  // Detect user intent and return appropriate response
  const getBotResponse = (userText) => {
    const lower = userText.toLowerCase();

    // Greetings
    if (lower.match(/^(hi|hey|hello|sup|yo|wassup|what's up|whats up)$/i)) {
      return getRandomItem(conversationScripts.initial.greetings);
    }

    // Name detection
    if (lower.includes("my name is") || lower.includes("i'm ") || lower.includes("i am ")) {
      const nameMatch = userText.match(/(?:my name is|i'm|i am)\s+([a-zA-Z]+)/i);
      if (nameMatch) {
        const detectedName = nameMatch[1];
        setUserName(detectedName);
        return [
          `Nice to meet you, ${detectedName}! 🤝`,
          "So what brings you here today?",
          "Hiring? Just browsing? Stalking? (jk... unless? 👀)"
        ];
      }
    }

    // Hiring intent
    if (lower.match(/hir(e|ing)|recruit|looking for|need (a |someone)|job offer|position/)) {
      setConversationStage('hiring');
      return getRandomItem(conversationScripts.hiring.responses);
    }

    // Marketing tech
    if (lower.match(/marketing|hubspot|salesforce|crm|automation|email|campaign/)) {
      return getRandomItem(conversationScripts.marketingTech.responses);
    }

    // AI/Automation
    if (lower.match(/\bai\b|artificial intelligence|automation|automate|gpt|claude|openai|machine learning|ml/)) {
      return getRandomItem(conversationScripts.aiAutomation.responses);
    }

    // Full-stack/Development
    if (lower.match(/full.?stack|developer|dev|engineer|coder|programming|react|node|python|javascript/)) {
      return getRandomItem(conversationScripts.fullStack.responses);
    }

    // Skills
    if (lower.match(/skill|tech stack|what (can|does) he (do|know)|technologies|tools/)) {
      return getRandomItem(conversationScripts.skills.responses);
    }

    // Experience
    if (lower.match(/experience|background|history|worked|previous|past (work|jobs)|resume|cv/)) {
      return getRandomItem(conversationScripts.experience.responses);
    }

    // Portfolio/Projects
    if (lower.match(/portfolio|project|work|built|case stud|example|demo|show me/)) {
      return getRandomItem(conversationScripts.portfolio.responses);
    }

    // Availability
    if (lower.match(/available|availability|start|when|timeline|free/)) {
      return getRandomItem(conversationScripts.availability.responses);
    }

    // Pricing/Rates
    if (lower.match(/cost|price|rate|expensive|cheap|budget|pay|salary|compensation/)) {
      return getRandomItem(conversationScripts.pricing.responses);
    }

    // Contact
    if (lower.match(/contact|reach out|email|talk|discuss|call|meeting|interview/)) {
      return getRandomItem(conversationScripts.contact.responses);
    }

    // Skeptical
    if (lower.match(/too good|sounds fake|bullshit|doubt|really|sure|prove it|evidence/)) {
      return getRandomItem(conversationScripts.skeptical.responses);
    }

    // Compliments
    if (lower.match(/nice|cool|awesome|great|love|impressive|good job|well done|amazing|beautiful/)) {
      return getRandomItem(conversationScripts.compliment.responses);
    }

    // Insults
    if (lower.match(/suck|shit|fuck off|stupid|dumb|terrible|hate|awful|garbage/)) {
      return getRandomItem(conversationScripts.insult.responses);
    }

    // Job offer
    if (lower.match(/offer you|want to hire|you'?re hired|job for|position for|work with us/)) {
      return getRandomItem(conversationScripts.job_offer.responses);
    }

    // Yes/No responses
    if (lower.match(/^(yes|yeah|yep|sure|ok|okay|yup|absolutely|definitely)$/i)) {
      return [
        "Awesome! 🎉",
        "Let me point you to the good stuff...",
        "Check out the Portfolio section below - that's where the magic is! ✨"
      ];
    }

    if (lower.match(/^(no|nah|nope|not really|not interested)$/i)) {
      return [
        "No worries! 😊",
        "If you change your mind, I'm right here.",
        "Feel free to explore the site - lots of cool shit to discover!"
      ];
    }

    // Random/Confused
    if (lower.length < 3 || lower.match(/what|huh|idk|dunno/)) {
      return getRandomItem(conversationScripts.confused.responses);
    }

    // Default fallback
    return getRandomItem(conversationScripts.random.responses);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    setCharCount(value.length);
  };

  const handleSend = () => {
    if (message.trim()) {
      // Add user message
      setMessages(prev => [...prev, { text: message, sender: 'user', timestamp: new Date() }]);

      // Get bot response
      const response = getBotResponse(message);

      // Clear input
      setMessage('');
      setCharCount(0);

      // Add bot response with delay
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
                <span className="text-xs font-medium text-zinc-300">Harshana's AI Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 text-xs font-medium bg-zinc-800/60 text-zinc-200 rounded-2xl">
                  GPT-4
                </span>
                <span className="px-2 py-1 text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl">
                  Pro
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
                    <p className="text-sm leading-relaxed">{msg.text}</p>
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

            {/* Controls Section */}
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

      {/* CSS for animations */}
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
