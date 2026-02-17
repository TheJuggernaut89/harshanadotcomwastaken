import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Link, Code, Mic, Send, Info, Bot, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import QuickActionChips from './QuickActionChips';
import { useAutoScroll } from '../../hooks/useAutoScroll';

const FloatingAiAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const maxChars = 2000;
  const MAX_MESSAGES = 50;
  const chatRef = useRef(null);
  const typewriterTimers = useRef([]);
  const isMountedRef = useRef(true);

  // Auto-scroll using proper hook
  const { scrollRef, scrollToBottom } = useAutoScroll({
    content: messages,
    smooth: true
  });

  // Cleanup typewriter timers on unmount and mark as unmounted
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
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

        // Smooth scroll to bottom as text is typing
        scrollToBottom();

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

        // Final scroll when done typing
        scrollToBottom();

        if (callback) callback();
      }
    };

    typeNextChar();
  };

  // Typewriter effect that adds text to existing combined GIF message
  const typewriterEffectForCombinedMessage = (textArray, gifMessageIndex) => {
    let currentTextIndex = 0;

    const addNextText = () => {
      if (currentTextIndex < textArray.length) {
        const fullText = textArray[currentTextIndex];
        let currentChar = 0;

        const typeChar = () => {
          if (!isMountedRef.current) return;

          if (currentChar <= fullText.length) {
            setMessages(prev => {
              const newMessages = [...prev];
              if (newMessages[gifMessageIndex]) {
                const currentTexts = [...(newMessages[gifMessageIndex].textMessages || [])];
                currentTexts[currentTextIndex] = fullText.substring(0, currentChar);
                newMessages[gifMessageIndex] = {
                  ...newMessages[gifMessageIndex],
                  textMessages: currentTexts,
                  isTyping: currentChar < fullText.length || currentTextIndex < textArray.length - 1
                };
              }
              return newMessages;
            });

            // Smooth scroll to bottom as text is typing
            scrollToBottom();

            currentChar++;
            const timer = setTimeout(typeChar, 30);
            typewriterTimers.current.push(timer);
          } else {
            currentTextIndex++;
            const timer = setTimeout(addNextText, 400);
            typewriterTimers.current.push(timer);
          }
        };
        typeChar();
      } else {
        // Mark typing complete
        if (!isMountedRef.current) return;

        setMessages(prev => {
          const newMessages = [...prev];
          if (newMessages[gifMessageIndex]) {
            newMessages[gifMessageIndex] = {
              ...newMessages[gifMessageIndex],
              isTyping: false
            };
          }
          return newMessages;
        });

        // CRITICAL: Reset global isTyping state to re-enable input
        setIsTyping(false);

        // Final scroll to ensure bottom is visible
        scrollToBottom();
      }
    };

    addNextText();
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
      const messageIndex = messages.length + index;

      setMessages(prev => [...prev, {
        text: '',
        sender: 'bot',
        timestamp: new Date(),
        isTyping: true
      }]);

      setTimeout(() => {
        typewriterEffect(currentMessage, messageIndex, () => {
          setTimeout(() => {
            addMessageSequentially(index + 1);
          }, 400);
        });
      }, initialDelay);
    };

    addMessageSequentially(0);
  };

  // Call Gemini API with timeout
  const callGeminiAPI = async (userMessage) => {
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    try {
      const response = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('Gemini API Error:', error);

      // Distinguish between timeout and other errors
      if (error.name === 'AbortError') {
        return {
          messages: [
            "Whoa, that took too long! ⏰",
            "My circuits are a bit slow today. Try asking again?"
          ],
          fallback: true
        };
      }

      // Fallback responses if API fails
      return {
        messages: [
          "Oops! My AI brain had a hiccup! 🤖",
          "But here's the TL;DR: Harshana's a marketing technologist who codes, built a legal platform with 50K+ users and 100K+ sessions in 6 months solo.",
          "Check out the portfolio below or contact him directly!"
        ],
        fallback: true
      };
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;

    // Enforce max length
    if (value.length <= maxChars) {
      setMessage(value);
    }
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
          // If there's a GIF, create combined message with GIF + text
          if (aiResponse.gifUrl) {
            // Use callback form to get CURRENT state and calculate correct index
            let correctGifMessageIndex;

            setMessages(prev => {
              // Calculate index from CURRENT state (not stale closure)
              correctGifMessageIndex = prev.length;

              return [...prev, {
                gifUrl: aiResponse.gifUrl,
                sender: 'bot',
                timestamp: new Date(),
                isGif: true,
                isCombined: true,
                textMessages: [],  // Will hold typewriter text
                isTyping: true
              }];
            });

            // Short delay before text starts typing into the combined message
            setTimeout(() => {
              typewriterEffectForCombinedMessage(aiResponse.messages, correctGifMessageIndex);
            }, 800);
          } else {
            addBotMessagesWithTypewriter(aiResponse.messages, 600);
          }
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

  // Handle chip click - auto-send chip action as message
  const handleChipClick = (chipAction) => {
    setMessage(chipAction);
    // Use setTimeout to ensure state updates, then send
    setTimeout(() => {
      handleSend(chipAction);
    }, 0);
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

  // Keyboard navigation - Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isChatOpen) {
        setIsChatOpen(false);
      }
    };

    if (isChatOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isChatOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating 3D Glowing AI Logo with Fluid Motion */}
      <motion.button
        whileHover={{
          scale: 1.1,
          rotate: isChatOpen ? 90 : 10,
          boxShadow: '0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.4), 0 0 90px rgba(139, 92, 246, 0.2)'
        }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: isChatOpen ? 90 : 0
        }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 15
        }}
        onClick={() => setIsChatOpen(!isChatOpen)}
        aria-label={isChatOpen ? "Close AI assistant chat" : "Open AI assistant chat"}
        aria-expanded={isChatOpen}
        aria-haspopup="dialog"
        aria-controls="ai-chat-dialog"
        className="floating-ai-button relative w-16 h-16 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(99,102,241,0.9) 0%, rgba(168,85,247,0.9) 100%)',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.7), 0 0 40px rgba(124, 58, 237, 0.5), 0 0 60px rgba(109, 40, 217, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.2)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-30"></div>
        <div className="absolute inset-0 rounded-full border-2 border-white/10"></div>
        <motion.div
          animate={{ rotate: isChatOpen ? -90 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative z-10"
        >
          {isChatOpen ? <X className="w-8 h-8 text-white" /> : <Bot className="w-8 h-8 text-white" />}
        </motion.div>
        <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-indigo-500"></div>
      </motion.button>

      {/* Chat Interface */}
      {isChatOpen && (
        <div
          ref={chatRef}
          id="ai-chat-dialog"
          role="dialog"
          aria-label="AI Assistant Chat"
          aria-modal="true"
          className="absolute bottom-20 right-0 w-[95vw] sm:w-[450px] max-h-[70vh] sm:max-h-[500px] max-w-[450px] transition-all duration-300 origin-bottom-right flex flex-col"
          style={{
            animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
          }}
        >
          <div
            className="relative flex flex-col rounded-3xl bg-gradient-to-br from-zinc-800/15 to-zinc-900/20 border border-purple-500/30 hover:border-purple-500/50 backdrop-blur-3xl overflow-hidden h-full transition-all duration-300"
            style={{
              boxShadow: `
                inset 0 1px 2px rgba(255, 255, 255, 0.1),
                0 8px 32px rgba(0, 0, 0, 0.3),
                inset 0 0 1px rgba(255, 255, 255, 0.1)
              `
            }}
          >

            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-3 pb-2 border-b border-zinc-700/50">
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
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-6 py-4 space-y-3 min-h-[250px] max-h-[380px]"
              role="log"
              aria-live="polite"
              aria-atomic="false"
            >
              <AnimatePresence mode="popLayout">
                {messages.filter(msg => msg.sender !== 'user').map((msg, index) => (
                  <motion.div
                    key={`${msg.timestamp}-${index}`}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      duration: 0.3,
                      type: 'spring',
                      stiffness: 100,
                      damping: 15
                    }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.isGif ? (
                      // Combined GIF + Text Message
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
                        whileHover={{
                          borderColor: 'rgba(139, 92, 246, 0.5)',
                          boxShadow: '0 12px 32px rgba(139, 92, 246, 0.2)'
                        }}
                        className="max-w-[70%] flex flex-col gap-0 rounded-2xl overflow-hidden border-2 border-purple-500/25 bg-zinc-700/30 backdrop-blur-lg shadow-xl shadow-purple-500/15 transition-all duration-300"
                      >
                      {/* GIF at top */}
                      <img
                        src={msg.gifUrl}
                        alt="Reaction GIF"
                        className="w-full h-auto object-cover"
                        style={{ maxHeight: '180px' }}
                        onLoad={scrollToBottom}
                      />

                      {/* Text messages below GIF (if combined message) */}
                      {msg.isCombined && msg.textMessages && msg.textMessages.length > 0 && (
                        <div className="px-4 py-3 space-y-2">
                          {msg.textMessages.map((text, idx) => (
                            <p key={idx} className="text-sm leading-relaxed text-zinc-100 whitespace-pre-line">
                              {text}
                              {/* Only show cursor on last message during typing */}
                              {msg.isTyping && idx === msg.textMessages.length - 1 && (
                                <span className="inline-block w-1 h-4 ml-1 bg-zinc-100 animate-pulse">|</span>
                              )}
                            </p>
                          ))}

                          {/* Quick Action Chips - Show only when typing completes */}
                          {!msg.isTyping && msg.sender === 'bot' && (
                            <QuickActionChips
                              messageText={msg.textMessages.join(' ')}
                              onChipClick={handleChipClick}
                            />
                          )}
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    // Regular text-only message (no GIF)
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={msg.sender === 'bot' ? {
                        backgroundColor: 'rgba(63, 63, 70, 0.6)',
                        borderColor: 'rgba(139, 92, 246, 0.3)',
                        boxShadow: '0 8px 24px rgba(139, 92, 246, 0.15)'
                      } : {}}
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-red-600 to-red-500 text-white'
                          : 'bg-zinc-700/30 text-zinc-100 border border-purple-500/15 backdrop-blur-md shadow-lg shadow-black/10'
                      } transition-all duration-300`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">
                        {msg.text}
                        {msg.isTyping && <span className="inline-block w-1 h-4 ml-1 bg-zinc-100 animate-pulse">|</span>}
                      </p>

                      {/* Quick Action Chips - Show only for bot messages when typing completes */}
                      {!msg.isTyping && msg.sender === 'bot' && (
                        <QuickActionChips
                          messageText={msg.text}
                          onChipClick={handleChipClick}
                        />
                      )}
                    </motion.div>
                  )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Input Section */}
            <div className="relative border-t border-zinc-700/50 px-3 py-3">
              <div className="relative w-full">
                <textarea
                  value={message}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  rows={2}
                  disabled={isTyping}
                  maxLength={maxChars}
                  className="w-full pl-3 pr-14 py-2 bg-transparent border-none outline-none resize-none text-sm font-normal leading-relaxed text-zinc-100 placeholder-zinc-400 scrollbar-none disabled:opacity-50"
                  placeholder={isTyping ? "Wait for me to finish typing..." : "Ask me anything about Harshana..."}
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                />

                {/* Send Button - Integrated Inside Textarea */}
                <button
                  onClick={handleSend}
                  disabled={!message.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 group p-2.5 bg-gradient-to-r from-red-600 to-red-500 border-none rounded-full cursor-pointer transition-all duration-300 text-white shadow-lg hover:from-red-500 hover:to-red-400 hover:scale-110 hover:shadow-red-500/30 hover:shadow-xl active:scale-95 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-12" />
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
