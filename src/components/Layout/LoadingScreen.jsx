import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
    const [percentage, setPercentage] = useState(0);
    const [showCursor, setShowCursor] = useState(true);
    const [glitchActive, setGlitchActive] = useState(false);

    useEffect(() => {
        // Cursor blink animation
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);

        // Percentage counter animation (0 to 100 over 4 seconds)
        const duration = 4000; // 4 seconds
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Cubic-bezier easing
            const eased = cubicBezier(0.4, 0.0, 0.2, 1)(progress);
            const newPercentage = Math.floor(eased * 100);

            setPercentage(newPercentage);

            // Screen flicker at 25%, 50%, 75%
            if ([25, 50, 75].includes(newPercentage) && !glitchActive) {
                triggerFlicker();
            }

            // Random glitch effects (2-3 times)
            if (Math.random() < 0.005 && !glitchActive) {
                triggerGlitch();
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Completed - fade out and call onComplete
                setTimeout(() => {
                    onComplete?.();
                }, 500);
            }
        };

        requestAnimationFrame(animate);

        return () => clearInterval(cursorInterval);
    }, []);

    const cubicBezier = (x1, y1, x2, y2) => {
        return (t) => {
            const cx = 3 * x1;
            const bx = 3 * (x2 - x1) - cx;
            const ax = 1 - cx - bx;
            const cy = 3 * y1;
            const by = 3 * (y2 - y1) - cy;
            const ay = 1 - cy - by;

            const sampleCurveX = (t) => ((ax * t + bx) * t + cx) * t;
            const sampleCurveY = (t) => ((ay * t + by) * t + cy) * t;

            return sampleCurveY(t);
        };
    };

    const triggerFlicker = () => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 100);
    };

    const triggerGlitch = () => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
    };

    return (
        <AnimatePresence>
            {percentage < 100 && (
                <motion.div
                    className="fixed inset-0 z-[10001] flex flex-col items-center justify-center bg-[var(--bg-primary)]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Flicker overlay */}
                    {glitchActive && (
                        <div className="absolute inset-0 bg-white opacity-20 pointer-events-none" />
                    )}

                    {/* Percentage counter */}
                    <div className="relative">
                        <motion.div
                            className={`text-[clamp(80px,15vw,200px)] font-mono font-bold text-[var(--text-primary)] ${glitchActive ? 'glitch-text' : ''
                                }`}
                            style={{
                                textShadow: glitchActive
                                    ? '2px 0 #ff0000, -2px 0 #00ff00'
                                    : 'none'
                            }}
                        >
                            {percentage}%
                            {showCursor && <span className="ml-2">█</span>}
                        </motion.div>
                    </div>

                    {/* Loading bar */}
                    <div className="w-[80%] max-w-[600px] h-2 bg-[var(--bg-secondary)] rounded-full mt-8 overflow-hidden">
                        <motion.div
                            className="h-full bg-[var(--accent-primary)] rounded-full"
                            style={{
                                width: `${percentage}%`,
                                boxShadow: `0 0 10px var(--glow-color)`
                            }}
                            transition={{
                                duration: 0.1,
                                ease: [0.4, 0.0, 0.2, 1]
                            }}
                        />
                    </div>

                    {/* Loading text */}
                    <motion.p
                        className="text-[var(--text-secondary)] text-sm font-mono mt-4 tracking-widest"
                        animate={{
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    >
                        LOADING RESUME...
                    </motion.p>

                    {/* VHS scan lines */}
                    <div className="absolute inset-0 pointer-events-none opacity-10">
                        <div className="w-full h-full vhs-scanlines" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Add CSS for VHS scanlines
const style = document.createElement('style');
style.textContent = `
  .vhs-scanlines {
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.15) 1px,
      transparent 1px,
      transparent 2px
    );
  }
  
  .glitch-text {
    animation: glitch 0.3s infinite;
  }
  
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }
`;
document.head.appendChild(style);

export default LoadingScreen;
