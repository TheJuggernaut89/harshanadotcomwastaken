import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Download, Mail, User, Briefcase, Code, Zap } from 'lucide-react';
import { trackChatbotEvent } from '../../utils/chatbotAnalytics';

const InteractiveChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userIntent, setUserIntent] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages appear
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Creative intro sequence when chatbot opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      trackChatbotEvent('chatbot_opened');

      // First message - loading effect
      setTimeout(() => {
        addBotMessage("⚡ Initializing AI assistant...");
      }, 300);

      // Second message - personality reveal
      setTimeout(() => {
        addBotMessage("⚡ Loading corporate speak... ERROR 404\n\n🤖 Loading personality... SUCCESS");
      }, 1500);

      // Third message - actual greeting
      setTimeout(() => {
        setShowIntro(false);
        addBotMessage(
          "Yo! 👋\n\nSo you stumbled onto Harshana's portfolio and thought \"hmm, let me see if this person is actually legit or just another resume warrior.\"\n\nSmart move.\n\nI'm basically Harshana's digital hype person, except I actually know what I'm talking about and won't waste your time with corporate BS.\n\nWhat do you wanna know?",
          [
            { text: "Show me the skills", action: "skills", icon: Code },
            { text: "Impress me (projects)", action: "projects", icon: Briefcase },
            { text: "The AI stuff", action: "ai", icon: Zap },
            { text: "Just hire them already", action: "contact", icon: Mail }
          ]
        );
      }, 3000);
    }
  }, [isOpen]);

  const addBotMessage = (text, quickReplies = null, delay = 0) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        text,
        quickReplies,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, delay);
  };

  const addUserMessage = (text) => {
    trackChatbotEvent('message_sent', { messageLength: text.length });
    setMessages(prev => [...prev, {
      type: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  // Intent detection and response logic
  const handleQuickReply = (action) => {
    trackChatbotEvent('quick_reply', { action });
    let responseText = '';
    let followUpActions = [];

    switch (action) {
      case 'skills':
        responseText = "Alright, buckle up. 🚀\n\nHarshana isn't your typical \"I know HTML\" developer. We're talking:\n\n• **AI & Automation**: GPT-4, Claude API, N8N workflows that actually work (not the janky stuff most people ship)\n• **Marketing + Tech Combo**: Full-stack campaigns with real analytics, not vanity metrics\n• **Actual Development**: React, Python, JavaScript - code that doesn't make senior devs cry\n• **Strategy**: Data-driven decisions, not \"let's try this and pray\" nonsense\n\nBasically, the rare human who can code AND talk to clients without making everyone uncomfortable.\n\nWanna see receipts?";
        followUpActions = [
          { text: "Show me receipts (projects)", action: "projects", icon: Sparkles },
          { text: "Tell me about the AI stuff", action: "ai", icon: Zap },
          { text: "Just give me the resume", action: "download", icon: Download }
        ];
        setUserIntent('skills');
        scrollToSection('skills');
        break;

      case 'projects':
        responseText = "Oh, you want the GOOD stuff? 😏\n\nHere's what happens when you give Harshana caffeine and API keys:\n\n**Malaysian Marketing AI Platform** 🇲🇾\nNot your basic GPT wrapper. This beast handles 4 languages, cultural context, and Malaysian compliance. Most people can't even get ChatGPT to spell \"Nasi Lemak\" right.\n\n**AI Workforce Automation** ⚡\nFull campaign automation that saved 70% time. Translation: one person doing the work of three, without the existential crisis.\n\n**Legal Transcription Platform** ⚖️\nML-powered doc processing. Because lawyers have better things to do than transcribe stuff manually.\n\nPick your poison:";
        followUpActions = [
          { text: "Malaysian AI deep-dive", action: "malaysian", icon: Code },
          { text: "Show me the automation", action: "workflows", icon: Zap },
          { text: "All the projects", action: "portfolio-full", icon: Briefcase }
        ];
        setUserIntent('projects');
        scrollToSection('projects');
        break;

      case 'ai':
        responseText = "Ah yes, the AI stuff. 🤖\n\nLook, everyone and their grandma claims they \"do AI\" now because they used ChatGPT once. Harshana actually BUILDS this stuff:\n\n• **Real GPT-4 Integration**: Not just copy-pasting prompts. Actual API work, error handling, the works.\n• **N8N Automation Pipelines**: Marketing ops that run while you sleep. 70% time saved = more time for important stuff like arguing on Twitter.\n• **Cultural AI Systems**: Because \"AI that understands Malaysian context\" isn't a checkbox feature, it's actual engineering.\n• **Analytics That Matter**: Data that drives decisions, not dashboards that look pretty in screenshots.\n\nResult? 3x content output without tripling headcount. Math!\n\nWanna see it in action?";
        followUpActions = [
          { text: "Show me the AI tools", action: "ai-tools", icon: Zap },
          { text: "The automation workflows", action: "workflows", icon: Code },
          { text: "I'm sold. Let's talk.", action: "schedule", icon: Mail }
        ];
        setUserIntent('ai');
        scrollToSection('ai-tools');
        break;

      case 'contact':
        responseText = "Ooh, moving fast! I like it. 😎\n\nLook, I could give you the whole \"synergy\" speech, but let's be real - you're here because you need someone who can actually ship stuff.\n\n📧 **Email**: your-email@example.com (response time: faster than your current dev team's \"it's in code review\")\n\n💼 **LinkedIn**: [Your LinkedIn] (if you're into that professional networking thing)\n\n📄 **Resume**: One click away. It's actually updated, unlike most people's.\n\n📅 **Calendar**: Open for real conversations, not just \"pick your brain\" coffee chats.\n\nWhat's your move?";
        followUpActions = [
          { text: "Send email now", action: "email", icon: Mail },
          { text: "Gimme the resume", action: "download", icon: Download },
          { text: "Book a call", action: "schedule", icon: User }
        ];
        setUserIntent('contact');
        scrollToSection('contact');
        break;

      case 'download':
        trackChatbotEvent('download_resume');
        responseText = "📄 **Boom! Resume incoming.**\n\nYour download just started. If it didn't, your browser is being weird - check your pop-up blocker.\n\nInside you'll find:\n✓ Actual accomplishments with numbers (not \"team player\" fluff)\n✓ Tech stack that's relevant in 2024\n✓ Projects that actually shipped\n✓ Contact info that works\n\nNo 3-page essays about \"passion for innovation.\" Just the good stuff.\n\nNow what?";
        followUpActions = [
          { text: "Let's schedule a call", action: "schedule", icon: Mail },
          { text: "I have questions", action: "open-chat", icon: MessageCircle },
          { text: "Show me more projects", action: "projects", icon: Briefcase }
        ];
        // Trigger download (you'll need to add your resume PDF)
        window.open('/resume.pdf', '_blank');
        break;

      case 'schedule':
        responseText = "📅 **Hell yeah, let's do this.**\n\nHarshana's actually available for real conversations (not the \"let me get back to you\" types):\n\n• **Technical deep-dives**: Bring your hardest architecture questions\n• **Project walkthroughs**: See the actual code, not just slides\n• **Culture fit chats**: Let's make sure we're not gonna hate each other\n• **\"How TF did you build that\" sessions**: The behind-the-scenes of the AI stuff\n\nNo BS, no sales pitch, just two humans talking about whether this makes sense.\n\nPick your method:";
        followUpActions = [
          { text: "Open calendar link", action: "calendar", icon: User },
          { text: "Just email instead", action: "email", icon: Mail }
        ];
        break;

      case 'email':
        trackChatbotEvent('email_click');
        window.location.href = 'mailto:your-email@example.com?subject=Interview%20Request&body=Hi%20Harshana,%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20discuss...';
        responseText = "✉️ **Email time!**\n\nYour email client should've just popped open. If it didn't, technology has failed us both.\n\nManual backup: **your-email@example.com**\n\nJust... please don't start the email with \"Dear Sir/Madam.\" We're not writing to the tax office. 😅";
        break;

      case 'malaysian':
        scrollToSection('malaysian-platform');
        responseText = "🇲🇾 **Alright, the Malaysian AI Platform is wild.**\n\nImagine trying to make AI understand Malaysian context - not just Bahasa Melayu, but the ACTUAL way Malaysians talk. The Manglish. The cultural nuances. The fact that \"can\" means like 17 different things.\n\nWhat Harshana built:\n• **3-layer AI** with the best names ever (Kopitiam Intel, Mamak Workshop, Makcik Approval)\n• **4 languages** that actually work together\n• **Cultural context engine** so it doesn't suggest pork rendang 💀\n• **Compliance checker** because Malaysian regulations are... special\n\nTech stack: GPT-4, React, N8N, custom ML models, and probably too much coffee.\n\nWanna see it work?";
        followUpActions = [
          { text: "Show me the demo", action: "demo-malaysian", icon: Sparkles },
          { text: "How'd you build this?", action: "tech-malaysian", icon: Code },
          { text: "Other projects", action: "projects", icon: Briefcase }
        ];
        break;

      case 'workflows':
        scrollToSection('ai-tools');
        responseText = "⚡ **AI Workflow Automation**\n\nEnd-to-end marketing automation:\n\n• Content generation → Review → Publishing\n• Automated A/B testing & optimization\n• Multi-channel distribution (social, email, ads)\n• Performance analytics dashboard\n\nResults: 70% time saved, 300% content increase";
        followUpActions = [
          { text: "See Workflows", action: "view-workflows", icon: Zap },
          { text: "Other Projects", action: "projects", icon: Briefcase }
        ];
        break;

      case 'portfolio-full':
        scrollToSection('projects');
        responseText = "📁 **Full Portfolio**\n\nScrolled to the projects section! You'll find:\n\n• Malaysian AI Platform\n• Workforce Automation Tools\n• Legal Tech Solutions\n• Marketing Campaign Systems\n\nEach with live demos and case studies.";
        followUpActions = [
          { text: "Download Resume", action: "download", icon: Download },
          { text: "Schedule Call", action: "schedule", icon: Mail }
        ];
        break;

      default:
        responseText = "I can help you with:\n• Skills & experience\n• Projects & demos\n• Contact information\n• Resume download\n\nWhat would you like to know?";
        followUpActions = [
          { text: "View Skills", action: "skills", icon: Code },
          { text: "See Projects", action: "projects", icon: Briefcase }
        ];
    }

    addBotMessage(responseText, followUpActions, 800);
  };

  const handleUserInput = (text) => {
    if (!text.trim()) return;

    addUserMessage(text);
    setInputValue('');

    // Simple keyword detection for open-ended questions
    const lowerText = text.toLowerCase();
    let response = '';
    let actions = [];

    if (lowerText.includes('skill') || lowerText.includes('experience')) {
      handleQuickReply('skills');
    } else if (lowerText.includes('project') || lowerText.includes('portfolio') || lowerText.includes('work')) {
      handleQuickReply('projects');
    } else if (lowerText.includes('ai') || lowerText.includes('automation') || lowerText.includes('gpt')) {
      handleQuickReply('ai');
    } else if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('call') || lowerText.includes('interview')) {
      handleQuickReply('contact');
    } else if (lowerText.includes('resume') || lowerText.includes('cv') || lowerText.includes('download')) {
      handleQuickReply('download');
    } else if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
      response = "Hey hey! 👋\n\nLook at you being all polite and stuff. I appreciate it.\n\nSo, what brings you here? Hiring? Curious? Procrastinating at work? (No judgment, we've all been there)";
      actions = [
        { text: "Show me skills", action: "skills", icon: Code },
        { text: "Impress me", action: "projects", icon: Briefcase },
        { text: "Let's connect", action: "contact", icon: Mail }
      ];
      addBotMessage(response, actions, 600);
    } else if (lowerText.includes('hire') || lowerText.includes('hiring') || lowerText.includes('job')) {
      response = "Ooh, we're talking business! 💼\n\nYou're looking to hire? Smart. The market's tough and you need someone who can actually ship.\n\nHere's the deal - Harshana's the rare combo of:\n✓ Can code without creating tech debt nightmares\n✓ Understands marketing (like, actually)\n✓ Builds AI stuff that works in production\n✓ Won't ghost you after the first sprint\n\nWhat do you wanna know first?";
      actions = [
        { text: "Show me the work", action: "projects", icon: Briefcase },
        { text: "Technical skills", action: "skills", icon: Code },
        { text: "Let's schedule a call", action: "schedule", icon: Mail }
      ];
      addBotMessage(response, actions, 600);
    } else if (lowerText.includes('thanks') || lowerText.includes('thank you')) {
      response = "You're welcome! 😊\n\nHonestly, this is way more fun than sending you to a boring FAQ page.\n\nAnything else you wanna know? Or are you good?";
      actions = [
        { text: "Actually, one more thing...", action: "open-chat", icon: MessageCircle },
        { text: "Download the resume", action: "download", icon: Download },
        { text: "I'm convinced. Let's talk.", action: "contact", icon: Mail }
      ];
      addBotMessage(response, actions, 600);
    } else {
      response = "Hmm, interesting question! 🤔\n\nI'm pretty good at this, but I'm not THAT smart. Let me help you navigate to what you're looking for:\n\n**What I CAN help with:**\n• Skills & tech expertise\n• Project walkthroughs\n• AI capabilities\n• Getting you in touch with Harshana\n\nWhat sounds most useful?";
      actions = [
        { text: "Technical skills", action: "skills", icon: Code },
        { text: "Project portfolio", action: "projects", icon: Briefcase },
        { text: "AI stuff", action: "ai", icon: Zap },
        { text: "Contact info", action: "contact", icon: Mail }
      ];
      addBotMessage(response, actions, 600);
    }
  };

  const scrollToSection = (sectionId) => {
    trackChatbotEvent('section_navigation', { sectionId });
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserInput(inputValue);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-full shadow-2xl flex items-center justify-center group hover:shadow-primary/50 transition-all duration-300"
          >
            <MessageCircle className="w-7 h-7 text-white" />

            {/* Pulse animation */}
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></span>

            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-3 px-4 py-2 bg-navy-dark text-white text-sm font-medium rounded-lg shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Click me. I'm more fun than your typical chatbot. 😏
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-8 border-transparent border-l-navy-dark"></div>
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] bg-white dark:bg-navy-dark rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-white/10"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary-light p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">AI Assistant (with attitude)</h3>
                  <p className="text-white/80 text-xs">Online • No BS Mode Activated</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Messages Container */}
            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-navy-darker"
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-white rounded-br-sm'
                          : 'bg-white dark:bg-navy-dark text-gray-800 dark:text-white rounded-bl-sm shadow-md'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                    </div>
                    <p className={`text-[10px] text-gray-400 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                      {message.timestamp}
                    </p>

                    {/* Quick Reply Buttons */}
                    {message.quickReplies && (
                      <div className="mt-3 space-y-2">
                        {message.quickReplies.map((reply, idx) => (
                          <motion.button
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.02, x: 2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              addUserMessage(reply.text);
                              handleQuickReply(reply.action);
                            }}
                            className="flex items-center gap-2 w-full px-4 py-2.5 bg-white dark:bg-navy-dark border-2 border-primary/20 hover:border-primary text-gray-700 dark:text-gray-200 rounded-xl text-sm font-medium transition-all shadow-sm hover:shadow-md group"
                          >
                            {reply.icon && <reply.icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />}
                            <span>{reply.text}</span>
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-navy-dark rounded-2xl rounded-bl-sm px-4 py-3 shadow-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-navy-dark border-t border-gray-200 dark:border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-navy-darker border-2 border-transparent focus:border-primary rounded-xl text-sm outline-none transition-all text-gray-800 dark:text-white placeholder-gray-400"
                />
                <button
                  onClick={() => handleUserInput(inputValue)}
                  disabled={!inputValue.trim()}
                  className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-2 text-center">
                Powered by AI • 0% corporate jargon guaranteed
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InteractiveChatbot;
