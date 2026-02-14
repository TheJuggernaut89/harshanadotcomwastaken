import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = true }) => {
    return (
        <motion.div
            whileHover={hover ? {
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 }
            } : {}}
            className={`glass-card p-8 group transition-all duration-300 ${className}`}
        >
            {/* Subtle Glow Effect on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
};

export default Card;
