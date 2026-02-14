import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, TrendingUp, Target, Clock, Sparkles, X, Download } from 'lucide-react';
import culturalMomentsData from '../../data/malaysian-platform/cultural-moments.json';

const CultureCodeDemo = () => {
    const [selectedMoment, setSelectedMoment] = useState(null);
    const [showBrief, setShowBrief] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSelectMoment = (momentId) => {
        const moment = culturalMomentsData.culturalMoments.find(m => m.id === momentId);
        setSelectedMoment(moment);
        setShowBrief(false);
    };

    const generateBrief = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowBrief(true);
        }, 1500);
    };

    return (
        <div className="glass-card p-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-teal/20 rounded-lg flex items-center justify-center">
                    <Calendar size={32} className="text-primary" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-navy dark:text-white">Culture Code</h3>
                    <p className="text-gray-600 dark:text-gray-400">Malaysian cultural moment predictor</p>
                </div>
            </div>

            {/* Dropdown */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-navy dark:text-white mb-2">
                    Select Cultural Moment
                </label>
                <select
                    onChange={(e) => handleSelectMoment(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-navy-dark text-navy dark:text-white focus:border-primary focus:outline-none transition-colors"
                >
                    <option value="">Choose a moment...</option>
                    {culturalMomentsData.culturalMoments.map((moment) => (
                        <option key={moment.id} value={moment.id}>
                            {moment.name} - {moment.date}
                        </option>
                    ))}
                </select>
            </div>

            {/* Results */}
            <AnimatePresence>
                {selectedMoment && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-6"
                    >
                        {/* Opportunity Score */}
                        <div className="p-6 bg-gradient-to-r from-primary/10 to-teal/10 rounded-lg border-2 border-primary/20">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="text-primary" size={20} />
                                    <span className="font-semibold text-navy dark:text-white">Opportunity Score</span>
                                </div>
                                <span className="text-3xl font-bold text-primary">{selectedMoment.opportunityScore}/100</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${selectedMoment.opportunityScore}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="bg-gradient-to-r from-primary to-teal h-3 rounded-full"
                                />
                            </div>
                        </div>

                        {/* Content Themes */}
                        <div>
                            <h4 className="font-semibold text-navy dark:text-white mb-3 flex items-center gap-2">
                                <Sparkles size={18} className="text-teal" />
                                Content Themes
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {selectedMoment.contentThemes.map((theme, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 bg-teal/10 text-teal border border-teal/20 rounded-full text-sm font-medium"
                                    >
                                        {theme}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Brand Recommendations */}
                        <div>
                            <h4 className="font-semibold text-navy dark:text-white mb-3 flex items-center gap-2">
                                <Target size={18} className="text-sandy" />
                                Brand Recommendations
                            </h4>
                            <ul className="space-y-2">
                                {selectedMoment.brandRecommendations.map((rec, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <span className="text-primary mt-1">•</span>
                                        {rec}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Timing Windows */}
                        <div>
                            <h4 className="font-semibold text-navy dark:text-white mb-3 flex items-center gap-2">
                                <Clock size={18} className="text-primary" />
                                Timing Windows
                            </h4>
                            <div className="grid gap-3">
                                {Object.entries(selectedMoment.timingWindows).map(([phase, timing]) => (
                                    <div key={phase} className="flex items-center justify-between p-3 bg-white dark:bg-navy/20 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">{phase}</span>
                                        <span className="text-sm font-semibold text-navy dark:text-white">{timing}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Generate Brief Button */}
                        <button
                            onClick={generateBrief}
                            disabled={loading}
                            className="w-full btn-primary flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Generating Brief...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    Generate Content Brief
                                </>
                            )}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Brief Modal */}
            <AnimatePresence>
                {showBrief && selectedMoment && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowBrief(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-card p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-navy dark:text-white">AI-Generated Content Brief</h3>
                                <button
                                    onClick={() => setShowBrief(false)}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-navy/50 rounded-lg transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-primary/10 border-l-4 border-primary rounded">
                                    <h4 className="font-bold text-navy dark:text-white mb-2">Campaign: {selectedMoment.name}</h4>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        Target this high-opportunity moment (Score: {selectedMoment.opportunityScore}/100) with culturally relevant content that resonates with Malaysian audiences.
                                    </p>
                                </div>

                                <div>
                                    <h5 className="font-semibold text-navy dark:text-white mb-2">Recommended Strategy:</h5>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Launch your campaign during the <strong>{Object.keys(selectedMoment.timingWindows)[0]}</strong> phase
                                        ({selectedMoment.timingWindows[Object.keys(selectedMoment.timingWindows)[0]]}).
                                        Focus on {selectedMoment.contentThemes.slice(0, 2).join(' and ')} to maximize engagement.
                                    </p>
                                </div>

                                <div>
                                    <h5 className="font-semibold text-navy dark:text-white mb-2">Budget Allocation:</h5>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        Recommended: <strong>{selectedMoment.budgetAllocation}</strong>
                                    </p>
                                </div>

                                <button className="w-full btn-secondary flex items-center justify-center gap-2">
                                    <Download size={18} />
                                    Download Full Brief (PDF)
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CultureCodeDemo;
