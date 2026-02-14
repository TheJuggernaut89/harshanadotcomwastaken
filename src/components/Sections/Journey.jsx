import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '../../data/content';
import { upsideDownContent } from '../../data/content-upsidedown';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { useTruthMode } from '../../context/TruthModeContext';
import Card from '../UI/Card';
import { Briefcase, Calendar, CheckCircle2, FileText, Target, Lightbulb, ChevronDown, Camera, Video, Unlock, Lock, ExternalLink } from 'lucide-react';
import MediaDashboard from '../UI/MediaDashboard';
import ImageLightbox from '../UI/ImageLightbox';
import SmartMediaFrame from '../UI/SmartMediaFrame';

const Journey = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [lightboxIndex, setLightboxIndex] = useState(0);
    const { isTruthMode } = useTruthMode();

    const toggleExpand = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    // Open image lightbox
    const openLightbox = (images, index = 0) => {
        setLightboxImages(images);
        setLightboxIndex(index);
        setLightboxOpen(true);
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
        <section id="experience" style={{ padding: 'var(--spacing-12) 0', background: 'var(--bg-secondary)' }}>
            <div className="container mx-auto" style={{ padding: '0 var(--spacing-3)' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-left md:text-center" style={{ marginBottom: 'var(--spacing-10)' }}
                >
                    <div className="flex items-center justify-start md:justify-center gap-4 mb-4">
                        <h2 className="section-title">
                            {isTruthMode ? "My Real Story" : "Professional Journey"}
                        </h2>
                        {isTruthMode ? (
                            <Unlock size={24} className="text-green-500 animate-pulse" />
                        ) : (
                            <Lock size={24} className="text-gray-400" />
                        )}
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-lg)', marginTop: 'var(--spacing-2)', lineHeight: 'var(--leading-relaxed)' }} className="max-w-2xl mx-auto">
                        {isTruthMode
                            ? "What LinkedIn doesn't tell you - the real experiences, Malaysian style! 😅"
                            : "A diverse career path that leads from high-stakes security to strategic AI innovation."
                        }
                    </p>

                    {/* Truth Mode Banner */}
                    {isTruthMode && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="mt-6 max-w-2xl mx-auto p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
                        >
                            <p className="text-sm text-green-600 dark:text-green-400">
                                🎊 Truth Mode Active! All jokes, all love. This is satire lah, don't take too serious! 😄
                            </p>
                        </motion.div>
                    )}
                </motion.div>

                <div className="max-w-6xl mx-auto relative">
                    {/* Vertical Line */}
                    <div className={`absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b md:-translate-x-1/2 ${isTruthMode
                        ? 'from-green-500 via-green-500/50 to-transparent'
                        : 'from-primary via-primary/50 to-transparent'
                        }`} />

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}
                    >
                        {content.experience.map((item, index) => {
                            const truthData = getTruthData(item.company);
                            const showTruthContent = isTruthMode && truthData;
                            const hasImages = item.workplaceGallery && item.workplaceGallery.length > 0;
                            const hasVideos = item.videoGallery && item.videoGallery.length > 0;
                            const hasTikTok = item.socialLinks && item.socialLinks.tiktok;

                            return (
                                <motion.div
                                    key={index}
                                    variants={fadeInUp}
                                    className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
                                >
                                    {/* Timeline Node */}
                                    <div className={`absolute left-[20px] md:left-1/2 w-4 h-4 rounded-full border-4 border-white dark:border-navy-dark z-10 -translate-x-1/2 mt-8 ${isTruthMode
                                        ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                                        : 'bg-primary shadow-[0_0_15px_rgba(230,57,70,0.5)]'
                                        }`} />

                                    {/* Content Card - Alternates left/right */}
                                    <div className={`pl-12 md:pl-0 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                                        <Card className="h-full">
                                            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                                                <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${isTruthMode
                                                    ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                                                    : 'bg-primary/10 text-primary'
                                                    }`}>
                                                    {item.period}
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm font-bold">
                                                    <Calendar size={14} />
                                                    {item.period.includes('Present') ? 'Ongoing' : 'Completed'}
                                                </div>
                                            </div>

                                            <h3 className="text-2xl font-bold mb-1 text-navy dark:text-white">
                                                {showTruthContent ? truthData.jobTitle.reveal : item.role}
                                            </h3>
                                            <p className={`font-bold text-sm mb-4 flex items-center gap-2 ${isTruthMode ? 'text-green-600 dark:text-green-400' : 'text-primary'
                                                }`}>
                                                <Briefcase size={14} />
                                                {item.company}
                                            </p>

                                            {/* Description */}
                                            {item.description && (
                                                <div className="text-sm text-navy/70 dark:text-gray-400 leading-relaxed mb-6 italic border-l-2 border-primary/30 pl-4">
                                                    {showTruthContent ? truthData.description.reveal : item.description}
                                                </div>
                                            )}

                                            {/* Achievements */}
                                            {item.achievements && item.achievements.length > 0 && (
                                                <div className="mb-4">
                                                    <h4 className={`text-xs font-black uppercase tracking-wider mb-3 flex items-center gap-2 ${isTruthMode ? 'text-green-600 dark:text-green-400' : 'text-primary'
                                                        }`}>
                                                        <Target size={14} />
                                                        Key Achievements
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {item.achievements.map((achievement, idx) => {
                                                            const truthAchievement = showTruthContent && truthData.achievements?.[idx];
                                                            return (
                                                                <li key={idx} className="flex gap-3 text-sm text-navy/70 dark:text-gray-400 leading-relaxed">
                                                                    <CheckCircle2 size={16} className={`${isTruthMode ? 'text-green-500' : 'text-primary'} flex-shrink-0 mt-0.5`} />
                                                                    <span>
                                                                        {truthAchievement ? truthAchievement.reveal : achievement}
                                                                    </span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                </div>
                                            )}

                                            {/* Expand/Collapse Button */}
                                            {(item.responsibilities || item.learnings) && (
                                                <button
                                                    onClick={() => toggleExpand(index)}
                                                    className={`w-full mt-4 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${isTruthMode
                                                        ? 'bg-green-500/5 hover:bg-green-500/10 text-green-600 dark:text-green-400'
                                                        : 'bg-primary/5 hover:bg-primary/10 text-primary'
                                                        }`}
                                                >
                                                    {expandedIndex === index ? 'Show Less' : 'View Details'}
                                                    <ChevronDown
                                                        size={16}
                                                        className={`transition-transform duration-300 ${expandedIndex === index ? 'rotate-180' : ''}`}
                                                    />
                                                </button>
                                            )}

                                            {/* Expandable Content */}
                                            <AnimatePresence>
                                                {expandedIndex === index && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pt-6 space-y-6 border-t border-navy/10 dark:border-white/10 mt-4">
                                                            {/* Responsibilities */}
                                                            {item.responsibilities && item.responsibilities.length > 0 && (
                                                                <div>
                                                                    <h4 className="text-xs font-black uppercase tracking-wider text-navy/60 dark:text-gray-400 mb-3 flex items-center gap-2">
                                                                        <FileText size={14} />
                                                                        Core Responsibilities
                                                                    </h4>
                                                                    <ul className="space-y-2">
                                                                        {item.responsibilities.map((resp, idx) => {
                                                                            const truthResp = showTruthContent && truthData.responsibilities?.[idx];
                                                                            return (
                                                                                <li key={idx} className="flex gap-3 text-sm text-navy/60 dark:text-gray-500 leading-relaxed">
                                                                                    <span className={isTruthMode ? 'text-green-500 mt-1' : 'text-primary mt-1'}>•</span>
                                                                                    {truthResp ? truthResp.reveal : resp}
                                                                                </li>
                                                                            );
                                                                        })}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {/* Key Learnings */}
                                                            {item.learnings && item.learnings.length > 0 && (
                                                                <div>
                                                                    <h4 className="text-xs font-black uppercase tracking-wider text-teal mb-3 flex items-center gap-2">
                                                                        <Lightbulb size={14} />
                                                                        Key Learnings
                                                                    </h4>
                                                                    <ul className="space-y-3">
                                                                        {item.learnings.map((learning, idx) => (
                                                                            <li key={idx} className="flex gap-3 text-sm text-navy/70 dark:text-gray-400 leading-relaxed bg-teal/5 p-3 rounded-lg">
                                                                                <Lightbulb size={16} className="text-teal flex-shrink-0 mt-0.5" />
                                                                                {learning}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </Card>
                                    </div>

                                    {/* Workplace Image - Alternates right/left - NOW SMART FRAME */}
                                    <div className={`block mt-6 md:mt-0 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                                        <div className="h-full">
                                            {item.role === "Founder / Technical Marketing Consultant" ? (
                                                <div className="aspect-square rounded-lg h-full max-h-[400px] bg-gradient-to-br from-[#F4A261] to-[#E76F51] flex flex-col items-center justify-center p-6 text-center shadow-xl transform hover:scale-[1.02] transition-transform duration-500 border-4 border-white dark:border-navy-light group relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
                                                    <div className="relative z-10 text-white flex flex-col h-full justify-center">
                                                        <h3 className="text-2xl font-black mb-4 tracking-wider uppercase border-b-2 border-white/30 pb-2 mx-auto">Real World MBA</h3>
                                                        <p className="text-white/90 text-sm leading-relaxed font-medium mb-6">
                                                            {item.description}
                                                        </p>

                                                        {item.socialLinks?.tiktok && (
                                                            <a
                                                                href={item.socialLinks.tiktok}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-2 bg-white text-[#E76F51] px-4 py-2 rounded-full font-bold text-sm hover:bg-navy hover:text-white transition-all duration-300 mx-auto shadow-lg"
                                                            >
                                                                <ExternalLink size={16} />
                                                                View on TikTok
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (hasImages || hasVideos) ? (
                                                <MediaDashboard
                                                    workplaceGallery={item.workplaceGallery}
                                                    videoGallery={item.videoGallery}
                                                    companyColor={item.companyColor}
                                                    onOpenLightbox={openLightbox}
                                                />
                                            ) : (
                                                /* Fallback for items with no gallery (just cover or nothing) */
                                                <div className="aspect-square rounded-lg h-full max-h-[400px]">
                                                    <SmartMediaFrame
                                                        coverImage={item.workplaceImage}
                                                        videoGallery={item.videoGallery}
                                                        imageGallery={item.workplaceGallery}
                                                        altText={`${item.company} workplace`}
                                                        isTruthMode={isTruthMode}
                                                        onClick={() => {
                                                            if (hasImages) {
                                                                openLightbox(item.workplaceGallery);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            {/* Image Lightbox */}
            <ImageLightbox
                images={lightboxImages}
                initialIndex={lightboxIndex}
                isOpen={lightboxOpen}
                onClose={() => setLightboxOpen(false)}
            />
        </section>
    );
};

export default Journey;
