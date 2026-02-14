import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';

const VideoLightbox = ({ videos, initialIndex = 0, isOpen, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isClosing, setIsClosing] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const videoRef = useRef(null);

    const currentVideo = videos[currentIndex];
    const hasNext = currentIndex < videos.length - 1;
    const hasPrev = currentIndex > 0;

    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
            setIsClosing(false);
            setIsPlaying(false);
        }
    }, [isOpen, initialIndex]);

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying, currentIndex]);

    const navigateNext = useCallback(() => {
        if (hasNext) {
            setCurrentIndex(prev => prev + 1);
            setIsPlaying(false);
        }
    }, [hasNext]);

    const navigatePrev = useCallback(() => {
        if (hasPrev) {
            setCurrentIndex(prev => prev - 1);
            setIsPlaying(false);
        }
    }, [hasPrev]);

    const handleClose = useCallback(() => {
        setIsClosing(true);
        setIsPlaying(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
        }
    };

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') handleClose();
            if (e.key === 'ArrowRight') navigateNext();
            if (e.key === 'ArrowLeft') navigatePrev();
            if (e.key === ' ') {
                e.preventDefault();
                togglePlay();
            }
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
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

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

            {/* Video container */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: isClosing ? 0.9 : 1, opacity: isClosing ? 0 : 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl">
                    {/* Video */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative aspect-video bg-black"
                        >
                            <video
                                ref={videoRef}
                                src={currentVideo.url}
                                className="w-full h-full object-contain"
                                muted={isMuted}
                                loop
                                playsInline
                            />

                            {/* Video controls overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button
                                    onClick={togglePlay}
                                    className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 transition-all duration-300 hover:scale-110"
                                >
                                    {isPlaying ? (
                                        <Pause size={28} className="text-white" />
                                    ) : (
                                        <Play size={28} className="text-white ml-1" />
                                    )}
                                </button>
                            </div>

                            {/* Mute button */}
                            <button
                                onClick={toggleMute}
                                className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300"
                            >
                                {isMuted ? (
                                    <VolumeX size={18} className="text-white" />
                                ) : (
                                    <Volume2 size={18} className="text-white" />
                                )}
                            </button>
                        </motion.div>
                    </AnimatePresence>

                    {/* Video info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="px-6 py-5 bg-navy-dark border-t border-white/10"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-white truncate">
                                    {currentVideo.caption || `Video ${currentIndex + 1}`}
                                </h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <p className="text-sm text-gray-400">
                                        {currentIndex + 1} / {videos.length}
                                    </p>
                                    <div className="hidden md:flex items-center gap-2 text-xs text-gray-500">
                                        <kbd className="px-2 py-1 bg-white/5 rounded border border-white/10">←</kbd>
                                        <kbd className="px-2 py-1 bg-white/5 rounded border border-white/10">→</kbd>
                                        <span>to navigate</span>
                                        <kbd className="px-2 py-1 bg-white/5 rounded border border-white/10">Space</kbd>
                                        <span>to play/pause</span>
                                    </div>
                                </div>
                            </div>

                            {/* Dot indicators */}
                            <div className="flex items-center gap-1.5">
                                {videos.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentIndex(idx);
                                            setIsPlaying(false);
                                        }}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex
                                                ? 'bg-primary scale-110'
                                                : 'bg-white/20 hover:bg-white/40'
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

export default VideoLightbox;
