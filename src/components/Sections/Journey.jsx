import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../../data/content';
import { upsideDownContent } from '../../data/content-upsidedown';
import { useTruthMode } from '../../context/TruthModeContext';
import { useMode } from '../../context/ThemeContext';
import MediaDashboard from '../UI/MediaDashboard';
import { 
    Briefcase, Calendar, ChevronDown, MapPin, Lightbulb, 
    Unlock, Lock, ExternalLink, Image as ImageIcon, Play,
    Video, FolderOpen
} from 'lucide-react';

const Journey = () => {
    const [expandedIndex, setExpandedIndex] = useState(0);
    const { isTruthMode } = useTruthMode();
    const { isBrutal } = useMode();

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const getTruthData = (companyName) => {
        const companyMap = {
            'Cream of Creams Sdn Bhd': 'creamOfCreams',
            'JungleWalla Desaru': 'jungleWalla',
            'PServ Pte Ltd (Singapore)': 'pserv',
            'Certis CISCO (Singapore)': 'certis',
            'Social Media Management': 'freelance'
        };
        const key = companyMap[companyName];
        return key ? upsideDownContent[key] : null;
    };

    return (
        <section id="experience" className="py-16 sm:py-20 bg-gray-50 dark:bg-navy-dark/50 overflow-x-hidden">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-4 ${
                        isTruthMode 
                            ? 'bg-green-500/10 text-green-500' 
                            : 'bg-primary/10 text-primary'
                    }`}>
                        {isTruthMode ? <Unlock size={14} /> : <Lock size={14} />}
                        {isTruthMode ? 'Truth Mode' : 'Career Journey'}
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                        {isTruthMode ? "The Real Story" : "Where I've Worked"}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
                        {isTruthMode 
                            ? "What LinkedIn doesn't tell you 😄" 
                            : "From security to marketing — an unusual path with video stories"}
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {content.experience.map((item, index) => {
                        const truthData = getTruthData(item.company);
                        const showTruthContent = isTruthMode && truthData;
                        const isExpanded = expandedIndex === index;
                        const hasGallery = item.workplaceGallery && item.workplaceGallery.length > 0;
                        const hasVideos = item.videoGallery && item.videoGallery.length > 0;
                        const hasMedia = hasGallery || hasVideos;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`rounded-2xl overflow-hidden border-2 transition-all ${
                                    isExpanded 
                                        ? isTruthMode 
                                            ? 'border-green-500/50 bg-green-50/30 dark:bg-green-900/10' 
                                            : 'border-primary/50 bg-white dark:bg-navy-dark shadow-lg'
                                        : 'border-gray-200 dark:border-white/10 bg-white dark:bg-navy-dark/50 hover:border-gray-300 dark:hover:border-white/20'
                                }`}
                            >
                                {/* Header */}
                                <button
                                    onClick={() => toggleExpand(index)}
                                    className="w-full p-4 sm:p-5 flex items-center gap-3 sm:gap-4 text-left"
                                >
                                    {/* Company Image/Icon */}
                                    {item.workplaceImage ? (
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                                            <img 
                                                src={item.workplaceImage} 
                                                alt={item.company}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                            <div className="w-full h-full items-center justify-center bg-primary/10 hidden">
                                                <Briefcase size={20} className="text-primary" />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                            isTruthMode ? 'bg-green-100 dark:bg-green-900/30' : 'bg-primary/10'
                                        }`}>
                                            <Briefcase size={20} className={isTruthMode ? 'text-green-600' : 'text-primary'} />
                                        </div>
                                    )}
                                    
                                    <div className="flex-1 min-w-0">
                                        {/* Role */}
                                        <h3 className="font-bold text-base sm:text-lg leading-tight mb-1 break-words">
                                            {showTruthContent ? truthData.jobTitle?.reveal : item.role}
                                        </h3>
                                        {/* Company & Period */}
                                        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                                            <span className={`font-medium ${isTruthMode ? 'text-green-600 dark:text-green-400' : 'text-primary'}`}>
                                                {item.company}
                                            </span>
                                            <span className="text-gray-300">•</span>
                                            <span className="text-gray-500">{item.period}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Media indicators */}
                                    <div className="hidden sm:flex items-center gap-3 mr-2">
                                        {hasVideos && (
                                            <div className="flex items-center gap-1 text-xs text-pink-500 bg-pink-500/10 px-2 py-1 rounded-full">
                                                <Video size={12} />
                                                <span>{item.videoGallery.length}</span>
                                            </div>
                                        )}
                                        {hasGallery && (
                                            <div className="flex items-center gap-1 text-xs text-cyan-500 bg-cyan-500/10 px-2 py-1 rounded-full">
                                                <ImageIcon size={12} />
                                                <span>{item.workplaceGallery.length}</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <ChevronDown 
                                        size={20} 
                                        className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`} 
                                    />
                                </button>

                                {/* Expandable Content */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-4 sm:px-5 pb-5 pt-0">
                                                {/* Media Dashboard - Videos & Images */}
                                                {hasMedia && (
                                                    <div className="mb-6">
                                                        <MediaDashboard
                                                            workplaceGallery={item.workplaceGallery || []}
                                                            videoGallery={item.videoGallery || []}
                                                            companyColor={item.companyColor || '#E63946'}
                                                            isTruthMode={isTruthMode}
                                                        />
                                                    </div>
                                                )}

                                                {/* Description */}
                                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                                                    {showTruthContent ? truthData.description?.reveal : item.description}
                                                </p>

                                                {/* Location */}
                                                {item.location && (
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                                                        <MapPin size={12} />
                                                        {item.location}
                                                    </div>
                                                )}

                                                {/* Key Achievements */}
                                                {item.achievements && item.achievements.length > 0 && (
                                                    <div className="mb-4">
                                                        <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                                                            isTruthMode ? 'text-green-600' : 'text-primary'
                                                        }`}>
                                                            Key Wins
                                                        </h4>
                                                        <ul className="space-y-1.5">
                                                            {item.achievements.slice(0, 3).map((achievement, idx) => {
                                                                const truthAchievement = showTruthContent && truthData.achievements?.[idx];
                                                                return (
                                                                    <li key={idx} className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                                        <span className={isTruthMode ? 'text-green-500' : 'text-primary'}>•</span>
                                                                        <span className="break-words">{truthAchievement ? truthAchievement.reveal : achievement}</span>
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Technical Stack */}
                                                {item.technicalStack && (
                                                    <div className="mb-4">
                                                        <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                                                            isTruthMode ? 'text-green-600' : 'text-primary'
                                                        }`}>
                                                            Tech Stack
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {item.technicalStack.map((tech, idx) => (
                                                                <span 
                                                                    key={idx}
                                                                    className="px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Learnings */}
                                                {item.learnings && item.learnings.length > 0 && (
                                                    <div className="mb-4">
                                                        <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                                                            isTruthMode ? 'text-green-600' : 'text-primary'
                                                        }`}>
                                                            Key Learnings
                                                        </h4>
                                                        <ul className="space-y-1.5">
                                                            {item.learnings.slice(0, 2).map((learning, idx) => (
                                                                <li key={idx} className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                                    <span className={isTruthMode ? 'text-green-500' : 'text-primary'}>→</span>
                                                                    <span className="break-words">{learning}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Link */}
                                                {item.socialLinks?.tiktok && (
                                                    <a 
                                                        href={item.socialLinks.tiktok}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                                                    >
                                                        <ExternalLink size={14} />
                                                        See work on TikTok
                                                    </a>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Truth Mode Hint */}
                {!isTruthMode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mt-8 text-center"
                    >
                        <p className="text-xs sm:text-sm text-gray-500">
                            💡 <span className="font-bold">Pro tip:</span> Ask the AI about &quot;truth mode&quot;
                        </p>
                    </motion.div>
                )}

                {/* Media Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-pink-500/5 to-cyan-500/5 border border-primary/10"
                >
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
                                <Video size={24} className="text-pink-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {content.experience.reduce((acc, item) => acc + (item.videoGallery?.length || 0), 0)}
                                </p>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Video Stories</p>
                            </div>
                        </div>
                        <div className="w-px h-12 bg-gray-200 dark:bg-white/10" />
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                                <ImageIcon size={24} className="text-cyan-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {content.experience.reduce((acc, item) => acc + (item.workplaceGallery?.length || 0), 0)}
                                </p>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Gallery Images</p>
                            </div>
                        </div>
                        <div className="w-px h-12 bg-gray-200 dark:bg-white/10" />
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <FolderOpen size={24} className="text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {content.experience.filter(item => 
                                        (item.videoGallery?.length || 0) > 0 || 
                                        (item.workplaceGallery?.length || 0) > 0
                                    ).length}
                                </p>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Companies</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Journey;
