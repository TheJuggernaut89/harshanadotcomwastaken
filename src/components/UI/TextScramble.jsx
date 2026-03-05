import React, { useState, useEffect } from 'react';

/**
 * TextScramble Component
 * Creates a hacker-style text scrambling effect that reveals the final text
 * Perfect for technical/AI-themed sections
 */
const TextScramble = ({ text, delay = 0, duration = 800, className = "" }) => {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    
    const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    
    useEffect(() => {
        let animationFrame;
        let timeout;
        
        const startScramble = () => {
            setIsScrambling(true);
            let frame = 0;
            const totalFrames = duration / 16; // ~60fps
            const revealPerFrame = Math.ceil(text.length / totalFrames);
            
            const animate = () => {
                let output = '';
                
                for (let i = 0; i < text.length; i++) {
                    if (frame * revealPerFrame > i) {
                        // Character is revealed
                        output += text[i];
                    } else {
                        // Character is still scrambling
                        output += chars[Math.floor(Math.random() * chars.length)];
                    }
                }
                
                setDisplayText(output);
                
                if (frame < totalFrames) {
                    frame++;
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    setDisplayText(text);
                    setIsScrambling(false);
                }
            };
            
            // Mark that animation has started
            setHasStarted(true);
            animate();
        };
        
        // Start animation after delay
        timeout = setTimeout(startScramble, delay);
        
        return () => {
            clearTimeout(timeout);
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [text, delay, duration]);
    
    return (
        <span 
            className={`${className} ${isScrambling ? 'text-primary' : ''} transition-colors duration-300`}
            style={{ 
                opacity: hasStarted || !isScrambling ? 1 : 0,
                transition: 'opacity 0.1s ease'
            }}
        >
            {displayText}
        </span>
    );
};

export default TextScramble;
