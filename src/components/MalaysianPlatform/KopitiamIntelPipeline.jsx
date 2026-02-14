import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, Terminal, Calendar, TrendingUp, DollarSign, Users, Target, HelpCircle, Check } from 'lucide-react';

const KopitiamIntelPipeline = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [commandIndex, setCommandIndex] = useState(0);
    const [typingText, setTypingText] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [charIndex, setCharIndex] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);

    // Editable inputs
    const [inputs, setInputs] = useState({
        event: 'Chinese New Year',
        region: 'Nationwide',
        category: 'Food & Beverage'
    });

    const commands = [
        { cmd: '$ culture_code.detect_moment()', tooltip: 'Scanning cultural calendar for upcoming events and commercial opportunities', delay: 1000, pauseAfter: 500 },
        { cmd: '✓ Found: CNY in 30 days (High commercial potential)', tooltip: null, delay: 600, pauseAfter: 800 },
        { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
        { cmd: '$ kopitiam_oracle.predict_trends(moment="CNY")', tooltip: 'Analyzing 50,000+ social posts for CNY-related trending topics', delay: 1200, pauseAfter: 500 },
        { cmd: '  → Scanning TikTok for CNY content...', tooltip: 'Checking viral videos, trending sounds, popular hashtags', delay: 600, pauseAfter: 300 },
        { cmd: '  → Analyzing Instagram engagement patterns...', tooltip: 'Looking at Reels, Stories, post interactions', delay: 600, pauseAfter: 300 },
        { cmd: '  → Processing Facebook community discussions...', tooltip: 'Finding what families are planning, discussing, sharing', delay: 600, pauseAfter: 400 },
        { cmd: '✓ Top Trend: Reunion Recipes (89% confidence)', tooltip: 'AI predicts "easy reunion dinner recipes" will trend heavily', delay: 600, pauseAfter: 800 },
        { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
        { cmd: '$ subsidy_tracker.check_policies(event="CNY")', tooltip: 'Monitoring government announcements for subsidies and tax changes', delay: 1000, pauseAfter: 500 },
        { cmd: '  → Checking Ministry of Finance announcements...', tooltip: 'Recent policy changes affecting F&B businesses', delay: 500, pauseAfter: 300 },
        { cmd: '  → Scanning MDTCA (Malaysian Digital Trade) updates...', tooltip: 'E-commerce incentives during festive seasons', delay: 500, pauseAfter: 400 },
        { cmd: '✓ Found: 15% F&B tax relief during CNY period', tooltip: 'This means lower costs = better profit margins for you', delay: 600, pauseAfter: 800 },
        { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
        { cmd: '$ singaporean_hunter.predict_traffic(event="CNY")', tooltip: 'Analyzing cross-border shopping patterns from Singapore to JB/MY', delay: 1000, pauseAfter: 500 },
        { cmd: '  → Tracking SGD/MYR exchange rate trends...', tooltip: 'Current rate: 1 SGD = 3.50 MYR (favorable for SG shoppers)', delay: 500, pauseAfter: 300 },
        { cmd: '  → Analyzing historical CNY weekend traffic...', tooltip: 'Last 3 CNYs saw 35-45% increase in cross-border shopping', delay: 500, pauseAfter: 300 },
        { cmd: '  → Predicting spending patterns...', tooltip: 'Singaporeans typically spend 2-3x more during festive seasons', delay: 500, pauseAfter: 400 },
        { cmd: '✓ Expected: 40% increase in SG shoppers to JB', tooltip: 'Prime opportunity to target Singaporean customers', delay: 600, pauseAfter: 800 },
        { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
        { cmd: '$ festival_roi.optimize_budget(inputs=all_intel_data)', tooltip: 'Using all 4 tools\' data to calculate optimal budget allocation', delay: 1200, pauseAfter: 500 },
        { cmd: '  → Factoring in: Cultural moment timing', tooltip: 'CNY is 30 days away - optimal campaign start time', delay: 400, pauseAfter: 200 },
        { cmd: '  → Factoring in: Predicted trend strength', tooltip: 'Reunion recipes trend at 89% confidence = high ROI potential', delay: 400, pauseAfter: 200 },
        { cmd: '  → Factoring in: Government incentives', tooltip: '15% tax relief increases profit margins', delay: 400, pauseAfter: 200 },
        { cmd: '  → Factoring in: Cross-border traffic surge', tooltip: '40% more Singaporean shoppers = larger market size', delay: 400, pauseAfter: 400 },
        { cmd: '✓ Recommended Budget: RM 15,000', tooltip: null, delay: 500, pauseAfter: 300 },
        { cmd: '✓ Predicted ROI: 340%', tooltip: 'For every RM 1 spent, expect RM 3.40 return', delay: 500, pauseAfter: 300 },
        { cmd: '✓ Estimated Revenue: RM 51,000', tooltip: 'Based on historical data and current market conditions', delay: 500, pauseAfter: 800 },
        { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
        { cmd: '🎯 INTELLIGENCE REPORT COMPLETE', tooltip: null, delay: 600, pauseAfter: 400 },
        { cmd: '   All 5 tools contributed to this strategic insight', tooltip: null, delay: 400, pauseAfter: 500 }
    ];

    const currentCommand = commands[commandIndex];

    // Typewriter effect
    useEffect(() => {
        if (!isRunning || !currentCommand) return;

        if (charIndex < currentCommand.cmd.length) {
            const timer = setTimeout(() => {
                setTypingText(prev => prev + currentCommand.cmd[charIndex]);
                setCharIndex(prev => prev + 1);
            }, 60);

            return () => clearTimeout(timer);
        } else {
            if (currentCommand.tooltip) {
                setShowTooltip(true);
            }
            
            const timer = setTimeout(() => {
                setShowTooltip(false);
                setCommandIndex(prev => prev + 1);
                setTypingText('');
                setCharIndex(0);
            }, currentCommand.pauseAfter);

            return () => clearTimeout(timer);
        }
    }, [isRunning, charIndex, currentCommand, commandIndex]);

    // Check if execution is complete
    useEffect(() => {
        if (isRunning && commandIndex >= commands.length) {
            setTimeout(() => {
                setShowResults(true);
                setIsRunning(false);
            }, 1000);
        }
    }, [isRunning, commandIndex]);

    const handleExecute = () => {
        setCommandIndex(0);
        setCharIndex(0);
        setTypingText('');
        setShowResults(false);
        setShowTooltip(false);
        setIsRunning(true);
    };

    const handleReset = () => {
        setCommandIndex(0);
        setCharIndex(0);
        setTypingText('');
        setShowResults(false);
        setShowTooltip(false);
        setIsRunning(false);
    };

    const completedCommands = commands.slice(0, commandIndex);

    return (
        <section className="py-24 bg-gradient-to-b from-primary/5 to-transparent dark:from-primary/10">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto"
                >
                    {/* Layer Header */}
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                                <Calendar size={24} className="text-primary" />
                            </div>
                            <h2 className="text-4xl font-bold">LAYER 1: Kopitiam Intel</h2>
                        </div>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                            Market intelligence tracking cultural moments, trends, subsidies, and cross-border patterns
                        </p>
                        
                        {/* Tools List */}
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                            <span className="font-bold text-primary">🔧 5 Tools Working Together:</span>
                            <span className="px-3 py-1 bg-primary/10 rounded-full font-medium">Culture Code</span>
                            <ArrowRight size={16} className="text-primary" />
                            <span className="px-3 py-1 bg-primary/10 rounded-full font-medium">Kopitiam Oracle</span>
                            <ArrowRight size={16} className="text-primary" />
                            <span className="px-3 py-1 bg-primary/10 rounded-full font-medium">Subsidy Tracker</span>
                            <ArrowRight size={16} className="text-primary" />
                            <span className="px-3 py-1 bg-primary/10 rounded-full font-medium">SG Hunter</span>
                            <ArrowRight size={16} className="text-primary" />
                            <span className="px-3 py-1 bg-primary/10 rounded-full font-medium">Festival ROI</span>
                        </div>
                    </div>

                    {/* Editable Inputs */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-6 rounded-xl border border-primary/20 mb-6"
                    >
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Target size={18} className="text-primary" />
                            Configure Your Analysis
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase">Event</label>
                                <select
                                    value={inputs.event}
                                    onChange={(e) => { setInputs({...inputs, event: e.target.value}); handleReset(); }}
                                    className="w-full px-4 py-2 rounded-lg border border-navy/20 dark:border-white/20 bg-white dark:bg-navy-dark focus:border-primary outline-none"
                                >
                                    <option>Chinese New Year</option>
                                    <option>Hari Raya</option>
                                    <option>Deepavali</option>
                                    <option>Christmas</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase">Region</label>
                                <select
                                    value={inputs.region}
                                    onChange={(e) => { setInputs({...inputs, region: e.target.value}); handleReset(); }}
                                    className="w-full px-4 py-2 rounded-lg border border-navy/20 dark:border-white/20 bg-white dark:bg-navy-dark focus:border-primary outline-none"
                                >
                                    <option>Nationwide</option>
                                    <option>Kuala Lumpur</option>
                                    <option>Penang</option>
                                    <option>Johor Bahru</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase">Category</label>
                                <select
                                    value={inputs.category}
                                    onChange={(e) => { setInputs({...inputs, category: e.target.value}); handleReset(); }}
                                    className="w-full px-4 py-2 rounded-lg border border-navy/20 dark:border-white/20 bg-white dark:bg-navy-dark focus:border-primary outline-none"
                                >
                                    <option>Food & Beverage</option>
                                    <option>Fashion</option>
                                    <option>Electronics</option>
                                    <option>Beauty</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>

                    {/* Execute Button */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <button
                            onClick={handleExecute}
                            disabled={isRunning}
                            className="flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/30 hover:shadow-xl transition-all disabled:opacity-50"
                        >
                            <Play size={20} fill="currentColor" />
                            {isRunning ? 'Running Pipeline...' : 'Execute Intelligence Pipeline'}
                        </button>
                        
                        {showResults && (
                            <button
                                onClick={handleReset}
                                className="px-6 py-4 bg-white dark:bg-navy-dark border border-primary/20 rounded-xl font-bold hover:border-primary/50 transition-all"
                            >
                                Reset
                            </button>
                        )}
                    </div>

                    {/* Terminal Execution */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-6 rounded-xl border-2 border-primary/20 bg-navy-dark text-teal mb-8"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Terminal size={20} className="text-teal" />
                                <h3 className="font-bold text-white">Live Pipeline Execution</h3>
                            </div>
                            {isRunning && (
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                                    <span className="text-xs font-bold text-teal">RUNNING</span>
                                </div>
                            )}
                        </div>

                        <div className="bg-black/30 rounded-lg p-6 font-mono text-sm min-h-[400px] max-h-[600px] overflow-y-auto">
                            {completedCommands.map((cmd, idx) => (
                                <div key={idx} className="mb-1">
                                    <span className={
                                        cmd.cmd.startsWith('✓') ? 'text-teal' : 
                                        cmd.cmd.startsWith('$') ? 'text-primary' :
                                        cmd.cmd.startsWith('🎯') ? 'text-blue-400' :
                                        'text-gray-400'
                                    }>
                                        {cmd.cmd}
                                    </span>
                                    {cmd.tooltip && (
                                        <div className="ml-6 mb-2 flex items-start gap-2 text-gray-400 text-xs">
                                            <HelpCircle size={12} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                            <span className="italic">{cmd.tooltip}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            {isRunning && typingText && (
                                <div>
                                    <span className={
                                        typingText.startsWith('✓') ? 'text-teal' : 
                                        typingText.startsWith('$') ? 'text-primary' :
                                        typingText.startsWith('🎯') ? 'text-blue-400' :
                                        'text-gray-400'
                                    }>
                                        {typingText}
                                        <motion.span
                                            animate={{ opacity: [1, 0.3, 1] }}
                                            transition={{ repeat: Infinity, duration: 1 }}
                                            className="inline-block w-2 h-4 bg-teal ml-1"
                                        />
                                    </span>
                                    {showTooltip && currentCommand?.tooltip && (
                                        <div className="ml-6 mb-2 flex items-start gap-2 text-gray-400 text-xs">
                                            <HelpCircle size={12} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                            <span className="italic">{currentCommand.tooltip}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {!isRunning && commandIndex === 0 && (
                                <div className="text-gray-500 flex items-center gap-2">
                                    <Terminal size={16} />
                                    <span>Ready to execute intelligence pipeline...</span>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Results */}
                    <AnimatePresence>
                        {showResults && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card p-8 rounded-xl border-2 border-teal/30 bg-gradient-to-r from-teal/10 to-primary/10"
                            >
                                <div className="flex items-center justify-center gap-3 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center">
                                        <Check size={32} className="text-teal" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-teal">Intelligence Report Complete!</h3>
                                        <p className="text-gray-600 dark:text-gray-400">All 5 tools analyzed {inputs.event} opportunity</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-5 gap-4 mb-6">
                                    <div className="text-center p-4 bg-white dark:bg-navy-dark rounded-lg">
                                        <Calendar size={24} className="text-primary mx-auto mb-2" />
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">TIMING</p>
                                        <p className="text-lg font-bold">30 Days</p>
                                    </div>
                                    <div className="text-center p-4 bg-white dark:bg-navy-dark rounded-lg">
                                        <TrendingUp size={24} className="text-teal mx-auto mb-2" />
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">TREND</p>
                                        <p className="text-lg font-bold">89%</p>
                                    </div>
                                    <div className="text-center p-4 bg-white dark:bg-navy-dark rounded-lg">
                                        <Target size={24} className="text-primary mx-auto mb-2" />
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">TAX RELIEF</p>
                                        <p className="text-lg font-bold">15%</p>
                                    </div>
                                    <div className="text-center p-4 bg-white dark:bg-navy-dark rounded-lg">
                                        <Users size={24} className="text-teal mx-auto mb-2" />
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">SG TRAFFIC</p>
                                        <p className="text-lg font-bold">+40%</p>
                                    </div>
                                    <div className="text-center p-4 bg-white dark:bg-navy-dark rounded-lg">
                                        <DollarSign size={24} className="text-primary mx-auto mb-2" />
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">PREDICTED ROI</p>
                                        <p className="text-lg font-bold">340%</p>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        💡 This intelligence package is now ready to feed into Layer 2 (Content Creation)
                                    </p>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary font-bold text-sm">
                                        <ArrowRight size={16} />
                                        Data flows to Mamak Workshop for content generation
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default KopitiamIntelPipeline;
