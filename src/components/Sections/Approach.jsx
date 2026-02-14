import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, TrendingUp } from 'lucide-react';
import { content } from '../../data/content';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import Card from '../UI/Card';

const iconMap = {
    'Strategy First': <Brain size={40} />,
    'Innovation Mindset': <Zap size={40} />,
    'Results-Driven': <TrendingUp size={40} />
};

const Approach = () => {
    return (
        <section id="approach" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-left md:text-center mb-16"
                >
                    <h2 className="section-title text-3xl md:text-5xl">The Unconventional Approach</h2>
                    <p className="text-navy/60 dark:text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
                        I combine behavioral psychology with data-driven AI innovation to create marketing strategies that stick.
                    </p>
                </motion.div>

                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-8"
                >
                    {content.approach.map((item, index) => (
                        <motion.div key={index} variants={fadeInUp}>
                            <Card className="h-full border-b-4 border-b-transparent hover:border-b-primary transition-all">
                                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform animate-pulse-slow">
                                    {iconMap[item.title]}
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
                                <p className="text-navy/60 dark:text-gray-400 leading-relaxed">
                                    {item.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Approach;
