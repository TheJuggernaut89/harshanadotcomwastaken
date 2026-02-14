# 🎨 Week 1: Frontend Foundation Setup Guide
**Malaysian Legal Transcription Suite - Development Timeline**

---

## 📋 Week 1 Overview

**Duration:** 40 hours (5 days × 8 hours)
**Goal:** Build complete frontend UI with upload system, progress tracking, and results display
**Prerequisites:** Week 0 completed (development environment ready)

---

## Day 1: Layout & Core Components (8 hours)

### Hour 1-2: Create Layout Components

#### Step 1: Create Header Component

```bash
cd frontend/src/components/Layout
```

Create `Header.jsx`:

```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-500/80 backdrop-blur-md border-b border-gold-500/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <svg className="w-8 h-8 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span className="text-xl font-bold text-white">
                Malaysian Legal <span className="text-gold-500">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-gray-300 hover:text-gold-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Upload
              </Link>
              <Link
                to="/pricing"
                className="text-gray-300 hover:text-gold-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/how-it-works"
                className="text-gray-300 hover:text-gold-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                How It Works
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-gold-500"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="text-gray-300 hover:text-gold-500 block px-3 py-2 rounded-md text-base font-medium"
              >
                Upload
              </Link>
              <Link
                to="/pricing"
                className="text-gray-300 hover:text-gold-500 block px-3 py-2 rounded-md text-base font-medium"
              >
                Pricing
              </Link>
              <Link
                to="/how-it-works"
                className="text-gray-300 hover:text-gold-500 block px-3 py-2 rounded-md text-base font-medium"
              >
                How It Works
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
```

**Install Heroicons:**
```bash
npm install @heroicons/react
```

#### Step 2: Create Footer Component

Create `Footer.jsx`:

