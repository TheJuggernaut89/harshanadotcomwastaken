# 🤖 Interactive Chatbot Setup Guide

## Overview
The Interactive Chatbot is designed to guide employers through your resume and increase conversion rates by:
- **Qualifying leads**: Understanding what employers are looking for
- **Guided navigation**: Directing them to relevant sections
- **Proactive engagement**: Suggesting next steps based on intent
- **Conversion optimization**: Making it easy to contact you or download your resume

---

## 🎯 Key Features

### 1. **Intent Detection**
The chatbot tracks user intent and adapts responses:
- Skills inquiry → Shows expertise + scrolls to Skills section
- Projects inquiry → Displays portfolio + scrolls to Projects
- AI capabilities → Highlights automation + scrolls to AI Tools
- Contact request → Shows contact options + scrolls to Contact

### 2. **Quick Reply Buttons**
Pre-built action buttons that:
- Guide users through your journey
- Reduce friction in navigation
- Track engagement patterns
- Drive specific conversion goals

### 3. **Smart Navigation**
Automatically scrolls to relevant sections based on conversation context.

### 4. **Download Tracking**
Triggers resume downloads and follows up with scheduling prompts.

---

## ⚙️ Customization Guide

### Update Your Contact Information

**File**: `src/components/UI/InteractiveChatbot.jsx`

1. **Email Address** (Line ~115):
```javascript
case 'contact':
  responseText = "📬 **Let's Connect!**\n\nBest ways to reach me:\n\n📧 Email: YOUR_EMAIL@example.com\n💼 LinkedIn: YOUR_LINKEDIN_URL\n📄 Resume: Ready to download\n📅 Calendar: Open for calls\n\nWhat works best for you?";
```

2. **Email Link** (Line ~170):
```javascript
case 'email':
  window.location.href = 'mailto:YOUR_EMAIL@example.com?subject=Interview%20Request&body=Hi%20Harshana,%0D%0A%0D%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20discuss...';
```

3. **Resume Download** (Line ~147):
```javascript
case 'download':
  // Add your resume PDF to the /public folder as 'resume.pdf'
  window.open('/resume.pdf', '_blank');
```

### Update Skills & Experience

**File**: `src/components/UI/InteractiveChatbot.jsx` (Lines ~55-70)

```javascript
case 'skills':
  responseText = "🚀 **Core Expertise:**\n\n• **YOUR SKILL CATEGORY 1**: Specific skills\n• **YOUR SKILL CATEGORY 2**: Specific skills\n• **YOUR SKILL CATEGORY 3**: Specific skills\n• **YOUR SKILL CATEGORY 4**: Specific skills\n\nWant to see how I've applied these?";
```

### Update Projects

**File**: `src/components/UI/InteractiveChatbot.jsx` (Lines ~78-95)

```javascript
case 'projects':
  responseText = "📊 **Featured Projects:**\n\n1. **PROJECT NAME 1**\n   Brief description\n\n2. **PROJECT NAME 2**\n   Brief description\n\n3. **PROJECT NAME 3**\n   Brief description\n\nWhich project interests you?";
```

### Add Calendar Integration

**Option 1: Calendly** (Lines ~160-170)
```javascript
case 'schedule':
  // Open Calendly in new window
  window.open('https://calendly.com/YOUR_USERNAME', '_blank');
  responseText = "📅 Calendar opened! Pick a time that works for you.";
```

**Option 2: Google Calendar**
```javascript
case 'schedule':
  const eventDetails = {
    text: 'Interview with Harshana',
    dates: '20260301T100000Z/20260301T110000Z', // Adjust format
    details: 'Discussion about the role'
  };
  window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventDetails.text}&dates=${eventDetails.dates}&details=${eventDetails.details}`, '_blank');
```

---

## 📊 Conversion Optimization Tips

### 1. **Add Analytics Tracking**
Track which actions users take:

```javascript
const trackEvent = (action, label) => {
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: 'Chatbot',
      event_label: label
    });
  }

  // Or custom analytics
  console.log('Chatbot Event:', action, label);
};

// Use in quick replies:
onClick={() => {
  trackEvent('quick_reply_click', reply.action);
  addUserMessage(reply.text);
  handleQuickReply(reply.action);
}}
```

### 2. **A/B Test Different CTAs**
Test different call-to-action buttons:

```javascript
const ctaVariants = {
  A: [
    { text: "Schedule Interview", action: "schedule" },
    { text: "Download Resume", action: "download" }
  ],
  B: [
    { text: "Book a Call", action: "schedule" },
    { text: "Get Resume", action: "download" }
  ]
};

