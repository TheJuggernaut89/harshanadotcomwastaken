import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HoverReveal = ({ normal, reveal, className = '' }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <span
            className={`relative inline-block cursor-pointer ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.span
                className={`transition-all duration-300 ${isHovered ? 'line-through opacity-40 text-navy/40 dark:text-white/40' : ''
                    }`}
            >
                {normal}
            </motion.span>

            <AnimatePresence>
                {isHovered && (
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="ml-2 font-bold text-yellow-500 dark:text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded"
                    >
                        {reveal}
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    );
};

export default HoverReveal;
