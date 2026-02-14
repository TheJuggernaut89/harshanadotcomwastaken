import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Clock, Sparkles, ExternalLink } from 'lucide-react';

const ToolCard = ({ tool, layerColor, onDemoClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 hover:shadow-card-hover transition-all duration-150 group h-full flex flex-col"
            whileHover={{ y: -4 }}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <motion.div
                    className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-150"
                    style={{ backgroundColor: `${layerColor}20` }}
                    whileHover={{ scale: 1.4 }}
                    transition={{ duration: 0.15 }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 20px ${layerColor}80, 0 0 40px ${layerColor}40`;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 0 transparent';
                    }}
                >
                    <Code2 size={24} style={{ color: layerColor }} />
                </motion.div>
                {tool.demoAvailable && (
                    <div className="px-3 py-1 bg-teal/10 text-teal text-xs font-bold uppercase tracking-wider rounded-full border border-teal/20 flex items-center gap-1">
                        <Sparkles size={12} />
                        Live Demo
                    </div>
                )}
            </div>

            {/* Tool Name with Glow on Hover */}
            <h4
                className="text-xl font-bold text-navy dark:text-white mb-2 transition-all duration-150 group-hover:scale-105"
                style={{
                    textShadow: '0 0 0 transparent',
                    transition: 'text-shadow 150ms ease-in-out'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.textShadow = `0 0 20px ${layerColor}80, 0 0 40px ${layerColor}40`;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.textShadow = '0 0 0 transparent';
                }}
            >
                {tool.name}
            </h4>

            {/* Description */}
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                {tool.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
                {tool.techStack.slice(0, 3).map((tech, index) => (
                    <span
                        key={index}
                        className="px-2 py-1 bg-navy/5 dark:bg-white/5 text-navy dark:text-gray-400 text-xs font-medium rounded"
                    >
                        {tech}
                    </span>
                ))}
                {tool.techStack.length > 3 && (
                    <span className="px-2 py-1 text-gray-500 text-xs font-medium">
                        +{tool.techStack.length - 3} more
                    </span>
                )}
            </div>

            {/* Build Time */}
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                <Clock size={14} />
                <span>Built in {tool.buildTime}</span>
            </div>

            {/* Features */}
            <div className="flex-1 mb-4">
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Key Features:
                </div>
                <ul className="space-y-1">
                    {tool.features.slice(0, 2).map((feature, index) => (
                        <li key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                            <span className="text-teal mt-0.5">•</span>
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* CTA */}
            {tool.hasMockDemo || tool.demoAvailable ? (
                <button
                    onClick={() => onDemoClick && onDemoClick(tool)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold transition-all duration-150 group-hover:translate-y-[-2px] group-hover:scale-105"
                    style={{
                        backgroundColor: tool.demoAvailable ? layerColor : `${layerColor}15`,
                        color: tool.demoAvailable ? 'white' : layerColor,
                        border: `2px solid ${layerColor}${tool.demoAvailable ? '' : '40'}`,
                        boxShadow: `0 0 0 transparent`,
                        transition: 'all 150ms ease-in-out'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 20px ${layerColor}60, 0 0 40px ${layerColor}30`;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 0 0 transparent';
                    }}
                >
                    {tool.demoAvailable ? '🚀 Try Live Demo' : '🎮 Try Interactive Demo'}
                    <Sparkles size={16} />
                </button>
            ) : (
                <div className="space-y-2">
                    <button
                        className="w-full px-4 py-3 rounded-lg font-semibold bg-gray-100 dark:bg-navy/20 text-gray-500 border-2 border-dashed border-gray-300 cursor-not-allowed"
                        disabled
                    >
                        🔨 In Development
                    </button>
                    <p className="text-xs text-center text-gray-400">
                        Full version available to contracted clients
                    </p>
                </div>
            )}
        </motion.div>
    );
};

export default ToolCard;
