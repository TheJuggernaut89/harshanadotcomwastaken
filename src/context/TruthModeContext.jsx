import React, { createContext, useContext, useState } from 'react';

const TruthModeContext = createContext();

export const useTruthMode = () => {
    const context = useContext(TruthModeContext);
    if (!context) {
        throw new Error('useTruthMode must be used within TruthModeProvider');
    }
    return context;
};

export const TruthModeProvider = ({ children }) => {
    const [isTruthMode, setIsTruthMode] = useState(false);

    const activateTruthMode = () => {
        setIsTruthMode(true);
        console.log('🔓 Truth Mode ACTIVATED');
    };

    const deactivateTruthMode = () => {
        setIsTruthMode(false);
        console.log('🔒 Professional Mode ACTIVATED');
    };

    const toggleTruthMode = () => {
        setIsTruthMode(prev => !prev);
        console.log(isTruthMode ? '🔒 Switched to Professional Mode' : '🔓 Switched to Truth Mode');
    };

    return (
        <TruthModeContext.Provider value={{ 
            isTruthMode, 
            activateTruthMode, 
            deactivateTruthMode,
            toggleTruthMode 
        }}>
            {children}
        </TruthModeContext.Provider>
    );
};
