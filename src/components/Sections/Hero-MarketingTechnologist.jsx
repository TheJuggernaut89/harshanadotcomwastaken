import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Code, Palette, TrendingUp } from 'lucide-react';
import { content } from '../../data/content';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { useParallax } from '../../hooks/useParallax';

const Hero = () => {
    const { ref: bgRef1, y: bgY1 } = useParallax(15);
    const { ref: bgRef2, y: bgY2 } = useParallax(-20);

    return (
        <section
            id="hero"
            className="relative min-h-[70dvh] min-h-[70svh] flex items-center overflow-hidden pt-safe pb-safe px-4 sm:px-6"
        >
            {/* Parallax Background Glows */}
            <motion.div
                ref={bgRef1}
                style={{ y: bgY1 }}
                className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/20 blur-[120px] rounded-full will-change-transform"
            />
            <motion.div
                ref={bgRef2}
                style={{ y: bgY2 }}
                className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-teal/10 blur-[120px] rounded-full will-change-transform"
            />

            <div className="container mx-auto relative z-10 px-4 sm:px-6 overflow-x-hidden pt-16 md:pt-0">
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="max-w-5xl"
                >
                    <motion.div variants={fadeInUp} className="inline-flex items-center glass-card border-primary/20 text-primary font-medium px-4 py-2 rounded-full text-sm mb-6">
                        <span className="relative flex h-2 w-2 mr-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        {content.personal.status}
                    </motion.div>

                    <motion.h1
                        variants={fadeInUp}
                        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-[1.15] sm:leading-tight break-words-mobile"
                    >
                        <span className="text-primary">Marketing</span>{' '}
                        <span className="hero-gradient-title inline-block">Technologist</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 md:mb-10 leading-relaxed font-medium max-w-3xl"
                    >
                        I build revenue systems that connect marketing to measurable business growth. Technical skills + marketing expertise + creative execution — delivering 429% growth through automation, AI tools, and data-driven strategies.
                    </motion.p>

                    {/* 3-in-1 Value Proposition Cards */}
                    <motion.div
                        variants={fadeInUp}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-12"
                    >
                        <div className="flex items-center gap-3 glass-card px-3 sm:px-4 py-3 rounded-xl border border-primary/10">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Code size={18} className="text-primary sm:w-5 sm:h-5" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Technical Development</p>
                                <p className="text-xs sm:text-sm font-semibold truncate">n8n, APIs, React, Automation</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 glass-card px-3 sm:px-4 py-3 rounded-xl border border-primary/10">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <TrendingUp size={18} className="text-primary sm:w-5 sm:h-5" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Growth Marketing</p>
                                <p className="text-xs sm:text-sm font-semibold truncate">Revenue Attribution & Analytics</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 glass-card px-3 sm:px-4 py-3 rounded-xl border border-primary/10">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Palette size={18} className="text-primary sm:w-5 sm:h-5" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Creative Execution</p>
                                <p className="text-xs sm:text-sm font-semibold truncate">Adobe Certified, Video, Branding</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Growth Stats Highlight */}
                    <motion.div
                        variants={fadeInUp}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12"
                    >
                        {content.stats && content.stats.slice(0, 4).map((stat, i) => (
                            <div key={i} className="glass-card p-2 sm:p-3 md:p-4 rounded-xl border border-primary/10 bg-white/50 dark:bg-navy/50">
                                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                                <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider leading-tight">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <a href="#projects" className="btn-primary flex items-center justify-center gap-2 text-center text-sm sm:text-base py-3 px-4 sm:px-6">
                            View My Projects <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                        </a>
                        <a href="#contact" className="btn-outline flex items-center justify-center gap-2 text-center text-sm sm:text-base py-3 px-4 sm:px-6">
                            <span className="hidden sm:inline">Let's Discuss Your Growth Goals</span>
                            <span className="sm:hidden">Get In Touch</span>
                            <MessageCircle size={18} className="sm:w-5 sm:h-5" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>


        </section>
    );
};

export default Hero;
