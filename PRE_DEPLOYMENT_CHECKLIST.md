# 📋 Pre-Deployment Checklist

## 🚨 MUST DO Before Deploying

### 1. Update Contact Information

**File**: `src/components/UI/InteractiveChatbot.jsx`

- [ ] Line 103: Replace `your-email@example.com` with your real email
- [ ] Line 135: Replace `your-email@example.com` in mailto link with your real email
- [ ] Line 103: Add your LinkedIn URL (replace `[Your LinkedIn]`)

**Quick Find/Replace**:
```
Find: your-email@example.com
Replace: YOUR_ACTUAL_EMAIL@gmail.com
```

### 2. Add Your Resume

- [ ] Export resume as PDF
- [ ] Save as `resume.pdf`
- [ ] Place in `public/` folder
- [ ] Test download works locally (`npm run dev`)

### 3. Customize Content

**In** `src/components/UI/InteractiveChatbot.jsx`:

- [ ] Line 70: Update skills list (keep the personality!)
- [ ] Line 81: Update project descriptions
- [ ] Line 92: Update AI capabilities
- [ ] Keep the tone casual and fun!

### 4. Optional but Recommended

- [ ] Add Calendly/Google Calendar link (Line 127)
- [ ] Add Google Analytics tracking ID (in `index.html`)
- [ ] Test all quick reply buttons work
- [ ] Test on mobile view (F12 → Device toolbar)

---

## 🧪 Testing Before Deploy

Run these commands:

```bash
# 1. Test dev build
npm run dev
# Open http://localhost:5173
# Test chatbot, all links, resume download

# 2. Test production build
npm run build
npm run preview
# Open http://localhost:4173
# Test everything again

# 3. Check for errors
# Open browser console (F12)
# Look for any red errors
```

### Test These Features:
- [ ] Chatbot opens with loading animation
- [ ] All quick reply buttons work
- [ ] Resume downloads successfully
- [ ] Email link opens (or shows error message)
- [ ] Section navigation scrolls correctly
- [ ] Mobile view looks good
- [ ] Dark mode works (if you have it)
- [ ] No console errors

---

## 🚀 Deployment Steps

### Option A: Vercel (Easiest)

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Portfolio with personality chatbot"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

2. **Deploy**:
- Go to [vercel.com](https://vercel.com)
- Sign in with GitHub
- Click "New Project"
- Import your repo
- Click "Deploy"
- ✅ Done!

### Option B: Netlify

Same as Vercel but on [netlify.com](https://netlify.com)

### Option C: GitHub Pages

1. **Install gh-pages**:
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**:
```json
"homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. **Update vite.config.js**:
```javascript
base: '/YOUR_REPO_NAME/',
```

4. **Deploy**:
```bash
npm run deploy
```

5. **Enable GitHub Pages**:
- Go to repo → Settings → Pages
- Source: Deploy from branch → `gh-pages`
- Save

---

## 🐛 Common Issues & Fixes

### Issue: Build fails

**Fix**: Check for existing errors first:
```bash
npm run build
```

Common fixes:
- Remove duplicate imports
- Check for syntax errors
- Run `npm install` to update dependencies

### Issue: Resume download 404

**Fix**:
- Verify `public/resume.pdf` exists
- Check filename matches code (Line 122)
- Test locally first

### Issue: Chatbot doesn't appear

**Fix**:
- Check browser console for errors
- Verify `<InteractiveChatbot />` is in App.jsx
- Clear browser cache

### Issue: Section navigation doesn't work

**Fix**:
- Check section IDs exist in App.jsx
- Verify IDs match chatbot code exactly:
  - `skills`
  - `projects`
  - `ai-tools`
  - `contact`
  - `malaysian-platform`

### Issue: GitHub Pages shows blank page

**Fix**:
- Check `vite.config.js` has correct `base` path
- Verify `package.json` has correct `homepage`
- Clear GitHub Pages cache (wait 5 min, redeploy)

---

## 📊 Post-Deployment

### 1. Test Live Site

- [ ] Visit your deployed URL
- [ ] Test chatbot thoroughly
- [ ] Test on mobile device
- [ ] Share with friend for feedback

### 2. Monitor Analytics

In browser console:
```javascript
chatbotAnalytics.print()
```

Track:
- Engagement rate
- Conversion rate
- Most popular actions
- Drop-off points

### 3. Get Your Custom Domain (Optional)

**Vercel/Netlify**:
- Buy domain on Namecheap/GoDaddy
- Add to deployment settings
- Update DNS records
- SSL auto-configures

**GitHub Pages**:
- Add CNAME file to public folder
- Configure DNS

---

## ✅ You're Ready!

Once you've checked off the required items, you're good to deploy!

Your chatbot will:
- Guide employers through your portfolio
- Answer questions with personality
- Drive resume downloads and interviews
- Track everything for optimization

**Good luck! 🚀**

---

## 📞 Need Help?

- **Vercel docs**: https://vercel.com/docs
- **Netlify docs**: https://docs.netlify.com
- **GitHub Pages**: https://pages.github.com
- **Check console** for errors (F12)
