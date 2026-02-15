import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Link, Code, Mic, Send, Info, Bot, X, Briefcase, Terminal } from 'lucide-react';
import TerminalBlock from './TerminalBlock';

const FloatingAiAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [persona, setPersona] = useState(null);
  const [hasNudged, setHasNudged] = useState(false);
  const maxChars = 2000;
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typewriterTimers = useRef([]);

  // Load persona from localStorage
  useEffect(() => {
    const savedPersona = localStorage.getItem('ai_persona');
    if (savedPersona) {
      setPersona(savedPersona);
    }
  }, []);

  const handleSetPersona = (selectedPersona) => {
    setPersona(selectedPersona);
    localStorage.setItem('ai_persona', selectedPersona);
    setTimeout(() => {
      sendInitialGreeting(selectedPersona);
    }, 500);
  };

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

        // Only send greeting if persona is already set
        const savedPersona = localStorage.getItem('ai_persona');
        if (savedPersona) {
          setTimeout(() => {
            sendInitialGreeting(savedPersona);
          }, 500);
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [hasAutoOpened]);

  // Session Timer for Nudge (120s)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasNudged) {
        setHasNudged(true);
        setIsChatOpen(true); // Proactively open

        const nudgeMsg = "You've been researching for a while! 🕵️ If you find the 'Sweet Tooth' keyword in my resume, I'll reveal my secret cheesecake crust tip. 🍰";

        // Ensure we don't interrupt if typing
        if (!isTyping) {
            addBotMessagesWithTypewriter([nudgeMsg], 1000);
        }
      }
    }, 120000);

    return () => clearTimeout(timer);
  }, []);

  // Initial greeting from AI
  const sendInitialGreeting = async (currentPersona) => {
    let greetings = [];
    let intro = "";

    if (currentPersona === 'recruiter') {
      intro = "Hello! 👋 I'm Harshana's Digital Assistant.";
      greetings = [
        "Are you looking to maximize your marketing ROI with a technical lead?",
        "I can show you how Harshana bridges the gap between Marketing and Engineering.",
        "Harshana is a '3-in-1' strategic hire: Marketer, Developer, and Designer. Interested in the KPIs?",
        "Need someone who builds systems, not just campaigns? Let's discuss value."
      ];
    } else {
      // Dev / Default
      intro = "Yo! 🚀 Harshana's AI Twin here (running on caffeine & code).";
      greetings = [
        "Checking out the stack? I can walk you through the n8n workflows and React components.",
        "Warning: This portfolio contains high doses of automation and terrible puns.",
        "You found the dev console! Want to see how we automated the boring stuff?",
        "Sup! Ready to talk about APIs, latency, and how we hacked the marketing funnel?"
      ];
    }

    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];

    const initialMessages = [
      intro,
      randomGreeting
    ];

    addBotMessagesWithTypewriter(initialMessages);
  };

  // Handle Navigation
  const handleNavigation = (targetId) => {
    try {
      const element = document.querySelector(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        element.classList.add('highlight-section');
        setTimeout(() => {
          element.classList.remove('highlight-section');
        }, 3000);
      }
    } catch (e) {
      console.error("Navigation error:", e);
    }
  };

  // Typewriter effect for a single message by ID
  const typewriterEffect = (fullText, targetId, callback) => {
    let currentText = '';
    let charIndex = 0;
    const typingSpeed = 30;

    const typeNextChar = () => {
      if (charIndex < fullText.length) {
        currentText += fullText[charIndex];

        setMessages(prev => {
          return prev.map(msg =>
            msg.id === targetId
              ? { ...msg, text: currentText, isTyping: true }
              : msg
          );
        });

        charIndex++;
        const timer = setTimeout(typeNextChar, typingSpeed);
        typewriterTimers.current.push(timer);
      } else {
        setMessages(prev => {
          return prev.map(msg =>
            msg.id === targetId
              ? { ...msg, isTyping: false }
              : msg
          );
        });

        if (callback) callback();
      }
    };

    typeNextChar();
  };

  // Add bot messages with typewriter effect and command processing
  const addBotMessagesWithTypewriter = (messageArray, initialDelay = 500) => {
    setIsTyping(true);

    // Pre-process messages
    const processedQueue = [];
    messageArray.forEach(msg => {
      let currentText = msg;

      // Extract NAV commands
      const navMatch = currentText.match(/\[NAV:\s*(#[a-zA-Z0-9_-]+)\]/);
      if (navMatch) {
        processedQueue.push({ type: 'nav', target: navMatch[1] });
        currentText = currentText.replace(navMatch[0], '').trim();
      }

      // Extract SIMULATE commands
      const simMatch = currentText.match(/\[SIMULATE:\s*([a-zA-Z0-9_-]+)\]/);
      if (simMatch) {
        const parts = currentText.split(simMatch[0]);
        if (parts[0].trim()) processedQueue.push({ type: 'text', content: parts[0].trim() });
        processedQueue.push({ type: 'simulation', content: simMatch[1] });
        if (parts[1] && parts[1].trim()) processedQueue.push({ type: 'text', content: parts[1].trim() });
      } else {
        if (currentText) processedQueue.push({ type: 'text', content: currentText });
      }
    });

    const processQueueItem = (index) => {
      if (index >= processedQueue.length) {
        setIsTyping(false);
        return;
      }

      const item = processedQueue[index];

      if (item.type === 'nav') {
        handleNavigation(item.target);
        processQueueItem(index + 1);
      } else if (item.type === 'simulation') {
         setMessages(prev => [...prev, {
           id: Date.now() + Math.random(),
           type: 'simulation',
           content: item.content,
           sender: 'bot',
           timestamp: new Date()
         }]);
         setTimeout(() => {
           processQueueItem(index + 1);
         }, 800);
      } else {
        const newMsgId = Date.now() + Math.random();
        setMessages(prev => [...prev, {
          id: newMsgId,
          text: '',
          sender: 'bot',
          timestamp: new Date(),
          isTyping: true
        }]);

        setTimeout(() => {
            typewriterEffect(item.content, newMsgId, () => {
                 setTimeout(() => {
                   processQueueItem(index + 1);
                 }, 400);
            });
        }, initialDelay);
      }
    };

    processQueueItem(0);
  };

  // Call Gemini API
  const callGeminiAPI = async (userMessage) => {
    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory,
          persona: persona // Send persona to backend
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
          "Oops! My AI brain had a hiccup! 🤖",
          "But here's the TL;DR: Harshana's a marketing technologist who codes, built platforms with 50K+ users, and generated $2M+ pipeline.",
          "Check out the portfolio below or contact him directly!"
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

      const aiResponse = await callGeminiAPI(userMessage);

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
          <div className={`relative flex flex-col rounded-3xl backdrop-blur-3xl overflow-hidden h-full border shadow-2xl transition-all duration-500 ${
            persona === 'dev'
              ? 'bg-black/90 border-green-500/50 shadow-green-500/20'
              : 'bg-gradient-to-br from-zinc-800/95 to-zinc-900/95 border-zinc-500/50'
          }`}>

            {/* Header */}
            <div className={`flex items-center justify-between px-6 pt-4 pb-3 border-b ${
              persona === 'dev' ? 'border-green-500/30 bg-green-900/20' : 'border-zinc-700/50'
            }`}>
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full animate-pulse ${persona === 'dev' ? 'bg-green-500' : 'bg-green-500'}`}></div>
                <span className={`text-xs font-medium ${persona === 'dev' ? 'text-green-400 font-mono' : 'text-zinc-300'}`}>
                  {isTyping ? 'Typing...' : (persona === 'dev' ? 'SYSTEM_ONLINE' : "Harshana's AI Twin 🤖")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {persona && (
                   <span className={`px-2 py-1 text-xs font-medium rounded-2xl border ${
                     persona === 'dev'
                     ? 'bg-green-500/10 text-green-400 border-green-500/30'
                     : 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/30'
                   }`}>
                     {persona === 'dev' ? '> DEV_MODE' : '🤖 AI-Powered'}
                   </span>
                )}
                <button
                  onClick={() => setIsChatOpen(false)}
                  className={`p-1.5 rounded-full transition-colors ${
                    persona === 'dev' ? 'hover:bg-green-500/20 text-green-500' : 'hover:bg-zinc-700/50 text-zinc-400'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Persona Selection (If no persona set) */}
            {!persona && (
              <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6 animate-in fade-in duration-500">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-bold text-white">Choose Your Experience</h3>
                  <p className="text-zinc-400 text-sm">How would you like to interact with this portfolio?</p>
                </div>

                <div className="grid grid-cols-1 gap-4 w-full">
                  <button
                    onClick={() => handleSetPersona('recruiter')}
                    className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-700/50 hover:border-zinc-600 transition-all group"
                  >
                    <div className="p-3 rounded-full bg-blue-500/20 text-blue-400 group-hover:bg-blue-500/30 group-hover:scale-110 transition-all">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white">Recruiter Mode</div>
                      <div className="text-xs text-zinc-400">Focus on ROI, Business Value & KPIs</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSetPersona('dev')}
                    className="flex items-center gap-4 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-700/50 hover:border-green-500/50 transition-all group"
                  >
                    <div className="p-3 rounded-full bg-green-500/20 text-green-400 group-hover:bg-green-500/30 group-hover:scale-110 transition-all">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white group-hover:text-green-400 transition-colors">Dev Mode</div>
                      <div className="text-xs text-zinc-400">Focus on Tech Stack, Code & Automation</div>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Messages (Only if persona is set) */}
            {persona && (
              <>
                <div className={`flex-1 overflow-y-auto px-6 py-4 space-y-4 min-h-[300px] max-h-[350px] ${persona === 'dev' ? 'font-mono' : ''}`}>
                  {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.type === 'simulation' ? (
                        <div className="w-[95%]">
                          <TerminalBlock type={msg.content} />
                        </div>
                      ) : (
                        <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                          msg.sender === 'user'
                            ? (persona === 'dev'
                                ? 'bg-green-900/50 text-green-100 border border-green-500/30'
                                : 'bg-gradient-to-r from-red-600 to-red-500 text-white')
                            : (persona === 'dev'
                                ? 'bg-black/50 text-green-400 border border-green-500/30'
                                : 'bg-zinc-700/50 text-zinc-100')
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-line">
                            {msg.text}
                            {msg.isTyping && <span className={`inline-block w-1 h-4 ml-1 animate-pulse ${persona === 'dev' ? 'bg-green-500' : 'bg-zinc-100'}`}>|</span>}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Section */}
                <div className={`relative border-t ${persona === 'dev' ? 'border-green-500/30 bg-black/40' : 'border-zinc-700/50'}`}>
                  <textarea
                    value={message}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    rows={3}
                    disabled={isTyping}
                    className={`w-full px-6 py-4 bg-transparent border-none outline-none resize-none text-sm font-normal leading-relaxed scrollbar-none disabled:opacity-50 ${
                      persona === 'dev'
                        ? 'text-green-400 placeholder-green-700 font-mono caret-green-500'
                        : 'text-zinc-100 placeholder-zinc-400'
                    }`}
                    placeholder={isTyping ? "Processing..." : (persona === 'dev' ? "> Input command..." : "Ask me anything about Harshana...")}
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  />
                </div>

                {/* Controls */}
                <div className={`px-4 pb-4 ${persona === 'dev' ? 'bg-black/40' : ''}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`text-xs font-medium ${persona === 'dev' ? 'text-green-600' : 'text-zinc-400'}`}>
                        <span className={persona === 'dev' ? 'text-green-500' : 'text-zinc-300'}>{charCount}</span>/<span className={persona === 'dev' ? 'text-green-700' : 'text-zinc-400'}>{maxChars}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleSend}
                      disabled={!message.trim() || isTyping}
                      className={`group relative p-3 border-none rounded-xl cursor-pointer transition-all duration-300 text-white shadow-lg active:scale-95 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                        persona === 'dev'
                          ? 'bg-green-600 hover:bg-green-500 hover:shadow-green-500/30'
                          : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 hover:scale-110 hover:shadow-red-500/30'
                      }`}
                    >
                      <Send className="w-5 h-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:rotate-12" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Floating Overlay (Only for non-dev mode) */}
            {persona !== 'dev' && (
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05), transparent, rgba(147, 51, 234, 0.05))'
                }}
              ></div>
            )}

            {/* Dev Mode Overlay (Scanlines) */}
            {persona === 'dev' && (
               <div className="absolute inset-0 rounded-3xl pointer-events-none bg-[length:100%_2px,3px_100%] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(0,255,0,0.06),rgba(0,0,0,0.02))] opacity-20 z-10"></div>
            )}
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