```jsx
export default function Footer() {
  return (
    <footer className="bg-navy-500/50 backdrop-blur-sm border-t border-gold-500/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-gold-500 font-semibold mb-3">About</h3>
            <p className="text-gray-400 text-sm">
              Malaysia's first AI-powered legal transcription platform.
              Court-ready transcripts in 10 minutes at 70% lower cost.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold-500 font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gold-500 font-semibold mb-3">Contact</h3>
            <p className="text-gray-400 text-sm">
              Email: support@malaysianlegal.ai<br />
              Phone: +60 3-XXXX XXXX
            </p>
          </div>
        </div>

        <div className="border-t border-gold-500/20 mt-8 pt-6 text-center text-gray-400 text-sm">
          © 2026 Malaysian Legal AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

#### Step 3: Create Particle Background Component

Create `ParticleBackground.jsx`:

```jsx
import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.fillStyle = 'rgba(212, 175, 55, 0.3)'; // Gold color with opacity
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(212, 175, 55, ${0.2 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
```

**Verification:**
```bash
npm run dev
```
Visit http://localhost:5173 - you should see animated particles on the background.

---

### Hour 3-4: Create UI Components

#### Step 1: Create GlassCard Component

```bash
cd frontend/src/components/UI
```

Create `GlassCard.jsx`:

```jsx
export default function GlassCard({ children, className = '', hover = false }) {
  return (
    <div
      className={`
        bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6
        ${hover ? 'hover:bg-white/10 hover:border-gold-500/30 transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
```

#### Step 2: Create Button Component

Create `Button.jsx`:

```jsx
export default function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  loading = false,
  className = '',
  type = 'button'
}) {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-gold-500 text-navy-500 hover:bg-gold-600 active:scale-95",
    secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20",
    outline: "border-2 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-navy-500"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Processing...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
```

#### Step 3: Create ProgressBar Component

Create `ProgressBar.jsx`:

```jsx
export default function ProgressBar({ progress = 0, status = '', showPercentage = true }) {
  return (
    <div className="w-full">
      {/* Status Text */}
      {status && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-300">{status}</span>
          {showPercentage && (
            <span className="text-sm font-semibold text-gold-500">{progress}%</span>
          )}
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full bg-navy-500/50 rounded-full h-3 overflow-hidden border border-white/10">
        <div
          className="h-full bg-gradient-to-r from-gold-500 to-yellow-400 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        >
          {/* Shimmer effect */}
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
```

Add shimmer animation to `tailwind.config.js`:

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          500: '#1E3A5F',
        },
        gold: {
          500: '#D4AF37',
          600: '#B8941F',
        }
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite'
      }
    }
  },
  plugins: []
}
```

#### Step 4: Create Alert Component

Create `Alert.jsx`:

```jsx
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Alert({ type = 'info', message, onClose }) {
  const styles = {
    success: 'bg-green-500/20 border-green-500/50 text-green-300',
    error: 'bg-red-500/20 border-red-500/50 text-red-300',
    warning: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300',
    info: 'bg-blue-500/20 border-blue-500/50 text-blue-300'
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  return (
    <div className={`${styles[type]} border rounded-lg p-4 flex items-start space-x-3`}>
      <span className="text-xl">{icons[type]}</span>
      <p className="flex-1 text-sm">{message}</p>
      {onClose && (
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <XMarkIcon className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
```

**Verification:**
Create `frontend/src/pages/TestComponents.jsx`:

```jsx
import GlassCard from '../components/UI/GlassCard';
import Button from '../components/UI/Button';
import ProgressBar from '../components/UI/ProgressBar';
import Alert from '../components/UI/Alert';

export default function TestComponents() {
  return (
    <div className="min-h-screen bg-navy-500 p-8 space-y-6">
      <GlassCard>
        <h2 className="text-white text-xl mb-4">Glass Card Test</h2>
        <p className="text-gray-300">This is a glass morphism card.</p>
      </GlassCard>

      <div className="space-x-4">
        <Button variant="primary">Primary Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button loading>Loading Button</Button>
      </div>

      <ProgressBar progress={65} status="Transcribing audio..." />

      <Alert type="success" message="Upload successful!" />
      <Alert type="error" message="Upload failed. Please try again." />
    </div>
  );
}
```

---

### Hour 5-6: Set Up Routing & State Management

#### Step 1: Install Dependencies

```bash
npm install zustand react-router-dom
```

#### Step 2: Create Zustand Store

```bash
cd frontend/src/store
```

Create `useStore.js`:

```jsx
import { create } from 'zustand';

export const useStore = create((set) => ({
  // Upload state
  uploadedFile: null,
  uploadedPDF: null,
  uploadProgress: 0,

  setUploadedFile: (file) => set({ uploadedFile: file }),
  setUploadedPDF: (file) => set({ uploadedPDF: file }),
  setUploadProgress: (progress) => set({ uploadProgress: progress }),

  // Transcription state
  jobId: null,
  transcriptionStatus: 'idle', // idle, processing, completed, error
  transcriptionProgress: 0,
  transcriptionResult: null,

  setJobId: (id) => set({ jobId: id }),
  setTranscriptionStatus: (status) => set({ transcriptionStatus: status }),
  setTranscriptionProgress: (progress) => set({ transcriptionProgress: progress }),
  setTranscriptionResult: (result) => set({ transcriptionResult: result }),

  // UI state
  darkMode: true,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  // Reset state
  resetUpload: () => set({
    uploadedFile: null,
    uploadedPDF: null,
    uploadProgress: 0,
    jobId: null,
    transcriptionStatus: 'idle',
    transcriptionProgress: 0,
    transcriptionResult: null
  })
}));
```

#### Step 3: Set Up Router

Update `frontend/src/main.jsx`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
```

Update `frontend/src/App.jsx`:

```jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ParticleBackground from './components/Layout/ParticleBackground';
import UploadPage from './pages/UploadPage';
import ProcessingPage from './pages/ProcessingPage';
import ResultsPage from './pages/ResultsPage';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-500 via-blue-900 to-navy-500 flex flex-col">
      <ParticleBackground />
      <Header />

      <main className="flex-1 pt-16 relative z-10">
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/processing/:jobId" element={<ProcessingPage />} />
          <Route path="/results/:jobId" element={<ResultsPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
```

#### Step 4: Create Placeholder Pages

Create `frontend/src/pages/UploadPage.jsx`:

```jsx
import GlassCard from '../components/UI/GlassCard';

export default function UploadPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <GlassCard>
        <h1 className="text-3xl font-bold text-white mb-4">
          Upload Audio for Transcription
        </h1>
        <p className="text-gray-300">
          Upload page will be built tomorrow.
        </p>
      </GlassCard>
    </div>
  );
}
```

Create `frontend/src/pages/ProcessingPage.jsx`:

```jsx
import GlassCard from '../components/UI/GlassCard';

export default function ProcessingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <GlassCard>
        <h1 className="text-3xl font-bold text-white mb-4">
          Processing Your Transcription
        </h1>
        <p className="text-gray-300">
          Processing page will be built tomorrow.
        </p>
      </GlassCard>
    </div>
  );
}
```

Create `frontend/src/pages/ResultsPage.jsx`:

```jsx
import GlassCard from '../components/UI/GlassCard';

export default function ResultsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <GlassCard>
        <h1 className="text-3xl font-bold text-white mb-4">
          Transcription Results
        </h1>
        <p className="text-gray-300">
          Results page will be built tomorrow.
        </p>
      </GlassCard>
    </div>
  );
}
```

**Verification:**
```bash
npm run dev
```

Navigate to:
- http://localhost:5173/ (Upload page)
- http://localhost:5173/processing/test (Processing page)
- http://localhost:5173/results/test (Results page)

---

### Hour 7-8: Dark Mode Implementation

#### Step 1: Create Dark Mode Hook

```bash
cd frontend/src/hooks
```

Create `useDarkMode.js`:

```jsx
import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export default function useDarkMode() {
  const { darkMode, toggleDarkMode } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return { darkMode, toggleDarkMode };
}
```

#### Step 2: Add Dark Mode Toggle to Header

Update `frontend/src/components/Layout/Header.jsx`:

```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import useDarkMode from '../../hooks/useDarkMode';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-500/80 backdrop-blur-md border-b border-gold-500/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <svg className="w-8 h-8 text-gold-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              <span className="text-xl font-bold text-white">
                Malaysian Legal <span className="text-gold-500">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-300 hover:text-gold-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Upload
            </Link>
            <Link
              to="/pricing"
              className="text-gray-300 hover:text-gold-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/how-it-works"
              className="text-gray-300 hover:text-gold-500 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              How It Works
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5 text-gold-500" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gold-500" />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5 text-gold-500" />
              ) : (
                <MoonIcon className="w-5 h-5 text-gold-500" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-gold-500"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="text-gray-300 hover:text-gold-500 block px-3 py-2 rounded-md text-base font-medium"
              >
                Upload
              </Link>
              <Link
                to="/pricing"
                className="text-gray-300 hover:text-gold-500 block px-3 py-2 rounded-md text-base font-medium"
              >
                Pricing
              </Link>
              <Link
                to="/how-it-works"
                className="text-gray-300 hover:text-gold-500 block px-3 py-2 rounded-md text-base font-medium"
              >
                How It Works
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
```

**Verification:**
```bash
npm run dev
```
Click the sun/moon icon in the header - dark mode toggle should work.

---

### ✅ Day 1 Completion Checklist

- [ ] Header component created with navigation
- [ ] Footer component created
- [ ] ParticleBackground component with animations
- [ ] GlassCard component for UI consistency
- [ ] Button component with variants
- [ ] ProgressBar component with shimmer effect
- [ ] Alert component for notifications
- [ ] Zustand store configured
- [ ] React Router configured with 3 pages
- [ ] Dark mode hook and toggle implemented
- [ ] All components verified in browser

**Git Commit:**
```bash
git add .
git commit -m "Week 1 Day 1: Layout and core UI components complete"
git push
```

---

## Day 2: Upload Components (8 hours)

### Hour 1-2: File Upload Component

#### Step 1: Install react-dropzone

```bash
cd frontend
npm install react-dropzone
```

#### Step 2: Create FileUpload Component

```bash
cd src/components/Upload
```

Create `AudioUpload.jsx`:

```jsx
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon, MusicalNoteIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Button from '../UI/Button';
import Alert from '../UI/Alert';

export default function AudioUpload({ onFileSelect }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError(null);

    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError('File is too large. Maximum size is 500MB.');
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        setError('Invalid file type. Please upload MP3, WAV, M4A, or MP4 files.');
      } else {
        setError('File upload failed. Please try again.');
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/mp3': ['.mp3'],
      'audio/mpeg': ['.mp3'],
      'audio/wav': ['.wav'],
      'audio/x-wav': ['.wav'],
      'audio/m4a': ['.m4a'],
      'audio/x-m4a': ['.m4a'],
      'video/mp4': ['.mp4'],
      'audio/mp4': ['.mp4']
    },
    maxFiles: 1,
    maxSize: 500 * 1024 * 1024 // 500MB
  });

  const removeFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
    setError(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Error Alert */}
      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      {/* Dropzone */}
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
            transition-all duration-300
            ${isDragActive
              ? 'border-gold-500 bg-gold-500/10'
              : 'border-white/20 hover:border-gold-500/50 bg-white/5'
            }
          `}
        >
          <input {...getInputProps()} />

          <CloudArrowUpIcon className="w-16 h-16 mx-auto text-gold-500 mb-4" />

          {isDragActive ? (
            <p className="text-lg text-white font-medium">Drop the audio file here...</p>
          ) : (
            <>
              <p className="text-lg text-white font-medium mb-2">
                Drag & drop your audio file here
              </p>
              <p className="text-gray-400 text-sm mb-4">
                or click to browse
              </p>
              <p className="text-gray-500 text-xs">
                Supported formats: MP3, WAV, M4A, MP4 (max 500MB)
              </p>
            </>
          )}
        </div>
      ) : (
        /* Selected File Display */
        <div className="border border-gold-500/30 bg-white/5 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4 flex-1">
              <div className="p-3 bg-gold-500/20 rounded-lg">
                <MusicalNoteIcon className="w-6 h-6 text-gold-500" />
              </div>

              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">{selectedFile.name}</h3>
                <p className="text-gray-400 text-sm">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>

            <button
              onClick={removeFile}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </div>
      )}

      {/* File Requirements Info */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <h4 className="text-blue-300 font-medium mb-2">📋 File Requirements:</h4>
        <ul className="text-blue-200 text-sm space-y-1">
          <li>• Clear audio recording of court proceedings</li>
          <li>• Maximum file size: 500MB</li>
          <li>• Supported formats: MP3, WAV, M4A, MP4</li>
          <li>• Multiple languages supported (Malay, English, Chinese)</li>
        </ul>
      </div>
    </div>
  );
}
```

**Verification:**
Update `UploadPage.jsx` temporarily:

```jsx
import { useState } from 'react';
import GlassCard from '../components/UI/GlassCard';
import AudioUpload from '../components/Upload/AudioUpload';

export default function UploadPage() {
  const [audioFile, setAudioFile] = useState(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <GlassCard>
        <h1 className="text-3xl font-bold text-white mb-6">
          Upload Audio for Transcription
        </h1>
        <AudioUpload onFileSelect={setAudioFile} />

        {audioFile && (
          <p className="mt-4 text-green-300">
            ✓ Selected: {audioFile.name}
          </p>
        )}
      </GlassCard>
    </div>
  );
}
```

Test drag-and-drop functionality.

---

### Hour 3-4: PDF Upload Component

#### Step 1: Create PDFUpload Component

Create `PDFUpload.jsx`:

```jsx
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentTextIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Alert from '../UI/Alert';

export default function PDFUpload({ onFileSelect }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError(null);

    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        setError('File is too large. Maximum size is 50MB.');
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        setError('Invalid file type. Please upload PDF files only.');
      } else {
        setError('File upload failed. Please try again.');
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  const removeFile = () => {
    setSelectedFile(null);
    onFileSelect(null);
    setError(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      {/* Error Alert */}
      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      {/* Dropzone */}
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-all duration-300
            ${isDragActive
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-white/20 hover:border-blue-500/50 bg-white/5'
            }
          `}
        >
          <input {...getInputProps()} />

          <DocumentTextIcon className="w-12 h-12 mx-auto text-blue-400 mb-3" />

          {isDragActive ? (
            <p className="text-white font-medium">Drop the PDF here...</p>
          ) : (
            <>
              <p className="text-white font-medium mb-1">
                Upload PDF Bundle (Optional)
              </p>
              <p className="text-gray-400 text-xs">
                Case documents to improve transcription accuracy
              </p>
            </>
          )}
        </div>
      ) : (
        /* Selected File Display */
        <div className="border border-blue-500/30 bg-white/5 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <DocumentTextIcon className="w-5 h-5 text-blue-400" />
              </div>

              <div>
                <h4 className="text-white text-sm font-medium">{selectedFile.name}</h4>
                <p className="text-gray-400 text-xs">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>

            <button
              onClick={removeFile}
              className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
        <p className="text-blue-200 text-xs">
          💡 <strong>Tip:</strong> Uploading case documents helps extract legal terms,
          party names, and context to improve transcription accuracy by 25%+
        </p>
      </div>
    </div>
  );
}
```

---

### Hour 5-6: File Preview & Validation

#### Step 1: Create AudioPreview Component

Create `AudioPreview.jsx`:

```jsx
import { useRef, useState, useEffect } from 'react';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/solid';

export default function AudioPreview({ file }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [file]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const seekTime = (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!audioUrl) return null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex items-center space-x-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="p-3 bg-gold-500 hover:bg-gold-600 rounded-full transition-colors"
        >
          {isPlaying ? (
            <PauseIcon className="w-5 h-5 text-navy-500" />
          ) : (
            <PlayIcon className="w-5 h-5 text-navy-500" />
          )}
        </button>

        {/* Progress Bar */}
        <div className="flex-1">
          <div
            className="w-full bg-white/10 rounded-full h-2 cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="bg-gold-500 h-2 rounded-full transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
```

#### Step 2: Create FileValidation Utility

```bash
cd frontend/src/utils
```

Create `fileValidation.js`:

```javascript
export function validateAudioFile(file) {
  const errors = [];

  // Check file type
  const validTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/x-wav',
                      'audio/m4a', 'audio/x-m4a', 'video/mp4', 'audio/mp4'];
  if (!validTypes.includes(file.type)) {
    errors.push('Invalid file type. Please upload MP3, WAV, M4A, or MP4 files.');
  }

  // Check file size (max 500MB)
  const maxSize = 500 * 1024 * 1024;
  if (file.size > maxSize) {
    errors.push('File is too large. Maximum size is 500MB.');
  }

  // Check minimum file size (at least 1KB to avoid empty files)
  if (file.size < 1024) {
    errors.push('File is too small. Please upload a valid audio file.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validatePDFFile(file) {
  const errors = [];

  // Check file type
  if (file.type !== 'application/pdf') {
    errors.push('Invalid file type. Please upload PDF files only.');
  }

  // Check file size (max 50MB)
  const maxSize = 50 * 1024 * 1024;
  if (file.size > maxSize) {
    errors.push('PDF is too large. Maximum size is 50MB.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function getAudioMetadata(file) {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    const url = URL.createObjectURL(file);

    audio.addEventListener('loadedmetadata', () => {
      const metadata = {
        duration: audio.duration,
        durationFormatted: formatDuration(audio.duration)
      };
      URL.revokeObjectURL(url);
      resolve(metadata);
    });

    audio.addEventListener('error', (e) => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load audio metadata'));
    });

    audio.src = url;
  });
}

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
```

---

### Hour 7-8: Complete Upload Page

#### Step 1: Create Complete UploadPage

Update `frontend/src/pages/UploadPage.jsx`:

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import GlassCard from '../components/UI/GlassCard';
import Button from '../components/UI/Button';
import Alert from '../components/UI/Alert';
import AudioUpload from '../components/Upload/AudioUpload';
import PDFUpload from '../components/Upload/PDFUpload';
import AudioPreview from '../components/Upload/AudioPreview';
import { validateAudioFile, getAudioMetadata } from '../utils/fileValidation';

export default function UploadPage() {
  const navigate = useNavigate();
  const { setUploadedFile, setUploadedPDF, resetUpload } = useStore();

  const [audioFile, setAudioFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [proofreaderEmail, setProofreaderEmail] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [audioMetadata, setAudioMetadata] = useState(null);

  const handleAudioSelect = async (file) => {
    setError(null);
    setAudioFile(file);

    if (file) {
      // Validate file
      const validation = validateAudioFile(file);
      if (!validation.valid) {
        setError(validation.errors.join(' '));
        setAudioFile(null);
        return;
      }

      // Get metadata
      try {
        const metadata = await getAudioMetadata(file);
        setAudioMetadata(metadata);
      } catch (err) {
        console.error('Failed to load audio metadata:', err);
      }
    } else {
      setAudioMetadata(null);
    }
  };

  const handlePDFSelect = (file) => {
    setPdfFile(file);
  };

  const handleSubmit = async () => {
    setError(null);

    // Validate audio file
    if (!audioFile) {
      setError('Please upload an audio file.');
      return;
    }

    // Validate email
    if (!proofreaderEmail || !proofreaderEmail.includes('@')) {
      setError('Please enter a valid proofreader email address.');
      return;
    }

    setIsUploading(true);

    try {
      // Store files in Zustand
      setUploadedFile(audioFile);
      if (pdfFile) {
        setUploadedPDF(pdfFile);
      }

      // TODO: Upload to backend (will implement in Week 2)
      // Simulate upload for now
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to processing page
      const mockJobId = `job_${Date.now()}`;
      navigate(`/processing/${mockJobId}`);
    } catch (err) {
      setError('Upload failed. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const estimatedCost = audioMetadata ?
    Math.ceil(audioMetadata.duration / 3600) * 60 : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          AI-Powered Legal <span className="text-gold-500">Transcription</span>
        </h1>
        <p className="text-xl text-gray-300">
          Court-ready transcripts in 10 minutes at 70% lower cost
        </p>
      </div>

      {/* Upload Form */}
      <GlassCard className="space-y-6">
        {/* Error Alert */}
        {error && (
          <Alert type="error" message={error} onClose={() => setError(null)} />
        )}

        {/* Step 1: Audio Upload */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Step 1: Upload Audio File
          </h2>
          <AudioUpload onFileSelect={handleAudioSelect} />

          {audioFile && audioMetadata && (
            <div className="mt-4">
              <AudioPreview file={audioFile} />
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-gray-300">
                  Duration: <strong className="text-white">{audioMetadata.durationFormatted}</strong>
                </span>
                <span className="text-gray-300">
                  Estimated Cost: <strong className="text-gold-500">RM {estimatedCost}</strong>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Step 2: PDF Upload (Optional) */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Step 2: Upload PDF Bundle <span className="text-gray-400 text-sm">(Optional)</span>
          </h2>
          <PDFUpload onFileSelect={handlePDFSelect} />
        </div>

        {/* Step 3: Proofreader Email */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">
            Step 3: Proofreader Email
          </h2>
          <input
            type="email"
            value={proofreaderEmail}
            onChange={(e) => setProofreaderEmail(e.target.value)}
            placeholder="proofreader@lawfirm.com"
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gold-500 transition-colors"
          />
          <p className="text-gray-400 text-sm mt-2">
            Transcript will be automatically emailed to this address when ready
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4 pt-4">
          <Button
            variant="secondary"
            onClick={() => {
              setAudioFile(null);
              setPdfFile(null);
              setProofreaderEmail('');
              setAudioMetadata(null);
              resetUpload();
            }}
          >
            Clear All
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={isUploading}
            disabled={!audioFile || !proofreaderEmail}
          >
            Start Transcription
          </Button>
        </div>
      </GlassCard>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <GlassCard hover>
          <div className="text-center">
            <div className="text-4xl mb-3">⚡</div>
            <h3 className="text-white font-semibold mb-2">100x Faster</h3>
            <p className="text-gray-400 text-sm">
              10 minutes vs 24-48 hours
            </p>
          </div>
        </GlassCard>

        <GlassCard hover>
          <div className="text-center">
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-white font-semibold mb-2">70% Cheaper</h3>
            <p className="text-gray-400 text-sm">
              RM 60/hr vs RM 210/hr
            </p>
          </div>
        </GlassCard>

        <GlassCard hover>
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-white font-semibold mb-2">Court-Ready</h3>
            <p className="text-gray-400 text-sm">
              Malaysian legal formatting
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
```

**Verification:**
```bash
npm run dev
```

Test complete upload flow:
1. Upload audio file
2. Preview audio playback
3. Upload PDF (optional)
4. Enter email
5. Click "Start Transcription"

---

### ✅ Day 2 Completion Checklist

- [ ] AudioUpload component with drag-and-drop
- [ ] PDFUpload component
- [ ] AudioPreview with playback controls
- [ ] File validation utilities
- [ ] Complete UploadPage with 3-step workflow
- [ ] Email input field
- [ ] Cost estimation display
- [ ] Features showcase section
- [ ] All functionality verified in browser

**Git Commit:**
```bash
git add .
git commit -m "Week 1 Day 2: Upload components and file handling complete"
git push
```

---

## Day 3: Processing & Progress Tracking (8 hours)

### Hour 1-2: Processing Page Layout

#### Step 1: Create Processing Status Component

```bash
cd frontend/src/components/Transcription
```

Create `ProcessingStatus.jsx`:

```jsx
import { motion } from 'framer-motion';
import ProgressBar from '../UI/ProgressBar';

export default function ProcessingStatus({ status, progress, currentStep }) {
  const steps = [
    { id: 'upload', label: 'Uploading files', icon: '📤' },
    { id: 'enhance', label: 'Enhancing audio quality', icon: '🎧' },
    { id: 'chunk', label: 'Processing audio chunks', icon: '🔪' },
    { id: 'transcribe', label: 'Transcribing with AI', icon: '🤖' },
    { id: 'format', label: 'Formatting document', icon: '📄' },
    { id: 'email', label: 'Sending to proofreader', icon: '✉️' }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <ProgressBar progress={progress} status={`Processing: ${progress}%`} />

      {/* Step-by-Step Progress */}
      <div className="space-y-3">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isPending = !isCompleted && !isCurrent;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                flex items-center space-x-4 p-4 rounded-lg border
                ${isCurrent ? 'border-gold-500 bg-gold-500/10' : ''}
                ${isCompleted ? 'border-green-500/30 bg-green-500/5' : ''}
                ${isPending ? 'border-white/10 bg-white/5' : ''}
              `}
            >
              {/* Icon */}
              <div className={`
                text-2xl
                ${isCurrent ? 'animate-pulse' : ''}
                ${isCompleted ? 'opacity-50' : ''}
              `}>
                {isCompleted ? '✓' : step.icon}
              </div>

              {/* Label */}
              <div className="flex-1">
                <p className={`
                  font-medium
                  ${isCurrent ? 'text-gold-500' : ''}
                  ${isCompleted ? 'text-green-400' : ''}
                  ${isPending ? 'text-gray-400' : ''}
                `}>
                  {step.label}
                </p>
              </div>

              {/* Status Indicator */}
              {isCurrent && (
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gold-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              )}

              {isCompleted && (
                <div className="text-green-400 text-sm font-medium">
                  Complete
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
```

**Install Framer Motion:**
```bash
cd frontend
npm install framer-motion
```

---

### Hour 3-4: Real-Time Progress Simulation

#### Step 1: Create usePolling Hook

```bash
cd frontend/src/hooks
```

Create `usePolling.js`:

```jsx
import { useEffect, useRef, useState } from 'react';

export default function usePolling(callback, delay, enabled = true) {
  const savedCallback = useRef();
  const [isPolling, setIsPolling] = useState(enabled);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!isPolling || !enabled) return;

    const tick = () => {
      savedCallback.current();
    };

    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay, isPolling, enabled]);

  return { isPolling, setIsPolling };
}
```

#### Step 2: Create Mock API Service

```bash
cd frontend/src/utils
```

Create `mockApi.js`:

```javascript
// Mock API for development (Week 1)
// Will be replaced with real API calls in Week 2

const mockJobs = new Map();

export const mockApi = {
  async uploadFiles(audioFile, pdfFile, proofreaderEmail) {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    const jobId = `job_${Date.now()}`;

    // Store job data
    mockJobs.set(jobId, {
      id: jobId,
      status: 'processing',
      progress: 0,
      currentStep: 'upload',
      audioFilename: audioFile.name,
      pdfFilename: pdfFile?.name || null,
      proofreaderEmail,
      createdAt: new Date(),
      steps: [
        { id: 'upload', status: 'completed', progress: 100 },
        { id: 'enhance', status: 'in_progress', progress: 0 },
        { id: 'chunk', status: 'pending', progress: 0 },
        { id: 'transcribe', status: 'pending', progress: 0 },
        { id: 'format', status: 'pending', progress: 0 },
        { id: 'email', status: 'pending', progress: 0 }
      ]
    });

    // Simulate background processing
    simulateProcessing(jobId);

    return { jobId };
  },

  async getJobStatus(jobId) {
    await new Promise(resolve => setTimeout(resolve, 500));

    const job = mockJobs.get(jobId);
    if (!job) {
      throw new Error('Job not found');
    }

    return job;
  }
};

function simulateProcessing(jobId) {
  const steps = ['upload', 'enhance', 'chunk', 'transcribe', 'format', 'email'];
  let currentStepIndex = 1; // Start at 'enhance' (upload already complete)

  const interval = setInterval(() => {
    const job = mockJobs.get(jobId);
    if (!job) {
      clearInterval(interval);
      return;
    }

    // Update current step progress
    const currentStep = steps[currentStepIndex];
    const stepData = job.steps.find(s => s.id === currentStep);

    if (stepData.progress < 100) {
      stepData.progress += Math.random() * 20;
      if (stepData.progress >= 100) {
        stepData.progress = 100;
        stepData.status = 'completed';

        // Move to next step
        currentStepIndex++;
        if (currentStepIndex < steps.length) {
          const nextStep = job.steps.find(s => s.id === steps[currentStepIndex]);
          nextStep.status = 'in_progress';
          job.currentStep = steps[currentStepIndex];
        } else {
          // All steps complete
          job.status = 'completed';
          job.progress = 100;
          job.transcriptUrl = `/mock-transcript.docx`;
          clearInterval(interval);
        }
      }
    }

    // Calculate overall progress
    const completedSteps = job.steps.filter(s => s.status === 'completed').length;
    const inProgressStep = job.steps.find(s => s.status === 'in_progress');
    job.progress = Math.round(
      (completedSteps / steps.length * 100) +
      (inProgressStep ? inProgressStep.progress / steps.length : 0)
    );

  }, 2000); // Update every 2 seconds
}
```

---

### Hour 5-6: Build ProcessingPage

#### Step 1: Update ProcessingPage Component

Update `frontend/src/pages/ProcessingPage.jsx`:

```jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../components/UI/GlassCard';
import ProcessingStatus from '../components/Transcription/ProcessingStatus';
import Alert from '../components/UI/Alert';
import usePolling from '../hooks/usePolling';
import { mockApi } from '../utils/mockApi';

export default function ProcessingPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch job status
  const fetchJobStatus = async () => {
    try {
      const data = await mockApi.getJobStatus(jobId);
      setJob(data);

      // If completed, redirect to results page
      if (data.status === 'completed') {
        setTimeout(() => {
          navigate(`/results/${jobId}`);
        }, 2000);
      }

      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch job status. Please try again.');
      console.error('Error fetching job status:', err);
      setIsLoading(false);
    }
  };

  // Poll for updates every 2 seconds
  usePolling(fetchJobStatus, 2000, job?.status !== 'completed');

  // Initial fetch
  useEffect(() => {
    fetchJobStatus();
  }, [jobId]);

  if (isLoading && !job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <GlassCard>
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-white">Loading job status...</p>
          </div>
        </GlassCard>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <GlassCard>
          <Alert
            type="error"
            message={error || 'Job not found'}
          />
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Processing Your Transcription
        </h1>
        <p className="text-gray-300">
          Job ID: <span className="text-gold-500 font-mono">{jobId}</span>
        </p>
      </motion.div>

      {/* Processing Status */}
      <GlassCard className="mb-8">
        <ProcessingStatus
          status={job.status}
          progress={job.progress}
          currentStep={job.currentStep}
        />
      </GlassCard>

      {/* File Info */}
      <GlassCard>
        <h3 className="text-xl font-semibold text-white mb-4">File Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Audio File:</span>
            <span className="text-white font-medium">{job.audioFilename}</span>
          </div>
          {job.pdfFilename && (
            <div className="flex justify-between">
              <span className="text-gray-400">PDF Bundle:</span>
              <span className="text-white font-medium">{job.pdfFilename}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-400">Proofreader Email:</span>
            <span className="text-white font-medium">{job.proofreaderEmail}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Started:</span>
            <span className="text-white font-medium">
              {new Date(job.createdAt).toLocaleString()}
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Info Box */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4"
      >
        <p className="text-blue-200 text-sm">
          💡 <strong>Tip:</strong> You can close this page. We'll email the transcript to {job.proofreaderEmail} when it's ready.
        </p>
      </motion.div>
    </div>
  );
}
```

---

### Hour 7-8: Update Upload Flow

#### Step 1: Update UploadPage to Use Mock API

Update the `handleSubmit` function in `frontend/src/pages/UploadPage.jsx`:

```jsx
const handleSubmit = async () => {
  setError(null);

  // Validate audio file
  if (!audioFile) {
    setError('Please upload an audio file.');
    return;
  }

  // Validate email
  if (!proofreaderEmail || !proofreaderEmail.includes('@')) {
    setError('Please enter a valid proofreader email address.');
    return;
  }

  setIsUploading(true);

  try {
    // Upload files using mock API
    const { jobId } = await mockApi.uploadFiles(audioFile, pdfFile, proofreaderEmail);

    // Store files in Zustand
    setUploadedFile(audioFile);
    if (pdfFile) {
      setUploadedPDF(pdfFile);
    }

    // Navigate to processing page
    navigate(`/processing/${jobId}`);
  } catch (err) {
    setError('Upload failed. Please try again.');
    console.error('Upload error:', err);
  } finally {
    setIsUploading(false);
  }
};
```

Add import at top of file:
```jsx
import { mockApi } from '../utils/mockApi';
```

**Verification:**
```bash
npm run dev
```

Test complete flow:
1. Upload files on homepage
2. Click "Start Transcription"
3. Watch progress update in real-time
4. See automatic redirect when complete (after ~20 seconds)

---

### ✅ Day 3 Completion Checklist

- [ ] ProcessingStatus component with step tracking
- [ ] usePolling hook for real-time updates
- [ ] Mock API service with simulated processing
- [ ] ProcessingPage with live progress
- [ ] File information display
- [ ] Automatic redirect on completion
- [ ] Framer Motion animations
- [ ] All functionality verified in browser

**Git Commit:**
```bash
git add .
git commit -m "Week 1 Day 3: Processing page with real-time progress tracking"
git push
```

---

## Day 4: Results & Transcript Display (8 hours)

### Hour 1-2: Transcript Viewer Component

#### Step 1: Create TranscriptViewer Component

```bash
cd frontend/src/components/Transcription
```

Create `TranscriptViewer.jsx`:

```jsx
import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function TranscriptViewer({ transcript }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all'); // all, ms, en, zh

  // Mock transcript data (will be real data from backend in Week 2)
  const mockTranscript = transcript || [
    { time: '00:00:05', speaker: 'Judge', text: 'Proceedings dibuka. [MS]', language: 'ms' },
    { time: '00:00:12', speaker: 'Lawyer A', text: 'Good morning, Your Honour. [EN]', language: 'en' },
    { time: '00:00:18', speaker: 'Judge', text: 'Proceed with your submissions. [EN]', language: 'en' },
    { time: '00:00:25', speaker: 'Lawyer A', text: 'Terima kasih. Kami ingin membentangkan... [MS]', language: 'ms' },
    { time: '00:00:45', speaker: 'Lawyer B', text: 'Objection, Your Honour. [EN]', language: 'en' },
    { time: '00:01:02', speaker: 'Judge', text: 'Overruled. Continue. [EN]', language: 'en' }
  ];

  // Filter by search term and language
  const filteredTranscript = mockTranscript.filter(entry => {
    const matchesSearch = searchTerm === '' ||
      entry.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.speaker.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLanguage = selectedLanguage === 'all' || entry.language === selectedLanguage;

    return matchesSearch && matchesLanguage;
  });

  const highlightText = (text) => {
    if (!searchTerm) return text;

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ?
        <mark key={index} className="bg-gold-500 text-navy-500">{part}</mark> :
        part
    );
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search transcript..."
            className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-gold-500 transition-colors"
          />
        </div>

        {/* Language Filter */}
        <div className="flex space-x-2">
          {[
            { value: 'all', label: 'All' },
            { value: 'ms', label: 'Malay' },
            { value: 'en', label: 'English' },
            { value: 'zh', label: 'Chinese' }
          ].map(lang => (
            <button
              key={lang.value}
              onClick={() => setSelectedLanguage(lang.value)}
              className={`
                px-4 py-2 rounded-lg font-medium transition-all
                ${selectedLanguage === lang.value
                  ? 'bg-gold-500 text-navy-500'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }
              `}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transcript Entries */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6 max-h-[600px] overflow-y-auto space-y-4">
        {filteredTranscript.length === 0 ? (
          <p className="text-gray-400 text-center py-8">
            No results found
          </p>
        ) : (
          filteredTranscript.map((entry, index) => (
            <div
              key={index}
              className="flex space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            >
              {/* Timestamp */}
              <div className="text-gold-500 font-mono text-sm min-w-[80px]">
                {entry.time}
              </div>

              {/* Speaker & Text */}
              <div className="flex-1">
                <div className="text-blue-400 font-semibold mb-1">
                  {entry.speaker}
                </div>
                <div className="text-white">
                  {highlightText(entry.text)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats */}
      <div className="flex justify-between text-sm text-gray-400">
        <span>{filteredTranscript.length} entries</span>
        <span>Total duration: {mockTranscript[mockTranscript.length - 1]?.time || '00:00:00'}</span>
      </div>
    </div>
  );
}
```

---

### Hour 3-4: Download & Share Components

#### Step 1: Create DownloadOptions Component

Create `DownloadOptions.jsx`:

```jsx
import { ArrowDownTrayIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import Button from '../UI/Button';

export default function DownloadOptions({ jobId, transcriptUrl }) {
  const handleDownload = (format) => {
    // TODO: Implement actual download in Week 2
    console.log(`Downloading ${format} for job ${jobId}`);
    alert(`Downloading ${format.toUpperCase()} file...`);
  };

  const formats = [
    { id: 'docx', label: 'Microsoft Word', icon: '📄', description: 'Court-ready DOCX format' },
    { id: 'pdf', label: 'PDF Document', icon: '📕', description: 'Read-only PDF version' },
    { id: 'txt', label: 'Plain Text', icon: '📝', description: 'Simple text file' },
    { id: 'srt', label: 'Subtitles', icon: '💬', description: 'SRT subtitle file' }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">Download Transcript</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formats.map(format => (
          <button
            key={format.id}
            onClick={() => handleDownload(format.id)}
            className="flex items-start space-x-4 p-4 bg-white/5 border border-white/10 rounded-lg hover:border-gold-500/50 hover:bg-white/10 transition-all group"
          >
            <div className="text-3xl">{format.icon}</div>
            <div className="flex-1 text-left">
              <div className="text-white font-medium group-hover:text-gold-500 transition-colors">
                {format.label}
              </div>
              <div className="text-gray-400 text-sm">
                {format.description}
              </div>
            </div>
            <ArrowDownTrayIcon className="w-5 h-5 text-gray-400 group-hover:text-gold-500 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}
```

#### Step 2: Create ShareLink Component

Create `ShareLink.jsx`:

```jsx
import { useState } from 'react';
import { ClipboardIcon, CheckIcon } from '@heroicons/react/24/outline';
import Button from '../UI/Button';

export default function ShareLink({ jobId }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${window.location.origin}/results/${jobId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-4">Share Transcript</h3>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={shareUrl}
          readOnly
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white font-mono text-sm"
        />
        <Button
          variant={copied ? 'secondary' : 'primary'}
          onClick={copyToClipboard}
        >
          {copied ? (
            <>
              <CheckIcon className="w-5 h-5 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <ClipboardIcon className="w-5 h-5 mr-2" />
              Copy Link
            </>
          )}
        </Button>
      </div>

      <p className="text-gray-400 text-sm">
        Anyone with this link can view the transcript. Link expires in 30 days.
      </p>
    </div>
  );
}
```

---

### Hour 5-6: Build ResultsPage

#### Step 1: Create Complete ResultsPage

Update `frontend/src/pages/ResultsPage.jsx`:

```jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import GlassCard from '../components/UI/GlassCard';
import Button from '../components/UI/Button';
import Alert from '../components/UI/Alert';
import TranscriptViewer from '../components/Transcription/TranscriptViewer';
import DownloadOptions from '../components/Transcription/DownloadOptions';
import ShareLink from '../components/Transcription/ShareLink';
import { mockApi } from '../utils/mockApi';

export default function ResultsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJobResults = async () => {
      try {
        const data = await mockApi.getJobStatus(jobId);

        if (data.status !== 'completed') {
          // Redirect back to processing if not completed
          navigate(`/processing/${jobId}`);
          return;
        }

        setJob(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch results. Please try again.');
        console.error('Error fetching results:', err);
        setIsLoading(false);
      }
    };

    fetchJobResults();
  }, [jobId, navigate]);

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <GlassCard>
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-white">Loading results...</p>
          </div>
        </GlassCard>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <GlassCard>
          <Alert
            type="error"
            message={error || 'Transcript not found'}
          />
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Success Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
        </motion.div>

        <h1 className="text-4xl font-bold text-white mb-2">
          Transcription Complete!
        </h1>
        <p className="text-gray-300">
          Your transcript has been sent to <span className="text-gold-500">{job.proofreaderEmail}</span>
        </p>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transcript Viewer (2/3 width) */}
        <div className="lg:col-span-2">
          <GlassCard>
            <h2 className="text-2xl font-bold text-white mb-6">Transcript</h2>
            <TranscriptViewer transcript={job.transcript} />
          </GlassCard>
        </div>

        {/* Sidebar (1/3 width) */}
        <div className="space-y-6">
          {/* Download Options */}
          <GlassCard>
            <DownloadOptions jobId={jobId} transcriptUrl={job.transcriptUrl} />
          </GlassCard>

          {/* Share Link */}
          <GlassCard>
            <ShareLink jobId={jobId} />
          </GlassCard>

          {/* Job Info */}
          <GlassCard>
            <h3 className="text-xl font-semibold text-white mb-4">Job Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Job ID:</span>
                <span className="text-white font-mono">{jobId.slice(0, 12)}...</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className="text-green-400 font-medium">Completed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Completed:</span>
                <span className="text-white">{new Date().toLocaleString()}</span>
              </div>
            </div>
          </GlassCard>

          {/* New Transcription Button */}
          <Button
            variant="primary"
            onClick={() => navigate('/')}
            className="w-full"
          >
            New Transcription
          </Button>
        </div>
      </div>
    </div>
  );
}
```

---

### Hour 7-8: Polish & Testing

#### Step 1: Add Custom Scrollbar Styles

Update `frontend/src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(212, 175, 55, 0.5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(212, 175, 55, 0.8);
}

/* Selection Color */
::selection {
  background: rgba(212, 175, 55, 0.3);
  color: white;
}

/* Focus Styles */
button:focus-visible,
input:focus-visible,
textarea:focus-visible {
  outline: 2px solid #D4AF37;
  outline-offset: 2px;
}
```

**Verification:**
```bash
npm run dev
```

Test complete user flow:
1. Upload files (/)
2. Watch processing (/processing/job_xxx)
3. View results (/results/job_xxx)
4. Search transcript
5. Filter by language
6. Copy share link
7. Click download buttons

---

### ✅ Day 4 Completion Checklist

- [ ] TranscriptViewer with search & language filter
- [ ] DownloadOptions component (4 formats)
- [ ] ShareLink component with copy function
- [ ] Complete ResultsPage layout
- [ ] Success animation with Framer Motion
- [ ] Custom scrollbar styling
- [ ] New transcription button
- [ ] Full user flow tested end-to-end

**Git Commit:**
```bash
git add .
git commit -m "Week 1 Day 4: Results page with transcript viewer and download options"
git push
```

---

## Day 5: Polish, Animations & Responsive Design (8 hours)

### Hour 1-2: Add Page Transitions

#### Step 1: Create Page Transition Wrapper

```bash
cd frontend/src/components/Layout
```

Create `PageTransition.jsx`:

```jsx
import { motion } from 'framer-motion';

export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
```

#### Step 2: Update App.jsx with AnimatePresence

Update `frontend/src/App.jsx`:

```jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ParticleBackground from './components/Layout/ParticleBackground';
import PageTransition from './components/Layout/PageTransition';
import UploadPage from './pages/UploadPage';
import ProcessingPage from './pages/ProcessingPage';
import ResultsPage from './pages/ResultsPage';

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-500 via-blue-900 to-navy-500 flex flex-col">
      <ParticleBackground />
      <Header />

      <main className="flex-1 pt-16 relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <UploadPage />
                </PageTransition>
              }
            />
            <Route
              path="/processing/:jobId"
              element={
                <PageTransition>
                  <ProcessingPage />
                </PageTransition>
              }
            />
            <Route
              path="/results/:jobId"
              element={
                <PageTransition>
                  <ResultsPage />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
```

---

### Hour 3-4: Responsive Design Improvements

#### Step 1: Update Header for Mobile

The Header component already has mobile menu functionality. Let's enhance it with better transitions:

Update `frontend/src/components/Layout/Header.jsx` mobile menu section:

```jsx
{/* Mobile menu */}
<AnimatePresence>
  {mobileMenuOpen && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="md:hidden overflow-hidden"
    >
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Link
          to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="text-gray-300 hover:text-gold-500 block px-3 py-2 rounded-md text-base font-medium"
        >
          Upload
        </Link>
        <Link
          to="/pricing"
          onClick={() => setMobileMenuOpen(false)}
          className="text-gray-300 hover:text-gold-500 block px-3 py-2 rounded-md text-base font-medium"
        >
          Pricing
        </Link>
        <Link
          to="/how-it-works"
          onClick={() => setMobileMenuOpen(false)}
          className="text-gray-300 hover:text-gold-500 block px-3 py-2 rounded-md text-base font-medium"
        >
          How It Works
        </Link>
      </div>
    </motion.div>
  )}
</AnimatePresence>
```

Add import:
```jsx
import { AnimatePresence } from 'framer-motion';
```

#### Step 2: Make TranscriptViewer Fully Responsive

Update controls section in `TranscriptViewer.jsx`:

```jsx
{/* Controls */}
<div className="flex flex-col sm:flex-row gap-4">
  {/* Search */}
  <div className="flex-1 relative">
    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search transcript..."
      className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-gold-500 transition-colors text-sm sm:text-base"
    />
  </div>

  {/* Language Filter */}
  <div className="grid grid-cols-4 sm:flex sm:space-x-2 gap-2 sm:gap-0">
    {[
      { value: 'all', label: 'All' },
      { value: 'ms', label: 'Malay' },
      { value: 'en', label: 'English' },
      { value: 'zh', label: 'Chinese' }
    ].map(lang => (
      <button
        key={lang.value}
        onClick={() => setSelectedLanguage(lang.value)}
        className={`
          px-3 sm:px-4 py-2 rounded-lg font-medium transition-all text-xs sm:text-sm
          ${selectedLanguage === lang.value
            ? 'bg-gold-500 text-navy-500'
            : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }
        `}
      >
        {lang.label}
      </button>
    ))}
  </div>
</div>
```

---

### Hour 5-6: Add Loading Skeletons

#### Step 1: Create Skeleton Component

```bash
cd frontend/src/components/UI
```

Create `Skeleton.jsx`:

```jsx
export default function Skeleton({ className = '', variant = 'default' }) {
  const variants = {
    default: 'h-4 w-full',
    title: 'h-8 w-3/4',
    text: 'h-4 w-full',
    circle: 'h-12 w-12 rounded-full',
    button: 'h-10 w-32 rounded-lg'
  };

  return (
    <div
      className={`
        ${variants[variant]}
        ${className}
        bg-white/10 animate-pulse rounded
      `}
    />
  );
}
```

#### Step 2: Create ProcessingPageSkeleton

Create `frontend/src/components/Transcription/ProcessingPageSkeleton.jsx`:

```jsx
import GlassCard from '../UI/GlassCard';
import Skeleton from '../UI/Skeleton';

export default function ProcessingPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <Skeleton variant="title" className="mx-auto mb-2" />
        <Skeleton variant="text" className="w-1/2 mx-auto" />
      </div>

      <GlassCard className="mb-8">
        <div className="space-y-6">
          <Skeleton variant="text" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex items-center space-x-4 p-4">
                <Skeleton variant="circle" />
                <Skeleton variant="text" className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      <GlassCard>
        <Skeleton variant="title" className="mb-4" />
        <div className="space-y-2">
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </div>
      </GlassCard>
    </div>
  );
}
```

Update `ProcessingPage.jsx` to use skeleton:

```jsx
import ProcessingPageSkeleton from '../components/Transcription/ProcessingPageSkeleton';

// Replace loading state
if (isLoading && !job) {
  return <ProcessingPageSkeleton />;
}
```

---

### Hour 7-8: Final Polish & Testing

#### Step 1: Add Hover Effects to Cards

Update `GlassCard.jsx`:

```jsx
export default function GlassCard({ children, className = '', hover = false, glow = false }) {
  return (
    <div
      className={`
        bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6
        ${hover ? 'hover:bg-white/10 hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/10 transition-all duration-300 cursor-pointer' : ''}
        ${glow ? 'shadow-xl shadow-gold-500/20' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
```

#### Step 2: Add Meta Tags for SEO

Update `frontend/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- SEO Meta Tags -->
    <title>Malaysian Legal AI - Court-Ready Transcripts in 10 Minutes</title>
    <meta name="description" content="Malaysia's first AI-powered legal transcription platform. Get court-ready transcripts 100x faster at 70% lower cost. Supports Malay, English, and Chinese code-switching." />
    <meta name="keywords" content="legal transcription, Malaysia, AI transcription, court transcripts, Malay transcription, court proceedings" />

    <!-- Open Graph -->
    <meta property="og:title" content="Malaysian Legal AI - AI-Powered Legal Transcription" />
    <meta property="og:description" content="Court-ready transcripts in 10 minutes at 70% lower cost" />
    <meta property="og:type" content="website" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

Update body font in `index.css`:

```css
body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

#### Step 3: Create 404 Page

Create `frontend/src/pages/NotFoundPage.jsx`:

```jsx
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../components/UI/GlassCard';
import Button from '../components/UI/Button';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto px-4 py-24">
      <GlassCard className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
        >
          <h1 className="text-9xl font-bold text-gold-500 mb-4">404</h1>
        </motion.div>

        <h2 className="text-3xl font-bold text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Button
          variant="primary"
          onClick={() => navigate('/')}
        >
          Go Home
        </Button>
      </GlassCard>
    </div>
  );
}
```

Add route in `App.jsx`:

```jsx
import NotFoundPage from './pages/NotFoundPage';

// Add after other routes
<Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
```

#### Step 4: Final Testing Checklist

Create a testing checklist and verify all features:

**File Upload:**
- [ ] Drag and drop works
- [ ] Click to browse works
- [ ] File validation (type, size) works
- [ ] Error messages display correctly
- [ ] Audio preview plays correctly
- [ ] PDF upload (optional) works
- [ ] Email validation works

**Processing:**
- [ ] Progress bar updates smoothly
- [ ] Step indicators animate correctly
- [ ] File information displays correctly
- [ ] Polling works (updates every 2 seconds)
- [ ] Auto-redirect to results when complete

**Results:**
- [ ] Transcript viewer displays correctly
- [ ] Search functionality works
- [ ] Language filter works
- [ ] Highlighting works in search
- [ ] Download buttons trigger correctly
- [ ] Share link copies to clipboard
- [ ] New transcription button navigates home

**Responsive Design:**
- [ ] Mobile layout (320px - 640px)
- [ ] Tablet layout (641px - 1024px)
- [ ] Desktop layout (1025px+)
- [ ] Mobile menu works
- [ ] All buttons accessible on touch screens

**Animations:**
- [ ] Page transitions smooth
- [ ] Loading skeletons display
- [ ] Hover effects work
- [ ] Button states animate correctly

**Git Commit:**
```bash
git add .
git commit -m "Week 1 Day 5: Polish, animations, responsive design, and final testing"
git push
```

---

### ✅ Day 5 Completion Checklist

- [ ] Page transitions with AnimatePresence
- [ ] Mobile menu animations
- [ ] Responsive design across all breakpoints
- [ ] Loading skeleton components
- [ ] Hover effects on all interactive elements
- [ ] SEO meta tags added
- [ ] Custom fonts (Inter) implemented
- [ ] 404 page created
- [ ] Full testing checklist completed
- [ ] All Git commits pushed

---

## ✅ WEEK 1 COMPLETE!

**What You've Built:**

### **Frontend Foundation (40 hours):**
1. ✅ Complete UI component library (GlassCard, Button, ProgressBar, Alert)
2. ✅ Layout components (Header, Footer, ParticleBackground)
3. ✅ File upload system with drag-and-drop
4. ✅ Audio preview with playback controls
5. ✅ PDF upload functionality
6. ✅ Real-time progress tracking with polling
7. ✅ Transcript viewer with search & language filter
8. ✅ Download options (4 formats)
9. ✅ Share link functionality
10. ✅ Full page transitions and animations
11. ✅ Responsive design (mobile, tablet, desktop)
12. ✅ Dark mode implementation
13. ✅ SEO optimization

### **Development Setup:**
- ✅ React 18 + Vite
- ✅ Tailwind CSS with custom design system
- ✅ Framer Motion for animations
- ✅ Zustand for state management
- ✅ React Router for navigation
- ✅ Mock API for development testing

### **User Flow:**
1. Upload audio + PDF → Enter email → Submit
2. Watch real-time processing with step-by-step progress
3. View completed transcript with search & filters
4. Download in multiple formats or share link

---

**Next Steps:**

**Week 2: Backend Core (40 hours)** will cover:
- Express API setup with proper routing
- PostgreSQL database integration (Neon)
- Redis queue system (BullMQ + Upstash)
- File upload to AWS S3
- Job management system
- API testing with real endpoints

**Ready to continue with Week 2?**
