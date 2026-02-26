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
            className="relative min-h-[100dvh] flex items-center overflow-hidden"
            style={{ paddingTop: '-40px' }}
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

            <div className="container mx-auto relative z-10 px-4 sm:px-6 overflow-x-hidden">
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
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] sm:leading-tight"
                    >
                        <span className="text-primary">Marketing</span>{' '}
                        <span className="hero-gradient-title inline-block">Technologist</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 leading-relaxed font-medium max-w-3xl"
                    >
                        {content.personal.tagline}
                    </motion.p>

                    {/* 3-in-1 Visual Cards - Mobile Optimized */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
                    >
                        <div className="flex items-center gap-3 glass-card px-4 py-3 rounded-xl border border-primary/10">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Code size={20} className="text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Developer</p>
                                <p className="text-sm font-semibold">Automation & APIs</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 glass-card px-4 py-3 rounded-xl border border-primary/10">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <TrendingUp size={20} className="text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Marketer</p>
                                <p className="text-sm font-semibold">Growth Strategy</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 glass-card px-4 py-3 rounded-xl border border-primary/10">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <Palette size={20} className="text-primary" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider">Designer</p>
                                <p className="text-sm font-semibold">Visual Content</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Growth Stats Highlight */}
                    <motion.div
                        variants={fadeInUp}
                        className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12"
                    >
                        {content.stats && content.stats.slice(0, 4).map((stat, i) => (
                            <div key={i} className="glass-card p-3 sm:p-4 rounded-xl border border-primary/10 bg-white/50 dark:bg-navy/50">
                                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                                <div className="text-xs sm:text-sm text-gray-500 font-bold uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <a href="#projects" className="btn-primary flex items-center justify-center gap-2 text-center">
                            View My Work <ArrowRight size={20} />
                        </a>
                        <a href="#contact" className="btn-outline flex items-center justify-center gap-2 text-center">
                            Let's Talk Strategy <MessageCircle size={20} />
                        </a>
                    </motion.div>
                </motion.div>
            </div>


        </section>
    );
};

export default Hero;
