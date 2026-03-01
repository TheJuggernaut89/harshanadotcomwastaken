import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Home, User, Map, Lightbulb, Globe, Sparkles, Terminal,
    X, Menu, Zap, AlertCircle
} from "lucide-react";
import { cn } from "../../utils/cn";

/**
 * Smart Dock Navigation
 * Brutal Mode - Predictive dock with badges and context awareness
 * 
 * Features:
 * - Predictive expansion based on scroll context
 * - Badge notifications ("3 videos")
 * - Glowing terminal button
 * - High contrast brutalist design
 * - Mobile: Thumb-zone dock
 */
export default function SmartDockNav({ 
    navItems, 
    isOpen, 
    toggleMenu,
    isDark
}) {
    const [activeSection, setActiveSection] = useState('home');
    const [expandedItem, setExpandedItem] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const dockRef = useRef(null);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Track scroll position for context awareness
    useEffect(() => {
        const handleScroll = () => {
            const sections = ['hero', 'about', 'experience', 'projects', 'malaysian-platform', 'ai-tools'];
            const scrollPos = window.scrollY + window.innerHeight / 3;
            
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const { offsetTop, offsetHeight } = el;
                    if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Get context-aware suggestions
    const getContextSuggestions = () => {
        switch (activeSection) {
            case 'experience':
                return [
                    { name: 'Videos', count: 18, color: '#ff0040' },
                    { name: 'Images', count: 15, color: '#39ff14' }
                ];
            case 'projects':
                return [
                    { name: 'Proposals', count: 8, color: '#ff0040' }
                ];
            case 'ai-tools':
                return [
                    { name: 'Demos', count: 6, color: '#39ff14' }
                ];
            default:
                return [];
        }
    };

    const suggestions = getContextSuggestions();

    // Handle navigation
    const handleNavClick = (item) => {
        if (item.action) {
            item.action();
        } else if (item.href) {
            const el = document.querySelector(item.href);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
        setExpandedItem(null);
        setShowMobileMenu(false);
    };

    // Mobile Bottom Dock
    if (isMobile) {
        return (
            <>
                {/* Fixed Bottom Dock */}
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="fixed bottom-4 left-4 right-4 z-50"
                >
                    <div 
                        className={cn(
                            "flex items-center justify-around p-2 rounded-2xl border-2",
                            "bg-black/90 backdrop-blur-xl",
                            "border-[#39ff14]/30 shadow-[0_0_30px_rgba(57,255,20,0.2)]"
                        )}
                    >
                        {/* Essential Items */}
                        {navItems.slice(0, 3).map((item) => (
                            <button
                                key={item.name}
                                onClick={() => handleNavClick(item)}
                                className={cn(
                                    "relative p-3 rounded-xl transition-all",
                                    "border border-transparent",
                                    activeSection === item.href?.replace('#', '') 
                                        ? "bg-[#39ff14]/20 border-[#39ff14]" 
                                        : "hover:bg-white/5"
                                )}
                            >
                                <item.icon 
                                    size={24} 
                                    className={activeSection === item.href?.replace('#', '') 
                                        ? "text-[#39ff14]" 
                                        : "text-white/60"
                                    } 
                                />
                            </button>
                        ))}

                        {/* Context Badge */}
                        {suggestions.length > 0 && (
                            <button
                                onClick={() => setExpandedItem(expandedItem === 'context' ? null : 'context')}
                                className="relative p-3 rounded-xl bg-[#ff0040]/20 border border-[#ff0040] animate-pulse"
                            >
                                <AlertCircle size={24} className="text-[#ff0040]" />
                                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#ff0040] text-black text-xs font-bold flex items-center justify-center">
                                    {suggestions.reduce((acc, s) => acc + s.count, 0)}
                                </span>
                            </button>
                        )}

                        {/* Terminal */}
                        <button
                            onClick={() => {
                                const terminalItem = navItems.find(i => i.name === 'Terminal');
                                if (terminalItem) terminalItem.action();
                            }}
                            className="relative p-3 rounded-xl bg-[#39ff14]/10 border border-[#39ff14]/50"
                        >
                            <Terminal size={24} className="text-[#39ff14]" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-[#39ff14] rounded-full animate-ping" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-[#39ff14] rounded-full" />
                        </button>

                        {/* More */}
                        <button
                            onClick={() => setShowMobileMenu(true)}
                            className="p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/20"
                        >
                            <Menu size={24} className="text-white/60" />
                        </button>
                    </div>

                    {/* Context Expansion Panel */}
                    <AnimatePresence>
                        {expandedItem === 'context' && suggestions.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                                className="absolute bottom-full left-0 right-0 mb-2 p-3 rounded-2xl bg-black/95 border-2 border-[#39ff14]/30"
                            >
                                <p className="text-xs uppercase tracking-wider text-[#39ff14] mb-2">In This Section</p>
                                <div className="flex gap-2">
                                    {suggestions.map((suggestion) => (
                                        <button
                                            key={suggestion.name}
                                            onClick={() => handleNavClick({ href: '#experience' })}
                                            className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
                                        >
                                            <span className="text-white text-sm font-medium">{suggestion.name}</span>
                                            <span 
                                                className="px-2 py-1 rounded text-xs font-bold"
                                                style={{ background: suggestion.color + '20', color: suggestion.color }}
                                            >
                                                {suggestion.count}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Full Mobile Menu */}
                <AnimatePresence>
                    {showMobileMenu && (
                        <MobileMenu 
                            navItems={navItems} 
                            onClose={() => setShowMobileMenu(false)}
                            onExecute={handleNavClick}
                        />
                    )}
                </AnimatePresence>
            </>
        );
    }

    // Desktop Smart Dock
    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-50"
            ref={dockRef}
        >
            <div 
                className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-3xl",
                    "bg-black/80 backdrop-blur-xl border-2",
                    "border-white/10 shadow-2xl"
                )}
            >
                {navItems.map((item, index) => {
                    const isActive = activeSection === item.href?.replace('#', '');
                    const isTerminal = item.name === 'Terminal';
                    
                    return (
                        <motion.div
                            key={item.name}
                            className="relative"
                            onHoverStart={() => !isTerminal && setExpandedItem(index)}
                            onHoverEnd={() => setExpandedItem(null)}
                        >
                            <button
                                onClick={() => handleNavClick(item)}
                                className={cn(
                                    "relative p-3 rounded-2xl transition-all duration-300",
                                    "border-2",
                                    isTerminal 
                                        ? "bg-[#39ff14]/10 border-[#39ff14] shadow-[0_0_20px_rgba(57,255,20,0.3)]" 
                                        : isActive
                                            ? "bg-white/10 border-white/40"
                                            : "border-transparent hover:border-white/20 hover:bg-white/5"
                                )}
                            >
                                <item.icon 
                                    size={22} 
                                    className={cn(
                                        isTerminal 
                                            ? "text-[#39ff14]" 
                                            : isActive 
                                                ? "text-white" 
                                                : "text-white/50"
                                    )} 
                                />
                                
                                {/* Terminal Blink Cursor */}
                                {isTerminal && (
                                    <>
                                        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#39ff14] rounded-full animate-ping" />
                                        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#39ff14] rounded-full" />
                                    </>
                                )}

                                {/* Badge for Journey section */}
                                {item.name === 'Journey' && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#ff0040] text-black text-xs font-bold flex items-center justify-center">
                                        33
                                    </span>
                                )}
                            </button>

                            {/* Hover Label */}
                            <AnimatePresence>
                                {expandedItem === index && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-2 rounded-xl bg-black border border-white/20 whitespace-nowrap"
                                    >
                                        <span className="text-sm font-bold text-white">{item.name}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}

                {/* Divider */}
                <div className="w-8 h-0.5 bg-white/10 my-1" />

                {/* Context-Aware Expansion */}
                <AnimatePresence>
                    {suggestions.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col gap-2"
                        >
                            <p className="text-[10px] uppercase tracking-wider text-[#39ff14] text-center">
                                Here
                            </p>
                            {suggestions.map((suggestion) => (
                                <button
                                    key={suggestion.name}
                                    onClick={() => handleNavClick({ href: '#experience' })}
                                    className="relative p-2.5 rounded-xl bg-[#ff0040]/10 border border-[#ff0040]/30 hover:border-[#ff0040] transition-all group"
                                >
                                    <Zap size={18} className="text-[#ff0040]" />
                                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ff0040] text-black text-[10px] font-bold flex items-center justify-center">
                                        {suggestion.count}
                                    </span>
                                    
                                    {/* Tooltip */}
                                    <span className="absolute right-full top-1/2 -translate-y-1/2 mr-2 px-2 py-1 rounded bg-black border border-[#ff0040]/30 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {suggestion.name}
                                    </span>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Section Indicator */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2">
                <motion.div
                    key={activeSection}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="px-3 py-1.5 rounded-lg bg-[#39ff14]/10 border border-[#39ff14]/30"
                >
                    <span className="text-xs font-mono text-[#39ff14] uppercase tracking-wider">
                        {activeSection}
                    </span>
                </motion.div>
            </div>
        </motion.div>
    );
}

// Mobile Menu Overlay
function MobileMenu({ navItems, onClose, onExecute }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
                <h2 className="text-2xl font-black text-white tracking-tighter">NAVIGATION</h2>
                <button 
                    onClick={onClose}
                    className="p-3 rounded-xl border-2 border-[#ff0040] text-[#ff0040]"
                >
                    <X size={24} />
                </button>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
                {navItems.map((item, index) => (
                    <motion.button
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onExecute(item)}
                        className={cn(
                            "w-full flex items-center gap-4 p-4 rounded-xl text-left",
                            "border-2 border-white/10 hover:border-[#39ff14]",
                            "transition-all active:bg-white/5"
                        )}
                    >
                        <div className="p-3 rounded-lg bg-white/5">
                            <item.icon size={24} className="text-[#39ff14]" />
                        </div>
                        <span className="text-lg font-bold text-white">{item.name}</span>
                        {item.name === 'Journey' && (
                            <span className="ml-auto px-3 py-1 rounded-full bg-[#ff0040] text-black text-sm font-bold">
                                33
                            </span>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                <p className="text-center text-xs text-white/30 font-mono">
                    BRUTAL MODE // SYSTEM READY
                </p>
            </div>
        </motion.div>
    );
}
