import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Home, User, Map, Lightbulb, Globe, Sparkles, Terminal, Sun, Moon } from "lucide-react";
import CircularNavigation from "../UI/CircularNavigation";
import { useTheme } from "../../context/ThemeContext";

/**
 * Floating Navigation Button - 8-Wedge Navigation with Terminal & Theme Toggle
 */
export default function FloatingNav({ isOpen, toggleMenu, toggleArchitect }) {
    const { isDark, cycleMode } = useTheme();

    // 8-wedge navigation with Terminal access and Theme toggle
    const navItems = [
        {
            name: "Home",
            icon: Home,
            href: "#hero"
        },
        {
            name: "About",
            icon: User,
            href: "#about"
        },
        {
            name: "Journey",
            icon: Map,
            href: "#experience"
        },
        {
            name: "Proposals",
            icon: Lightbulb,
            href: "#projects"
        },
        {
            name: "Platform",
            icon: Globe,
            href: "#malaysian-platform"
        },
        {
            name: "AI Demo",
            icon: Sparkles,
            href: "#ai-tools"
        },
        {
            name: "Terminal",
            icon: Terminal,
            action: toggleArchitect
        },
        {
            name: isDark ? "Light" : "Dark",
            icon: isDark ? Sun : Moon,
            action: cycleMode
        }
    ];

    // Mobile Detection
    const [isMobile, setIsMobile] = React.useState(false);
    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Double Tap Logic for Mobile
    const lastTap = React.useRef(0);
    const handleInteraction = (e) => {
        if (!isMobile) {
            toggleMenu(); // Desktop: Instant toggle
            return;
        }

        const now = Date.now();
        const DOUBLE_TAP_DELAY = 300;

        if (now - lastTap.current < DOUBLE_TAP_DELAY) {
            toggleMenu(); // Mobile: Updates only on double tap
        }
        lastTap.current = now;
    };

    return (
        <>
            {/* Floating Trigger Button */}
            <motion.button
                onClick={handleInteraction}
                className="fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50 w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-primary to-pink-500 text-white flex items-center justify-center transition-all animate-pulse-slow"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
                whileHover={{ rotate: 90, scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Open quick navigation"
                style={{
                    boxShadow: '0 0 30px rgba(230, 57, 70, 0.7), 0 0 60px rgba(230, 57, 70, 0.4), 0 0 90px rgba(230, 57, 70, 0.2)'
                }}
            >
                <AnimatePresence mode="wait">
                    {!isOpen ? (
                        <motion.div
                            key="menu"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex flex-col items-center justify-center"
                        >
                            <Menu className="w-8 h-8" />
                            {isMobile && <span className="text-[8px] font-bold uppercase mt-1">2x Tap</span>}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Menu className="w-8 h-8" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Visual Feedback for Mobile */}
                {isMobile && !isOpen && (
                    <motion.div
                        className="absolute -top-12 bg-black/80 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm pointer-events-none"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2 }}
                    >
                        Double Tap to Open
                    </motion.div>
                )}

                {/* Pulsating Glow Rings */}
                <motion.span
                    className="absolute inset-0 rounded-full bg-primary"
                    animate={{
                        scale: [1, 1.6, 1],
                        opacity: [0.7, 0, 0.7]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.span
                    className="absolute inset-0 rounded-full bg-pink-500"
                    animate={{
                        scale: [1, 1.9, 1],
                        opacity: [0.5, 0, 0.5]
                    }}
                    transition={{
                        duration: 2,
                        delay: 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.span
                    className="absolute inset-0 rounded-full bg-orange-500"
                    animate={{
                        scale: [1, 2.2, 1],
                        opacity: [0.3, 0, 0.3]
                    }}
                    transition={{
                        duration: 2,
                        delay: 1,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.button>

            {/* Circular Navigation Overlay */}
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
}
