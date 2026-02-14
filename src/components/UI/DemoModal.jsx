import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Import demo components
import DemoKopitiamOracle from '../MalaysianPlatform/DemoKopitiamOracle';
import DemoRojakTranslator from '../MalaysianPlatform/DemoRojakTranslator';
import DemoFestivalROI from '../MalaysianPlatform/DemoFestivalROI';
import CultureCodeDemo from '../MalaysianPlatform/CultureCodeDemo';
import MamakCopyDemo from '../MalaysianPlatform/MamakCopyDemo';
import ComplianceCheckerDemo from '../MalaysianPlatform/ComplianceCheckerDemo';

const DemoModal = ({ tool, onClose }) => {
    if (!tool) return null;

    // Prevent body scroll and maintain scroll position
    useEffect(() => {
        const scrollY = window.scrollY;
        const body = document.body;

        // Lock body scroll
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.width = '100%';
        body.style.overflow = 'hidden';

        // Cleanup on unmount
        return () => {
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
            body.style.overflow = '';
            window.scrollTo(0, scrollY);
        };
    }, []);

    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const demoComponents = {
        'kopitiam-oracle': DemoKopitiamOracle,
        'rojak-translator': DemoRojakTranslator,
        'festival-roi-maximizer': DemoFestivalROI,
        'culture-code': CultureCodeDemo,
        'mamak-copy-generator': MamakCopyDemo,
        'jakim-guardian': ComplianceCheckerDemo,
        'mcmc-safepost': ComplianceCheckerDemo,
        'sensitivity-checker': ComplianceCheckerDemo,
    };

    const DemoComponent = demoComponents[tool.id];

    return (
        <AnimatePresence>
            {/* Fixed positioning - stays in viewport */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop with blur */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-md"
                />

                {/* Modal content - centered in viewport */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative bg-white dark:bg-navy-dark rounded-2xl shadow-2xl w-full max-h-[85vh] overflow-hidden"
                    style={{
                        width: 'min(90vw, 1200px)',
                        maxHeight: 'min(85vh, 800px)',
                        border: '2px solid var(--border-color)',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-110"
                        aria-label="Close modal"
                    >
                        <X size={24} />
                    </button>

                    {/* Scrollable content */}
                    <div className="overflow-y-auto max-h-full p-6 md:p-8">
                        {DemoComponent ? (
                            <DemoComponent />
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-xl text-gray-500 dark:text-gray-400">Demo coming soon!</p>
                                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                                    Full version available to contracted clients
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DemoModal;
