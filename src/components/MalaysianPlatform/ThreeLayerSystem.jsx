import React from 'react';
import { motion } from 'framer-motion';
import LayerCard from '../UI/LayerCard';
import toolsData from '../../data/malaysian-platform/tools.json';

const ThreeLayerSystem = () => {
    return (
        <section id="three-layer-system" className="py-24 bg-navy/5 dark:bg-white/5">
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title">
                        3-Layer System Architecture
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-3xl mx-auto">
                        Each layer serves a specific purpose in the Malaysian marketing workflow,
                        from intelligence gathering to content creation to compliance validation.
                    </p>
                </motion.div>

                {/* Layer Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {toolsData.layers.map((layer, index) => (
                        <LayerCard
                            key={layer.id}
                            layer={layer}
                            index={index}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-16"
                >
                    <div className="glass-card p-8 max-w-3xl mx-auto border border-primary/10">
                        <h3 className="text-2xl font-bold mb-4">
                            Why 3 Layers?
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            Malaysian marketing requires more than just content creation. You need{' '}
                            <span className="text-primary font-semibold">cultural intelligence</span>,{' '}
                            <span className="text-primary font-semibold">authentic creation</span>, and{' '}
                            <span className="text-primary font-semibold">compliance safety</span>.
                            <br />
                            <br />
                            This 3-layer system ensures every campaign is not just creative, but also{' '}
                            <span className="font-bold">culturally appropriate, legally compliant, and commercially optimized</span>.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ThreeLayerSystem;
