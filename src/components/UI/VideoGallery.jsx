import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Play, Folder } from 'lucide-react';
import VideoLightbox from './VideoLightbox';

const VideoGallery = ({ videos, jobTitle, companyName, companyColor = '#E63946' }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const previewVideos = videos.slice(0, 3);

    const handleVideoClick = (index) => {
        setSelectedIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            <div
                className="relative flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer bg-white dark:bg-navy-dark border-2 border-navy/10 dark:border-white/10 hover:border-primary/30 dark:hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 group"
                style={{ minWidth: '280px', minHeight: '320px', perspective: '1000px' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => handleVideoClick(0)}
            >
                {/* Glow effect */}
                <div
                    className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at 50% 70%, ${companyColor}20 0%, transparent 70%)`,
                        opacity: isHovered ? 1 : 0,
                    }}
                />

                {/* Clean Folder Icon */}
                <div className="relative flex items-center justify-center mb-4" style={{ height: '180px', width: '220px' }}>
                    {/* Folder Icon */}
                    <motion.div
                        className="absolute"
                        animate={{
                            scale: isHovered ? 1.1 : 1,
                            y: isHovered ? -10 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        style={{ zIndex: 10 }}
                    >
                        <Folder
                            size={120}
                            style={{ color: companyColor }}
                            strokeWidth={1.5}
                        />
                    </motion.div>

                    {/* Preview video thumbnails */}
                    <div
                        className="absolute"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 20,
                        }}
                    >
                        {previewVideos.map((video, index) => {
                            const rotations = [-12, 0, 12];
                            const translations = [-60, 0, 60];

                            return (
                                <div
                                    key={video.id}
                                    className="absolute w-24 h-32 rounded-lg overflow-hidden shadow-xl bg-black border-2 border-white dark:border-navy-dark hover:ring-2 hover:ring-primary/50 transition-all"
                                    style={{
                                        transform: isHovered
                                            ? `translateY(-100px) translateX(${translations[index]}px) rotate(${rotations[index]}deg) scale(1)`
                                            : 'translateY(0px) translateX(0px) rotate(0deg) scale(0.5)',
                                        opacity: isHovered ? 1 : 0,
                                        transition: `all 600ms cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 80}ms`,
                                        zIndex: 10 - index,
                                        left: '-48px',
                                        top: '-64px',
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleVideoClick(index);
                                    }}
                                >
                                    {/* Video thumbnail with play icon */}
                                    <div className="relative w-full h-full bg-gradient-to-br from-navy/50 to-primary/30">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                                <Play size={16} className="text-white ml-0.5" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                    <p className="absolute bottom-2 left-2 right-2 text-[10px] font-semibold text-white truncate">
                                        {video.caption}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Title */}
                <h3
                    className="text-lg font-bold text-navy dark:text-white mt-4 transition-all duration-300 text-center"
                    style={{
                        opacity: isHovered ? 0 : 1,
                        transform: isHovered ? 'translateY(4px)' : 'translateY(0)',
                    }}
                >
                    {companyName}
                </h3>

                {/* Subtitle */}
                <p
                    className="text-sm text-navy/60 dark:text-gray-400 text-center transition-opacity duration-300"
                    style={{
                        opacity: isHovered ? 0 : 1,
                    }}
                >
                    {videos.length} video stories
                </p>

                {/* Hover hint */}
                <div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 transition-all duration-300"
                    style={{
                        opacity: isHovered ? 0 : 0.6,
                        transform: isHovered ? 'translateY(10px)' : 'translateY(0)',
                    }}
                >
                    <Video size={14} />
                    <span>Click to watch</span>
                </div>

                {/* Active hint */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 10,
                    }}
                    className="absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold shadow-lg"
                >
                    <Play size={14} />
                    <span>Watch Videos</span>
                </motion.div>
            </div>

            {/* Video Lightbox */}
            <VideoLightbox
                videos={videos}
                initialIndex={selectedIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            />
        </>
    );
};

export default VideoGallery;
