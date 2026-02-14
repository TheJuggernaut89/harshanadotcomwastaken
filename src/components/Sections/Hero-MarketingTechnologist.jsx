import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
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

            <div className="container mx-auto relative z-10 px-6">
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
                        className="text-5xl md:text-8xl font-bold mb-6 leading-tight"
                    >
                        <span className="text-primary">Marketing</span> <br />
                        <span className="hero-gradient-title">Technologist</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeInUp}
                        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed font-medium max-w-3xl"
                    >
                        {content.personal.tagline}
                    </motion.p>

                    {/* Growth Stats Highlight */}
                    <motion.div
                        variants={fadeInUp}
                        className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-4 gap-4 mb-12 pb-4 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide"
                    >
                        {content.stats && content.stats.slice(0, 4).map((stat, i) => (
                            <div key={i} className="min-w-[40vw] md:min-w-0 snap-center glass-card p-4 rounded-xl border border-primary/10 bg-white/50 dark:bg-navy/50 flex-shrink-0">
                                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-500 font-bold uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-20">
                        <a href="#projects" className="btn-primary flex items-center gap-2">
                            View My Work <ArrowRight size={20} />
                        </a>
                        <a href="#contact" className="btn-outline flex items-center gap-2">
                            Let's Talk Strategy <MessageCircle size={20} />
                        </a>
                    </motion.div>
                </motion.div>
            </div>


        </section>
    );
};

export default Hero;
