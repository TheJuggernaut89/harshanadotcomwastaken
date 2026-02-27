import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import ParticleBackground from './components/Layout/ParticleBackground';
import SmoothScroll from './components/Layout/SmoothScroll';
// Intro and Loading removed - go straight to portfolio
// import WelcomeIntro from './components/Sections/WelcomeIntro';
// import LoadingScreen from './components/Layout/LoadingScreen';
import Hero from './components/Sections/Hero-MarketingTechnologist';
import ValueProposition from './components/Sections/ValueProposition';
import AboutBento from './components/Sections/AboutBento';
import Skills from './components/Sections/Skills';
import Journey from './components/Sections/Journey';
import Portfolio from './components/Sections/Portfolio';
import WorkforceWorkflows from './components/Sections/WorkforceWorkflows';
import KopitiamIntelEvolution from './components/Sections/KopitiamIntelEvolution';
import MamakWorkshopEvolution from './components/Sections/MamakWorkshopEvolution';
import MakcikApprovalEvolution from './components/Sections/MakcikApprovalEvolution';
import Contact from './components/Sections/Contact';
import FloatingNav from './components/Layout/FloatingNav';
import { FloatingAiAssistant } from './components/UI/FloatingAiAssistant';
import { trackChatbotEvent } from './utils/chatbotAnalytics';

function App() {
  // Skip intro and loading - go straight to portfolio
  const [showIntro, setShowIntro] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showMain, setShowMain] = useState(true);
  
  // Navigation State
  const [isNavOpen, setIsNavOpen] = useState(false);

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

  return (
    <div className="relative min-h-screen">
      <AnimatePresence mode="wait">
        {/* Main App - Intro and Loading skipped */}
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
                <ValueProposition />
                <div id="about"><AboutBento /></div>
                <Skills />
                <WorkforceWorkflows />
                <KopitiamIntelEvolution />
                <MamakWorkshopEvolution />
                <MakcikApprovalEvolution />
                <div id="projects"><Portfolio /></div>
                <Journey />
                <div id="contact"><Contact /></div>

                <footer className="py-20 border-t border-navy/5 dark:border-white/5 text-center text-sm text-gray-500 bg-white/30 dark:bg-navy-dark/30 backdrop-blur-sm">
                  <div className="container mx-auto px-6">
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
                    </div>

                    <div className="mb-8">
                      <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                        Harshana Jothi
                      </span>
                      <p className="mt-2 font-bold opacity-60">Strategic AI & Marketing Innovator</p>
                    </div>
                    
                    <div className="mb-6">
                      <a 
                        href="/resume.pdf" 
                        download
                        onClick={() => trackChatbotEvent('download_resume', { location: 'footer' })}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-medium text-sm transition-all"
                      >
                        <FileText size={16} />
                        Download Resume PDF
                      </a>
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

      {/* Global Navigation */}
      {showMain && (
        <>
          <FloatingNav
            isOpen={isNavOpen}
            toggleMenu={() => setIsNavOpen(prev => !prev)}
            toggleArchitect={() => setIsNavOpen(false)}
          />
          <FloatingAiAssistant />
        </>
      )}
    </div>
  );
}

export default App;
