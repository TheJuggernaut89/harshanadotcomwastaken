# Update Netlify API Key - Step by Step

**New API Key:** `AIzaSyDGNeBfTRc3e2ABbsNlyi49qKIcTlOmJog`

---

## 📋 STEP-BY-STEP INSTRUCTIONS

### Step 1: Open Netlify Settings

1. Go to: https://app.netlify.com/sites/harshanajothiresume2026/settings/env
2. You should see the "Environment variables" page

### Step 2: Update GEMINI_API_KEY

1. Find the variable named: `GEMINI_API_KEY`
2. Click the **"Edit"** button (pencil icon) next to it
3. You'll see the current value (old key)
4. **Replace it with:** `AIzaSyDGNeBfTRc3e2ABbsNlyi49qKIcTlOmJog`
5. Make sure it's set for:
   - ✅ Production
   - ✅ Deploy previews
   - ✅ Branch deploys
6. Click **"Save"**

### Step 3: Trigger New Deployment

1. Go to: https://app.netlify.com/sites/harshanajothiresume2026/deploys
2. Click the **"Trigger deploy"** button (top right)
3. Select **"Deploy site"**
4. Wait 2-3 minutes for build to complete

### Step 4: Verify Chatbot Works

1. Visit: https://harshanajothiresume2026.netlify.app
2. Wait for chatbot to auto-open (3 seconds)
3. Send a test message: "Hello"
4. You should see:
   - ✅ AI response with personality (emojis, GOLDMINE messaging)
   - ❌ NOT fallback: "Oops! My AI brain had a hiccup!"

---

## ✅ SUCCESS CRITERIA

**Working Chatbot:**
- Responds with enthusiastic GOLDMINE personality
- Uses emojis and specific metrics
- No error messages in browser console
- Typewriter effect visible

**Example Good Response:**
```
Hey! 👋 I'm Harshana's AI twin (the more enthusiastic version 😄)

Quick question - are you hiring or just checking out if Harshana's legit?
```

---

## 🔍 VERIFICATION

After deployment completes, check:

1. **Browser Console** (F12 → Console tab)
   - Should be no errors like "404 Not Found"
   - Should be no "API key not configured" errors

2. **Network Tab** (F12 → Network)
   - Find request to `/.netlify/functions/chat`
   - Should return HTTP 200 (not 500)
   - Response should contain AI-generated text

---

## ⚠️ TROUBLESHOOTING

**If chatbot still shows fallback:**

1. Check environment variable was saved correctly
2. Clear browser cache (Ctrl+Shift+Del)
3. Try incognito/private browsing window
4. Check Netlify deploy logs for errors
5. Verify the new key in Google AI Studio is active

**If getting 404 errors:**

Model name is already fixed to: `gemini-1.5-pro-latest`
This should work with the new key.

---

## 🔐 SECURITY REMINDER

✅ **DO:**
- Store key in Netlify environment variables
- Keep this file private (not shared publicly)
- Monitor API usage in Google AI Studio

❌ **DON'T:**
- Screenshot pages showing this key
- Commit this key to git
- Share this key in chat/email/Discord

---

**Once you complete these steps, your chatbot will be fully functional!** 🎉
