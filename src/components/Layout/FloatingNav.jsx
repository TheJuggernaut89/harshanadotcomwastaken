import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Home, User, Map, Lightbulb, Globe, Sparkles, Terminal, Sun, Moon } from "lucide-react";
import { useMode } from "../../context/ThemeContext";

// Import navigation components
import MissionControlNav from "../UI/MissionControlNav";
import CommandBarNav from "../UI/CommandBarNav";
import SmartDockNav from "../UI/SmartDockNav";
import CircularNavigation from "../UI/CircularNavigation";

/**
 * Floating Navigation - Mode-Aware Navigation System
 * 
 * Creative Mode: Mission Control Grid (desktop) / Bottom Sheet (mobile)
 * Pro Mode: Technologist Command Bar with CMD+K palette
 * Brutal Mode: Smart Dock with predictive expansion
 */
export default function FloatingNav({ isOpen, toggleMenu, toggleArchitect }) {
    const { mode, isCreative, isPro, isBrutal, isDark, cycleMode } = useMode();
    const [showLegacyNav, setShowLegacyNav] = useState(false);

    // Navigation items
    const navItems = [
        { name: "Home", icon: Home, href: "#hero" },
        { name: "About", icon: User, href: "#about" },
        { name: "Journey", icon: Map, href: "#experience", hasMedia: true },
        { name: "Proposals", icon: Lightbulb, href: "#projects" },
        { name: "Platform", icon: Globe, href: "#malaysian-platform" },
        { name: "AI Demo", icon: Sparkles, href: "#ai-tools" },
        { 
            name: "Terminal", 
            icon: Terminal, 
            action: () => {
                toggleArchitect();
                if (isOpen) toggleMenu();
            }
        },
        { 
            name: isDark ? "Light" : "Dark", 
            icon: isDark ? Sun : Moon, 
            action: cycleMode
        }
    ];

    // Mobile Detection
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Double Tap Logic for Mobile (for legacy nav)
    const lastTap = React.useRef(0);
    const handleInteraction = (e) => {
        if (!isMobile) {
            toggleMenu();
            return;
        }

        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;

        if (now - lastTap.current < DOUBLE_TAP_DELAY) {
            toggleMenu();
        }
        lastTap.current = now;
    };

    // Render appropriate navigation based on mode
    const renderNavigation = () => {
        if (isCreative) {
            return (
                <>
                    {/* Creative Mode Trigger Button */}
                    <MissionControlTrigger 
                        onClick={handleInteraction}
                        isOpen={isOpen}
                        mode="creative"
                    />
                    {/* Mission Control Navigation */}
                    <AnimatePresence>
                        {isOpen && (
                            <MissionControlNav
                                navItems={navItems}
                                isOpen={isOpen}
                                toggleMenu={toggleMenu}
                                mode="creative"
                            />
                        )}
                    </AnimatePresence>
                </>
            );
        }

        if (isPro) {
            return (
                <CommandBarNav
                    navItems={navItems}
                    isOpen={isOpen}
                    toggleMenu={toggleMenu}
                    isDark={isDark}
                    cycleMode={cycleMode}
                />
            );
        }

        if (isBrutal) {
            return (
                <SmartDockNav
                    navItems={navItems}
                    isOpen={isOpen}
                    toggleMenu={toggleMenu}
                    isDark={isDark}
                />
            );
        }

        // Fallback to legacy circular navigation
        return (
            <>
                <LegacyTrigger onClick={handleInteraction} isOpen={isOpen} />
                <AnimatePresence>
                    {isOpen && (
                        <CircularNavigation
                            navItems={navItems}
                            isOpen={isOpen}
                            toggleMenu={toggleMenu}
                        />
                    )}
                </AnimatePresence>
            </>
        );
    };

    return (
        <>
            {renderNavigation()}

            {/* Mode Indicator - Shows current mode */}
            <ModeIndicator mode={mode} />
        </>
    );
}

// Mission Control Trigger Button (Creative Mode)
function MissionControlTrigger({ onClick, isOpen, mode }) {
    return (
        <motion.button
            onClick={onClick}
            className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white flex items-center justify-center transition-all"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            style={{
                boxShadow: '0 0 30px rgba(236, 72, 153, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)'
            }}
        >
            <motion.div
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
            >
                <Menu className="w-6 h-6 md:w-7 md:h-7" />
            </motion.div>

            {/* Animated rings */}
            <motion.span
                className="absolute inset-0 rounded-2xl bg-pink-500"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.span
                className="absolute inset-0 rounded-2xl bg-purple-500"
                animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.button>
    );
}

// Legacy Trigger Button
function LegacyTrigger({ onClick, isOpen }) {
    return (
        <motion.button
            onClick={onClick}
            className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-primary to-pink-500 text-white flex items-center justify-center transition-all"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
            whileHover={{ rotate: 90, scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            style={{
                boxShadow: '0 0 30px rgba(230, 57, 70, 0.7), 0 0 60px rgba(230, 57, 70, 0.4)'
            }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={isOpen ? 'close' : 'menu'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Menu className="w-8 h-8" />
                </motion.div>
            </AnimatePresence>

            {/* Pulsating Glow Rings */}
            <motion.span
                className="absolute inset-0 rounded-full bg-primary"
                animate={{ scale: [1, 1.6, 1], opacity: [0.7, 0, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.button>
    );
}

// Mode Indicator Component
function ModeIndicator({ mode }) {
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        // Show hint on first load
        const hasSeenHint = localStorage.getItem('modeHintSeen');
        if (!hasSeenHint) {
            setShowHint(true);
            const timer = setTimeout(() => {
                setShowHint(false);
                localStorage.setItem('modeHintSeen', 'true');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, []);

    const modeStyles = {
        creative: {
            bg: 'from-pink-500/20 to-purple-500/20',
            border: 'border-pink-500/50',
            text: 'text-pink-400',
            icon: '🎨'
        },
        pro: {
            bg: 'from-primary/20 to-blue-500/20',
            border: 'border-primary/50',
            text: 'text-primary',
            icon: '💼'
        },
        brutal: {
            bg: 'from-[#39ff14]/20 to-[#ff0040]/20',
            border: 'border-[#39ff14]/50',
            text: 'text-[#39ff14]',
            icon: '⚡'
        }
    };

    const style = modeStyles[mode];

    return (
        <>
            {/* Mode Badge */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className={`fixed top-4 right-4 z-40 flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r ${style.bg} border ${style.border} backdrop-blur-md`}
            >
                <span className="text-lg">{style.icon}</span>
                <span className={`text-xs font-bold uppercase tracking-wider ${style.text} hidden sm:block`}>
                    {mode} Mode
                </span>
            </motion.div>

            {/* Hint Toast */}
            <AnimatePresence>
                {showHint && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="fixed top-16 right-4 z-40 max-w-xs"
                    >
                        <div className={`p-4 rounded-xl bg-gradient-to-r ${style.bg} border ${style.border} backdrop-blur-md`}>
                            <p className={`text-sm font-medium ${style.text} mb-1`}>
                                {mode === 'creative' && 'Mission Control Grid active'}
                                {mode === 'pro' && 'CMD+K for command palette'}
                                {mode === 'brutal' && 'Smart Dock with context awareness'}
                            </p>
                            <p className="text-xs text-white/60">
                                Type &quot;creative&quot;, &quot;pro&quot;, or &quot;brutal&quot; to switch modes
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
