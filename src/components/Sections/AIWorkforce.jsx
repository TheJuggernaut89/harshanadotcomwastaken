import React from 'react';
import { motion } from 'framer-motion';
import { content } from '../../data/content';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import Card from '../UI/Card';
import { Bot, Cpu, Zap, Activity } from 'lucide-react';

const iconMap = {
    'AI Sales Agent': <Bot size={24} />,
    'AI Graphic Designer': <Zap size={24} />,
    'AI Business Development': <Cpu size={24} />
};

const AIWorkforce = () => {
    return (
        <section id="ai-workforce" className="py-24 bg-navy/[0.02] dark:bg-white/[0.02] relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">AI Digital Workforce</h2>
                    <p className="text-navy/60 dark:text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
                        I build intelligent, automated systems that act as dedicated team members, handling everything from lead gen to creative production.
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {content.aiWorkforce.map((ai, index) => (
                        <motion.div key={index} variants={fadeInUp}>
                            <Card className="h-full border border-primary/10 hover:border-primary/30">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                                        {iconMap[ai.name]}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{ai.name}</h3>
                                        <div className="flex items-center gap-2 text-[10px] text-teal font-black uppercase tracking-widest">
                                            <Activity size={10} /> Active & Optimized
                                        </div>
                                    </div>
                                </div>

                                <ul className="space-y-4">
                                    {ai.features.map((feature, idx) => (
                                        <li key={idx} className="flex gap-3 text-sm text-navy/70 dark:text-gray-400 leading-relaxed font-medium">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-8 pt-6 border-t border-navy/5 dark:border-white/5 flex flex-wrap gap-2">
                                    {['Automated', '24/7', 'AI-Driven'].map(tag => (
                                        <span key={tag} className="px-2 py-0.5 bg-navy/5 dark:bg-white/5 rounded text-[10px] font-bold opacity-60">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default AIWorkforce;
