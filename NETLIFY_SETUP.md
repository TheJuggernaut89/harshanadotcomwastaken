# Netlify Environment Setup

## Update API Key in Netlify

### Step 1: Go to Environment Variables

URL: https://app.netlify.com/sites/harshanajothiresume2026/settings/env

### Step 2: Update GEMINI_API_KEY

1. Find the variable named: `GEMINI_API_KEY`
2. Click **"Edit"** button
3. Paste your NEW API key from Google AI Studio
4. Set for all contexts:
   - ✅ Production
   - ✅ Deploy previews
   - ✅ Branch deploys
5. Click **"Save"**

### Step 3: Trigger Deployment

URL: https://app.netlify.com/sites/harshanajothiresume2026/deploys

1. Click **"Trigger deploy"**
2. Select **"Deploy site"**
3. Wait 2-3 minutes

### Step 4: Verify

1. Visit: https://harshanajothiresume2026.netlify.app
2. Test chatbot (should auto-open in 3 seconds)
3. Send message: "Hello"
4. Verify AI responds with GOLDMINE personality

---

## Expected Chatbot Response

✅ **Working:**
- Enthusiastic message with emojis
- GOLDMINE positioning
- Specific metrics mentioned

❌ **Not Working:**
- "Oops! My AI brain had a hiccup!" (fallback message)
- Console errors about API key

---

## Troubleshooting

If chatbot shows fallback:
1. Verify API key saved in Netlify
2. Check deployment completed successfully
3. Clear browser cache
4. Try incognito window

---

**Note:** Never commit API keys to git. Always use Netlify environment variables.
