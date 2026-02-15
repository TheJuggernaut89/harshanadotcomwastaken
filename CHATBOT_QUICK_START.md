# 🤖 Chatbot Quick Start Guide (Baby Steps)

If you are seeing "Oops! My AI brain had a hiccup!" or a "429 Quota Exceeded" error, follow these exact steps to fix it.

## Step 1: Get a NEW, Free API Key from Google
1. Go to **[Google AI Studio](https://aistudio.google.com/app/apikey)**.
2. Sign in with your Google Account.
3. Click the big blue button **"Create API key"**.
4. A popup will appear. Click **"Create API key in new project"**.
   - *Why?* This ensures you start fresh with a full free quota.
5. Copy the key that starts with `AIza...`.
   - **Do NOT share this key with anyone. Do NOT paste it in ChatGPT.**

## Step 2: Add the Key to Netlify (The Deployment)
1. Log in to your **[Netlify Dashboard](https://app.netlify.com/)**.
2. Click on your site name (`harshanajothiresume2026`).
3. In the left sidebar, click **"Site configuration"**.
4. In the list, look for **"Environment variables"**. Click it.
5. You will see a list of variables. Look for `GEMINI_API_KEY`.
   - If it exists: Click the **Edit** (pencil icon) next to it. Delete the old value and paste your **NEW** key.
   - If it does not exist: Click **"Add a variable"**.
     - **Key:** `GEMINI_API_KEY`
     - **Value:** (Paste your new AIza... key here)
6. Click **"Save"**.

## Step 3: Redeploy Your Site (Crucial!)
Changes to environment variables only take effect on the *next* deploy.

1. Go to the **"Deploys"** tab in Netlify.
2. Click the button **"Trigger deploy"** -> **"Clear cache and deploy site"**.
3. Wait for the deploy to say "Published".

## Step 4: Test It
1. Open your live website.
2. Click the chatbot icon.
3. Say "Hello".
4. If it replies correctly, you are done! 🎉

---

### Troubleshooting
- **Still saying "Hiccup"?**
  - Did you click "Trigger deploy" after saving the key?
  - Is the key from a *new* project in Google AI Studio? (Old projects might have used up their free tier).
  - Did you verify your billing account if you are on a paid plan? (For free tier, no billing is needed, but you must select "Free of Charge" if asked).

- **"429 Quota Exceeded"**
  - This means you are sending too many messages too fast, or your Google Cloud project is restricted.
  - Solution: Create a **NEW** API Key in a **NEW** Project (Step 1).
