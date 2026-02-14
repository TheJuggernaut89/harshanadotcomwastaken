import { useState, useEffect } from "react";
import { Send, Bot, Sparkles, CornerDownLeft } from "lucide-react";
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
  const [showIntro, setShowIntro] = useState(true);

  // Track when chatbot is opened
  useEffect(() => {
    if (messages.length === 0 && showIntro) {
      trackChatbotEvent('chatbot_opened');

      // Stage 1: Loading
      setTimeout(() => {
        addBotMessage("⚡ Initializing AI assistant...");
      }, 300);

      // Stage 2: Personality reveal
      setTimeout(() => {
        addBotMessage("⚡ Loading corporate speak... ERROR 404\n\n🤖 Loading personality... SUCCESS");
      }, 1500);

      // Stage 3: Real greeting
      setTimeout(() => {
        setShowIntro(false);
        addBotMessage(
          "Yo! 👋\n\nSo you stumbled onto Harshana's portfolio and thought \"hmm, let me see if this person is actually legit or just another resume warrior.\"\n\nSmart move.\n\nI'm basically Harshana's digital hype person, except I actually know what I'm talking about and won't waste your time with corporate BS.\n\nWhat do you wanna know?",
          [
            "Show me the skills 💪",
            "Impress me (projects) 🚀",
            "The AI stuff 🤖",
            "Just hire them already 📧"
          ]
        );
      }, 3200);
    }
  }, [messages.length, showIntro]);

  const addBotMessage = (content, quickReplies = null) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        content,
        sender: "ai",
        quickReplies,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      },
    ]);
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

  const handleQuickReply = (text) => {
    addUserMessage(text);
    setIsLoading(true);

    trackChatbotEvent('quick_reply', { action: text });

    setTimeout(() => {
      let response = "";
      let quickReplies = [];

      if (text.includes("skills")) {
        trackChatbotEvent('section_navigation', { sectionId: 'skills' });
        scrollToSection('skills');
        response = "Alright, buckle up. 🚀\n\nHarshana isn't your typical \"I know HTML\" developer. We're talking:\n\n• AI & Automation: GPT-4, Claude API, N8N workflows that actually work\n• Marketing + Tech Combo: Full-stack campaigns with real analytics, not vanity metrics\n• Actual Development: React, Python, JavaScript - code that doesn't make senior devs cry\n\nBasically, the rare human who can code AND talk to clients without making everyone uncomfortable.\n\nWanna see receipts?";
        quickReplies = ["Show me receipts (projects) 📁", "Tell me about the AI stuff 🤖", "Just give me the resume 📄"];
      } else if (text.includes("Impress")) {
        trackChatbotEvent('section_navigation', { sectionId: 'projects' });
        scrollToSection('projects');
        response = "Oh, you want the GOOD stuff? 😏\n\nHere's what happens when you give Harshana caffeine and API keys:\n\n**Malaysian Marketing AI Platform** 🇲🇾\nNot your basic GPT wrapper. This beast handles 4 languages, cultural context, and Malaysian compliance. Most people can't even get ChatGPT to spell \"Nasi Lemak\" right.\n\n**AI Workforce Automation** ⚡\nFull campaign automation that saved 70% time. Translation: one person doing the work of three, without the existential crisis.\n\n**Legal Transcription Platform** ⚖️\nML-powered doc processing. Because lawyers have better things to do.\n\nPick your poison:";
        quickReplies = ["Malaysian AI deep-dive 🇲🇾", "Show me the automation ⚡", "All the projects 📁"];
      } else if (text.includes("AI stuff") || text.includes("AI 🤖")) {
        trackChatbotEvent('section_navigation', { sectionId: 'ai-tools' });
        scrollToSection('ai-tools');
        response = "Ah yes, the AI stuff. 🤖\n\nLook, everyone and their grandma claims they \"do AI\" now because they used ChatGPT once. Harshana actually BUILDS this stuff:\n\n• Real GPT-4 Integration: Not just copy-pasting prompts. Actual API work, error handling, the works.\n• N8N Automation Pipelines: Marketing ops that run while you sleep. 70% time saved = more time for arguing on Twitter.\n• Cultural AI Systems: Because \"AI that understands Malaysian context\" isn't a checkbox feature.\n• Analytics That Matter: Data that drives decisions, not dashboards that look pretty.\n\nResult? 3x content output without tripling headcount. Math!\n\nWanna see it?";
        quickReplies = ["Show me the AI tools ⚡", "The automation workflows 🔧", "I'm sold. Let's talk. 📧"];
      } else if (text.includes("hire") || text.includes("talk") || text.includes("📧")) {
        trackChatbotEvent('section_navigation', { sectionId: 'contact' });
        scrollToSection('contact');
        response = "Ooh, moving fast! I like it. 😎\n\nLook, I could give you the whole \"synergy\" speech, but let's be real - you're here because you need someone who can actually ship stuff.\n\n📧 **Email**: your-email@example.com\n💼 **LinkedIn**: [Your LinkedIn]\n📄 **Resume**: One click away\n📅 **Calendar**: Open for real conversations\n\nWhat's your move?";
        quickReplies = ["Send email now ✉️", "Gimme the resume 📄", "Book a call 📅"];
      } else if (text.includes("resume") || text.includes("📄")) {
        trackChatbotEvent('download_resume');
        response = "📄 **Boom! Resume incoming.**\n\nYour download just started. If it didn't, your browser is being weird.\n\nInside you'll find:\n✓ Actual accomplishments with numbers\n✓ Tech stack that's relevant in 2024\n✓ Projects that actually shipped\n✓ Contact info that works\n\nNo 3-page essays about \"passion for innovation.\" Just the good stuff.\n\nNow what?";
        quickReplies = ["Let's schedule a call 📅", "I have questions 💬", "Show me more projects 🚀"];
        window.open('/resume.pdf', '_blank');
      } else if (text.includes("email") || text.includes("✉️")) {
        trackChatbotEvent('email_click');
        window.location.href = 'mailto:your-email@example.com?subject=Interview%20Request&body=Hi%20Harshana,%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20discuss...';
        response = "✉️ **Email time!**\n\nYour email client should've just popped open.\n\nManual backup: **your-email@example.com**\n\nJust... please don't start with \"Dear Sir/Madam.\" We're not writing to the tax office. 😅";
      } else if (text.includes("Malaysian") || text.includes("🇲🇾")) {
        trackChatbotEvent('section_navigation', { sectionId: 'malaysian-platform' });
        scrollToSection('malaysian-platform');
        response = "🇲🇾 **Alright, the Malaysian AI Platform is wild.**\n\nImagine trying to make AI understand Malaysian context - not just Bahasa, but the ACTUAL way Malaysians talk. The Manglish. The cultural nuances.\n\nWhat Harshana built:\n• 3-layer AI (Kopitiam Intel, Mamak Workshop, Makcik Approval - best names ever)\n• 4 languages that actually work together\n• Cultural context engine so it doesn't suggest pork rendang 💀\n• Compliance checker for Malaysian regulations\n\nTech: GPT-4, React, N8N, custom ML, and probably too much coffee.\n\nWanna see it work?";
        quickReplies = ["Show me the demo 🎬", "How'd you build this? 🔧", "Other projects 📁"];
      } else {
        response = "Hmm, interesting! 🤔\n\nI'm pretty good at this, but I'm not THAT smart. Let me help you navigate:\n\n**What I CAN help with:**\n• Skills & tech expertise\n• Project walkthroughs\n• AI capabilities\n• Getting you in touch\n\nWhat sounds most useful?";
        quickReplies = ["Technical skills 💪", "Project portfolio 📁", "AI stuff 🤖", "Contact info 📧"];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          content: response,
          sender: "ai",
          quickReplies,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    addUserMessage(userText);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      let response = "";
      let quickReplies = [];

      const lowerText = userText.toLowerCase();

      if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
        response = "Hey hey! 👋\n\nLook at you being all polite and stuff. I appreciate it.\n\nSo, what brings you here? Hiring? Curious? Procrastinating at work? (No judgment, we've all been there)";
        quickReplies = ["Show me skills 💪", "Impress me 🚀", "Let's connect 📧"];
      } else if (lowerText.includes('hire') || lowerText.includes('hiring') || lowerText.includes('job')) {
        response = "Ooh, we're talking business! 💼\n\nYou're looking to hire? Smart. The market's tough and you need someone who can actually ship.\n\nHere's the deal - Harshana's the rare combo of:\n✓ Can code without creating tech debt nightmares\n✓ Understands marketing (like, actually)\n✓ Builds AI stuff that works in production\n✓ Won't ghost you after the first sprint\n\nWhat do you wanna know first?";
        quickReplies = ["Show me the work 📁", "Technical skills 💪", "Let's schedule a call 📅"];
      } else if (lowerText.includes('thanks') || lowerText.includes('thank you')) {
        response = "You're welcome! 😊\n\nHonestly, this is way more fun than a boring FAQ.\n\nAnything else you wanna know? Or are you good?";
        quickReplies = ["Actually, one more thing... 💬", "Download the resume 📄", "I'm convinced. Let's talk. 📧"];
      } else {
        response = "Great question! Let me point you in the right direction:\n\n• Skills & expertise\n• Projects & case studies\n• AI capabilities\n• Contact info\n\nWhat interests you?";
        quickReplies = ["Technical skills 💪", "Project portfolio 📁", "AI stuff 🤖", "Contact info 📧"];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          content: response,
          sender: "ai",
          quickReplies,
          timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <ExpandableChat
      size="lg"
      position="bottom-right"
      icon={<Bot className="h-6 w-6" />}
    >
      <ExpandableChatHeader className="flex-col text-center justify-center bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <h1 className="text-xl font-semibold">AI Assistant (with attitude)</h1>
        </div>
        <p className="text-sm text-white/80 mt-1">
          No BS Mode Activated • 0% corporate jargon guaranteed
        </p>
      </ExpandableChatHeader>

      <ExpandableChatBody>
        <ChatMessageList>
          {messages.map((message) => (
            <div key={message.id}>
              <ChatBubble
                variant={message.sender === "user" ? "sent" : "received"}
              >
                <ChatBubbleAvatar
                  className="h-8 w-8 shrink-0"
                  src={
                    message.sender === "user"
                      ? undefined
                      : "https://api.dicebear.com/7.x/bottts/svg?seed=Felix"
                  }
                  fallback={message.sender === "user" ? "YOU" : "AI"}
                />
                <div className="flex flex-col gap-2 max-w-[70%]">
                  <ChatBubbleMessage
                    variant={message.sender === "user" ? "sent" : "received"}
                  >
                    <div className="whitespace-pre-line">{message.content}</div>
                  </ChatBubbleMessage>

                  {/* Quick Reply Buttons */}
                  {message.quickReplies && (
                    <div className="flex flex-col gap-2 mt-1">
                      {message.quickReplies.map((reply, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickReply(reply)}
                          className="justify-start text-left hover:bg-primary hover:text-white transition-all"
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </ChatBubble>
            </div>
          ))}

          {isLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar
                className="h-8 w-8 shrink-0"
                src="https://api.dicebear.com/7.x/bottts/svg?seed=Felix"
                fallback="AI"
              />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          )}
        </ChatMessageList>
      </ExpandableChatBody>

      <ExpandableChatFooter>
        <form
          onSubmit={handleSubmit}
          className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring p-1"
        >
          <ChatInput
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message... or just click a button above 👆"
            className="min-h-12 resize-none rounded-lg bg-background border-0 p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0 justify-end">
            <Button type="submit" size="sm" className="ml-auto gap-1.5" disabled={!input.trim()}>
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
