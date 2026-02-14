import React from 'react';
import { usePrompt } from '../../context/PromptContext';
import { motion } from 'framer-motion';

/**
 * TruthReveal Component
 * Displays 'normal' text by default.
 * When Truth Mode is unlocked (via Terminal), reveals 'truth' text on hover/always.
 * 
 * @param {string} normal - The professional/standard text
 * @param {string} truth - The "raw" or hidden text to reveal
 * @param {string} className - Optional styling
 */
const TruthReveal = ({ normal, truth, className = "" }) => {
    const { isTruthMode } = usePrompt();

    if (!isTruthMode) {
        return <span className={className}>{normal}</span>;
    }

    return (
        <span className={`relative inline-block cursor-help group ${className}`}>
            {/* Normal Text (Fades out on hover) */}
            <span className="group-hover:opacity-0 transition-opacity duration-300">
                {normal}
            </span>

            {/* Truth Text (Glitchy Reveal) */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-500 font-mono font-bold tracking-tight">
                {truth}
            </span>

            {/* Subtle Indicator dot */}
            <span className="absolute -top-1 -right-1 w-1 h-1 bg-red-500 rounded-full animate-pulse opacity-50" />
        </span>
    );
};

export default TruthReveal;
