# ⚡ QUICK START - Enable AI Chatbot (2 minutes)

## 🎯 **What You Need To Do NOW**

Your chatbot is deployed but needs ONE thing to work: **Google Gemini API Key (FREE)**

---

## 📝 **Step-by-Step (2 minutes)**

### **1️⃣ Get Your FREE API Key**

**Go to:** https://makersuite.google.com/app/apikey

**Click:** "Get API Key" or "Create API Key"

**Select:** "Create API key in new project"

**Copy the key** - looks like: `AIzaSyD...` (keep this private!)

---

### **2️⃣ Add to Netlify**

**Go to:** https://app.netlify.com/sites/harshanajothiresume2026/settings/deploys#environment

**OR:**
1. Open Netlify dashboard
2. Click your site: `harshanajothiresume2026`
3. Go to: **Site settings** → **Environment variables**

**Add variable:**
- Key: `GEMINI_API_KEY`
- Value: `[paste your API key here]`

**Click:** Save

---

### **3️⃣ Redeploy**

**Option A - Quick:**
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**

**Option B - Git push:**
```bash
cd C:\Users\ASUS\Downloads\enhanced-portfolio
git commit --allow-empty -m "Trigger redeploy"
git push origin main
```

---

## ✅ **Test It (wait 2 minutes for deploy)**

1. Visit: https://harshanajothiresume2026.netlify.app
2. Chatbot opens in 3 seconds
3. Ask: "What makes Harshana different?"
4. Get AI-powered response! 🎉

---

## 🔥 **What's Changed**

**BEFORE:** Scripted responses (limited, robotic)

**NOW:** Real AI conversations!
- ✅ Understands ANY question
- ✅ Natural conversations
- ✅ Context-aware
- ✅ GOLDMINE personality
- ✅ Enthusiastic & business-focused
- ✅ FREE (Google's free tier)

---

## 🆘 **Troubleshooting**

**Chatbot shows fallback response?**
→ API key not set correctly in Netlify
→ Redeploy after adding key

**Still not working?**
→ Check Netlify function logs:
→ Netlify Dashboard → Functions → chat → Logs

**Need help?**
→ Full guide: See `GEMINI_SETUP.md`

---

## 💡 **Pro Tips**

1. **Test various questions** to see AI in action
2. **Monitor Netlify function logs** to see what recruiters ask
3. **Tweak system prompt** in `api/chat.js` if needed
4. **Free tier limits**: 60 requests/minute (you won't hit this)

---

## 🎉 **That's It!**

Your chatbot is now INTELLIGENT and will impress the hell out of recruiters! 🚀💎

**Cost:** $0/month (free tier)
**Setup time:** 2 minutes
**Result:** GOLDMINE positioning with real AI!

Go get that API key and activate your AI assistant! 👉 https://makersuite.google.com/app/apikey
