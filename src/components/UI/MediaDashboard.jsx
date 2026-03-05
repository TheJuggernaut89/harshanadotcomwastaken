import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedFolder } from './AnimatedFolder';
import SmartMediaFrame from './SmartMediaFrame';
import { Camera, Video } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * MediaDashboard
 * A cinematic layout for professional journey media.
 * 
 * Layout:
 * [     Hero Monitor (SmartMediaFrame)     ] -> Auto-plays or previews hovered content
 * [ Image Folder ]      [ Video Folder ] -> 3D Interactive archives
 */
const MediaDashboard = ({
    workplaceGallery = [],
    videoGallery = [],
    companyColor = "var(--color-primary)",
    onOpenLightbox, // Fallback / unused for now
    onOpenVideoPlayer, // Fallback / unused for now
    isTruthMode = false
}) => {
    // State to track what the Hero Monitor should show
    // 'idle' | 'images' | 'videos' | 'active-playback'
    const [previewMode, setPreviewMode] = useState('idle');
    const [hoveredFolder, setHoveredFolder] = useState(null);

    // Ref for auto-scroll
    const monitorRef = useRef(null);

    // Unified Session State
    // { type: 'video'|'image', items: [], currentIndex: 0 }
    const [activeSession, setActiveSession] = useState(null);

    const hasImages = workplaceGallery && workplaceGallery.length > 0;
    const hasVideos = videoGallery && videoGallery.length > 0;

    // Handle hover states from folders
    const handleFolderHover = (type, isHovering) => {
        if (activeSession) return;

        if (isHovering) {
            setHoveredFolder(type);
            setPreviewMode(type);
        } else {
            setHoveredFolder(null);
            setTimeout(() => {
                setHoveredFolder(current => {
                    if (current === null && !activeSession) setPreviewMode('idle');
                    return current;
                });
            }, 200);
        }
    };

    // Start a media session (Image or Video)
    const handleMediaSelect = (type, items, index) => {
        setActiveSession({
            type,
            items,
            currentIndex: index
        });
        setPreviewMode('active-playback');

        // Mobile UX: Glides the user to the player
        setTimeout(() => {
            monitorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    };

    // Close the inline player
    const handleClose = () => {
        setActiveSession(null);
        setPreviewMode('idle');
    };

    // Navigation Handlers
    const handleNext = () => {
        if (!activeSession) return;
        setActiveSession(prev => ({
            ...prev,
            currentIndex: (prev.currentIndex + 1) % prev.items.length
        }));
    };

    const handlePrev = () => {
        if (!activeSession) return;
        setActiveSession(prev => ({
            ...prev,
            currentIndex: (prev.currentIndex - 1 + prev.items.length) % prev.items.length
        }));
    };

    // Determine content for the Hero Monitor based on state
    const getHeroContent = () => {
        // Active Session (Video OR Image)
        if (activeSession) {
            return {
                coverImage: null,
                videoGallery: activeSession.type === 'video' ? [activeSession.items[activeSession.currentIndex]] : [],
                imageGallery: activeSession.type === 'image' ? [activeSession.items[activeSession.currentIndex]] : [],
                activeItem: activeSession.items[activeSession.currentIndex],
                sessionType: activeSession.type
            };
        }

        const coverImage = workplaceGallery[0]?.url || videoGallery[0]?.url || "/placeholder.svg";

        if (previewMode === 'videos' && hasVideos) {
            return {
                coverImage,
                videoGallery: videoGallery,
                imageGallery: [],
            };
        }

        if (previewMode === 'images' && hasImages) {
            return {
                coverImage,
                videoGallery: [],
                imageGallery: workplaceGallery,
            };
        }

        return {
            coverImage,
            videoGallery: hasVideos ? videoGallery : [],
            imageGallery: workplaceGallery,
        };
    };

    const heroContent = getHeroContent();

    return (
        <div className="w-full">
            {/* Bento Grid Layout - Smaller, focused on job description */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Main Media Player - Smaller, takes 2 columns */}
                <div ref={monitorRef} className={`md:col-span-2 relative rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10 bg-black/50 transition-all duration-500 ${activeSession ? 'h-[280px] sm:h-[320px]' : 'h-[200px] sm:h-[240px]'}`}>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-20" />

                    <SmartMediaFrame
                        coverImage={heroContent.coverImage}
                        videoGallery={heroContent.videoGallery}
                        imageGallery={heroContent.imageGallery}

                        // Session Props
                        activeItem={heroContent.activeItem}
                        mediaType={heroContent.sessionType}
                        onClose={handleClose}
                        onNext={handleNext}
                        onPrev={handlePrev}

                        // Click to play - if there's a video or images available but no active session
                        onClick={() => {
                            if (!activeSession) {
                                if (hasVideos) {
                                    handleMediaSelect('video', videoGallery, 0);
                                } else if (hasImages) {
                                    handleMediaSelect('image', workplaceGallery, 0);
                                }
                            }
                        }}

                        altText="Media Preview - Click to play"
                        isTruthMode={isTruthMode}
                        className="rounded-none h-full"
                        forceHoverState={activeSession ? false : (previewMode !== 'idle' || hoveredFolder !== null)}
                    />

                    {/* Overlay Text - Hide when active session */}
                    {!activeSession && (
                        <div className="absolute bottom-3 left-3 z-30 flex items-center gap-2">
                            <div className={cn(
                                "px-2 py-1 rounded text-[10px] font-mono tracking-wider uppercase backdrop-blur-md border border-white/10 transition-colors",
                                previewMode === 'videos' ? "bg-blue-500/20 text-blue-400" :
                                    previewMode === 'images' ? "bg-amber-500/20 text-amber-400" :
                                        "bg-white/10 text-white/50"
                            )}>
                                {previewMode === 'idle' ? 'STANDBY' : previewMode === 'videos' ? 'VIDEO FEED' : 'IMG SEQUENCE'}
                            </div>
                        </div>
                    )}
                </div>

                {/* Side Panel - Archive Folders stacked vertically */}
                <div className="md:col-span-1 flex flex-row md:flex-col gap-3">
                    {/* Images Folder - Compact */}
                    <div className="flex-1 relative flex justify-center min-h-[100px]">
                        {hasImages ? (
                            <AnimatedFolder
                                title="Images"
                                projects={workplaceGallery.map(img => ({
                                    id: img.id.toString(),
                                    image: img.url,
                                    title: img.caption
                                }))}
                                onCardClick={(index) => handleMediaSelect('image', workplaceGallery, index)}
                                onHoverChange={(isHovering) => handleFolderHover('images', isHovering)}
                                folderColor={companyColor}
                                icon={<Camera size={16} className="text-white/80" />}
                                type="images"
                                compact={true}
                            />
                        ) : (
                            <EmptySlotCompact icon={Camera} label="No Images" />
                        )}
                    </div>

                    {/* Videos Folder - Compact */}
                    <div className="flex-1 relative flex justify-center min-h-[100px]">
                        {hasVideos ? (
                            <AnimatedFolder
                                title="Videos"
                                projects={videoGallery.map(vid => ({
                                    id: vid.id.toString(),
                                    image: workplaceGallery[0]?.url || "/images/video-placeholder.jpg",
                                    title: vid.caption
                                }))}
                                onCardClick={(index) => handleMediaSelect('video', videoGallery, index)}
                                onHoverChange={(isHovering) => handleFolderHover('videos', isHovering)}
                                folderColor={companyColor}
                                icon={<Video size={16} className="text-white/80" />}
                                type="videos"
                                compact={true}
                            />
                        ) : (
                            <EmptySlotCompact icon={Video} label="No Videos" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper for empty slots to maintain grid balance
const EmptySlot = ({ icon: Icon, label }) => (
    <div className="w-[280px] h-[320px] rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center text-white/20">
        <Icon size={48} className="mb-4 opacity-20" />
        <span className="text-sm font-mono uppercase tracking-widest">{label}</span>
    </div>
);

// Compact empty slot for bento grid
const EmptySlotCompact = ({ icon: Icon, label }) => (
    <div className="w-full h-full min-h-[100px] rounded-xl border border-dashed border-white/10 flex flex-col items-center justify-center text-white/20">
        <Icon size={24} className="mb-2 opacity-20" />
        <span className="text-xs font-mono uppercase tracking-widest">{label}</span>
    </div>
);

export default MediaDashboard;