// Randomly assign variant
const variant = Math.random() > 0.5 ? 'A' : 'B';
followUpActions = ctaVariants[variant];
```

### 3. **Add Lead Capture**
Collect email before resume download:

```javascript
case 'download':
  // Check if email already captured
  if (!localStorage.getItem('userEmail')) {
    responseText = "📧 **Quick Question:**\n\nWhat's the best email to send you updates?\n\n(This helps me send you my full portfolio and keep you posted on new projects)";
    // Show email input instead of quick replies
    setShowEmailInput(true);
  } else {
    // Proceed with download
    window.open('/resume.pdf', '_blank');
  }
```

### 4. **Personalize Based on Time**
Adjust greeting based on time of day:

```javascript
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning! ☀️";
  if (hour < 17) return "Good afternoon! 👋";
  return "Good evening! 🌙";
};

// Use in initial message
addBotMessage(`${getGreeting()}\n\nI'm Harshana's AI assistant...`);
```

---

## 🎨 Styling Customization

### Colors
Update the gradient colors to match your brand:

```jsx
// Button gradient (Line ~262)
className="bg-gradient-to-br from-primary to-primary-light"

// Header gradient (Line ~318)
className="bg-gradient-to-r from-primary to-primary-light"
```

### Size
Adjust chatbot window size (Line ~278):

```jsx
className="w-[400px] h-[600px]"  // Desktop
className="max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)]"  // Mobile
```

---

## 📱 Mobile Optimization

The chatbot is fully responsive, but you can enhance mobile experience:

### Auto-open on Mobile
```javascript
useEffect(() => {
  const isMobile = window.innerWidth < 768;
  const hasSeenChatbot = localStorage.getItem('hasSeenChatbot');

  if (isMobile && !hasSeenChatbot) {
    setTimeout(() => {
      setIsOpen(true);
      localStorage.setItem('hasSeenChatbot', 'true');
    }, 3000); // Open after 3 seconds
  }
}, []);
```

---

## 🔧 Advanced Features

### 1. **AI Integration** (Optional)
Connect to OpenAI for real conversations:

```javascript
const getAIResponse = async (userMessage) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${YOUR_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are Harshana\'s portfolio assistant...' },
        { role: 'user', content: userMessage }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
};
```

### 2. **Conversation Context**
Remember previous messages for better responses:

```javascript
const [conversationContext, setConversationContext] = useState({
  hasViewedSkills: false,
  hasViewedProjects: false,
  expressedInterest: null
});

// Update context on each action
handleQuickReply = (action) => {
  setConversationContext(prev => ({
    ...prev,
    hasViewedSkills: action === 'skills' || prev.hasViewedSkills,
    hasViewedProjects: action === 'projects' || prev.hasViewedProjects
  }));
};
```

### 3. **Exit Intent Detection**
Show chatbot when user is about to leave:

```javascript
useEffect(() => {
  const handleMouseLeave = (e) => {
    if (e.clientY <= 0 && !isOpen) {
      setIsOpen(true);
      addBotMessage("Wait! Before you go... Can I help you find something? 🤔");
    }
  };

  document.addEventListener('mouseleave', handleMouseLeave);
  return () => document.removeEventListener('mouseleave', handleMouseLeave);
}, [isOpen]);
```

---

## 📈 Success Metrics to Track

1. **Engagement Rate**: % of visitors who open the chatbot
2. **Interaction Depth**: Average number of messages per conversation
3. **Conversion Actions**:
   - Resume downloads
   - Email clicks
   - Calendar bookings
   - Section navigation
4. **Intent Distribution**: Which topics are most popular
5. **Drop-off Points**: Where users stop engaging

---

## 🚀 Quick Start Checklist

- [ ] Update email address in contact section
- [ ] Add resume PDF to `/public/resume.pdf`
- [ ] Customize skills list
- [ ] Update project descriptions
- [ ] Add calendar link (Calendly/Google Calendar)
- [ ] Test all quick reply buttons
- [ ] Verify section scroll navigation works
- [ ] Add analytics tracking (optional)
- [ ] Test on mobile devices

---

## 💡 Best Practices

1. **Keep responses concise** - Mobile users have limited screen space
2. **Use emojis strategically** - They add personality but don't overdo it
3. **Always provide 2-4 quick replies** - Reduce typing friction
4. **Guide towards conversion** - Every response should have a CTA
5. **Track everything** - Data helps you optimize over time

---

## 🐛 Troubleshooting

**Chatbot not appearing?**
- Check console for errors
- Verify InteractiveChatbot is imported in App.jsx
- Ensure Tailwind CSS classes are working

**Scroll navigation not working?**
- Verify section IDs match those in App.jsx
- Check that sections have `id` attributes

**Resume download failing?**
- Add resume.pdf to `/public` folder
- Check browser console for 404 errors

---

## 📞 Support

For questions or customization help:
- Check React DevTools for component state
- Review console logs for errors
- Test in incognito mode to clear localStorage

---

**Built with**: React, Framer Motion, Tailwind CSS, Lucide Icons
**License**: MIT (customize as needed)
