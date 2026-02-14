# 🤖 Google Gemini AI Chatbot Setup Guide

Your chatbot is now powered by **Google Gemini AI** - completely FREE!

---

## 📋 **Setup Steps (5 minutes)**

### **Step 1: Get Your Free Gemini API Key**

1. Go to: https://makersuite.google.com/app/apikey
2. Click **"Get API Key"** or **"Create API Key"**
3. Select **"Create API key in new project"** (or use existing project)
4. Copy the API key (starts with `AIza...`)
5. **Keep this key private!** Never commit it to GitHub

---

### **Step 2: Add API Key to Netlify**

1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your site: `harshanajothiresume2026`
3. Click **"Site settings"** → **"Environment variables"**
4. Click **"Add a variable"**
5. Add:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: `YOUR_API_KEY_HERE` (paste the key from Step 1)
6. Click **"Save"**

---

### **Step 3: Redeploy Your Site**

Option A - Trigger redeploy from Netlify:
1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

Option B - Push a new commit:
```bash
git add .
git commit -m "Enable Gemini AI chatbot"
git push origin main
```

---

## ✅ **Testing**

After deployment (1-2 minutes):

1. Visit your site: https://harshanajothiresume2026.netlify.app
2. The chatbot will auto-open in 3 seconds
3. Try asking: "What skills does Harshana have?"
4. You should get an AI-generated response!

---

## 🎯 **How It Works**

- **Frontend**: Your React chatbot component
- **Backend**: Netlify serverless function (`api/chat.js`)
- **AI**: Google Gemini Pro (free tier)
- **Personality**: System prompt with GOLDMINE positioning

**Features:**
- ✅ Real AI conversations (not scripted)
- ✅ Context-aware (remembers conversation)
- ✅ GOLDMINE personality (enthusiastic, business-focused)
- ✅ Typewriter effect (looks natural)
- ✅ Fallback responses (if API fails)
- ✅ FREE (Google's free tier: 60 requests/minute)

---

## 💰 **Cost Breakdown**

**Google Gemini API:**
- FREE tier: 60 requests/minute, 1500 requests/day
- Your typical traffic: ~10-50 conversations/day
- **Cost: $0** ✅

**Netlify Functions:**
- FREE tier: 125K function invocations/month
- Your chatbot: ~100-500 invocations/month
- **Cost: $0** ✅

**Total: $0/month** 🎉

---

## 🔧 **Troubleshooting**

**Problem: Chatbot shows fallback response**
- Check API key is correctly set in Netlify
- Redeploy site after adding API key
- Check Netlify function logs for errors

**Problem: "API key not configured" error**
- API key environment variable not set
- Go to Netlify → Site settings → Environment variables
- Add `GEMINI_API_KEY` with your key

**Problem: Responses are slow**
- Gemini API is free but can be slower than paid options
- Typical response: 2-5 seconds
- Typewriter effect makes it feel faster

**Problem: API quota exceeded**
- Free tier: 60 requests/minute
- Unlikely to hit this limit with portfolio traffic
- If you do, wait 1 minute and try again

---

## 🚀 **Advanced Options**

### **Change AI Model**

Edit `api/chat.js` line 72:
```javascript
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
```

Available models:
- `gemini-pro` - Best for conversations (recommended)
- `gemini-pro-vision` - Supports images (not needed here)

### **Adjust Personality**

Edit the `SYSTEM_PROMPT` in `api/chat.js` to change:
- Enthusiasm level
- Language style
- Response length
- Positioning strategy

### **Rate Limiting**

Add rate limiting to prevent abuse:
```javascript
// Add to api/chat.js
const rateLimit = new Map();
const MAX_REQUESTS_PER_MINUTE = 10;
```

---

## 📊 **Monitoring**

Check chatbot performance:
1. Netlify Dashboard → Functions → chat
2. View logs, invocations, errors
3. Monitor API usage at: https://makersuite.google.com

---

## 🎓 **Tips for Best Results**

1. **Test thoroughly** - Try various questions
2. **Monitor conversations** - Check Netlify logs
3. **Adjust prompt** - Tweak system prompt if needed
4. **Gather feedback** - See what recruiters ask
5. **Iterate** - Improve responses based on data

---

## ❓ **FAQ**

**Q: Is this really free?**
A: Yes! Google Gemini's free tier is generous (1500 requests/day). Your portfolio won't hit that limit.

**Q: What if I exceed the free tier?**
A: Unlikely, but you can upgrade to paid tier (~$0.001 per request) or switch to rate-limited mode.

**Q: Can I use OpenAI instead?**
A: Yes, but it costs money (~$0.01-0.03 per conversation). Gemini is free and works great.

**Q: How do I update the AI personality?**
A: Edit `SYSTEM_PROMPT` in `api/chat.js` and redeploy.

**Q: Can I see what people are asking?**
A: Check Netlify function logs (Functions → chat → Logs).

---

## 🎉 **You're All Set!**

Your chatbot is now powered by real AI! Recruiters will love the natural, engaging conversations about your GOLDMINE skills! 💎🚀
