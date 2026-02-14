import React, { createContext, useContext, useEffect, useState } from 'react';

const ModeContext = createContext();

// Mode cycle: light ↔ dark (2-mode system)
const MODE_CYCLE = ['light', 'dark'];

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

        // Default to dark mode
        return 'dark';
    });

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Apply mode to document
    useEffect(() => {
        const root = document.documentElement;

        // Remove all mode classes
        root.removeAttribute('data-mode');
        root.classList.remove('dark');

        // Apply current mode
        root.setAttribute('data-mode', currentMode);

        if (currentMode === 'dark') {
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
            const messages = {
                light: '☀️ Light Mode - Warm Authority',
                dark: '🌙 Dark Mode - Industrial Luxury'
            };

            displayToast(messages[nextMode]);

            return nextMode;
        });
    };

    // Set specific mode
    const setMode = (mode) => {
        if (MODE_CYCLE.includes(mode)) {
            setCurrentMode(mode);
        }
    };

    // Display toast notification
    const displayToast = (message) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Secret activation: Type "mamak" for dark mode
    useEffect(() => {
        let typedKeys = '';
        const handleKeyPress = (e) => {
            typedKeys += e.key.toLowerCase();
            if (typedKeys.includes('mamak')) {
                if (currentMode !== 'dark') {
                    setCurrentMode('dark');
                    displayToast('🎊 Secret activated! Welcome to the Dark Side! 🔥');
                }
                typedKeys = '';
            }
            if (typedKeys.length > 10) {
                typedKeys = '';
            }
        };

        window.addEventListener('keypress', handleKeyPress);
        return () => window.removeEventListener('keypress', handleKeyPress);
    }, [currentMode]);

    const value = {
        mode: currentMode,
        isLight: currentMode === 'light',
        isDark: currentMode === 'dark',
        cycleMode,
        setMode,
        // Legacy support
        isDarkMode: currentMode === 'dark',
        toggleTheme: cycleMode
    };

    return (
        <ModeContext.Provider value={value}>
            {children}

            {/* Toast notification */}
            {showToast && (
                <div className="fixed bottom-8 right-8 z-[10000] animate-slide-up">
                    <div className="mode-toast px-6 py-4 rounded-lg shadow-2xl max-w-md backdrop-blur-md">
                        <p className="text-sm font-medium">{toastMessage}</p>
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
