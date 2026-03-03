import React from 'react';
import { motion } from 'framer-motion';
import { LayeredText } from '../UI/LayeredText';

const skillLines = [
  { top: "\u00A0", bottom: "STRATEGY" },
  { top: "STRATEGY", bottom: "MARKETING" },
  { top: "MARKETING", bottom: "CODING" },
  { top: "CODING", bottom: "DESIGN" },
  { top: "DESIGN", bottom: "AUTOMATION" },
  { top: "AUTOMATION", bottom: "GROWTH" },
  { top: "GROWTH", bottom: "\u00A0" },
];

const WhatICanDo = () => {
  return (
    <section className="py-20 bg-white dark:bg-navy-dark overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">What I Can Do</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hover over the stairs to see my core capabilities unfold
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <LayeredText 
            lines={skillLines}
            fontSize="80px"
            fontSizeMd="40px"
            lineHeight={70}
            lineHeightMd={40}
            className="text-black dark:text-white"
          />
        </motion.div>

        {/* Skill Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mt-8"
        >
          {['AI Strategy', 'Full-Stack Dev', 'Growth Marketing', 'Brand Design', 'Automation', 'Data Analytics'].map((skill, idx) => (
            <span 
              key={idx}
              className="px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-full text-sm font-medium text-primary"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatICanDo;
