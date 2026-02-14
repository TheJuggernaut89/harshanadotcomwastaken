import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Zap } from 'lucide-react';

const MalaysianPlatformHero = () => {
    const stats = [
        { label: 'Integrated Tools', value: '15', color: 'primary' },
        { label: 'Malaysian Context', value: '100%', color: 'teal' },
        { label: 'System Layers', value: '3', color: 'sandy' },
        { label: 'Build Time', value: '14 Days', color: 'primary' }
    ];

    const layers = [
        { name: 'Kopitiam Intel', icon: '🍵', color: '#8B4513', description: 'Market Intelligence' },
        { name: 'Mamak Workshop', icon: '🍳', color: '#FF8C00', description: 'Content Creation' },
        { name: 'Makcik Approval', icon: '👵', color: '#9370DB', description: 'Compliance & Safety' }
    ];

    return (
        <div className="section-container bg-gradient-to-b from-navy/5 to-transparent dark:from-navy/10">
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    {/* Eyebrow Badge */}
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/10 via-teal/10 to-sandy/10 border border-primary/20 rounded-full mb-8">
                        <Zap size={16} className="text-primary" />
                        <span className="text-sm font-bold text-navy dark:text-white uppercase tracking-wider">
                            Featured Project
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-400 px-3 py-1 bg-white/50 dark:bg-navy-dark/50 rounded-full">
                            Built in 14 Days
                        </span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-navy dark:text-white mb-6">
                        Malaysian Marketing
                        <br />
                        <span className="bg-gradient-to-r from-primary via-teal to-sandy bg-clip-text text-transparent">
                            Intelligence Platform
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-4">
                        15 AI automation tools built specifically for the Malaysian market.
                    </p>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
                        <span className="text-primary font-bold">Not translated. Not adapted.</span>
                        {' '}Built from scratch with deep Malaysian context.
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-6 hover:shadow-card-hover transition-all duration-300"
                            >
                                <div className={`text-4xl font-bold mb-2 bg-gradient-to-r from-${stat.color} to-${stat.color}-light bg-clip-text text-transparent`}>
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
                        <a
                            href="#three-layer-system"
                            className="btn-primary flex items-center justify-center gap-2"
                        >
                            Explore the Platform
                            <ArrowRight size={20} />
                        </a>
                        <button className="btn-secondary flex items-center justify-center gap-2">
                            <Play size={20} />
                            Watch Demo
                        </button>
                    </div>

                    {/* 3-Layer System Removed as per user request */}
                </motion.div>
            </div>
        </div>
    );
};

export default MalaysianPlatformHero;
