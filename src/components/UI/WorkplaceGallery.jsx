import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Image as ImageIcon } from 'lucide-react';
import ImageLightbox from './ImageLightbox';

const WorkplaceGallery = ({ images, jobTitle, companyName, companyColor = '#E63946' }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const previewImages = images.slice(0, 3);

    const handleImageClick = (index) => {
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
                onClick={() => handleImageClick(0)}
            >
                {/* Glow effect */}
                <div
                    className="absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at 50% 70%, ${companyColor}20 0%, transparent 70%)`,
                        opacity: isHovered ? 1 : 0,
                    }}
                />

                {/* 3D Folder */}
                <div className="relative flex items-center justify-center mb-4" style={{ height: '180px', width: '220px' }}>
                    {/* Folder back */}
                    <div
                        className="absolute w-36 h-28 rounded-lg shadow-md transition-all duration-500"
                        style={{
                            backgroundColor: companyColor,
                            opacity: 0.6,
                            transformOrigin: 'bottom center',
                            transform: isHovered ? 'rotateX(-15deg)' : 'rotateX(0deg)',
                            zIndex: 10,
                        }}
                    />

                    {/* Folder tab */}
                    <div
                        className="absolute w-14 h-5 rounded-t-md transition-all duration-500"
                        style={{
                            backgroundColor: companyColor,
                            opacity: 0.5,
                            top: 'calc(50% - 56px - 14px)',
                            left: 'calc(50% - 72px + 18px)',
                            transformOrigin: 'bottom center',
                            transform: isHovered ? 'rotateX(-25deg) translateY(-2px)' : 'rotateX(0deg)',
                            zIndex: 10,
                        }}
                    />

                    {/* Preview images */}
                    <div
                        className="absolute"
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 20,
                        }}
                    >
                        {previewImages.map((image, index) => {
                            const rotations = [-12, 0, 12];
                            const translations = [-60, 0, 60];

                            return (
                                <div
                                    key={image.id}
                                    className="absolute w-24 h-32 rounded-lg overflow-hidden shadow-xl bg-white dark:bg-navy border-2 border-white dark:border-navy-dark hover:ring-2 hover:ring-primary/50 transition-all"
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
                                        handleImageClick(index);
                                    }}
                                >
                                    <img
                                        src={image.url}
                                        alt={image.caption}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <p className="absolute bottom-2 left-2 right-2 text-[10px] font-semibold text-white truncate">
                                        {image.caption}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Folder front */}
                    <div
                        className="absolute w-36 h-28 rounded-lg shadow-lg transition-all duration-500"
                        style={{
                            backgroundColor: companyColor,
                            opacity: 0.8,
                            top: 'calc(50% - 56px + 4px)',
                            transformOrigin: 'bottom center',
                            transform: isHovered ? 'rotateX(25deg) translateY(8px)' : 'rotateX(0deg)',
                            zIndex: 30,
                        }}
                    />

                    {/* Shine effect */}
                    <div
                        className="absolute w-36 h-28 rounded-lg overflow-hidden pointer-events-none transition-all duration-500"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%)',
                            top: 'calc(50% - 56px + 4px)',
                            transformOrigin: 'bottom center',
                            transform: isHovered ? 'rotateX(25deg) translateY(8px)' : 'rotateX(0deg)',
                            zIndex: 31,
                        }}
                    />
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
                    {images.length} workplace photos
                </p>

                {/* Hover hint */}
                <div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 transition-all duration-300"
                    style={{
                        opacity: isHovered ? 0 : 0.6,
                        transform: isHovered ? 'translateY(10px)' : 'translateY(0)',
                    }}
                >
                    <Camera size={14} />
                    <span>Click to explore</span>
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
                    <ImageIcon size={14} />
                    <span>View Gallery</span>
                </motion.div>
            </div>

            {/* Lightbox */}
            <ImageLightbox
                images={images}
                initialIndex={selectedIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            />
        </>
    );
};

export default WorkplaceGallery;
