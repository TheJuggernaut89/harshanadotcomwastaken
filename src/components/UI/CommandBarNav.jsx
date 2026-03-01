import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Search, X, Home, User, Map, Lightbulb, Globe, Sparkles, Terminal,
    Command, ArrowRight, Clock, TrendingUp, ChevronRight
} from "lucide-react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";

/**
 * Technologist's Command Bar Navigation
 * Pro Mode - IDE-style toolbar with command palette
 * 
 * Features:
 * - Fixed toolbar with icons + search
 * - CMD+K to open command palette
 * - AI suggestions based on context
 * - Recent commands history
 * - Always-visible terminal button
 */
export default function CommandBarNav({ 
    navItems, 
    isOpen, 
    toggleMenu,
    isDark,
    cycleMode
}) {
    const [showPalette, setShowPalette] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [recentCommands, setRecentCommands] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const inputRef = useRef(null);
    const paletteRef = useRef(null);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // CMD+K shortcut
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setShowPalette(prev => !prev);
            }
            if (e.key === 'Escape') {
                setShowPalette(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Focus input when palette opens
    useEffect(() => {
        if (showPalette && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showPalette]);

    // Filter commands based on search
    const filteredItems = navItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getCommandLabel(item.name).toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle command execution
    const executeCommand = useCallback((item) => {
        // Add to recent commands
        setRecentCommands(prev => {
            const filtered = prev.filter(cmd => cmd.name !== item.name);
            return [item, ...filtered].slice(0, 5);
        });

        // Execute
        if (item.action) {
            item.action();
        } else if (item.href) {
            const el = document.querySelector(item.href);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }

        setShowPalette(false);
        setSearchQuery("");
    }, []);

    // Keyboard navigation in palette
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % filteredItems.length);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredItems[selectedIndex]) {
                executeCommand(filteredItems[selectedIndex]);
            }
        }
    };

    // Mobile Bottom Bar
    if (isMobile) {
        return (
            <>
                {/* Fixed Bottom Navigation */}
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 bg-navy-dark/95 backdrop-blur-xl border-t border-white/10"
                >
                    <div className="flex items-center justify-around px-2 py-3">
                        {/* Main Nav Items (first 4) */}
                        {navItems.slice(0, 4).map((item) => (
                            <button
                                key={item.name}
                                onClick={() => item.action ? item.action() : executeCommand(item)}
                                className="flex flex-col items-center gap-1 p-2 rounded-xl active:bg-white/5"
                            >
                                <item.icon size={22} className="text-white/70" />
                                <span className="text-[10px] text-white/50">{item.name}</span>
                            </button>
                        ))}

                        {/* More Button */}
                        <button
                            onClick={() => setShowPalette(true)}
                            className="flex flex-col items-center gap-1 p-2 rounded-xl active:bg-white/5"
                        >
                            <div className="w-[22px] h-[22px] rounded-md bg-primary/20 flex items-center justify-center">
                                <Command size={14} className="text-primary" />
                            </div>
                            <span className="text-[10px] text-white/50">More</span>
                        </button>
                    </div>

                    {/* Safe area spacer */}
                    <div className="h-safe-area-inset-bottom" />
                </motion.div>

                {/* Mobile Command Palette Sheet */}
                <AnimatePresence>
                    {showPalette && (
                        <CommandPaletteSheet
                            navItems={navItems}
                            recentCommands={recentCommands}
                            onClose={() => setShowPalette(false)}
                            onExecute={executeCommand}
                        />
                    )}
                </AnimatePresence>
            </>
        );
    }

    // Desktop Command Bar
    return (
        <>
            {/* Fixed Top Command Bar */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4"
            >
                <div className="flex items-center gap-2 p-2 rounded-2xl bg-navy-dark/80 backdrop-blur-xl border border-white/10 shadow-2xl">
                    {/* Logo */}
                    <div className="flex items-center gap-2 px-3 py-1.5 border-r border-white/10">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">HJ</span>
                        </div>
                        <span className="text-white font-semibold text-sm hidden sm:block">Harshana</span>
                    </div>

                    {/* Navigation Icons */}
                    <div className="flex items-center gap-1">
                        {navItems.slice(0, 5).map((item) => (
                            <button
                                key={item.name}
                                onClick={() => item.action ? item.action() : executeCommand(item)}
                                className="p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all group relative"
                                title={item.name}
                            >
                                <item.icon size={20} />
                                {/* Tooltip */}
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                    {item.name}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Divider */}
                    <div className="w-px h-6 bg-white/10 mx-1" />

                    {/* Search Trigger */}
                    <button
                        onClick={() => setShowPalette(true)}
                        className="flex-1 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left group"
                    >
                        <Search size={16} className="text-white/40" />
                        <span className="text-white/40 text-sm">Search commands...</span>
                        <div className="ml-auto flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/50 text-xs">⌘</kbd>
                            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/50 text-xs">K</kbd>
                        </div>
                    </button>

                    {/* Terminal Button - Always Visible */}
                    <button
                        onClick={() => {
                            const terminalItem = navItems.find(i => i.name === 'Terminal');
                            if (terminalItem) terminalItem.action();
                        }}
                        className="relative p-2.5 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all group"
                    >
                        <Terminal size={20} />
                        {/* Cursor blink effect */}
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        <span className="absolute -bottom-8 right-0 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Open Terminal
                        </span>
                    </button>
                </div>
            </motion.div>

            {/* Command Palette Modal */}
            <AnimatePresence>
                {showPalette && (
                    <CommandPaletteModal
                        navItems={navItems}
                        recentCommands={recentCommands}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        selectedIndex={selectedIndex}
                        filteredItems={filteredItems}
                        onClose={() => setShowPalette(false)}
                        onExecute={executeCommand}
                        onKeyDown={handleKeyDown}
                        inputRef={inputRef}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

// Desktop Command Palette Modal
function CommandPaletteModal({
    navItems, recentCommands, searchQuery, setSearchQuery,
    selectedIndex, filteredItems, onClose, onExecute, onKeyDown, inputRef
}) {
    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-start justify-center pt-32"
        >
            {/* Backdrop */}
            <motion.div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            />

            {/* Palette Container */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: -20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-2xl mx-4 bg-navy-dark rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
            >
                {/* Search Input */}
                <div className="flex items-center gap-3 px-4 py-4 border-b border-white/10">
                    <Search size={20} className="text-white/40" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={onKeyDown}
                        placeholder="Type a command or search..."
                        className="flex-1 bg-transparent text-white text-lg placeholder:text-white/30 outline-none"
                    />
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <kbd className="px-2 py-1 text-xs text-white/50">ESC</kbd>
                    </button>
                </div>

                {/* Commands List */}
                <div className="max-h-[400px] overflow-y-auto py-2">
                    {/* Recent Commands */}
                    {!searchQuery && recentCommands.length > 0 && (
                        <div className="px-2 pb-2">
                            <p className="px-3 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
                                Recent
                            </p>
                            {recentCommands.map((item, index) => (
                                <CommandItem
                                    key={`recent-${item.name}`}
                                    item={item}
                                    isSelected={false}
                                    onClick={() => onExecute(item)}
                                    showShortcut={false}
                                />
                            ))}
                        </div>
                    )}

                    {/* All Commands */}
                    <div className="px-2">
                        {!searchQuery && (
                            <p className="px-3 py-2 text-xs font-semibold text-white/40 uppercase tracking-wider">
                                All Commands
                            </p>
                        )}
                        {filteredItems.map((item, index) => (
                            <CommandItem
                                key={item.name}
                                item={item}
                                isSelected={index === selectedIndex}
                                onClick={() => onExecute(item)}
                                showShortcut={true}
                                index={index}
                            />
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredItems.length === 0 && (
                        <div className="px-4 py-8 text-center">
                            <p className="text-white/40">No commands found</p>
                            <p className="text-white/20 text-sm mt-1">Try a different search</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-3 border-t border-white/10 bg-white/5">
                    <div className="flex items-center gap-4 text-xs text-white/40">
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded bg-white/10">↑↓</kbd>
                            Navigate
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded bg-white/10">↵</kbd>
                            Select
                        </span>
                    </div>
                    <span className="text-xs text-white/30">
                        Pro Mode Navigation
                    </span>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
}

// Command Item Component
function CommandItem({ item, isSelected, onClick, showShortcut, index }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all",
                isSelected ? "bg-primary/20 border border-primary/30" : "hover:bg-white/5"
            )}
        >
            <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                isSelected ? "bg-primary/20" : "bg-white/5"
            )}>
                <item.icon size={20} className={isSelected ? "text-primary" : "text-white/60"} />
            </div>
            <div className="flex-1">
                <p className={cn("font-medium", isSelected ? "text-white" : "text-white/80")}>
                    {getCommandLabel(item.name)}
                </p>
                <p className="text-xs text-white/40">{item.name}</p>
            </div>
            {showShortcut && (
                <kbd className={cn(
                    "px-2 py-1 rounded text-xs",
                    isSelected ? "bg-primary/30 text-primary" : "bg-white/5 text-white/40"
                )}>
                    ⌘{index + 1}
                </kbd>
            )}
        </button>
    );
}

// Mobile Command Palette Sheet
function CommandPaletteSheet({ navItems, recentCommands, onClose, onExecute }) {
    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999]"
        >
            <motion.div 
                className="absolute inset-0 bg-black/80"
                onClick={onClose}
            />
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="absolute bottom-0 left-0 right-0 bg-navy-dark rounded-t-3xl overflow-hidden"
                style={{ maxHeight: "80vh" }}
            >
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Command Palette</h3>
                    <button onClick={onClose} className="p-2 rounded-full bg-white/10">
                        <X size={20} className="text-white" />
                    </button>
                </div>
                <div className="overflow-y-auto p-4 space-y-2" style={{ maxHeight: "60vh" }}>
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => onExecute(item)}
                            className="w-full flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                        >
                            <item.icon size={24} className="text-primary" />
                            <span className="text-white font-medium">{item.name}</span>
                            <ChevronRight size={16} className="ml-auto text-white/40" />
                        </button>
                    ))}
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
}

// Helper function
function getCommandLabel(name) {
    const labels = {
        "Home": "Go to Home",
        "About": "View About Section",
        "Journey": "Open Career Journey",
        "Proposals": "View Project Proposals",
        "Platform": "Open Malaysian Platform",
        "AI Demo": "Launch AI Demo",
        "Terminal": "Open Terminal",
        "Light": "Switch to Light Mode",
        "Dark": "Switch to Dark Mode"
    };
    return labels[name] || name;
}
