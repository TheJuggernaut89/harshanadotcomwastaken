import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageSquare, Shield } from 'lucide-react';
import CultureCodeDemo from './CultureCodeDemo';
import MamakCopyDemo from './MamakCopyDemo';
import ComplianceCheckerDemo from './ComplianceCheckerDemo';

const FeaturedDemos = () => {
    const [activeDemo, setActiveDemo] = useState('culture-code');

    const demos = [
        {
            id: 'culture',
            name: 'Culture Code',
            icon: Calendar,
            description: 'Predict cultural moments 30 days ahead',
            color: '#E63946',
            component: CultureCodeDemo
        },
        {
            id: 'mamak',
            name: 'Mamak Copy Generator',
            icon: MessageSquare,
            description: 'Generate bilingual social media content',
            color: '#FF8C00',
            component: MamakCopyDemo
        },
        {
            id: 'compliance',
            name: 'Compliance Checker',
            icon: Shield,
            description: 'JAKIM + MCMC + Sensitivity validation',
            color: '#2A9D8F',
            component: ComplianceCheckerDemo
        }
    ];

    const ActiveDemoComponent = demos.find(d => d.id === activeDemo)?.component;

    return (
        <section id="featured-demos" className="section-container bg-gradient-to-b from-navy/5 to-transparent dark:from-navy/10">
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="section-title text-navy dark:text-white">
                        Try Live Demos
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-gray-300 mt-6 max-w-3xl mx-auto">
                        Experience the power of Malaysian-specific AI tools.
                        <br />
                        <span className="text-primary font-semibold">No signup required. Just try it.</span>
                    </p>
                </motion.div>

                {/* Demo Selector */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {demos.map((demo, index) => {
                        const Icon = demo.icon;
                        return (
                            <motion.button
                                key={demo.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setActiveDemo(demo.id)}
                                className={`p-6 rounded-lg border-2 transition-all duration-300 text-left ${activeDemo === demo.id
                                    ? 'border-primary bg-primary/5 shadow-card-hover'
                                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-navy/20 hover:border-primary/50'
                                    }`}
                            >
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                                    style={{ backgroundColor: `${demo.color}20` }}
                                >
                                    <Icon size={24} style={{ color: demo.color }} />
                                </div>
                                <h3 className="text-lg font-bold text-navy dark:text-white mb-2">
                                    {demo.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {demo.description}
                                </p>
                                {activeDemo === demo.id && (
                                    <div className="mt-4 px-3 py-1.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-full inline-block">
                                        Active
                                    </div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Active Demo */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeDemo}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {ActiveDemoComponent && <ActiveDemoComponent />}
                    </motion.div>
                </AnimatePresence>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <div className="glass-card p-8 max-w-3xl mx-auto">
                        <h3 className="text-2xl font-bold text-navy dark:text-white mb-4">
                            Want Access to All 15 Tools?
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                            These are just 3 of the 15 tools in the Malaysian Marketing Intelligence Platform.
                            <br />
                            Imagine having the full suite working for your campaigns.
                        </p>
                        <button className="btn-primary">
                            Schedule a Demo Call
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedDemos;
