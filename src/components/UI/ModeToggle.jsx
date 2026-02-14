import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useMode } from '../../context/ThemeContext';

const ModeToggle = () => {
    const { mode, cycleMode } = useMode();
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        cycleMode();

        // Reset animation state
        setTimeout(() => setIsAnimating(false), 400);
    };

    // Mode-specific styling
    const modeStyles = {
        light: {
            bg: '#36454F',
            icon: <Sun size={24} className="text-[#F5DEB3]" />,
            glow: 'rgba(245, 222, 179, 0.3)'
        },
        dark: {
            bg: '#353839',
            icon: <Moon size={24} className="text-[#FF0700]" />,
            glow: 'rgba(255, 7, 0, 0.4)'
        },
        upside: {
            bg: '#BC340E',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#FE5419]">
                    <path d="M12 2L2 22h20L12 2z" fill="currentColor" />
                </svg>
            ),
            glow: 'rgba(254, 84, 25, 0.5)'
        }
    };

    const currentStyle = modeStyles[mode];

    return (
        <motion.button
            onClick={handleClick}
            className="fixed top-5 right-5 z-[9998] w-[60px] h-[60px] rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
            style={{
                backgroundColor: currentStyle.bg,
                boxShadow: `0 4px 20px ${currentStyle.glow}`
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{
                rotate: isAnimating ? 360 : 0
            }}
            transition={{
                rotate: { duration: 0.4, ease: 'easeInOut' },
                scale: { duration: 0.2 }
            }}
            aria-label={`Current mode: ${mode}. Click to cycle modes.`}
        >
            {/* Ripple effect on click */}
            <AnimatePresence>
                {isAnimating && (
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: currentStyle.glow }}
                        initial={{ scale: 0, opacity: 0.6 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    />
                )}
            </AnimatePresence>

            {/* Icon with fade transition */}
            <motion.div
                key={mode}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
            >
                {currentStyle.icon}
            </motion.div>
        </motion.button>
    );
};

export default ModeToggle;
