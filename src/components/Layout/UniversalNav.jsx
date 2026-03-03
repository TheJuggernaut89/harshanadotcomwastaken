import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Home, Briefcase, Palette, Zap, Menu, X,
    Terminal, Sparkles, Code
} from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Universal Navigation Bar
 * Works across all 3 modes: Professional, Creative, Brutal
 * Mobile-optimized with bottom bar, desktop with top bar
 */
const UniversalNav = ({ currentMode = 'professional' }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Hide/show on scroll (mobile only)
    useEffect(() => {
        if (!isMobile) return;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const heroHeight = window.innerHeight * 0.8;
            
            // Always show in hero section
            if (currentScrollY < heroHeight) {
                setIsVisible(true);
            } else {
                // Hide when scrolling down, show when scrolling up
                if (currentScrollY > lastScrollY && currentScrollY > heroHeight) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile, lastScrollY]);

    const modes = [
        { 
            id: 'home', 
            label: 'Home', 
            icon: Home,
            href: '/',
            color: 'text-white'
        },
        { 
            id: 'professional', 
            label: 'Pro', 
            icon: Briefcase,
            href: '/professional/',
            color: 'text-blue-400'
        },
        { 
            id: 'creative', 
            label: 'Creative', 
            icon: Palette,
            href: '/creative/',
            color: 'text-pink-400'
        },
        { 
            id: 'brutal', 
            label: 'Brutal', 
            icon: Zap,
            href: '/brutal/',
            color: 'text-orange-400'
        },
    ];

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    
    // Determine active mode from path
    const getActiveMode = () => {
        if (currentPath.includes('professional')) return 'professional';
        if (currentPath.includes('creative')) return 'creative';
        if (currentPath.includes('brutal')) return 'brutal';
        return 'home';
    };

    const activeMode = getActiveMode();

    // Mobile Bottom Navigation
    if (isMobile) {
        return (
            <>
                <motion.nav
                    initial={{ y: 100 }}
                    animate={{ y: isVisible ? 0 : 100 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-navy-dark/95 backdrop-blur-xl border-t border-white/10 safe-area-pb"
                >
                    <div className="flex items-center justify-around px-2 py-3">
                        {modes.map((mode) => {
                            const Icon = mode.icon;
                            const isActive = activeMode === mode.id;
                            
                            return (
                                <a
                                    key={mode.id}
                                    href={mode.href}
                                    className={cn(
                                        "flex flex-col items-center gap-1 p-2 rounded-xl transition-all min-w-[60px]",
                                        isActive 
                                            ? "bg-white/10" 
                                            : "active:bg-white/5"
                                    )}
                                >
                                    <Icon 
                                        size={22} 
                                        className={cn(
                                            "transition-colors",
                                            isActive ? mode.color : "text-white/50"
                                        )} 
                                    />
                                    <span className={cn(
                                        "text-[10px] transition-colors",
                                        isActive ? "text-white" : "text-white/50"
                                    )}>
                                        {mode.label}
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute bottom-1 w-1 h-1 rounded-full bg-white"
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </div>
                </motion.nav>

                {/* Spacer for mobile to prevent content being blocked */}
                <div className="h-20 md:hidden" />
            </>
        );
    }

    // Desktop Top Navigation
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4"
        >
            <div className="flex items-center justify-between p-2 rounded-2xl bg-navy-dark/80 backdrop-blur-xl border border-white/10 shadow-2xl">
                {/* Logo */}
                <a 
                    href="/"
                    className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-xl transition-colors"
                >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">HJ</span>
                    </div>
                    <span className="text-white font-semibold text-sm">Harshana</span>
                </a>

                {/* Mode Switcher */}
                <div className="flex items-center gap-1">
                    {modes.slice(1).map((mode) => {
                        const Icon = mode.icon;
                        const isActive = activeMode === mode.id;
                        
                        return (
                            <a
                                key={mode.id}
                                href={mode.href}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all",
                                    isActive 
                                        ? "bg-white/10 text-white" 
                                        : "text-white/50 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Icon size={16} className={isActive ? mode.color : ""} />
                                <span className="hidden sm:inline">{mode.label}</span>
                            </a>
                        );
                    })}
                </div>

                {/* Terminal Button */}
                <a
                    href="/"
                    className="relative p-2.5 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all"
                    title="Open Terminal"
                >
                    <Terminal size={18} />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                </a>
            </div>
        </motion.nav>
    );
};

export default UniversalNav;
