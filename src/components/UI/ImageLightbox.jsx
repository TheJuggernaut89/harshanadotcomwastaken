import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ImageLightbox = ({ images, initialIndex = 0, isOpen, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isClosing, setIsClosing] = useState(false);

    const currentImage = images[currentIndex];
    const hasNext = currentIndex < images.length - 1;
    const hasPrev = currentIndex > 0;

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
            setIsClosing(false);
        }
    }, [isOpen, initialIndex]);

    const navigateNext = useCallback(() => {
        if (hasNext) {
            setCurrentIndex(prev => prev + 1);
        }
    }, [hasNext]);

    const navigatePrev = useCallback(() => {
        if (hasPrev) {
            setCurrentIndex(prev => prev - 1);
        }
    }, [hasPrev]);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') handleClose();
            if (e.key === 'ArrowRight') navigateNext();
            if (e.key === 'ArrowLeft') navigatePrev();
        };

        window.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleClose, navigateNext, navigatePrev]);

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isClosing ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            onClick={handleClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

            {/* Close button */}
            <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onClick={(e) => {
                    e.stopPropagation();
                    handleClose();
                }}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110"
            >
                <X size={20} strokeWidth={2.5} />
            </motion.button>

            {/* Previous button */}
            {hasPrev && (
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        navigatePrev();
                    }}
                    className="absolute left-4 md:left-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110"
                >
                    <ChevronLeft size={24} strokeWidth={2.5} />
                </motion.button>
            )}

            {/* Next button */}
            {hasNext && (
                <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        navigateNext();
                    }}
                    className="absolute right-4 md:right-8 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110"
                >
                    <ChevronRight size={24} strokeWidth={2.5} />
                </motion.button>
            )}

            {/* Image container */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: isClosing ? 0.9 : 1, opacity: isClosing ? 0 : 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-navy-dark shadow-2xl">
                    {/* Image */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="relative"
                        >
                            <img
                                src={currentImage.url}
                                alt={currentImage.caption || `Image ${currentIndex + 1}`}
                                className="w-full h-auto max-h-[70vh] object-contain bg-navy/5 dark:bg-white/5"
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Image info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="px-6 py-5 bg-white dark:bg-navy-dark border-t border-navy/10 dark:border-white/10"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-navy dark:text-white truncate">
                                    {currentImage.caption || `Image ${currentIndex + 1}`}
                                </h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <p className="text-sm text-navy/60 dark:text-gray-400">
                                        {currentIndex + 1} / {images.length}
                                    </p>
                                    <div className="hidden md:flex items-center gap-2 text-xs text-navy/40 dark:text-gray-500">
                                        <kbd className="px-2 py-1 bg-navy/5 dark:bg-white/5 rounded border border-navy/10 dark:border-white/10">←</kbd>
                                        <kbd className="px-2 py-1 bg-navy/5 dark:bg-white/5 rounded border border-navy/10 dark:border-white/10">→</kbd>
                                        <span>to navigate</span>
                                    </div>
                                </div>
                            </div>

                            {/* Dot indicators */}
                            <div className="flex items-center gap-1.5">
                                {images.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentIndex(idx);
                                        }}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                                                ? 'bg-primary scale-110'
                                                : 'bg-navy/20 dark:bg-white/20 hover:bg-navy/40 dark:hover:bg-white/40'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ImageLightbox;
