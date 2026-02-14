import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ label, percentage, color = 'bg-primary' }) => {
    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold uppercase tracking-wider opacity-70">{label}</span>
                <span className="text-sm font-black text-primary">{percentage}%</span>
            </div>
            <div className="h-2 w-full bg-navy/5 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${color} rounded-full`}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
