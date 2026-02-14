import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const HoverHint = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
                >
                    <div className="bg-gray-900 dark:bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="animate-bounce"
                        >
                            <path
                                d="M7 13L12 18L17 13"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M7 6L12 11L17 6"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="text-sm font-medium">Hover over the text to interact</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default HoverHint;
