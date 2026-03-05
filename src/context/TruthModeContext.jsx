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
        // Truth Mode activated
    };

    const deactivateTruthMode = () => {
        setIsTruthMode(false);
        // Professional Mode activated
    };

    const toggleTruthMode = () => {
        setIsTruthMode(prev => !prev);
        // Mode switched
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
