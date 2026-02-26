import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../../data/content';
import { upsideDownContent } from '../../data/content-upsidedown';
import { useTruthMode } from '../../context/TruthModeContext';
import { Briefcase, Calendar, ChevronDown, MapPin, Lightbulb, Unlock, Lock, ExternalLink } from 'lucide-react';

const Journey = () => {
    const [expandedIndex, setExpandedIndex] = useState(0); // First one expanded by default
    const { isTruthMode } = useTruthMode();

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    // Helper function to get truth data by company name
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
        <section id="experience" className="py-20 bg-gray-50 dark:bg-navy-dark/50">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
                        {isTruthMode ? <Unlock size={14} /> : <Lock size={14} />}
                        {isTruthMode ? 'Truth Mode Active' : 'Professional Journey'}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">
                        {isTruthMode ? "My Real Story" : "Career Timeline"}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                        {isTruthMode 
                            ? "What LinkedIn doesn't tell you - the real Malaysian experience! 😄" 
                            : "From security operations to AI-powered marketing innovation"}
                    </p>
                </motion.div>

                {/* Accordion Timeline */}
                <div className="max-w-3xl mx-auto space-y-3">
                    {content.experience.map((item, index) => {
                        const truthData = getTruthData(item.company);
                        const showTruthContent = isTruthMode && truthData;
                        const isExpanded = expandedIndex === index;

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
                                {/* Header - Always visible */}
                                <button
                                    onClick={() => toggleExpand(index)}
                                    className="w-full p-5 flex items-center gap-4 text-left"
                                >
                                    {/* Timeline dot */}
                                    <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                                        isTruthMode ? 'bg-green-500' : 'bg-primary'
                                    }`} />
                                    
                                    {/* Period */}
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        isTruthMode 
                                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                                            : 'bg-primary/10 text-primary'
                                    }`}>
                                        {item.period}
                                    </div>
                                    
                                    {/* Title & Company */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-lg truncate">
                                            {showTruthContent ? truthData.jobTitle.reveal : item.role}
                                        </h3>
                                        <p className={`text-sm flex items-center gap-1 ${
                                            isTruthMode ? 'text-green-600 dark:text-green-400' : 'text-primary'
                                        }`}>
                                            <Briefcase size={12} />
                                            {item.company}
                                        </p>
                                    </div>
                                    
                                    {/* Expand icon */}
                                    <ChevronDown 
                                        size={20} 
                                        className={`text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
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
                                            <div className="px-5 pb-5 pt-0">
                                                {/* Description */}
                                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                                                    {showTruthContent ? truthData.description.reveal : item.description}
                                                </p>

                                                {/* Location */}
                                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                                                    <MapPin size={12} />
                                                    {item.location}
                                                </div>

                                                {/* Achievements */}
                                                {item.achievements && item.achievements.length > 0 && (
                                                    <div className="mb-4">
                                                        <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                                                            isTruthMode ? 'text-green-600' : 'text-primary'
                                                        }`}>
                                                            Key Achievements
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {item.achievements.slice(0, 3).map((achievement, idx) => {
                                                                const truthAchievement = showTruthContent && truthData.achievements?.[idx];
                                                                return (
                                                                    <li key={idx} className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                                        <span className={isTruthMode ? 'text-green-500' : 'text-primary'}>•</span>
                                                                        {truthAchievement ? truthAchievement.reveal : achievement}
                                                                    </li>
                                                                );
                                                            })}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Key Learnings */}
                                                {item.learnings && item.learnings.length > 0 && (
                                                    <div className="bg-teal/5 rounded-xl p-4">
                                                        <h4 className="text-xs font-bold uppercase tracking-wider text-teal mb-2 flex items-center gap-2">
                                                            <Lightbulb size={12} />
                                                            What I Learned
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {item.learnings.slice(0, 2).map((learning, idx) => (
                                                                <li key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                                                                    {learning}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Link if available */}
                                                {item.socialLinks?.tiktok && (
                                                    <a 
                                                        href={item.socialLinks.tiktok}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-primary hover:underline"
                                                    >
                                                        <ExternalLink size={14} />
                                                        View on TikTok
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
                        <p className="text-sm text-gray-500">
                            💡 <span className="font-bold">Pro tip:</span> Ask the AI chatbot about "truth mode" for the unfiltered version!
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Journey;
