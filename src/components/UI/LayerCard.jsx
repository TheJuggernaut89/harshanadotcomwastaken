import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, ChefHat, ShieldCheck } from 'lucide-react';

// Map icon names to actual icon components
const iconMap = {
    'coffee': Coffee,
    'chef-hat': ChefHat,
    'shield-check': ShieldCheck,
};

// Map layer IDs to portfolio theme colors
const colorMap = {
    'kopitiam-intel': {
        primary: '#E63946',    // primary red
        light: 'bg-primary/10',
        text: 'text-primary',
        border: 'border-primary',
        bg: 'bg-primary'
    },
    'mamak-workshop': {
        primary: '#1E8E99',    // teal
        light: 'bg-teal/10',
        text: 'text-teal',
        border: 'border-teal',
        bg: 'bg-teal'
    },
    'makcik-approval': {
        primary: '#1D3557',    // navy
        light: 'bg-navy/10 dark:bg-white/10',
        text: 'text-navy dark:text-white',
        border: 'border-navy dark:border-white',
        bg: 'bg-navy dark:bg-white'
    }
};

const LayerCard = ({ layer, index }) => {
    const IconComponent = iconMap[layer.icon] || Coffee;
    const colors = colorMap[layer.id] || colorMap['kopitiam-intel'];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className={`glass-card p-8 rounded-xl border-2 ${colors.border}/20 hover:border-${colors.border}/40 hover:shadow-lg transition-all duration-300 group`}
        >
            {/* Icon & Color Bar */}
            <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${colors.light}`}>
                    <IconComponent
                        size={32}
                        className={colors.text}
                        strokeWidth={2}
                    />
                </div>
                <div className={`h-1 flex-1 rounded-full ${colors.bg}`} />
            </div>

            {/* Layer Name */}
            <h3 className="text-2xl font-bold mb-2">
                {layer.name}
            </h3>

            {/* Tagline */}
            <p className={`text-lg font-semibold mb-4 ${colors.text}`}>
                {layer.tagline}
            </p>

            {/* Description */}
            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {layer.description}
            </p>

            {/* Tools Count Badge */}
            <div className="flex items-center justify-between mb-6">
                <div className={`px-4 py-2 rounded-full text-sm font-bold text-white ${colors.bg}`}>
                    {layer.toolsCount} Tools
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Layer {index + 1} of 3
                </div>
            </div>

            {/* Example */}
            <div className={`p-4 rounded-lg mb-6 ${colors.light}`}>
                <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Example:
                </div>
                <div className={`text-sm font-medium ${colors.text}`}>
                    {layer.example}
                </div>
            </div>


        </motion.div>
    );
};

export default LayerCard;
