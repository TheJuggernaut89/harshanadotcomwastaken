import { useState, useEffect } from "react";
import { Send, Bot, Sparkles, X } from "lucide-react";
import { Button } from "./Button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "./ChatBubble";
import { ChatInput } from "./ChatInput";
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from "./ExpandableChat";
import { ChatMessageList } from "./ChatMessageList";
import { trackChatbotEvent } from "../../utils/chatbotAnalytics";

export function ModernChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationStage, setConversationStage] = useState("intro");
  const [userName, setUserName] = useState(null);

  // More human intro sequence
  useEffect(() => {
    if (messages.length === 0) {
      trackChatbotEvent('chatbot_opened');

      // First message - friendly intro
      setTimeout(() => {
        addBotMessage("Hey there! 👋");
      }, 500);

      // Second message - set expectations
      setTimeout(() => {
        addBotMessage("I'm Harshana's AI assistant (but cooler than most bots, I promise 😎)");
      }, 1800);

      // Third message - open-ended question
      setTimeout(() => {
        addBotMessage("What brings you here today? Looking to hire? Just browsing? Or did you get lost on the internet? 😄");
      }, 3500);
    }
  }, []);

  const addBotMessage = (content, delay = 0) => {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          content,
          sender: "ai",
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        },
      ]);
    }, delay);
  };

  const addUserMessage = (content) => {
    trackChatbotEvent('message_sent', { messageLength: content.length });
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        content,
        sender: "user",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      },
    ]);
  };

  const getBotResponse = (userText) => {
    const lower = userText.toLowerCase();

    // Greeting detection
    if (lower.match(/^(hi|hey|hello|sup|yo|wassup|what's up)$/i)) {
      return [
        "Hey! 😊",
        "Nice to meet you! So what's the deal - you hiring, or just checking out if Harshana's legit?"
      ];
    }

    // Name detection
    if (lower.includes("my name is") || lower.includes("i'm ") || lower.includes("i am ")) {
      const nameMatch = userText.match(/(?:my name is|i'm|i am)\s+(\w+)/i);
      if (nameMatch) {
        const detectedName = nameMatch[1];
        setUserName(detectedName);
        return [
          `Nice to meet you, ${detectedName}! 🤝`,
          "So what can I help you with? Want to know about Harshana's work, skills, or just here to roast my chatbot abilities? 😅"
        ];
      }
    }

    // Hiring intent
    if (lower.includes("hire") || lower.includes("hiring") || lower.includes("recruit") || lower.includes("job") || lower.includes("position")) {
      setConversationStage("hiring");
      return [
        "Ooh, business time! 💼",
        "So you're looking to hire someone who can actually ship stuff and won't ghost you after the first sprint?",
        "You're in the right place. What role are you hiring for?"
      ];
    }

    // Skills question
    if (lower.includes("skill") || lower.includes("what can") || lower.includes("what does") || lower.includes("experience")) {
      scrollToSection('skills');
      return [
        "Alright, let's talk skills! 💪",
        "Harshana's that rare combo of someone who can:\n- Code without creating a tech debt nightmare\n- Actually understand marketing (not just make pretty dashboards)\n- Build AI tools that work in production (not just demos)\n- Talk to humans without sounding like a robot",
        "The tech stack? React, Python, GPT-4, N8N, all the good stuff.",
        "Want me to show you some actual projects where these skills were used?"
      ];
    }

    // Project question
    if (lower.includes("project") || lower.includes("portfolio") || lower.includes("work") || lower.includes("built")) {
      scrollToSection('projects');
      return [
        "Oh man, the projects are where it gets fun! 🚀",
        "There's this Malaysian AI platform that handles 4 languages and doesn't suggest pork rendang to Muslims (yes, that's a real problem with most AI)",
        "Then there's the workflow automation that basically replaced 3 people's jobs without the existential crisis",
        "Which one sounds interesting? Or want me to just show you all of them?"
      ];
    }

    // AI question
    if (lower.includes("ai") || lower.includes("automation") || lower.includes("gpt") || lower.includes("chatgpt")) {
      scrollToSection('ai-tools');
      return [
        "Ah, you wanna talk AI! 🤖",
        "Here's the thing - everyone says they \"do AI\" now because they used ChatGPT once.",
        "Harshana actually BUILDS AI systems. Real APIs, real error handling, real production code.",
        "The Malaysian platform? 3-layer AI architecture. The automation? 70% time saved. The results? Actually shipped and working.",
        "Want to see the demos or dive into the technical details?"
      ];
    }

    // Contact/resume
    if (lower.includes("contact") || lower.includes("email") || lower.includes("resume") || lower.includes("cv") || lower.includes("hire")) {
      scrollToSection('contact');
      const response = [
        "Awesome! Let's make this happen 📧",
        "Here's the deal:\n- Email: your-email@example.com\n- Resume: I can send you the PDF\n- Calendar: Open for calls",
      ];

      if (userName) {
        response[0] = `Awesome, ${userName}! Let's make this happen 📧`;
      }

      response.push("What works best for you - email, resume download, or schedule a call?");
      return response;
    }

    // Funny/casual responses
    if (lower.includes("lol") || lower.includes("haha") || lower.includes("funny") || lower.includes("😂")) {
      return [
        "Haha glad you're enjoying this! 😄",
        "Way better than those \"How may I assist you today?\" bots, right?",
        "Anyway, what else you wanna know about Harshana?"
      ];
    }

    if (lower.includes("thanks") || lower.includes("thank you")) {
      return [
        "You're welcome! 😊",
        "Honestly this is way more fun than being a boring FAQ bot.",
        "Anything else you wanna know? Or you good?"
      ];
    }

    // Default conversational response
    return [
      "Interesting question! 🤔",
      "I can tell you about:\n- Harshana's skills and experience\n- Cool projects and case studies\n- AI capabilities and automation\n- How to get in touch",
      "What sounds most useful to you?"
    ];
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    addUserMessage(userText);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const responses = getBotResponse(userText);

      responses.forEach((response, index) => {
        addBotMessage(response, index * 1200);
      });

      setTimeout(() => {
        setIsLoading(false);
      }, responses.length * 1200);
    }, 600);
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
      handleSubmit(e);
    }
  };

  return (
    <ExpandableChat
      size="md"
      position="bottom-right"
      icon={<Bot className="h-6 w-6" />}
    >
      <ExpandableChatHeader className="bg-white dark:bg-navy-dark border-b">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-gray-900 dark:text-white">Chat with AI ✨</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Ask me anything about Harshana
              </p>
            </div>
          </div>
        </div>
      </ExpandableChatHeader>

      <ExpandableChatBody className="bg-white dark:bg-navy-darker">
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.sender === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src={
                  message.sender === "user"
                    ? undefined
                    : "https://api.dicebear.com/7.x/bottts/svg?seed=Harshana&backgroundColor=6366f1"
                }
                fallback={message.sender === "user" ? "YOU" : "AI"}
              />
              <ChatBubbleMessage
                variant={message.sender === "user" ? "sent" : "received"}
                className={message.sender === "user" ? "bg-primary text-white" : "bg-gray-100 dark:bg-navy-dark text-gray-900 dark:text-white"}
              >
                <div className="whitespace-pre-line text-sm">{message.content}</div>
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src="https://api.dicebear.com/7.x/bottts/svg?seed=Harshana&backgroundColor=6366f1"
                fallback="AI"
              />
              <ChatBubbleMessage
                isLoading
                className="bg-gray-100 dark:bg-navy-dark"
              />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter className="bg-white dark:bg-navy-dark">
        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
          <div className="flex-1">
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="min-h-[44px] max-h-[120px] bg-gray-100 dark:bg-navy-darker border-none text-sm resize-none rounded-lg px-4 py-3"
            />
          </div>
          <Button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="h-[44px] px-4 bg-gradient-to-r from-primary to-primary-light hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
