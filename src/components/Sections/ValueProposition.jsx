import React from 'react';
import { motion } from 'framer-motion';
import { Code, TrendingUp, Palette, DollarSign, Zap, Users } from 'lucide-react';
import { content } from '../../data/content';
import TextScramble from '../UI/TextScramble';

const ValueProposition = () => {
    const roles = content.valueProposition.roles;

    return (
        <section className="py-16 sm:py-20 bg-navy/5 dark:bg-white/5 overflow-x-hidden">
            <div className="container mx-auto px-4 sm:px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-10 sm:mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-bold mb-4">
                        <Users size={14} />
                        3 Roles in 1 Person
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                        The <span className="text-primary">Marketing Technologist</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Why hire three when you can get one who does it all?
                    </p>
                </motion.div>

                {/* 3-in-1 Cards - Horizontal on desktop, stacked on mobile */}
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
                        {/* Card 1 - Developer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0 }}
                            whileHover={{ y: -4 }}
                            className="bg-white dark:bg-navy p-5 sm:p-6 rounded-2xl shadow-lg border-2 border-blue-500/30 dark:border-blue-500/20"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                                <Code size={24} />
                            </div>
                            <div className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-1">Role 1</div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2">
                                <TextScramble text="Developer" delay={300} duration={600} />
                            </h3>
                            <div className="text-blue-500 font-bold mb-3 text-sm">{roles[1]?.cost || '~RM 4,500/mo'}</div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                Builds automation, APIs & tracking systems. Most devs don't understand marketing.
                            </p>
                        </motion.div>

                        {/* Card 2 - Marketer (Featured) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            whileHover={{ y: -4 }}
                            className="bg-white dark:bg-navy p-5 sm:p-6 rounded-2xl shadow-xl border-2 border-primary relative"
                        >
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                                Core
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                                <TrendingUp size={24} />
                            </div>
                            <div className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Role 2</div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2">
                                <TextScramble text="Marketer" delay={500} duration={600} />
                            </h3>
                            <div className="text-primary font-bold mb-3 text-sm">{roles[0]?.cost || '~RM 5,500/mo'}</div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                Strategy, campaigns & growth. Most marketers hit technical walls and stop.
                            </p>
                        </motion.div>

                        {/* Card 3 - Designer */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ y: -4 }}
                            className="bg-white dark:bg-navy p-5 sm:p-6 rounded-2xl shadow-lg border-2 border-purple-500/30 dark:border-purple-500/20"
                        >
                            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4">
                                <Palette size={24} />
                            </div>
                            <div className="text-xs font-bold text-purple-500 uppercase tracking-wider mb-1">Role 3</div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2">
                                <TextScramble text="Designer" delay={700} duration={600} />
                            </h3>
                            <div className="text-purple-500 font-bold mb-3 text-sm">{roles[2]?.cost || '~RM 3,500/mo'}</div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                Visuals, video & brand. Most designers need direction, not strategy.
                            </p>
                        </motion.div>
                    </div>

                    {/* Cost Comparison - Compact */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-r from-navy to-navy-dark text-white rounded-2xl p-5 sm:p-6 shadow-xl border border-white/10"
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                            <div className="text-center sm:text-left">
                                <p className="text-white/60 text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
                                    Hiring 3 People
                                </p>
                                <p className="text-xl sm:text-2xl font-bold line-through opacity-50">
                                    {content.valueProposition.totalCost}
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-2 text-white/40">
                                <div className="w-8 h-px bg-white/20"></div>
                                <Zap size={16} className="text-yellow-400" />
                                <div className="w-8 h-px bg-white/20"></div>
                            </div>
                            
                            <div className="text-center sm:text-right">
                                <p className="text-white/60 text-xs sm:text-sm font-bold uppercase tracking-wider mb-1">
                                    One Marketing Technologist
                                </p>
                                <p className="text-2xl sm:text-3xl font-bold text-green-400">
                                    {content.valueProposition.myCost}
                                </p>
                            </div>
                        </div>
                        
                        <div className="mt-4 pt-4 border-t border-white/10 text-center">
                            <p className="text-sm sm:text-base text-white/90 font-medium flex items-center justify-center gap-2">
                                <span className="text-green-400 font-bold">{content.valueProposition.savings}</span>
                                <span className="text-white/50">|</span>
                                <span className="text-yellow-400">Zero management overhead</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ValueProposition;
