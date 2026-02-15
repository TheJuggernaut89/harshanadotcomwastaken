import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Link, Code, Mic, Send, Info, Bot, X } from 'lucide-react';

const FloatingAiAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userRegion, setUserRegion] = useState('MY');
  const [persona, setPersona] = useState('recruiter');
  const maxChars = 2000;
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const typewriterTimers = useRef([]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Simple region detection
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timezone && timezone.includes('Singapore')) {
        setUserRegion('SG');
      }
    } catch (e) {
      console.warn('Region detection failed', e);
    }

    // Load persona from local storage
    const savedPersona = localStorage.getItem('ai_persona');
    if (savedPersona) {
      setPersona(savedPersona);
    }

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
  const typewriterEffect = (fullText, messageIndex, callback) => {
    let currentText = '';
    let charIndex = 0;
    const typingSpeed = 30;

    const typeNextChar = () => {
      if (charIndex < fullText.length) {
        currentText += fullText[charIndex];

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

    const addMessageSequentially = (index, addedCount = 0) => {
      if (index >= messageArray.length) {
        setIsTyping(false);
        return;
      }

      let currentMessage = messageArray[index];

      // Process [NAV: #id]
      const navMatch = currentMessage.match(/\[NAV: (#[\w-]+)\]/);
      if (navMatch) {
        const targetId = navMatch[1];
        try {
          const element = document.querySelector(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            element.classList.add('highlight-glow');
            setTimeout(() => element.classList.remove('highlight-glow'), 2000);
          }
        } catch (e) {
          console.warn("Navigation failed:", e);
        }
        currentMessage = currentMessage.replace(navMatch[0], '').trim();
      }

      // Process [SIMULATE: type]
      const simMatch = currentMessage.match(/\[SIMULATE: (\w+)\]/);
      if (simMatch) {
        const simType = simMatch[1];
        console.log(`Simulating ${simType}...`);
        // Logic to render TerminalBlock would go here
        currentMessage = currentMessage.replace(simMatch[0], '').trim();
      }

      // If message is empty after stripping commands, skip to next
      if (!currentMessage) {
        addMessageSequentially(index + 1, addedCount);
        return;
      }

      // Use a functional update to get the correct index based on current state
      setMessages(prev => {
        const messageIndex = prev.length;

        // Schedule typing for this new message
        setTimeout(() => {
          typewriterEffect(currentMessage, messageIndex, () => {
            setTimeout(() => {
              addMessageSequentially(index + 1, addedCount + 1);
            }, 400);
          });
        }, initialDelay);

        return [...prev, {
          text: '', // Start empty
          sender: 'bot',
          timestamp: new Date(),
          isTyping: true
        }];
      });
    };

    addMessageSequentially(0);
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
          userRegion,
          persona
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
                <span className="px-2 py-1 text-xs font-medium bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 rounded-2xl border border-green-500/30">
                  🤖 AI-Powered
                </span>
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
