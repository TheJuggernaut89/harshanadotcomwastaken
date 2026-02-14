# 📄 Resume Setup Instructions

## Add Your Resume PDF Here

To enable resume downloads in the chatbot, add your resume PDF to this folder.

### Steps:

1. **Export your resume as PDF** (recommended name: `resume.pdf`)

2. **Place it in this folder**:
   ```
   public/resume.pdf
   ```

3. **That's it!** The chatbot will automatically link to it when users click "Download Resume"

---

## File Naming Options

You can use any of these names (update chatbot code accordingly):

- `resume.pdf` (default)
- `Harshana_Jothi_Resume.pdf`
- `CV.pdf`
- `Portfolio.pdf`

---

## Update Chatbot Link

If you use a different filename, update this line in:
**`src/components/UI/InteractiveChatbot.jsx`** (around line 147)

```javascript
case 'download':
  window.open('/YOUR_FILENAME.pdf', '_blank'); // Change this
```

---

## Alternative: Link to External Resume

If you prefer to host your resume externally (Google Drive, Dropbox, etc.):

```javascript
case 'download':
  window.open('https://drive.google.com/your-resume-link', '_blank');
```

---

## Multiple Resume Versions

If you want to offer different resume versions:

```javascript
case 'download':
  const resumeOptions = [
    { text: "Full Resume", url: "/resume-full.pdf" },
    { text: "Executive Summary", url: "/resume-summary.pdf" },
    { text: "Technical Focus", url: "/resume-tech.pdf" }
  ];

  // Show options as quick replies
  followUpActions = resumeOptions.map(opt => ({
    text: opt.text,
    action: () => window.open(opt.url, '_blank')
  }));
```

---

**Delete this file after adding your resume!**
