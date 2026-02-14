# Assets Directory

This directory contains all media assets for the portfolio.

## 📁 Directory Structure

### Images (`/images`)
- **`hero/`** - Hero section images (profile photos, background images)
- **`projects/`** - Project screenshots and mockups
- **`about/`** - About section photos and team images
- **`journey/`** - **Professional Journey** photos (career timeline, company photos, achievements)
- **`behind-the-scenes/`** - **Behind the Scenes** photos (workplace, team collaboration, process shots)
- **`logos/`** - Company logos, client logos, tech stack logos
- **`icons/`** - UI icons and custom graphics

### Videos (`/videos`)
- **`demos/`** - Project demonstration videos
- **`stories/`** - **Video Stories** (personal journey, career stories, day-in-the-life)
- **`testimonials/`** - Testimonial videos (client, colleague, manager endorsements)
- **`backgrounds/`** - Background videos for hero sections

### Documents (`/documents`)
- **`resume/`** - CV, resume, and portfolio PDFs

## 💡 Usage

Import assets using relative paths or aliases:

```javascript
// Relative import
import heroImage from '../../assets/images/hero/profile.jpg';

// With path alias (if configured)
import heroImage from '@/assets/images/hero/profile.jpg';
```

## 📝 Best Practices

1. **Naming Convention**: Use lowercase with hyphens (e.g., `project-screenshot-1.jpg`)
2. **Image Optimization**: Compress images before adding (use tools like TinyPNG)
3. **Formats**: 
   - Use `.webp` for modern browsers with `.jpg` fallback
   - Use `.svg` for logos and icons
   - Use `.mp4` for videos
4. **Size Guidelines**:
   - Hero images: Max 1920x1080px
   - Project screenshots: Max 1200x800px
   - Logos: SVG preferred, or PNG with transparent background

## 🔧 Vite Configuration

Vite automatically handles assets in this directory:
- Images < 4kb are inlined as base64
- Larger assets are copied to `/dist/assets/` with hashed filenames
