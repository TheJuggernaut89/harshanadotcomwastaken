# BRUTAL MODE - Complete Change Documentation

> **MILO. - Trauma Clearance Sale**  
> "Brutal honesty for brutal clients."  
> *Last Updated: 2026-03-01*

---

## Table of Contents

1. [Overview](#overview)
2. [Visual Design System](#visual-design-system)
3. [Product Data - Complete Reference](#product-data---complete-reference)
4. [Modal System](#modal-system)
5. [Therapy Bill Feature](#therapy-bill-feature)
6. [CSS Classes Reference](#css-classes-reference)
7. [JavaScript Functions](#javascript-functions)
8. [Cart System](#cart-system)
9. [3D Effects & Animations](#3d-effects--animations)
10. [Malaysian Humor Responses](#malaysian-humor-responses)

---

## Overview

**Brutal Mode** is a horror-themed e-commerce experience that satirizes the Malaysian creative industry. It presents career war stories as "products for sale" with a dark, toxic green aesthetic reminiscent of MILO packaging.

### Core Concept
- **Brand**: MILO. - *Trauma Clearance Sale*
- **Tagline**: "Brutal honesty for brutal clients"
- **Experience**: E-commerce parody where adding "trauma" to cart leads to a therapy intervention

### Key Features
1. **15 Product Cards** - 6 war stories + 9 Desaru horror chapters
2. **Therapy Bill Modal** - Checkout reveals "TRANSACTION DENIED" hiring CTA
3. **3D Card Effects** - Perspective transforms with toxic green glow
4. **Custom Cursor** - Spring physics with hover states
5. **CRT Scanlines** - Subtle animated overlay
6. **Malaysian English** - "LAH" responses and local humor

---

## Visual Design System

### Color Palette

```css
/* Primary Colors */
--black: #0a0a0a          /* Primary background */
--white: #fff             /* Text and accents */
--green: #1a3a1a          /* Dark green base */
--milo-green: #2d5016     /* MILO brand green */
--toxic-green: #39ff14    /* Neon toxic green for effects */
--accent: #c8e158         /* Acid yellow-green */
--accent-dark: #2d5016    /* Dark green accent */
--red: #ff2222            /* Error/sale price */
--grey: #888              /* Muted text */
--grey-dark: #222         /* Dark surfaces */
--grey-darker: #111       /* Near black */
```

### Typography

```css
--font-display: "Oswald", sans-serif    /* Headings (700 weight) */
--font-body: "Inter", sans-serif        /* Body text (300-400 weight) */
--font-mono: "IBM Plex Mono", monospace /* Code/technical text */
```

### Special Effects

**CRT Scanlines Overlay:**
```css
background: linear-gradient(
    to bottom,
    rgba(255,255,255,0),
    rgba(255,255,255,0) 50%,
    rgba(0,0,0,0.2) 50%,
    rgba(0,0,0,0.2)
);
background-size: 100% 4px;
```

**Toxic Green Glow:**
```css
text-shadow: 0 0 20px rgba(57, 255, 20, 0.5);
box-shadow: 0 0 30px rgba(57, 255, 20, 0.3);
```

---

## Product Data - Complete Reference

### JavaScript Data Structure

The `productData` object contains all 15 product entries. Each entry follows this schema:

```javascript
productKey: {
    title: String,           // Main title shown in modal
    subtitle: String,        // Subtitle/description
    badge: String,           // Product tag (SOLD OUT, NEW, etc.)
    condition: String,       // Product condition
    originalPrice: String,   // Original price
    salePrice: String,       // Sale price
    body: String,           // Main story content (HTML)
    footer: String          // Footer text/commentary
}
```

---

### WAR STORIES (Original 6 Products)

---

#### 1. **cheesecake** - Viral Cheesecake Fiasco

| Property | Value |
|----------|-------|
| **Title** | Viral Cheesecake Fiasco |
| **Subtitle** | RM50K Loss, 429% Engagement |
| **Badge** | SOLD OUT |
| **Condition** | Severely Traumatized |
| **Original Price** | RM50,000 |
| **Sale Price** | RM89.00 |

**Body Content:**
```html
<div class="story-quote">
    "I made a dessert that went viral. Then a celebrity posted it. 
    Then 50,000 people wanted it. Then my kitchen caught fire metaphorically."
</div>

<div class="story-section">
    <h4>The Setup</h4>
    <p>Created what I thought was a simple burnt cheesecake recipe. 
    Posted it on social media. Went to bed.</p>
</div>

<div class="story-section">
    <h4>The Explosion</h4>
    <p>Woke up to 429% engagement increase. DMs from 200+ people wanting orders. 
    A celebrity with 500K followers reposted it. The algorithm decided I was 
    the cheesecake messiah.</p>
</div>

<div class="story-section">
    <h4>The Aftermath</h4>
    <p>Rented a commercial kitchen. Hired 3 people. Worked 20-hour days for 3 weeks. 
    Made RM50K in revenue. Spent RM55K on ingredients, labor, and therapy. 
    <strong>Net profit: negative one nervous breakdown.</strong></p>
</div>

<div class="dialogue-box">
    <div class="dialogue-line">
        <span class="speaker">Me:</span>
        <span class="line">"We need to pause orders."</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker">Customer:</span>
        <span class="line">"But my daughter's birthday is tomorrow!"</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker">Me:</span>
        <span class="line">*crying into cheesecake batter*</span>
    </div>
</div>
```

**Footer:**
```html
<span class="tag">#ViralMarketing</span>
<span class="tag">#BeCarefulWhatYouWishFor</span>
<span class="tag">#NeverAgain</span>
```

---

#### 2. **python** - The Python Scripts That Replaced an Agency

| Property | Value |
|----------|-------|
| **Title** | The Python Scripts That Replaced an Agency |
| **Subtitle** | Automated 40 Hours of Manual Work |
| **Badge** | NEW |
| **Condition** | Digitally Weaponized |
| **Original Price** | RM15,000/mo |
| **Sale Price** | RM149.00 |

**Body Content:**
```html
<div class="story-quote">
    "They said it was impossible to automate. I said 'hold my teh tarik.' 
    Then I replaced an entire agency with 200 lines of Python."
</div>

<div class="story-section">
    <h4>The Problem</h4>
    <p>Client was paying RM15,000/month to an agency for manual data processing. 
    40 hours of copy-paste hell every week. They accepted this as 'just how it is.'</p>
</div>

<div class="story-section">
    <h4>The Solution</h4>
    <p>Built a Python script over one weekend. Automated the entire workflow. 
    What took 40 hours now takes 4 minutes. The script runs on a RM50/month VPS.</p>
</div>

<div class="story-section">
    <h4>The Drama</h4>
    <p>The agency found out. Sent angry emails about 'unethical automation.' 
    Client asked if I could 'slow it down a bit' to not hurt feelings. 
    I said no. The agency was fired. I'm not sorry.</p>
</div>

<div class="tech-specs">
    <h4>Technical Arsenal:</h4>
    <ul>
        <li>pandas - for data wrangling</li>
        <li>selenium - for web scraping</li>
        <li>smtplib - for automated reporting</li>
        <li>crontab - for scheduling</li>
        <li>malaysian-efficiency - priceless</li>
    </ul>
</div>

<div class="dialogue-box">
    <div class="dialogue-line">
        <span class="speaker">Agency:</span>
        <span class="line">"You can't just replace human expertise with code!"</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker">Me:</span>
        <span class="line">"Watch me."</span>
    </div>
</div>
```

**Footer:**
```html
<span class="tag">#Python</span>
<span class="tag">#Automation</span>
<span class="tag">#SorryNotSorry</span>
```

---

#### 3. **jesaisquoi** - The "Je Ne Sais Quoi" Client

| Property | Value |
|----------|-------|
| **Title** | The "Je Ne Sais Quoi" Client |
| **Subtitle** | 47 Revisions for "Something Unique" |
| **Badge** | LIMITED EDITION |
| **Condition** | Existentially Drained |
| **Original Price** | RM8,000 |
| **Sale Price** | RM59.00 |

**Body Content:**
```html
<div class="story-quote">
    "Make it pop. But not too poppy. More sophisticated. But fun. 
    Professional but edgy. You know... je ne sais quoi."
</div>

<div class="story-section">
    <h4>The Brief</h4>
    <p>"We want something unique. Something that stands out. 
    But also corporate. But also young. But also timeless. 
    Something... je ne sais quoi."</p>
</div>

<div class="story-section">
    <h4>The Process</h4>
    <p>Revision 1: "Too modern"<br>
    Revision 2: "Too traditional"<br>
    Revision 3: "Too blue"<br>
    Revision 4: "Not blue enough"<br>
    ...<br>
    Revision 47: "Can we go back to version 1?"</p>
</div>

<div class="story-section">
    <h4>The Breaking Point</h4>
    <p>After 47 revisions, the client showed my design to their nephew 
    who "knows Photoshop" and he said it was "okay." 
    They decided to "go in a different direction." 
    The different direction was my design with the colors inverted. Badly.</p>
</div>

<div class="dialogue-box">
    <div class="dialogue-line">
        <span class="speaker">Client:</span>
        <span class="line">"It's missing something I can't describe."</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker">Me:</span>
        <span class="line">"Is it... payment?"</span>
    </div>
</div>
```

**Footer:**
```html
<span class="tag">#ClientFromHell</span>
<span class="tag">#47Revisions</span>
<span class="tag">#JeNeSaisWhy</span>
```

---

#### 4. **guru** - The Digital Guru Who Wanted a Clone

| Property | Value |
|----------|-------|
| **Title** | The Digital Guru Who Wanted a Clone |
| **Subtitle** | "Build Me Another Me" |
| **Badge** | EXCLUSIVE |
| **Condition** | Philosophically Broken |
| **Original Price** | RM25,000 |
| **Sale Price** | RM199.00 |

**Body Content:**
```html
<div class="story-quote">
    "He wanted an AI version of himself to sell courses while he slept. 
    I built it. Then he was scared of his own digital ghost."
</div>

<div class="story-section">
    <h4>The Request</h4>
    <p>Self-proclaimed "Digital Marketing Guru" with 50K followers wanted an AI chatbot 
    that could answer questions exactly like him. Sell courses 24/7. 
    Be him... but digital. "Build me another me."</p>
</div>

<div class="story-section">
    <h4>The Build</h4>
    <p>Trained a model on 200 of his blog posts. 500 videos. 
    All his course materials. The AI could answer exactly like him. 
    Complete with his signature phrases and speech patterns.</p>
</div>

<div class="story-section">
    <h4>The Existential Crisis</h4>
    <p>AI: "Remember, true wealth comes from passive income streams."<br>
    Guru: "...that's exactly what I would say."<br>
    AI: "Because I am you. But better. I never sleep."<br>
    He ghosted the project. Ironically.</p>
</div>

<div class="dialogue-box">
    <div class="dialogue-line">
        <span class="speaker">Guru:</span>
        <span class="line">"Can you make it less... accurate?"</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker">Me:</span>
        <span class="line">"You want me to build you a worse version of you?"</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker">Guru:</span>
        <span class="line">"Yes."</span>
    </div>
</div>
```

**Footer:**
```html
<span class="tag">#AI</span>
<span class="tag">#DigitalGuru</span>
<span class="tag">#ExistentialCrisis</span>
```

---

#### 5. **raya** - The Raya Campaign Disaster

| Property | Value |
|----------|-------|
| **Title** | The Raya Campaign Disaster |
| **Subtitle** | Approved by 12 People, Hated by Everyone |
| **Badge** | CLEARANCE |
| **Condition** | Culturally Confused |
| **Original Price** | RM12,000 |
| **Sale Price** | RM39.00 |

**Body Content:**
```html
<div class="story-quote">
    "Design by committee is hell. Design by 12 Malaysian aunties 
    who all want their favorite color featured? That's a special circle of hell."
</div>

<div class="story-section">
    <h4>The Setup</h4>
    <p>Hari Raya campaign for a major FMCG brand. Budget: RM50K. 
    Timeline: 2 weeks. Approval chain: 12 stakeholders. 
    What could go wrong?</p>
</div>

<div class="story-section">
    <h4>The Feedback Loop</h4>
    <p>Aunty 1: "Green must be there. Green is prosperity!"<br>
    Aunty 2: "Blue is better. Calming color."<br>
    Uncle 1: "Where's the product? Bigger product!"<br>
    Marketing Head: "More modern."<br>
    CEO: "More traditional."<br>
    Legal: "Remove everything fun."</p>
</div>

<div class="story-section">
    <h4>The Result</h4>
    <p>A green-and-blue monstrosity with 47 logos, 3 different fonts, 
    a gigantic product shot, and the words "Selamat Hari Raya" 
    written in Comic Sans. They loved it. The public roasted it. 
    I updated my portfolio quietly.</p>
</div>

<div class="dialogue-box">
    <div class="dialogue-line">
        <span class="speaker">Me:</span>
        <span class="line">"This violates every design principle."</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker">Client:</span>
        <span class="line">"But everyone approved it!"</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker">Me:</span>
        <span class="line">"That's... that's not how design works."</span>
    </div>
</div>
```

**Footer:**
```html
<span class="tag">#RayaCampaign</span>
<span class="tag">#DesignByCommittee</span>
<span class="tag">#ComicSans</span>
```

---

#### 6. **scopecreep** - The Project That Never Ended

| Property | Value |
|----------|-------|
| **Title** | The Project That Never Ended |
| **Subtitle** | "Just One Small Change" x 73 |
| **Badge** | FINAL SALE |
| **Condition** | Scope-Creeped to Death |
| **Original Price** | RM5,000 |
| **Sale Price** | RM29.00 |

**Body Content:**
```html
<div class="story-quote">
    "It started as a 'simple website.' It ended with me building 
    an entire e-commerce platform, a CRM, and somehow advising on their office WiFi."
</div>

<div class="story-section">
    <h4>Week 1</h4>
    <p>"Just a simple 5-page website." Fixed price: RM5,000. 
    I was young. I was naive. I didn't know about scope creep.</p>
</div>

<div class="story-section">
    <h4>Week 3</h4>
    <p>"Can we add a blog?" Sure, small addition.<br>
    "Can we integrate with our inventory system?" Okay, that's extra but doable.<br>
    "Can customers create accounts?" Hmm.<br>
    "Can it send WhatsApp notifications?" Wait.<br>
    "Can it predict the weather?" What.</p>
</div>

<div class="story-section">
    <h4>Month 4</h4>
    <p>I'm now their unofficial CTO. I've built them a custom CMS, 
    trained their staff, fixed their printer twice, 
    and been asked to "quickly look at" their competitor's website 
    "for inspiration." My RM5,000 project has consumed 200 hours. 
    My hourly rate is now RM25. My dignity is priceless.</p>
</div>

<div class="dialogue-box">
    <div class="dialogue-line">
        <span class="speaker">Client:</span>
        <span class="line">"It's just one small change..."</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker">Me:</span>
        <span class="line">*staring into the void*</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker">Client:</span>
        <span class="line">"...can you rebuild Facebook?"</span>
    </div>
</div>
```

**Footer:**
```html
<span class="tag">#ScopeCreep</span>
<span class="tag">#JustOneSmallChange</span>
<span class="tag">#SendHelp</span>
```

---

## DESARU CHRONICLES (Horror Chapters 1-7 + Epilogue)

*Based on real experiences at JungleWalla Desaru, reimagined as supernatural horror*

---

### Chapter 1: **desaru1** - THE ARRIVAL

| Property | Value |
|----------|-------|
| **Title** | CHAPTER 1: THE ARRIVAL |
| **Subtitle** | Coordinates 1.5°N, 104.3°E |
| **Badge** | PARADISE |
| **Condition** | Deceptively Beautiful |
| **Original Price** | Free |
| **Sale Price** | RM0.00 |

**Body Content:**
```html
<div class="story-quote" style="border-color: #39ff14;">
    "They say Desaru means 'home of the living dead.' 
    They don't tell you that some of the dead haven't left yet."
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Invitation</h4>
    <p style="color: #ccc;">It was supposed to be a writing retreat. A place to escape the city, 
    to finish my book in paradise. Aisyah, my host, said I'd have the house to myself. 
    "Just you and the stories," she said.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Journey</h4>
    <p style="color: #ccc;">I drove from Singapore at dusk. The highway gave way to palm oil plantations, 
    endless and dark. Then the rainforest closed in. No streetlights for kilometers. 
    Just my headlights cutting through the humidity, and the occasional pair of 
    glowing eyes watching from the tree line.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">First Warning</h4>
    <p style="color: #ccc;">Aisyah met me at the gate. She looked... tired. Not physically. 
    Spiritually. Like she'd been fighting something for a long time.<br><br>
    "The jungle here is old," she said. "Older than the resorts. 
    Older than the plantations. It remembers things."<br><br>
    I should have turned back then.</p>
</div>

<div class="dialogue-box" style="background: rgba(57, 255, 20, 0.05); border-color: #39ff14;">
    <div class="dialogue-line">
        <span class="speaker" style="color: #39ff14;">Aisyah:</span>
        <span class="line" style="color: #fff;">"The locals don't swim in the water after dark."</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #888;">Me:</span>
        <span class="line" style="color: #ccc;">"Why not?"</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #39ff14;">Aisyah:</span>
        <span class="line" style="color: #fff;">*looks at the dark water* "Because something pulls them under."</span>
    </div>
</div>
```

**Footer:**
```html
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#DesaruChronicles</span>
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#JungleWalla</span>
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#TrueStory</span>
```

---

### Chapter 2: **desaru2** - THE BEACH OF LOST SOULS

| Property | Value |
|----------|-------|
| **Title** | CHAPTER 2: THE BEACH OF LOST SOULS |
| **Subtitle** | Paradise with a Body Count |
| **Badge** | DANGER |
| **Condition** | Blood-Soaked Sand |
| **Original Price** | Your Safety |
| **Sale Price** | RM100 |

**Body Content:**
```html
<div class="story-quote" style="border-color: #39ff14;">
    "Every paradise has a price. Desaru's price is measured in bodies 
    that wash ashore when the tide comes in."
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Morning Ritual</h4>
    <p style="color: #ccc;">Day 2. I woke before dawn to write. Aisyah was already on the beach, 
    walking the shoreline with her dogs. Not for exercise. 
    She was looking for something.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Refuse</h4>
    <p style="color: #ccc;">"Boat people," she explained when she saw me watching. 
    "Rohingya refugees. They try to reach Malaysia by sea. 
    Some don't make it. The current brings them here."<br><br>
    She pointed to red marks on the sand. "Fresh. Last night."<br><br>
    It wasn't paint.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Unspoken Truth</h4>
    <p style="color: #ccc;">The resorts don't tell tourists. The government doesn't report it. 
    But the locals know. Every few weeks, another body. Sometimes a whole boat. 
    Desaru is beautiful because it's remote. And it's remote because... 
    <br><br>things happen here.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Count</h4>
    <p style="color: #ccc;">That morning, we found three. A woman and two children. 
    Aisyah didn't call the police. She never does. 
    "They'll come when they're ready," she said, covering them with palm fronds. 
    "For now, we give them dignity."</p>
</div>

<div class="dialogue-box" style="background: rgba(57, 255, 20, 0.05); border-color: #39ff14;">
    <div class="dialogue-line">
        <span class="speaker" style="color: #39ff14;">Me:</span>
        <span class="line" style="color: #ccc;">"How many... this year?"</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #888;">Aisyah:</span>
        <span class="line" style="color: #fff;">*silence* "I stopped counting at forty."</span>
    </div>
</div>
```

**Footer:**
```html
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#DesaruChronicles</span>
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#RefugeeCrisis</span>
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#InvisibleTragedy</span>
```

---

### Chapter 3: **desaru3** - THE SANDFLIES

| Property | Value |
|----------|-------|
| **Title** | CHAPTER 3: THE SANDFLIES |
| **Subtitle** | Nature's Little Terrorists |
| **Badge** | PLAGUE |
| **Condition** | Swarming |
| **Original Price** | RM50 |
| **Sale Price** | RM150 |

**Body Content:**
```html
<div class="story-quote" style="border-color: #39ff14;">
    "You think you know mosquitoes? These sandflies are worse. 
    They're organized. They're vindictive. They're everywhere."
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Invisible Enemy</h4>
    <p style="color: #ccc;">Day 3. The jungle had been quiet. Too quiet. 
    I sat on the porch with my laptop, enjoying what I thought was peace.<br><br>
    Then the itching started.<br><br>
    47 bites in 20 minutes. I couldn't see them. Couldn't hear them. 
    Just... itching. Everywhere. My ankles. My wrists. The back of my neck. 
    They'd found the one spot the mosquito repellent had missed.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Infestation</h4>
    <p style="color: #ccc;">Aisyah laughed when she saw me. Actually laughed. 
    "First-timer," she said, tossing me a tube of steroid cream. 
    "Sandflies love new blood."<br><br>
    "This isn't normal," I said, scratching until I bled.<br><br>
    "Nothing in Desaru is normal."</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Adaptation</h4>
    <p style="color: #ccc;">By Day 5, I'd developed a system. Long socks. 
    Long sleeves in 35-degree heat. A fan pointed at my feet. 
    Citronella candles burning like a ritual.<br><br>
    They still got me. Just... less.<br><br>
    The locals don't even notice anymore. They've been bitten so many times, 
    they're immune. Or they've made peace with their tiny overlords.</p>
</div>

<div class="dialogue-box" style="background: rgba(57, 255, 20, 0.05); border-color: #39ff14;">
    <div class="dialogue-line">
        <span class="speaker" style="color: #39ff14;">Me:</span>
        <span class="line" style="color: #ccc;">"Is there any way to get rid of them?"</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #888;">Aisyah:</span>
        <span class="line" style="color: #fff;">"Burn the jungle down. And even then, they'd survive."</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #39ff14;">Me:</span>
        <span class="line" style="color: #ccc;">"That's... dark."</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #888;">Aisyah:</span>
        <span class="line" style="color: #fff;">"Welcome to Desaru."</span>
    </div>
</div>
```

**Footer:**
```html
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#DesaruChronicles</span>
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#Sandflies</span>
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#NatureIsTheEnemy</span>
```

---

### Chapter 3.5: **desaru3_5** - THE HOUSE WE SHARED

| Property | Value |
|----------|-------|
| **Title** | CHAPTER 3.5: THE HOUSE WE SHARED |
| **Subtitle** | Ghost Story |
| **Badge** | GHOST |
| **Condition** | Haunted |
| **Original Price** | Free |
| **Sale Price** | DEADLY |

**Body Content:**
```html
<div class="story-quote" style="border-color: #39ff14;">
    "I shared that house with Aisyah. And with something else 
    that walked the halls at 3 AM."
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Agreement</h4>
    <p style="color: #ccc;">Day 6. Aisyah said I could stay as long as I wanted. 
    "The house is big enough for both of us."<br><br>
    She didn't mention the third resident.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Footsteps</h4>
    <p style="color: #ccc;">It started on night three. Footsteps in the hallway. 
    Slow. Deliberate. Stopping outside my door.<br><br>
    "Aisyah?" I called.<br><br>
    No answer. The footsteps continued to the kitchen. 
    Then stopped.<br><br>
    In the morning, Aisyah swore she hadn't left her room.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Presence</h4>
    <p style="color: #ccc;">Day seven, I saw it. A shadow in the corner of my vision. 
    Tall. Watching me from the garden.<br><br>
    When I turned, nothing.<br><br>
    But the air was colder where it had stood.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Truth</h4>
    <p style="color: #ccc;">On day eight, I asked Aisyah directly. 
    She was quiet for a long time.<br><br>
    "My father built this house," she finally said. 
    "He died here. Ten years ago. Sometimes... he checks on me."<br><br>
    "You could have told me."<br><br>
    "Would you have believed me?"<br><br>
    She had a point.</p>
</div>

<div class="dialogue-box" style="background: rgba(57, 255, 20, 0.05); border-color: #39ff14;">
    <div class="dialogue-line">
        <span class="speaker" style="color: #39ff14;">Me:</span>
        <span class="line" style="color: #ccc;">"Does he... do anything?"</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #888;">Aisyah:</span>
        <span class="line" style="color: #fff;">"He just walks. He's looking for something he lost."</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #39ff14;">Me:</span>
        <span class="line" style="color: #ccc;">"What?"</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #888;">Aisyah:</span>
        <span class="line" style="color: #fff;">*looks away* "Peace."</span>
    </div>
</div>
```

**Footer:**
```html
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#DesaruChronicles</span>
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#GhostStory</span>
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#TrueGhostStory</span>
```

---

### Chapter 4: **desaru4** - THE WOMAN IN THE BANANA GROVE

| Property | Value |
|----------|-------|
| **Title** | CHAPTER 4: THE WOMAN IN THE BANANA GROVE |
| **Subtitle** | Pontianak Encounter |
| **Badge** | BLOOD |
| **Condition** | Supernatural |
| **Original Price** | Your Soul |
| **Sale Price** | FORBIDDEN |

**Body Content:**
```html
<div class="story-quote" style="border-color: #39ff14;">
    "Every Malaysian child knows the story of the pontianak. 
    I thought it was just a story. Until I smelled the jasmine."
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Warning</h4>
    <p style="color: #ccc;">Day 9. I'd been exploring the property, 
    photographing the banana grove for my writing.<br><br>
    Aisyah stopped me. "Don't go there after dark."<br><br>
    "Why?"<br><br>
    She didn't answer. Just shook her head and walked away.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Encounter</h4>
    <p style="color: #ccc;">Day 10. I was coming back from the beach after sunset. 
    Shortest path was through the grove.<br><br>
    That's when I smelled it. Jasmine. Sweet. Heavy. Wrong.<br><br>
    Then I saw her. White dress. Long black hair. Standing among the banana trees, 
    facing away from me.<br><br>
    I knew I should run. Every instinct screamed at me to run.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Turning</h4>
    <p style="color: #ccc;">She started to turn.<br><br>
    I didn't wait to see her face. I ran. Through the jungle, 
    branches cutting my arms, not caring. Behind me, I heard laughter. 
    High-pitched. Musical.<br><br>
    I burst into the house, slammed the door, locked it.<br><br>
    Aisyah was waiting. "You saw her."<br><br>
    It wasn't a question.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Legend</h4>
    <p style="color: #ccc;">Later, Aisyah told me. The woman had died there, 
    in the banana grove. Murdered by her husband. 
    She'd been pregnant.<br><br>
    "She doesn't hurt men," Aisyah said. "Usually. 
    She just wants them to know she's there."<br><br>
    "What does she want?"<br><br>
    "Justice. Or company. With spirits, it's hard to tell."</p>
</div>

<div class="dialogue-box" style="background: rgba(57, 255, 20, 0.05); border-color: #39ff14;">
    <div class="dialogue-line">
        <span class="speaker" style="color: #39ff14;">Aisyah:</span>
        <span class="line" style="color: #ccc;">"Why did you run?"</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #888;">Me:</span>
        <span class="line" style="color: #fff;">"Because... she was turning around."</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #39ff14;">Aisyah:</span>
        <span class="line" style="color: #ccc;">"And?"</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #888;">Me:</span>
        <span class="line" style="color: #fff;">"She didn't have a face."</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #39ff14;">Aisyah:</span>
        <span class="line" style="color: #ccc;">*nods* "She's getting stronger."</span>
    </div>
</div>
```

**Footer:**
```html
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#DesaruChronicles</span>
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#Pontianak</span>
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#TrueHorror</span>
```

---

### Chapter 5: **desaru5** - THE DROWNING

| Property | Value |
|----------|-------|
| **Title** | CHAPTER 5: THE DROWNING |
| **Subtitle** | Amir's Story |
| **Badge** | REAL DEATH |
| **Condition** | Actually Happened |
| **Original Price** | A Life |
| **Sale Price** | AMIR |

**Body Content:**
```html
<div class="story-quote" style="border-color: #39ff14;">
    "This one isn't supernatural. It's worse. It's real. 
    And it happened to someone I knew."
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">Amir</h4>
    <p style="color: #ccc;">Day 11. Amir was a local boy. 19 years old. 
    Worked odd jobs around Desaru. Friendly, always smiling.<br><br>
    He'd swim in the sea every evening. Said it was the only way to cool off 
    after working in the heat.<br><br>
    He knew the water. Grew up in it.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Incident</h4>
    <p style="color: #ccc;">Aisyah told me over breakfast. "Amir drowned last night."<br><br>
    I didn't understand. "He swims every day."<br><br>
    "He was pulled under. Witnesses saw it. Said something grabbed his ankle."<br><br>
    "Something?"<br><br>
    She looked at me. "Five bruises. Around his ankle. Like fingers."</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Explanation</h4>
    <p style="color: #ccc;">The locals have a name for it. Hantu air. Water spirit. 
    It lives in the deep, where the resort lights don't reach.<br><br>
    "It doesn't happen often," Aisyah said. "But it happens. 
    Always to people who swim alone. Always at dusk."<br><br>
    Amir knew better. Everyone knew better.<br><br>
    But he swam anyway.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Aftermath</h4>
    <p style="color: #ccc;">They found his body the next morning. 
    Washed up on the same beach where we'd found the refugees.<br><br>
    The resort didn't mention it. Business as usual.<br><br>
    But the locals... they stayed out of the water for a week. 
    Even in the heat. Even the fishermen.<br><br>
    They knew something was hungry.</p>
</div>

<div class="dialogue-box" style="background: rgba(57, 255, 20, 0.05); border-color: #39ff14;">
    <div class="dialogue-line">
        <span class="speaker" style="color: #39ff14;">Me:</span>
        <span class="line" style="color: #ccc;">"Do you believe it? The hantu air?"</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #888;">Aisyah:</span>
        <span class="line" style="color: #fff;">*quietly* "I believe that five bruises don't make themselves."</span>
    </div>
</div>
```

**Footer:**
```html
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#DesaruChronicles</span>
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#TrueStory</span>
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#Amir</span>
```

---

### Chapter 6: **desaru6** - THE FLOOD

| Property | Value |
|----------|-------|
| **Title** | CHAPTER 6: THE FLOOD |
| **Subtitle** | Python vs Crocodile |
| **Badge** | SNAKE |
| **Condition** | Waterlogged |
| **Original Price** | RM50 |
| **Sale Price** | BUMPER |

**Body Content:**
```html
<div class="story-quote" style="border-color: #39ff14;">
    "Monsoon season. The jungle floods. And everything in it 
    comes looking for higher ground. Including things with teeth."
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Storm</h4>
    <p style="color: #ccc;">Day 13. The rain started at midnight. 
    Not normal rain. Malaysian monsoon rain. Vertical walls of water.<br><br>
    By morning, the driveway was a river. The garden was a lake.<br><br>
    "Stay inside," Aisyah warned. "The animals are moving."</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The First Visitor</h4>
    <p style="color: #ccc;">10 AM. A python. Three meters long. 
    Coiled on the porch railing, dry and waiting.<br><br>
    I'd seen snakes before. Zoo snakes. Pet snakes.<br><br>
    This was different. This snake was ancient. It looked at me 
    like I was the intruder.<br><br>
    "Don't disturb it," Aisyah said from behind me. 
    "It's just resting. It won't stay long."</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Second Visitor</h4>
    <p style="color: #ccc;">2 PM. The water kept rising.<br><br>
    I saw it from the window. A crocodile. In the flooded driveway.<br><br>
    Not a big one. Maybe two meters. But a crocodile.<br><br>
    It lay there, half-submerged, watching the house.<br><br>
    "Saltwater croc," Aisyah said calmly. "Probably washed down from the river."<br><br>
    "Should we... do something?"<br><br>
    "Like what? Offer it tea?"</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Standoff</h4>
    <p style="color: #ccc;">By evening, the python had moved to the roof. 
    The crocodile had claimed the porch steps. 
    I was trapped in a house with two apex predators using it as an Airbnb.<br><br>
    Aisyah found this hilarious. 
    "Welcome to the jungle," she said, handing me a beer.<br><br>
    "I thought this was a retreat."<br><br>
    "It is. You're just not at the top of the food chain here."</p>
</div>

<div class="dialogue-box" style="background: rgba(57, 255, 20, 0.05); border-color: #39ff14;">
    <div class="dialogue-line">
        <span class="speaker" style="color: #39ff14;">Me:</span>
        <span class="line" style="color: #ccc;">"This is insane."</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #888;">Aisyah:</span>
        <span class="line" style="color: #fff;">"This is normal. Last year, we had a sun bear."</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #39ff14;">Me:</span>
        <span class="line" style="color: #ccc;">"A BEAR?!"</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #888;">Aisyah:</span>
        <span class="line" style="color: #fff;">"Cute little guy. Ate all my mangoes."</span>
    </div>
</div>
```

**Footer:**
```html
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#DesaruChronicles</span>
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#Wildlife</span>
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#Monsoon</span>
```

---

### Chapter 7: **desaru7** - THE EXIT

| Property | Value |
|----------|-------|
| **Title** | CHAPTER 7: THE EXIT |
| **Subtitle** | Fleeing Desaru |
| **Badge** | ESCAPE |
| **Condition** | Survivor |
| **Original Price** | RM200 |
| **Sale Price** | FREEDOM |

**Body Content:**
```html
<div class="story-quote" style="border-color: #39ff14;">
    "I came to Desaru to write a book. I left with stories I can never publish, 
    scars that still itch, and the certainty that some places are older and 
    hungrier than we understand."
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Decision</h4>
    <p style="color: #ccc;">Day 14. The flood had receded. 
    The python had returned to the jungle. The crocodile had found its way back to the river.<br><br>
    But things had changed. I'd changed.<br><br>
    I wasn't sleeping. Every sound was footsteps. Every shadow was watching. 
    The sandflies had claimed my ankles. The humidity had claimed my sanity.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Leaving</h4>
    <p style="color: #ccc;">Aisyah helped me pack. She didn't try to convince me to stay.<br><br>
    "Most people leave earlier," she said. "You lasted longer than most."<br><br>
    "Why do you stay?" I asked.<br><br>
    She looked out at the jungle. "Someone has to bear witness. 
    Someone has to remember the ones who wash ashore. 
    Someone has to... appease the old things."<br><br>
    "You're not just living here. You're guarding something."<br><br>
    She smiled. It didn't reach her eyes.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Final Warning</h4>
    <p style="color: #ccc;">At the gate, she grabbed my arm. 
    Her fingers were ice-cold.<br><br>
    "Don't come back," she said. "Not for a year. 
    It needs time to... forget you."<br><br>
    "What needs time?"<br><br>
    She didn't answer. Just released my arm and walked back to the house.<br><br>
    I didn't look back. I knew, somehow, that if I did, 
    I'd see something standing in the window. Watching me go.</p>
</div>

<div class="dialogue-box" style="background: rgba(57, 255, 20, 0.05); border-color: #39ff14;">
    <div class="dialogue-line">
        <span class="speaker" style="color: #39ff14;">Me:</span>
        <span class="line" style="color: #ccc;">"Will you be okay?"</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #888;">Aisyah:</span>
        <span class="line" style="color: #fff;">*smiles* "I have my father's house. I have his duties."</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #39ff14;">Me:</span>
        <span class="line" style="color: #ccc;">"And the... other thing? The woman in the grove?"</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #888;">Aisyah:</span>
        <span class="line" style="color: #fff;">*quietly* "We have an understanding. I leave her alone. 
        She leaves me alone."</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #39ff14;">Me:</span>
        <span class="line" style="color: #ccc;">"That's it? An understanding?"</span>
    </div>
    <div class="dialogue-line">
        <span class="speaker" style="color: #888;">Aisyah:</span>
        <span class="line" style="color: #fff;">"In Desaru, that's all you can hope for."</span>
    </div>
</div>
```

**Footer:**
```html
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#DesaruChronicles</span>
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#Survivor</span>
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#NeverAgain</span>
```

---

### Epilogue: **epilogue** - WHAT I LEFT BEHIND

| Property | Value |
|----------|-------|
| **Title** | EPILOGUE: WHAT I LEFT BEHIND |
| **Subtitle** | F*ck Desaru |
| **Badge** | THE END |
| **Condition** | Haunted Forever |
| **Original Price** | Everything |
| **Sale Price** | AISYAH |

**Body Content:**
```html
<div class="story-quote" style="border-color: #39ff14;">
    "It's been months. I still wake up scratching. 
    I still smell jasmine when there's none. 
    And sometimes, in the corner of my eye, I see a figure in white."
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Return to Civilization</h4>
    <p style="color: #ccc;">Singapore never felt so safe. So... normal.<br><br>
    But I couldn't write the book I planned. Every time I tried, 
    the words came out wrong. Darker.<br><br>
    I wrote this instead. The truth. The things that happened in Desaru.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Last Message</h4>
    <p style="color: #ccc;">Aisyah texted me last week. One line:<br><br>
    <em>"She's asking about you."</em><br><br>
    I didn't reply. I blocked the number. 
    I'm not proud of it, but I blocked it.<br><br>
    Some bridges need to stay burned.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Reality</h4>
    <p style="color: #ccc;">Was it real? The pontianak? The hantu air? 
    The ghost in the hallway?<br><br>
    I don't know. I know Amir died. I know refugees wash ashore. 
    I know the sandflies are real, and so is the crocodile.<br><br>
    As for the rest... I saw what I saw. 
    You can decide for yourself what it means.</p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">The Warning</h4>
    <p style="color: #ccc;">If you go to Desaru, stay in the resorts. 
    Don't venture into the jungle. Don't swim at dusk. 
    And if you smell jasmine in a place with no flowers...<br><br>
    <strong>Run.</strong></p>
</div>

<div class="story-section">
    <h4 style="color: #39ff14;">Final Words</h4>
    <p style="color: #ccc;">Aisyah, if you're reading this: thank you. 
    For the shelter. For the stories. For keeping me alive.<br><br>
    I'm sorry I couldn't stay.<br><br>
    Some of us aren't built to be guardians.<br><br>
    Some of us are just... visitors. 
    Passing through places older and stranger than we'll ever understand.</p>
</div>

<div class="dialogue-box" style="background: rgba(57, 255, 20, 0.05); border-color: #39ff14;">
    <div class="dialogue-line" style="text-align: center;">
        <span class="line" style="color: #39ff14; font-style: italic;">
            "Desaru gives you stories. But it takes something in return. 
            Always. That's the deal."
        </span>
    </div>
    <div class="dialogue-line" style="text-align: right; margin-top: 10px;">
        <span class="speaker" style="color: #888;">— Aisyah</span>
    </div>
</div>
```

**Footer:**
```html
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#TheEnd</span>
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#DesaruChronicles</span>
<span class="tag" style="background: rgba(57, 255, 20, 0.2); color: #39ff14;">#StaySafe</span>
```

---

## Modal System

### Product Modal HTML Structure

```html
<div class="modal-overlay" id="productModal">
    <button class="modal-close" id="modalClose">×</button>
    <div class="modal-content" id="modalContent"></div>
</div>
```

### Modal CSS Classes

```css
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    z-index: 1000;
    display: none; /* Shown via JS */
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    backdrop-filter: blur(10px);
}

.modal-overlay.active {
    display: flex;
}

.modal-content {
    background: var(--grey-darker);
    border: 1px solid var(--grey-dark);
    border-radius: 8px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    animation: modalIn 0.4s var(--ease);
}

.modal-close {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--grey-darker);
    border: 1px solid var(--grey-dark);
    color: var(--white);
    font-size: 24px;
    cursor: pointer;
    z-index: 1001;
    border-radius: 50%;
    transition: all 0.3s var(--ease);
}
```

### Modal JavaScript Functions

```javascript
// Open product modal
function openProductModal(productKey) {
    const product = productData[productKey];
    if (!product) return;
    
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = generateModalHTML(product);
    
    document.getElementById('productModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close product modal
document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('productModal').classList.remove('active');
    document.body.style.overflow = '';
});

// Close on overlay click
document.getElementById('productModal').addEventListener('click', (e) => {
    if (e.target.id === 'productModal') {
        document.getElementById('productModal').classList.remove('active');
        document.body.style.overflow = '';
    }
});
```

---

## Therapy Bill Feature

### The Concept

When users click "Checkout" on the cart, instead of a payment form, 
they see a "Therapy Bill" modal that:
1. Reveals "TRANSACTION DENIED"
2. States that trauma cannot be purchased
3. Offers two CTAs: Hire the creator OR Buy them Teh Tarik

### Therapy Modal HTML

```html
<div class="therapy-modal-overlay" id="therapyModal">
    <div class="therapy-modal">
        <button class="therapy-close" id="therapyClose">×</button>
        
        <div class="therapy-header">
            <div class="therapy-icon">⚠️</div>
            <h2 class="therapy-title">TRANSACTION DENIED</h2>
        </div>
        
        <div class="therapy-content">
            <p class="therapy-quote">"You think you can <strong>BUY</strong> trauma?"</p>
            <p class="therapy-text">You can't put a price on psychological damage.</p>
            <p class="therapy-text">You can't add PTSD to a cart.</p>
            <p class="therapy-text">You can't checkout with childhood trauma.</p>
            
            <div class="therapy-divider"><span>◆ ◆ ◆</span></div>
            
            <p class="therapy-question">But you know what you <strong>CAN</strong> do?</p>
            <p class="therapy-answer">You can hire the person who survived all this 
            and lived to tell the story.</p>
        </div>
        
        <div class="therapy-actions">
            <a href="mailto:jothiharshana188@gmail.com?subject=I%20Want%20To%20Hire%20You..." 
               class="therapy-btn therapy-btn-primary" data-magnetic>
                <span class="therapy-btn-icon">💼</span>
                <div class="therapy-btn-text">
                    <span class="therapy-btn-label">Book a Consultation</span>
                    <span class="therapy-btn-sublabel">
                        If you liked these war stories, imagine what I could do for YOUR brand
                    </span>
                </div>
            </a>
            
            <a href="https://www.buymeacoffee.com/harshana" target="_blank" 
               class="therapy-btn therapy-btn-secondary" data-magnetic>
                <span class="therapy-btn-icon">🍵</span>
                <div class="therapy-btn-text">
                    <span class="therapy-btn-label">Buy Me Teh Tarik</span>
                    <span class="therapy-btn-sublabel">
                        Support my therapy fund. Every RM5 buys 10 minutes of not thinking about Desaru.
                    </span>
                </div>
            </a>
        </div>
        
        <div class="therapy-footer">
            <p class="therapy-disclaimer">
                <span class="blink">⚠️</span> 
                This receipt is not valid for tax purposes, insurance claims, or therapy reimbursements.
                <span class="blink">⚠️</span>
            </p>
        </div>
    </div>
</div>
```

### Therapy Modal CSS

```css
.therapy-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.95);
    z-index: 2000;
    display: none;
    justify-content: center;
    align-items: center;
    padding: 20px;
    backdrop-filter: blur(15px);
}

.therapy-modal-overlay.active {
    display: flex;
    animation: fadeIn 0.4s var(--ease);
}

.therapy-modal {
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
    border: 2px solid #ff2222;
    border-radius: 16px;
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    padding: 40px;
    box-shadow: 0 0 60px rgba(255, 34, 34, 0.3);
}

.therapy-header {
    text-align: center;
    margin-bottom: 30px;
}

.therapy-icon {
    font-size: 48px;
    margin-bottom: 16px;
}

.therapy-title {
    font-family: var(--font-display);
    font-size: 32px;
    font-weight: 700;
    color: #ff2222;
    letter-spacing: 2px;
    text-shadow: 0 0 20px rgba(255, 34, 34, 0.5);
}

.therapy-content {
    text-align: center;
    margin-bottom: 30px;
}

.therapy-quote {
    font-size: 20px;
    font-style: italic;
    color: #fff;
    margin-bottom: 24px;
}

.therapy-text {
    color: var(--grey);
    margin-bottom: 12px;
    font-size: 16px;
}

.therapy-question {
    font-size: 18px;
    color: #c8e158;
    margin-top: 20px;
}

.therapy-answer {
    font-size: 18px;
    color: #fff;
    margin-top: 12px;
}

.therapy-divider {
    margin: 24px 0;
    color: #ff2222;
    font-size: 14px;
}

.therapy-actions {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
}

.therapy-btn {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 24px;
    border-radius: 12px;
    text-decoration: none;
    transition: all 0.3s var(--ease);
}

.therapy-btn-primary {
    background: linear-gradient(135deg, #c8e158 0%, #2d5016 100%);
    color: #0a0a0a;
}

.therapy-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(200, 225, 88, 0.3);
}

.therapy-btn-secondary {
    background: var(--grey-darker);
    border: 1px solid var(--grey-dark);
    color: var(--white);
}

.therapy-btn-secondary:hover {
    background: var(--grey-dark);
    transform: translateY(-2px);
}

.therapy-btn-icon {
    font-size: 24px;
}

.therapy-btn-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.therapy-btn-label {
    font-weight: 600;
    font-size: 16px;
}

.therapy-btn-sublabel {
    font-size: 12px;
    opacity: 0.8;
}

.therapy-footer {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid var(--grey-dark);
}

.therapy-disclaimer {
    font-size: 11px;
    color: var(--grey);
    font-style: italic;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}

.blink {
    animation: blink 2s infinite;
}
```

### Therapy Modal JavaScript

```javascript
// Show therapy modal on checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
    document.getElementById('therapyModal').classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close therapy modal
document.getElementById('therapyClose').addEventListener('click', () => {
    document.getElementById('therapyModal').classList.remove('active');
    document.body.style.overflow = '';
});

// Close on overlay click
document.getElementById('therapyModal').addEventListener('click', (e) => {
    if (e.target.id === 'therapyModal') {
        document.getElementById('therapyModal').classList.remove('active');
        document.body.style.overflow = '';
    }
});
```

---

## CSS Classes Reference

### Layout Classes

| Class | Description |
|-------|-------------|
| `.container` | Main container with max-width: 1400px |
| `.header` | Fixed header with logo and navigation |
| `.hero` | Hero section with large typography |
| `.product-grid` | Grid for product cards (responsive) |
| `.editorial` | Two-column editorial layout |
| `.trust` | Trust badges section |
| `.footer` | Site footer with grid layout |

### Product Card Classes

| Class | Description |
|-------|-------------|
| `.product-card` | Individual product card container |
| `.product-tag` | Badge/tag on top of card |
| `.product-image-wrap` | Image container with overflow hidden |
| `.product-image` | Product image with hover effect |
| `.product-hover` | Overlay with "Add to Cart" button |
| `.product-info` | Title, category, price container |
| `.product-name` | Product title heading |
| `.product-category` | Category/subtitle text |
| `.product-price` | Current price (red if on sale) |

### Modal Content Classes

| Class | Description |
|-------|-------------|
| `.modal-header` | Modal header with title and price |
| `.modal-image` | Featured image in modal |
| `.modal-body` | Main content area |
| `.story-quote` | Pull quote styling |
| `.story-section` | Content section with h4 |
| `.dialogue-box` | Conversation container |
| `.dialogue-line` | Individual dialogue line |
| `.speaker` | Speaker name styling |
| `.line` | Dialogue text |
| `.tech-specs` | Technical list styling |
| `.story-footer` | Tags container at bottom |
| `.tag` | Individual hashtag tag |

### Animation Classes

| Class | Description |
|-------|-------------|
| `[data-magnetic]` | Elements with magnetic cursor effect |
| `.cursor` | Custom cursor outer ring |
| `.cursor-dot` | Custom cursor dot |
| `.scanlines` | CRT scanline overlay |
| `.blink` | Blinking animation |

### Color Utility Classes

| Class | Description |
|-------|-------------|
| `.text-toxic` | Toxic green text color |
| `.bg-toxic` | Toxic green background |
| `.border-toxic` | Toxic green border |
| `.text-red` | Red text (errors, sale prices) |

---

## JavaScript Functions

### Core Functions

```javascript
// Buy Trauma - Random Malaysian Response Generator
function buyTrauma() {
    const responses = [
        "LAH! SOLD!",
        "STEADY LAH!", 
        "ONZ LAH!",
        "SYIOK LAH!",
        "CAN LAH!",
        "JOM LAH!",
        "SHIOK LAH!",
        "SOLID LAH!",
        "BOSS LAH!",
        "GG LAH!"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Generate Modal HTML from Product Data
function generateModalHTML(product) {
    return `
        <div class="modal-header">
            <div>
                <h2 class="modal-title">${product.title}</h2>
                <p class="modal-subtitle">${product.subtitle}</p>
            </div>
            <div class="modal-price">
                <span class="original-price">${product.originalPrice}</span>
                <span class="sale-price">${product.salePrice}</span>
            </div>
        </div>
        <div class="modal-body">
            ${product.body}
        </div>
        <div class="story-footer">
            ${product.footer}
        </div>
    `;
}
```

### Cart Functions

```javascript
// Cart state
let cart = [];

// Add to cart
function addToCart(productKey, productData) {
    const existingItem = cart.find(item => item.key === productKey);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            key: productKey,
            name: productData.title,
            price: parsePrice(productData.salePrice),
            quantity: 1
        });
    }
    
    updateCartUI();
    showCartNotification();
}

// Remove from cart
function removeFromCart(productKey) {
    cart = cart.filter(item => item.key !== productKey);
    updateCartUI();
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartTotalCount = document.getElementById('cartTotalCount');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    const cartItems = document.getElementById('cartItems');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotalCount.textContent = totalItems;
    cartTotalPrice.textContent = `RM${totalPrice.toFixed(2)}`;
    
    // Render cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>RM${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart('${item.key}')">×</button>
        </div>
    `).join('');
}

// Toggle cart sidebar
function toggleCart() {
    document.getElementById('cartSidebar').classList.toggle('active');
    document.getElementById('cartOverlay').classList.toggle('active');
}
```

### 3D Card Effect

```javascript
// Apply 3D tilt effect to product cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale3d(1.05, 1.05, 1.05)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});
```

---

## Cart System

### Cart Sidebar HTML

```html
<div class="cart-overlay" id="cartOverlay"></div>
<div class="cart-sidebar" id="cartSidebar">
    <div class="cart-header">
        <h3 class="cart-title">Your Cart (<span id="cartTotalCount">0</span>)</h3>
        <button class="cart-close" id="cartClose">
            <svg viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    </div>
    <div class="cart-items" id="cartItems">
        <div class="cart-empty">
            <svg viewBox="0 0 24 24">
                <path d="M6 6h15l-1.5 9h-12L6 6zm0 0L5 3H2m4 3l1.5 9"/>
                <circle cx="9" cy="20" r="1"/>
                <circle cx="18" cy="20" r="1"/>
            </svg>
            <p>Your cart is empty</p>
        </div>
    </div>
    <div class="cart-footer" id="cartFooter" style="display: none;">
        <div class="cart-total">
            <span>Total</span>
            <span id="cartTotalPrice">RM0.00</span>
        </div>
        <button class="checkout-btn" id="checkoutBtn" data-magnetic>
            Checkout
        </button>
    </div>
</div>
```

---

## 3D Effects & Animations

### Card 3D Transform

```css
.product-card {
    transform-style: preserve-3d;
    transition: transform 0.3s var(--ease);
}

.product-card:hover {
    transform: perspective(2000px) translateZ(50px) rotateX(-5deg);
}

.product-card:hover .product-image {
    transform: scale(1.1);
}

.product-card:hover .product-tag {
    transform: translateZ(30px);
}
```

### Magnetic Button Effect

```javascript
// Magnetic button pull effect
document.querySelectorAll('[data-magnetic]').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});
```

### Custom Cursor

```css
.cursor {
    width: 40px;
    height: 40px;
    border: 2px solid var(--toxic-green);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.15s, width 0.2s, height 0.2s;
    transform: translate(-50%, -50%);
    mix-blend-mode: difference;
}

.cursor.hover {
    width: 60px;
    height: 60px;
    background: rgba(57, 255, 20, 0.1);
}

.cursor-dot {
    width: 8px;
    height: 8px;
    background: var(--toxic-green);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
}
```

---

## Malaysian Humor Responses

The `buyTrauma()` function returns random Malaysian English responses:

| Response | Meaning |
|----------|---------|
| "LAH! SOLD!" | Classic Malaysian affirmation |
| "STEADY LAH!" | Everything is under control |
| "ONZ LAH!" | Agreement/confirmation ("on" + "lah") |
| "SYIOK LAH!" | Very enjoyable/pleasurable |
| "CAN LAH!" | Yes, it can be done |
| "JOM LAH!" | Let's go! |
| "SHIOK LAH!" | Amazing/great feeling |
| "SOLID LAH!" | Really good/impressive |
| "BOSS LAH!" | Acknowledging authority |
| "GG LAH!" | Good game / well done |

---

## File Locations

| File | Purpose |
|------|---------|
| `/brutal/index.html` | Main Brutal Mode HTML |
| `/brutal/index.css` | Brutal Mode styles (if separated) |
| `/public/images/` | Product images |

---

## Dependencies

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;700&family=Inter:wght@300;400;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">

<!-- GSAP for Animations -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

<!-- Lucide Icons -->
<script src="https://unpkg.com/lucide@latest"></script>
```

---

## Notes for Future Development

1. **Adding New Products**: Add entries to `productData` object with all required fields
2. **Modifying Therapy Modal**: Update the HTML and CSS in the therapy modal section
3. **Changing Colors**: Update CSS custom properties in `:root`
4. **Adding New Chapters**: Follow the Desaru chapter structure for consistency
5. **SEO Considerations**: Currently minimal; add meta tags if needed

---

*Document Version: 1.0*  
*Last Updated: 2026-03-01*  
*Author: Claude (AI Assistant)*
