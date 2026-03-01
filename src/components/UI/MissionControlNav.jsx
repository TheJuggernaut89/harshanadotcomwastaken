import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    X, Home, User, Map, Lightbulb, Globe, Sparkles, Terminal, 
    Grid3X3, ChevronUp, Play, Image as ImageIcon 
} from "lucide-react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";

/**
 * Mission Control Grid Navigation
 * Creative Mode - Desktop: Full Grid | Mobile: Bottom Sheet
 * 
 * Features:
 * - Grid layout with live previews
 * - Category-based organization
 * - Mobile: Bottom sheet with large touch targets
 * - Thumbnail previews for each section
 */
export default function MissionControlNav({ 
    navItems, 
    isOpen, 
    toggleMenu,
    mode = "creative" // creative, pro, brutal
}) {
    const [activeCategory, setActiveCategory] = useState(null);
    const [isMobile, setIsMobile] = useState(false);
    const sheetRef = useRef(null);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Lock scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = ''; };
        }
    }, [isOpen]);

    // Handle navigation click
    const handleNavClick = (item) => {
        if (item.action) {
            item.action();
            if (item.name !== 'Theme') toggleMenu();
        } else if (item.href) {
            const el = document.querySelector(item.href);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
                toggleMenu();
            }
        }
        setActiveCategory(null);
    };

    // Category colors for creative mode
    const categoryStyles = {
        main: "from-pink-500 via-purple-500 to-indigo-500",
        content: "from-orange-400 via-pink-500 to-rose-500",
        tools: "from-cyan-400 via-blue-500 to-indigo-500",
        system: "from-emerald-400 via-teal-500 to-cyan-500"
    };

    if (!isOpen) return null;

    // Mobile Bottom Sheet
    if (isMobile) {
        return createPortal(
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999]"
            >
                {/* Backdrop */}
                <motion.div 
                    className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    onClick={toggleMenu}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />

                {/* Bottom Sheet */}
                <motion.div
                    ref={sheetRef}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-dark via-navy to-navy-dark rounded-t-3xl overflow-hidden"
                    style={{ maxHeight: "85vh" }}
                >
                    {/* Drag Handle */}
                    <div className="flex justify-center pt-4 pb-2" onClick={toggleMenu}>
                        <div className="w-12 h-1.5 bg-white/20 rounded-full" />
                    </div>

                    {/* Header */}
                    <div className="px-6 pb-4 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-white">Mission Control</h2>
                        <button onClick={toggleMenu} className="p-2 rounded-full bg-white/10">
                            <X size={20} className="text-white" />
                        </button>
                    </div>

                    {/* Category Grid */}
                    <div className="px-6 pb-8 overflow-y-auto" style={{ maxHeight: "60vh" }}>
                        <div className="grid grid-cols-2 gap-3">
                            {navItems.map((item, index) => (
                                <motion.button
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handleNavClick(item)}
                                    className={cn(
                                        "relative p-4 rounded-2xl text-left transition-all",
                                        "bg-gradient-to-br border border-white/10",
                                        "active:scale-95 touch-manipulation"
                                    )}
                                    style={{
                                        background: `linear-gradient(135deg, ${getCategoryColor(index)}20, ${getCategoryColor(index)}05)`,
                                        borderColor: `${getCategoryColor(index)}30`
                                    }}
                                >
                                    {/* Icon */}
                                    <div 
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                                        style={{ background: `${getCategoryColor(index)}20` }}
                                    >
                                        <item.icon 
                                            size={24} 
                                            style={{ color: getCategoryColor(index) }} 
                                        />
                                    </div>

                                    {/* Label */}
                                    <span className="text-sm font-bold text-white block">
                                        {item.name}
                                    </span>

                                    {/* Preview indicator */}
                                    {item.hasMedia && (
                                        <div className="absolute top-3 right-3 flex gap-1">
                                            <span className="w-2 h-2 rounded-full bg-green-400" />
                                        </div>
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-6 pt-6 border-t border-white/10">
                            <p className="text-xs uppercase tracking-wider text-white/50 mb-3">Quick Access</p>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => handleNavClick({ href: "#experience" })}
                                    className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2"
                                >
                                    <Play size={16} className="text-pink-400" />
                                    <span className="text-sm text-white/80">Videos</span>
                                </button>
                                <button 
                                    onClick={() => handleNavClick({ href: "#experience" })}
                                    className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2"
                                >
                                    <ImageIcon size={16} className="text-cyan-400" />
                                    <span className="text-sm text-white/80">Gallery</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>,
            document.body
        );
    }

    // Desktop Grid Layout
    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-8"
        >
            {/* Animated Background */}
            <motion.div 
                className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                onClick={toggleMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            />

            {/* Grid Container */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full max-w-5xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <Grid3X3 className="text-pink-400" size={28} />
                        <h2 className="text-3xl font-bold text-white">Mission Control</h2>
                    </div>
                    <button 
                        onClick={toggleMenu}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                        <X size={24} className="text-white" />
                    </button>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-4 gap-4">
                    {navItems.map((item, index) => {
                        const isLarge = index === 0 || index === 3; // Featured items
                        const color = getCategoryColor(index);
                        
                        return (
                            <motion.button
                                key={item.name}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => handleNavClick(item)}
                                onMouseEnter={() => setActiveCategory(index)}
                                onMouseLeave={() => setActiveCategory(null)}
                                className={cn(
                                    "relative group rounded-3xl p-6 text-left transition-all duration-300 overflow-hidden",
                                    "border border-white/10 hover:border-white/30",
                                    isLarge ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
                                )}
                                style={{
                                    background: `linear-gradient(135deg, ${color}15, ${color}05)`
                                }}
                            >
                                {/* Animated Gradient Background */}
                                <motion.div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `radial-gradient(circle at 50% 100%, ${color}30 0%, transparent 70%)`
                                    }}
                                />

                                {/* Content */}
                                <div className="relative z-10 h-full flex flex-col">
                                    {/* Icon */}
                                    <div 
                                        className={cn(
                                            "rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                                            isLarge ? "w-16 h-16" : "w-12 h-12"
                                        )}
                                        style={{ background: `${color}20` }}
                                    >
                                        <item.icon 
                                            size={isLarge ? 32 : 24} 
                                            style={{ color }} 
                                        />
                                    </div>

                                    {/* Label */}
                                    <h3 className={cn(
                                        "font-bold text-white mb-1",
                                        isLarge ? "text-2xl" : "text-lg"
                                    )}>
                                        {item.name}
                                    </h3>

                                    {/* Description */}
                                    {isLarge && (
                                        <p className="text-white/60 text-sm mt-2">
                                            {getDescription(item.name)}
                                        </p>
                                    )}

                                    {/* Preview Badge */}
                                    {item.hasMedia && (
                                        <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-white/10">
                                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                            <span className="text-xs text-white/80">Live</span>
                                        </div>
                                    )}
                                </div>

                                {/* Hover Border Effect */}
                                <div 
                                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    style={{
                                        boxShadow: `inset 0 0 0 2px ${color}50`
                                    }}
                                />
                            </motion.button>
                        );
                    })}
                </div>

                {/* Keyboard Shortcuts Hint */}
                <div className="mt-8 flex items-center justify-center gap-6 text-white/40 text-sm">
                    <span className="flex items-center gap-2">
                        <kbd className="px-2 py-1 rounded bg-white/10">ESC</kbd>
                        Close
                    </span>
                    <span className="flex items-center gap-2">
                        <kbd className="px-2 py-1 rounded bg-white/10">↑↓←→</kbd>
                        Navigate
                    </span>
                    <span className="flex items-center gap-2">
                        <kbd className="px-2 py-1 rounded bg-white/10">Enter</kbd>
                        Select
                    </span>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
}

// Helper functions
function getCategoryColor(index) {
    const colors = [
        "#ec4899", // pink
        "#8b5cf6", // purple
        "#06b6d4", // cyan
        "#10b981", // emerald
        "#f59e0b", // amber
        "#ef4444", // red
        "#3b82f6", // blue
        "#84cc16", // lime
    ];
    return colors[index % colors.length];
}

function getDescription(name) {
    const descriptions = {
        "Home": "Return to the hero section with the main intro",
        "About": "Learn about my background as a Marketing Technologist",
        "Journey": "Explore my career path with videos and images",
        "Proposals": "View my visionary project proposals and concepts",
        "Platform": "Interactive demos of the Malaysian Marketing Platform",
        "AI Demo": "Try the AI tools I've built live in your browser",
        "Terminal": "Access the system terminal for advanced navigation",
        "Theme": "Toggle between light and dark modes"
    };
    return descriptions[name] || "";
}
