import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, X, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * SmartMediaFrame Component
 * "Netflix-style" hover preview AND Inline Player.
 * 
 * Behavior:
 * - Default: Shows static cover image.
 * - Hover / ForceHover: 
 *   - Preview mode: Muted, looped video or slideshow.
 * - Active Session Mode:
 *   - Video: Full playback, unmuted, controls.
 *   - Image: Static view, navigation limits.
 */
const SmartMediaFrame = ({
    coverImage,
    videoGallery = [],
    imageGallery = [],
    altText = "Project preview",

    // Active Session Props
    activeItem = null, // Replaces activeVideo
    mediaType = null,  // 'video' | 'image'
    onClose,
    onNext,
    onPrev,

    onClick,
    className,
    isTruthMode = false,
    forceHoverState = false
}) => {
    const [internalHover, setInternalHover] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Player State
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const videoRef = useRef(null);
    const intervalRef = useRef(null);

    const isHovering = internalHover || forceHoverState;
    const hasVideo = videoGallery && videoGallery.length > 0;
    const hasGallery = imageGallery && imageGallery.length > 1;
    const displayImages = hasGallery ? imageGallery : [];

    const progressBarRef = useRef(null);
    const progressThumbRef = useRef(null);

    // Reset loop for preview mode AND reset player state for new active item
    useEffect(() => {
        // Active Session Logic
        if (activeItem) {
            if (mediaType === 'video') {
                setIsMuted(false);
            }
            return;
        }

        // Preview Logic
        if (!isHovering) {
            setCurrentImageIndex(0);
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
            if (intervalRef.current) clearInterval(intervalRef.current);
        } else {
            if (hasVideo) {
                if (videoRef.current) {
                    videoRef.current.muted = true;
                    const playPromise = videoRef.current.play();
                    if (playPromise !== undefined) playPromise.catch(() => { });
                }
            } else if (hasGallery) {
                intervalRef.current = setInterval(() => {
                    setCurrentImageIndex(prev => (prev + 1) % displayImages.length);
                }, 1500);
            }
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isHovering, hasVideo, hasGallery, displayImages.length, activeItem, mediaType]);

    // Active Player Handlers
    const togglePlay = (e) => {
        e?.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) videoRef.current.pause();
            else videoRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = (e) => {
        e?.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    // Optimized: Only update React state for seconds (text), direct DOM for bar (smoothness)
    const handleTimeUpdate = () => {
        if (!videoRef.current) return;

        const now = videoRef.current.currentTime;
        const total = videoRef.current.duration || 0;
        const percent = total > 0 ? (now / total) * 100 : 0;

        // 1. Direct DOM update for smooth bar (No Re-render)
        if (progressBarRef.current) {
            progressBarRef.current.style.width = `${percent}%`;
        }

        // 2. Throttled State Update for Text (1Hz Re-render)
        if (Math.floor(now) !== Math.floor(currentTime)) {
            setCurrentTime(now);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) setDuration(videoRef.current.duration);
    };

    const handleSeek = (e) => {
        e.stopPropagation();
        if (!videoRef.current) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

        // Instant visual update
        const percent = pos * 100;
        if (progressBarRef.current) progressBarRef.current.style.width = `${percent}%`;

        videoRef.current.currentTime = pos * (duration || videoRef.current.duration || 0);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div
            className={cn(
                "relative w-full h-full overflow-hidden cursor-pointer group bg-black/10 rounded-lg",
                className
            )}
            onMouseEnter={() => setInternalHover(true)}
            onMouseLeave={() => setInternalHover(false)}
            onClick={onClick}
        >
            {/* 1. Static Cover Image (Base Layer) - Hidden if activeItem present */}
            {!activeItem && (
                <motion.div
                    className="absolute inset-0 w-full h-full z-10"
                    animate={{
                        opacity: (isHovering && hasVideo) ? 0 : 1,
                        scale: isHovering && !hasVideo ? 1.05 : 1
                    }}
                    transition={{ duration: 0.4 }}
                >
                    {coverImage ? (
                        <img
                            src={coverImage}
                            alt={altText}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-400">
                            <ImageIcon size={32} />
                        </div>
                    )}
                </motion.div>
            )}

            {/* 2. Video Player Layer (Preview OR Active) */}
            {(hasVideo || (activeItem && mediaType === 'video')) && (
                <div className="absolute inset-0 w-full h-full z-20">
                    <video
                        ref={videoRef}
                        src={activeItem && mediaType === 'video' ? activeItem.url : videoGallery[0]?.url}
                        className={cn(
                            "w-full h-full object-cover rounded-lg transition-all duration-300",
                            (activeItem && mediaType === 'video') ? "object-contain bg-black" : ""
                        )}
                        muted={activeItem ? isMuted : true}
                        loop={!activeItem}
                        playsInline
                        autoPlay={!!activeItem}
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
                        onClick={activeItem ? togglePlay : undefined}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                    />

                    {/* Active Controls Overlay */}
                    {activeItem && mediaType === 'video' && (
                        <div className="absolute inset-0 z-30 flex flex-col justify-between p-4 bg-gradient-to-b from-black/50 via-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {/* Top Bar: Close Button */}
                            <div className="flex justify-end">
                                <button
                                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                                    className="p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-sm"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Middle: Navigation */}
                            <div className="absolute top-1/2 left-4 -translate-y-1/2">
                                <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="p-3 bg-black/30 hover:bg-black/60 rounded-full text-white pointer-events-auto">
                                    <ChevronLeft size={24} />
                                </button>
                            </div>
                            <div className="absolute top-1/2 right-4 -translate-y-1/2">
                                <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="p-3 bg-black/30 hover:bg-black/60 rounded-full text-white pointer-events-auto">
                                    <ChevronRight size={24} />
                                </button>
                            </div>

                            {/* Bottom Bar: Controls */}
                            <div className="w-full space-y-2" onClick={(e) => e.stopPropagation()}>
                                {/* Progress Bar */}
                                <div
                                    className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer hover:h-2 transition-all"
                                    onClick={handleSeek}
                                >
                                    {/* Background Track */}
                                    <div className="w-full h-full bg-white/20 rounded-full overflow-hidden">
                                        {/* Active Progress */}
                                        <div
                                            ref={progressBarRef}
                                            className="h-full bg-primary rounded-full relative will-change-transform"
                                            style={{ width: `${(currentTime / duration) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-white">
                                    <div className="flex items-center gap-4">
                                        <button onClick={togglePlay} className="hover:text-primary transition-colors">
                                            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                                        </button>
                                        <div className="flex items-center gap-2 group/vol">
                                            <button onClick={toggleMute} className="hover:text-primary transition-colors">
                                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                            </button>
                                        </div>
                                        <span className="text-xs font-mono opacity-80">
                                            {formatTime(currentTime)} / {formatTime(duration)}
                                        </span>
                                    </div>
                                    <div className="text-xs font-medium opacity-70 truncate max-w-[200px]">
                                        {activeItem.caption}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* 3. Image Layer (Preview OR Active) */}
            {/* If Active Image Mode */}
            {activeItem && mediaType === 'image' && (
                <div className="absolute inset-0 w-full h-full z-20 bg-black flex items-center justify-center">
                    <img
                        src={activeItem.url}
                        alt={activeItem.caption}
                        className="max-w-full max-h-full object-contain"
                    />

                    {/* Active Image Overlays */}
                    <div className="absolute inset-0 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {/* Close */}
                        <div className="absolute top-4 right-4">
                            <button
                                onClick={(e) => { e.stopPropagation(); onClose(); }}
                                className="p-2 bg-black/50 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-sm"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Navigation */}
                        <div className="absolute top-1/2 left-4 -translate-y-1/2">
                            <button onClick={(e) => { e.stopPropagation(); onPrev(); }} className="p-3 bg-black/30 hover:bg-black/60 rounded-full text-white transition-all">
                                <ChevronLeft size={32} />
                            </button>
                        </div>
                        <div className="absolute top-1/2 right-4 -translate-y-1/2">
                            <button onClick={(e) => { e.stopPropagation(); onNext(); }} className="p-3 bg-black/30 hover:bg-black/60 rounded-full text-white transition-all">
                                <ChevronRight size={32} />
                            </button>
                        </div>

                        {/* Caption */}
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                            <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-sm text-white/90">
                                {activeItem.caption}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Slideshow Preview (Only if no active item) */}
            {!activeItem && !hasVideo && hasGallery && isHovering && (
                <div className="absolute inset-0 w-full h-full z-20 pointer-events-none rounded-lg overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentImageIndex}
                            src={displayImages[currentImageIndex].url}
                            alt={`Slide ${currentImageIndex} `}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </AnimatePresence>
                </div>
            )}

            {/* 4. Badges / Indicators (Hide if Active) */}
            {!activeItem && (
                <div className="absolute top-3 right-3 z-30 flex gap-2">
                    {hasVideo && (
                        <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-black/60 backdrop-blur-md text-white p-1.5 rounded-full"
                        >
                            <Play size={12} fill="white" />
                        </motion.div>
                    )}
                    {!hasVideo && hasGallery && (
                        <div className="bg-black/60 backdrop-blur-md text-white p-1.5 rounded-full">
                            <ImageIcon size={12} />
                        </div>
                    )}
                </div>
            )}

            {/* Border Glow */}
            <div className={cn(
                "absolute inset-0 border-2 rounded-lg pointer-events-none transition-all duration-300 z-50",
                activeItem ? "border-white/10" :
                    isTruthMode
                        ? "border-green-500/20 group-hover:border-green-500/60"
                        : "border-primary/20 group-hover:border-primary/60"
            )} />
        </div>
    );
};

export default SmartMediaFrame;
