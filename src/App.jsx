import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/Layout/LoadingScreen';
import ParticleBackground from './components/Layout/ParticleBackground';
import RainingLetters from './components/UI/RainingLetters';
import SmoothScroll from './components/Layout/SmoothScroll';
import Hero from './components/Sections/Hero-MarketingTechnologist';
import ArtworkBanner from './components/Sections/ArtworkBanner';
import ValueProposition from './components/Sections/ValueProposition';
import Approach from './components/Sections/Approach';
import AboutBento from './components/Sections/AboutBento';
import Skills from './components/Sections/Skills';
import Journey from './components/Sections/Journey';
import Portfolio from './components/Sections/Portfolio';
import MalaysianPlatform from './components/MalaysianPlatform';
import AIWorkforce from './components/Sections/AIWorkforce';
import WorkforceWorkflows from './components/Sections/WorkforceWorkflows';
import Contact from './components/Sections/Contact';
import FloatingNav from './components/Layout/FloatingNav';
import SimpleTerminal from './components/Sections/SimpleTerminal';
import BackToTop from './components/UI/BackToTop';
import InteractiveChatbot from './components/UI/InteractiveChatbot';


function App() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showMain, setShowMain] = useState(false);
  // 🔒 Truth mode is now locked by default in PromptContext - requires password!

  // Navigation State
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showArchitect, setShowArchitect] = useState(false);

  // Global Navigation Listeners (Right Click & H Key)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'h' || e.key === 'H') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          setIsNavOpen(prev => !prev);
        }
      }
    };

    const handleRightClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsNavOpen(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyPress);
    document.addEventListener('contextmenu', handleRightClick, { capture: true });

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('contextmenu', handleRightClick, { capture: true });
    };
  }, []);

  const handleTerminalComplete = () => {
    setShowTerminal(false);
    setShowLoading(true);
  };

  const handleLoadingComplete = () => {
    setShowLoading(false);
    setShowMain(true);
  };

  return (
    <div className="relative min-h-screen">
      {/* Intro Sequence */}
      <AnimatePresence mode="wait">
        {showTerminal && (
          <RainingLetters key="resume-generator" onComplete={handleTerminalComplete} />
        )}

        {/* Loading Screen */}
        {showLoading && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}

        {/* Main App */}
        {showMain && (
          <SmoothScroll>
            <motion.main
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <ParticleBackground />

              <div className="relative z-10">
                <Hero />
                <ArtworkBanner />
                <ValueProposition />
                <Approach />
                <div id="about"><AboutBento /></div>
                <Skills />
                <Journey />
                <div id="projects"><Portfolio /></div>
                <div id="malaysian-platform"><MalaysianPlatform /></div>
                <div id="ai-tools"><AIWorkforce /></div>
                <WorkforceWorkflows />
                <div id="contact"><Contact /></div>

                <footer className="py-20 border-t border-navy/5 dark:border-white/5 text-center text-sm text-gray-500 bg-white/30 dark:bg-navy-dark/30 backdrop-blur-sm">
                  <div className="container mx-auto px-6">
                    {/* Tools Banner */}
                    <div className="mb-8 pb-8 border-b border-navy/5 dark:border-white/5">
                      <p className="text-xs uppercase tracking-widest font-black text-gray-400 dark:text-gray-500 mb-3">
                        Portfolio Tech Stack
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Built using</span>
                        <span className="text-primary font-bold">React</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-primary font-bold">Vite</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-primary font-bold">Framer Motion</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-primary font-bold">Tailwind CSS</span>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                        <span className="text-sm font-bold text-gray-600 dark:text-gray-400">AI Tools</span>
                        <span className="text-primary font-bold">OpenAI API</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-primary font-bold">Claude</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-primary font-bold">N8N</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-primary font-bold">Midjourney</span>
                      </div>
                    </div>

                    <div className="mb-8">
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                        Harshana Jothi
                      </span>
                      <p className="mt-2 font-bold opacity-60">Strategic AI & Marketing Innovator</p>
                    </div>
                    <p>© {new Date().getFullYear()} Harshana Jothi. All rights reserved.</p>
                    <p className="mt-2 opacity-50 text-[10px] uppercase tracking-widest font-black">
                      Designed for Impact • Powered by AI
                    </p>
                  </div>
                </footer>
              </div>
            </motion.main>
          </SmoothScroll>
        )}
      </AnimatePresence>

      {/* Global Navigation and Modals */}
      {showMain && (
        <>
          <FloatingNav
            isOpen={isNavOpen}
            toggleMenu={() => setIsNavOpen(prev => !prev)}
            toggleArchitect={() => {
              setIsNavOpen(false);
              setShowArchitect(true);
            }}
          />
          <BackToTop />
          <InteractiveChatbot />

          <AnimatePresence>
            {showArchitect && (
              <SimpleTerminal onClose={() => setShowArchitect(false)} />
            )}
          </AnimatePresence>

          {/* Media Diagnostic Tool removed */}
        </>
      )}
    </div>
  );
}

export default App;
