import React, { createContext, useContext, useState, useEffect } from 'react';

const PromptContext = createContext();

export const usePrompt = () => useContext(PromptContext);

export const PromptProvider = ({ children }) => {
    const [isTruthMode, setIsTruthMode] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // CRITICAL: Lock truth mode until authentication
    const secureTruthMode = (value) => {
        // Only allow truth mode if authenticated
        if (value === true && !isAuthenticated) {
            console.warn('🔒 Truth mode blocked - authentication required');
            return;
        }
        setIsTruthMode(value);
    };

    // Authentication handler (called from terminal)
    const authenticate = () => {
        setIsAuthenticated(true);
        setIsTruthMode(true);
        console.log('✅ Truth mode authenticated and activated');
    };

    // SAFETY: Force truth mode OFF on mount
    useEffect(() => {
        setIsTruthMode(false);
        setIsAuthenticated(false);
        console.log('🔒 Truth lens locked - password required');
    }, []);

    return (
        <PromptContext.Provider value={{ 
            isTruthMode, 
            setIsTruthMode: secureTruthMode,
            isAuthenticated,
            authenticate
        }}>
            {children}
        </PromptContext.Provider>
    );
};
