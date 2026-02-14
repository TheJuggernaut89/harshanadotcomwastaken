import React from 'react';
import { motion } from 'framer-motion';
import { Code, TrendingUp, Palette, DollarSign } from 'lucide-react';
import { content } from '../../data/content';
import TextScramble from '../UI/TextScramble';

const ValueProposition = () => {
    return (
        <section className="py-20 bg-navy/5 dark:bg-white/5">
            <div className="container mx-auto px-6">
                <div className="text-left md:text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="section-title text-3xl md:text-4xl font-bold mb-4"
                    >
                        {content.valueProposition.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-600 dark:text-gray-300"
                    >
                        {content.valueProposition.subtitle}
                    </motion.p>
                </div>

                <div className="mb-16">
                    {/* First Card - Featured/Hero (60% width, centered) */}
                    {content.valueProposition.roles.slice(0, 1).map((role, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0 }}
                            className="max-w-2xl mx-auto mb-8 bg-white dark:bg-navy p-8 rounded-2xl shadow-lg border-2 border-primary/30 dark:border-primary/20"
                        >
                            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <TrendingUp size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">
                                <TextScramble
                                    text={role.title}
                                    delay={500}
                                    duration={800}
                                />
                            </h3>
                            <div className="text-primary font-bold mb-4 text-lg">{role.cost}</div>
                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{role.description}</p>
                        </motion.div>
                    ))}

                    {/* Two Supporting Cards Below */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {content.valueProposition.roles.slice(1, 3).map((role, index) => (
                            <motion.div
                                key={index + 1}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: (index + 1) * 0.1 }}
                                className="bg-white dark:bg-navy p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-white/10"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                    {index === 0 && <Code size={24} />}
                                    {index === 1 && <Palette size={24} />}
                                </div>
                                <h3 className="text-xl font-bold mb-2">
                                    <TextScramble
                                        text={role.title}
                                        delay={(index + 1) * 200 + 500}
                                        duration={800}
                                    />
                                </h3>
                                <div className="text-primary font-bold mb-4">{role.cost}</div>
                                <p className="text-gray-600 dark:text-gray-400">{role.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl mx-auto bg-gradient-to-r from-primary to-navy text-white rounded-2xl p-8 shadow-xl border border-primary/20"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <div className="text-white/80 text-sm font-bold uppercase tracking-wider mb-2">
                                Typical Monthly Cost
                            </div>
                            <div className="text-3xl font-bold line-through opacity-50">
                                {content.valueProposition.totalCost}
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <ArrowRight size={32} />
                        </div>
                        <div className="text-center md:text-right">
                            <div className="text-white/80 text-sm font-bold uppercase tracking-wider mb-2">
                                My Monthly Rate
                            </div>
                            <div className="text-4xl font-bold">
                                {content.valueProposition.myCost}
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/20 text-center text-white/90 font-medium">
                        {content.valueProposition.savings}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const ArrowRight = ({ size }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);

export default ValueProposition;
