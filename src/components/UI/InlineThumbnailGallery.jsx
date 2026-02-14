import React from 'react';
import { motion } from 'framer-motion';

/**
 * Inline Thumbnail Gallery
 * Shows 3-4 thumbnails at bottom of card with "+X more" badge
 */
const InlineThumbnailGallery = ({ images = [], videos = [], onImageClick, onVideoClick, type = 'image' }) => {
    const items = type === 'image' ? images : videos;
    const maxVisible = 4;
    const visibleItems = items.slice(0, maxVisible);
    const remainingCount = items.length - maxVisible;

    if (items.length === 0) return null;

    return (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {visibleItems.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary transition-all"
                        whileHover={{ scale: 1.1, y: -4 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => type === 'image' ? onImageClick(index) : onVideoClick(index)}
                    >
                        {type === 'image' ? (
                            <img
                                src={item.url || item}
                                alt={item.caption || `Image ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-navy/50 to-primary/30 flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                </svg>
                            </div>
                        )}
                    </motion.div>
                ))}

                {remainingCount > 0 && (
                    <motion.div
                        className="flex-shrink-0 w-16 h-16 rounded-lg bg-gray-100 dark:bg-navy/30 flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-navy/50 transition-colors border-2 border-gray-300 dark:border-gray-600"
                        whileHover={{ scale: 1.1, y: -4 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => type === 'image' ? onImageClick(maxVisible) : onVideoClick(maxVisible)}
                    >
                        <span className="text-sm font-bold text-gray-600 dark:text-gray-300">
                            +{remainingCount}
                        </span>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default InlineThumbnailGallery;
