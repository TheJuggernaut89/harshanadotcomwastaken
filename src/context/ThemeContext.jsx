import React, { createContext, useContext, useEffect, useState } from 'react';

const ModeContext = createContext();

// Three-mode system: creative ↔ pro ↔ brutal
const MODE_CYCLE = ['creative', 'pro', 'brutal'];

// Mode display names
const MODE_NAMES = {
    creative: '🎨 Creative Mode',
    pro: '💼 Pro Mode',
    brutal: '⚡ Brutal Mode'
};

// Mode descriptions
const MODE_DESCRIPTIONS = {
    creative: 'Mission Control Grid Navigation',
    pro: 'Command Bar Navigation',
    brutal: 'Smart Dock Navigation'
};

export const ModeProvider = ({ children }) => {
    const [currentMode, setCurrentMode] = useState(() => {
        const saved = localStorage.getItem('portfolioMode');
        const timestamp = localStorage.getItem('portfolioModeTimestamp');

        // Check if saved mode is expired (30 days)
        if (saved && timestamp) {
            const age = Date.now() - parseInt(timestamp);
            const thirtyDays = 30 * 24 * 60 * 60 * 1000;
            if (age < thirtyDays && MODE_CYCLE.includes(saved)) {
                return saved;
            }
        }

        // Default to pro mode
        return 'pro';
    });

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Apply mode to document
    useEffect(() => {
        const root = document.documentElement;

        // Remove all mode classes
        root.removeAttribute('data-mode');
        root.classList.remove('dark', 'creative', 'pro', 'brutal');

        // Apply current mode
        root.setAttribute('data-mode', currentMode);
        root.classList.add(currentMode);

        // Dark mode is default for pro and brutal
        if (currentMode === 'pro' || currentMode === 'brutal') {
            root.classList.add('dark');
        }

        // Save to localStorage with timestamp
        localStorage.setItem('portfolioMode', currentMode);
        localStorage.setItem('portfolioModeTimestamp', Date.now().toString());
    }, [currentMode]);

    // Cycle to next mode
    const cycleMode = () => {
        setCurrentMode(prev => {
            const currentIndex = MODE_CYCLE.indexOf(prev);
            const nextIndex = (currentIndex + 1) % MODE_CYCLE.length;
            const nextMode = MODE_CYCLE[nextIndex];

            // Show toast for mode change
            displayToast(`${MODE_NAMES[nextMode]} - ${MODE_DESCRIPTIONS[nextMode]}`);

            return nextMode;
        });
    };

    // Set specific mode
    const setMode = (mode) => {
        if (MODE_CYCLE.includes(mode)) {
            setCurrentMode(mode);
            displayToast(`${MODE_NAMES[mode]} - ${MODE_DESCRIPTIONS[mode]}`);
        }
    };

    // Display toast notification
    const displayToast = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Secret activation codes
    useEffect(() => {
        let typedKeys = '';
        const handleKeyPress = (e) => {
            typedKeys += e.key.toLowerCase();
            
            // Secret codes
            if (typedKeys.includes('creative')) {
                setMode('creative');
                typedKeys = '';
            } else if (typedKeys.includes('pro')) {
                setMode('pro');
                typedKeys = '';
            } else if (typedKeys.includes('brutal')) {
                setMode('brutal');
                typedKeys = '';
            }
            
            // Keep last 20 chars
            if (typedKeys.length > 20) {
                typedKeys = typedKeys.slice(-20);
            }
        };

        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, []);

    const value = {
        mode: currentMode,
        isCreative: currentMode === 'creative',
        isPro: currentMode === 'pro',
        isBrutal: currentMode === 'brutal',
        isDark: currentMode === 'pro' || currentMode === 'brutal',
        cycleMode,
        setMode,
        MODE_NAMES,
        MODE_DESCRIPTIONS,
        // Legacy support
        isDarkMode: currentMode === 'pro' || currentMode === 'brutal',
        toggleTheme: cycleMode
    };

    return (
        <ModeContext.Provider value={value}>
            {children}

            {/* Toast notification */}
            {showToast && (
                <div className="fixed bottom-8 right-8 z-[10000] animate-slide-up">
                    <div className={`
                        px-6 py-4 rounded-lg shadow-2xl max-w-md backdrop-blur-md border-2
                        ${currentMode === 'creative' ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-pink-500/50' : ''}
                        ${currentMode === 'pro' ? 'bg-navy-dark/90 border-primary/50' : ''}
                        ${currentMode === 'brutal' ? 'bg-black/90 border-[#39ff14]/50' : ''}
                    `}>
                        <p className="text-sm font-medium text-white">{toastMessage}</p>
                    </div>
                </div>
            )}
        </ModeContext.Provider>
    );
};

export const useMode = () => {
    const context = useContext(ModeContext);
    if (!context) throw new Error('useMode must be used within a ModeProvider');
    return context;
};

// Legacy export for compatibility
export const ThemeProvider = ModeProvider;
export const useTheme = useMode;
