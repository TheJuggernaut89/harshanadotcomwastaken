import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Link, Code, Mic, Send, Info, Bot, X, Briefcase, Terminal } from 'lucide-react';
import { content } from '../../data/content';

const FloatingAiAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // New State for Persona, Region, and Tracking
  const [persona, setPersona] = useState(() => localStorage.getItem('ai_persona') || 'recruiter');
  const [userRegion, setUserRegion] = useState('global');
  const [conversationDepth, setConversationDepth] = useState(0);
  const [timeOnSite, setTimeOnSite] = useState(0);
  const [hasShownCTA, setHasShownCTA] = useState(false);
  const [hasShownLocalConnection, setHasShownLocalConnection] = useState(false);

  const maxChars = 2000;
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typewriterTimers = useRef([]);
  const ctaTimerRef = useRef(null);

  // Persist persona
  useEffect(() => {
    localStorage.setItem('ai_persona', persona);
  }, [persona]);

  // Detect Region
  useEffect(() => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timeZone === 'Asia/Kuala_Lumpur' || timeZone === 'Asia/Singapore') {
        setUserRegion(timeZone === 'Asia/Kuala_Lumpur' ? 'MY' : 'SG');
      }
    } catch (e) {
      console.error('Region detection failed', e);
    }
  }, []);

  // Track Time on Site
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnSite(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Smart CTA Trigger
  useEffect(() => {
    if (!hasShownCTA && !ctaTimerRef.current && isChatOpen && (conversationDepth >= 3 || timeOnSite >= 300)) {
      ctaTimerRef.current = setTimeout(() => {
        const ctaMessage = persona === 'recruiter'
          ? {
              text: "I've shown you my technical and marketing work—now I'd love to show you how I can apply this to your team. Would you like to download my PDF resume or book a 15-minute intro call? 📅",
              buttons: [
                { label: "Download Resume", url: "/resume.pdf" },
                { label: "Book Intro Call", url: "https://calendly.com/harshanajothi" }
              ]
            }
          : {
              text: "You've seen the stack—let's talk architecture. Want to see the GitHub repo for this bot or connect on LinkedIn? 💻",
              buttons: [
                { label: "View Repo", url: "https://github.com/harshanajothi" },
                { label: "Connect on LinkedIn", url: "https://linkedin.com/in/harshanajothi" }
              ]
            };

        addBotMessagesWithTypewriter([ctaMessage]);
        setHasShownCTA(true);
        ctaTimerRef.current = null;
      }, 2000);
    }
  }, [conversationDepth, timeOnSite, isChatOpen, hasShownCTA, persona]);

  // Local Connection Trigger (Malaysian)
  useEffect(() => {
    if (!hasShownLocalConnection && isChatOpen && userRegion === 'MY' && conversationDepth >= 1) {
       const timer = setTimeout(() => {
        addBotMessagesWithTypewriter([
          "Since you're also in Malaysia 🇲🇾, I'm always up for a coffee chat in PJ or KL to discuss how we can scale your marketing automation. Revert if you're interested lah! ☕"
        ]);
        setHasShownLocalConnection(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [userRegion, conversationDepth, isChatOpen, hasShownLocalConnection]);

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
      if (ctaTimerRef.current) clearTimeout(ctaTimerRef.current);
    };
  }, []);

  // Auto-open chat after 3 seconds and send first message
  useEffect(() => {
    if (!hasAutoOpened) {
      const timer = setTimeout(() => {
        setIsChatOpen(true);
        setHasAutoOpened(true);

        // Send initial AI greeting
        setTimeout(() => {
          sendInitialGreeting();
        }, 500);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [hasAutoOpened]);

  // Initial greeting from AI
  const sendInitialGreeting = async () => {
    const greetings = [
      "Hey! 👋 Quick question - are you hiring or just checking out if Harshana's legit?",
      "What's up! 🚀 Looking to hire a marketing technologist who actually codes?",
      "Yo! Welcome! 🎯 Fair warning: you just found a GOLDMINE for marketing teams. Hiring?",
      "Hey there! 💼 I'm here to show you why Harshana's a 3-in-1 hire. Interested?",
      "Sup! 🤖 Your marketing team drowning in manual work? Let me introduce you to someone who automates that shit."
    ];

    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    const initialMessages = [
      "Hey! 👋 I'm Harshana's AI twin (the more enthusiastic version 😄)",
      randomGreeting
    ];

    addBotMessagesWithTypewriter(initialMessages);
  };

  // Typewriter effect for a single message
  const typewriterEffect = (fullText, messageId, callback) => {
    let currentText = '';
    let charIndex = 0;
    const typingSpeed = 30;

    const typeNextChar = () => {
      if (charIndex < fullText.length) {
        currentText += fullText[charIndex];

        setMessages(prev => prev.map(msg =>
          msg.id === messageId
            ? { ...msg, text: currentText, isTyping: true }
            : msg
        ));

        charIndex++;
        const timer = setTimeout(typeNextChar, typingSpeed);
        typewriterTimers.current.push(timer);
      } else {
        setMessages(prev => prev.map(msg =>
          msg.id === messageId
            ? { ...msg, isTyping: false }
            : msg
        ));

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

      const msgContent = messageArray[index];
      const text = typeof msgContent === 'string' ? msgContent : msgContent.text;
      const buttons = typeof msgContent === 'string' ? null : msgContent.buttons;
      const messageId = Date.now() + Math.random();

      setMessages(prev => [...prev, {
        id: messageId,
        text: '',
        buttons: buttons,
        sender: 'bot',
        timestamp: new Date(),
        isTyping: true
      }]);

      setTimeout(() => {
        typewriterEffect(text, messageId, () => {
          setTimeout(() => {
            addMessageSequentially(index + 1);
          }, 400);
        });
      }, initialDelay);
    };

    addMessageSequentially(0);
  };

  // Call Gemini API
  const callGeminiAPI = async (userMessage) => {
    try {
      // Prepare content (strip heavy arrays)
      const simplifiedContent = {
        ...content,
        projects: content.projects.map(p => ({...p, image: undefined})),
        experience: content.experience.map(e => ({...e, workplaceGallery: undefined, videoGallery: undefined})),
        certifications: content.certifications,
        skills: content.skills,
        tools: content.tools
      };

      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory,
          content: simplifiedContent,
          persona,
          userRegion
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('Gemini API Error:', error);

      // Fallback responses if API fails
      return {
        messages: [
          "Sean's AI assistant is currently taking a coffee break. ☕",
          "Please feel free to browse the resume manually or reach out via email!"
        ],
        fallback: true
      };
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    setCharCount(value.length);
  };

  const handleSend = async () => {
    if (message.trim() && !isTyping) {
      const userMessage = message.trim();

      // Increment conversation depth
      setConversationDepth(prev => prev + 1);

      // Add user message to UI
      setMessages(prev => [...prev, {
        text: userMessage,
        sender: 'user',
        timestamp: new Date()
      }]);

      // Add to conversation history for context
      setConversationHistory(prev => [...prev, {
        role: 'user',
        content: userMessage
      }]);

      // Clear input
      setMessage('');
      setCharCount(0);

      // Get AI response
      setIsTyping(true);

      // Thinking deeply timeout
      let requestPending = true;
      const thinkingTimer = setTimeout(() => {
        if (requestPending) {
          setMessages(prev => {
             // Only add if not already added
             const lastMsg = prev[prev.length - 1];
             if (lastMsg && lastMsg.text === "Sean's AI is thinking deeply... 🤔") return prev;

             return [...prev, {
                text: "Sean's AI is thinking deeply... 🤔",
                sender: 'bot',
                timestamp: new Date(),
                isTyping: false
             }];
          });
        }
      }, 8000);

      const aiResponse = await callGeminiAPI(userMessage);
      requestPending = false;
      clearTimeout(thinkingTimer);

      // Remove "Thinking deeply" message if it was added
      setMessages(prev => prev.filter(msg => msg.text !== "Sean's AI is thinking deeply... 🤔"));

      // Add AI response to conversation history
      if (aiResponse.messages && aiResponse.messages.length > 0) {
        const fullResponse = aiResponse.messages.join(' ');
        setConversationHistory(prev => [...prev, {
          role: 'assistant',
          content: fullResponse
        }]);
      }

      // Display response with typewriter effect
      setTimeout(() => {
        if (aiResponse.messages && aiResponse.messages.length > 0) {
          addBotMessagesWithTypewriter(aiResponse.messages, 600);
        } else {
          setIsTyping(false);
        }
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
    <div className="fixed bottom-6 right-6 z-[1400]">
      {/* Floating 3D Glowing AI Logo */}
      <button
        aria-label="Portfolio Assistant"
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
          className="absolute bottom-24 right-0 w-[90vw] sm:w-[450px] max-w-[calc(100vw-2rem)] max-h-[80vh] sm:max-h-[600px] transition-all duration-300 origin-bottom-right flex flex-col"
          style={{
            animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
          }}
        >
          <div className="relative flex flex-col rounded-3xl bg-gradient-to-br from-zinc-800/95 to-zinc-900/95 border border-zinc-500/50 shadow-2xl backdrop-blur-3xl overflow-hidden h-full">

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-4 pb-3 border-b border-zinc-700/50">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-zinc-300">
                    {isTyping ? 'Typing...' : "Harshana's AI Twin"}
                  </span>

                  {/* Persona Switcher */}
                  <button
                    onClick={() => setPersona(prev => prev === 'recruiter' ? 'dev' : 'recruiter')}
                    className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white transition-colors mt-0.5"
                    aria-label="Toggle Persona"
                  >
                    {persona === 'recruiter' ? (
                      <>
                        <Briefcase className="w-3 h-3" />
                        <span>Recruiter Mode</span>
                      </>
                    ) : (
                      <>
                        <Terminal className="w-3 h-3 text-green-400" />
                        <span className="text-green-400">Dev Mode</span>
                      </>
                    )}
                    <span className="opacity-50 ml-1 text-[8px] border border-zinc-600 rounded px-1">SWITCH</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {userRegion === 'MY' && (
                  <span className="hidden sm:inline-block px-2 py-1 text-xs font-medium bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 rounded-2xl border border-blue-500/30">
                    🇲🇾 MY
                  </span>
                )}
                <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded-2xl border border-yellow-500/30 whitespace-nowrap">
                  💎 GOLDMINE
                </span>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1.5 rounded-full hover:bg-zinc-700/50 transition-colors"
                  aria-label="Close Chat"
                >
                  <X className="w-4 h-4 text-zinc-400" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 min-h-[300px] max-h-[350px]">
              {messages.map((msg, index) => (
                <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
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

                  {/* Action Buttons */}
                  {msg.buttons && !msg.isTyping && (
                    <div className="flex flex-wrap gap-2 mt-2 ml-1 max-w-[85%]">
                      {msg.buttons.map((btn, btnIndex) => (
                        <a
                          key={btnIndex}
                          href={btn.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-medium text-white rounded-lg border border-zinc-600 transition-all hover:scale-105 flex items-center gap-1 shadow-sm"
                        >
                           {btn.label}
                           <span className="opacity-50">↗</span>
                        </a>
                      ))}
                    </div>
                  )}
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
                  aria-label="Send message"
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
