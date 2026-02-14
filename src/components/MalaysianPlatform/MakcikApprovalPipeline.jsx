import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, Terminal, ShieldCheck, Check, HelpCircle, AlertTriangle, DollarSign, Users, Zap } from 'lucide-react';

const MakcikApprovalPipeline = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [commandIndex, setCommandIndex] = useState(0);
    const [typingText, setTypingText] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [charIndex, setCharIndex] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);

    // Editable inputs
    const [inputs, setInputs] = useState({
        contentType: 'Social Media Post',
        audience: 'Multi-Ethnic Malaysian'
    });

    const commands = [
        { cmd: '$ receive_content(from="mamak_layer")', tooltip: 'Loading content package from Layer 2 for validation', delay: 800, pauseAfter: 400 },
        { cmd: '✓ Loaded: 10 IG captions, TikTok script, SEO keywords', tooltip: null, delay: 600, pauseAfter: 800 },
        { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
        { cmd: '$ jakim_guardian.check_halal(content=all_captions)', tooltip: 'Scanning content for halal compliance issues', delay: 1200, pauseAfter: 500 },
        { cmd: '  → Checking ingredient mentions...', tooltip: 'Ensures no haram ingredients like pork, alcohol, non-halal gelatin', delay: 500, pauseAfter: 300 },
        { cmd: '  → Validating food preparation terms...', tooltip: 'Words like "halal-certified", "no pork", "Muslim-friendly"', delay: 500, pauseAfter: 300 },
        { cmd: '  → Scanning imagery descriptions...', tooltip: 'No imagery that conflicts with halal standards', delay: 500, pauseAfter: 400 },
        { cmd: '✓ PASSED: No haram ingredients detected (230 checks)', tooltip: 'Content is safe for Muslim audience', delay: 600, pauseAfter: 800 },
        { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
        { cmd: '$ mcmc_safepost.validate_legal(content=tiktok_script)', tooltip: 'Checking Malaysian Communications & Multimedia Commission regulations', delay: 1200, pauseAfter: 500 },
        { cmd: '  → Scanning for prohibited content...', tooltip: 'Sedition, fake news, defamation, obscenity', delay: 500, pauseAfter: 300 },
        { cmd: '  → Checking advertising compliance...', tooltip: 'Must disclose ads, sponsored content, affiliate links', delay: 500, pauseAfter: 300 },
        { cmd: '  → Validating health/safety claims...', tooltip: 'Cannot make false medical or health claims', delay: 500, pauseAfter: 400 },
        { cmd: '✓ PASSED: All MCMC regulations met', tooltip: 'Content meets Malaysian legal standards', delay: 600, pauseAfter: 800 },
        { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
        { cmd: '$ sensitivity_checker.validate(audience="multi_ethnic")', tooltip: 'Ensuring content is appropriate for diverse Malaysian cultures', delay: 1200, pauseAfter: 500 },
        { cmd: '  → Checking Malay cultural sensitivity...', tooltip: 'Respectful of Islamic values, Malay customs', delay: 500, pauseAfter: 300 },
        { cmd: '  → Checking Chinese cultural sensitivity...', tooltip: 'No conflicting symbolism, auspicious language', delay: 500, pauseAfter: 300 },
        { cmd: '  → Checking Indian cultural sensitivity...', tooltip: 'Vegetarian awareness, Hindu/Tamil cultural respect', delay: 500, pauseAfter: 300 },
        { cmd: '  → Analyzing tone and language balance...', tooltip: 'Not favoring one culture over others', delay: 500, pauseAfter: 400 },
        { cmd: '✓ PASSED: 96/100 appropriateness score', tooltip: 'Content is culturally inclusive and sensitive', delay: 600, pauseAfter: 800 },
        { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
        { cmd: '$ ringgit_psychology.optimize_price(product="cream_cheese")', tooltip: 'Applying Malaysian pricing psychology for conversions', delay: 1200, pauseAfter: 500 },
        { cmd: '  → Analyzing Malaysian price thresholds...', tooltip: 'RM 9.90, 19.90, 29.90 convert better than round numbers', delay: 500, pauseAfter: 300 },
        { cmd: '  → Testing: RM 20.00 vs RM 19.90', tooltip: 'Psychological pricing makes RM 19.90 feel significantly cheaper', delay: 500, pauseAfter: 300 },
        { cmd: '  → Calculating conversion impact...', tooltip: 'Based on 50,000+ Malaysian e-commerce transactions', delay: 500, pauseAfter: 400 },
        { cmd: '✓ Optimal Price: RM 19.90 (+12% conversion vs RM 20.00)', tooltip: 'Malaysians respond better to .90 pricing', delay: 600, pauseAfter: 800 },
        { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
        { cmd: '$ influencer_rates.suggest(budget=RM15000)', tooltip: 'Finding best-value Malaysian influencers within budget', delay: 1200, pauseAfter: 500 },
        { cmd: '  → Scanning 2,400+ Malaysian influencers...', tooltip: 'Database of TikTok, Instagram, Facebook creators', delay: 600, pauseAfter: 300 },
        { cmd: '  → Filtering by: F&B niche + engagement rate', tooltip: 'Food influencers with >5% engagement preferred', delay: 500, pauseAfter: 300 },
        { cmd: '  → Calculating ROI per influencer tier...', tooltip: 'Micro (10K-50K) often gives better ROI than macro', delay: 500, pauseAfter: 400 },
        { cmd: '✓ Recommended: 3 micro-influencers', tooltip: null, delay: 500, pauseAfter: 300 },
        { cmd: '  • @makan_sedap (32K followers) - RM 3,500', tooltip: 'Authentic food reviews, high trust', delay: 400, pauseAfter: 200 },
        { cmd: '  • @dapur_kita (28K followers) - RM 3,000', tooltip: 'Recipe creator, strong engagement', delay: 400, pauseAfter: 200 },
        { cmd: '  • @foodies_my (41K followers) - RM 4,200', tooltip: 'Multi-ethnic audience, CNY content history', delay: 400, pauseAfter: 400 },
        { cmd: '✓ Total Cost: RM 10,700 (Budget remaining: RM 4,300)', tooltip: null, delay: 500, pauseAfter: 300 },
        { cmd: '✓ Predicted ROI: 280%', tooltip: 'Based on their past campaign performance', delay: 500, pauseAfter: 800 },
        { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
        { cmd: '🎯 APPROVAL COMPLETE - CAMPAIGN READY!', tooltip: null, delay: 600, pauseAfter: 400 },
        { cmd: '   All 5 validation checks passed. Content cleared for deployment.', tooltip: null, delay: 400, pauseAfter: 500 }
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
        <section className="py-24 bg-gradient-to-b from-navy/5 to-transparent dark:from-navy/10">
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
                            <div className="w-12 h-12 rounded-lg bg-navy/20 flex items-center justify-center">
                                <ShieldCheck size={24} className="text-navy" />
                            </div>
                            <h2 className="text-4xl font-bold">LAYER 3: Makcik Approval</h2>
                        </div>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                            Compliance validation ensuring halal, legal, cultural, pricing, and influencer optimization
                        </p>
                        
                        {/* Tools List */}
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                            <span className="font-bold text-navy">🔧 5 Tools Working Together:</span>
                            <span className="px-3 py-1 bg-navy/10 rounded-full font-medium">JAKIM Guardian</span>
                            <ArrowRight size={16} className="text-navy" />
                            <span className="px-3 py-1 bg-navy/10 rounded-full font-medium">MCMC SafePost</span>
                            <ArrowRight size={16} className="text-navy" />
                            <span className="px-3 py-1 bg-navy/10 rounded-full font-medium">Sensitivity Checker</span>
                            <ArrowRight size={16} className="text-navy" />
                            <span className="px-3 py-1 bg-navy/10 rounded-full font-medium">Ringgit Psychology</span>
                            <ArrowRight size={16} className="text-navy" />
                            <span className="px-3 py-1 bg-navy/10 rounded-full font-medium">Influencer Rates</span>
                        </div>
                    </div>

                    {/* Editable Inputs */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-6 rounded-xl border border-navy/20 mb-6"
                    >
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <ShieldCheck size={18} className="text-navy" />
                            Configure Validation
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase">Content Type</label>
                                <select
                                    value={inputs.contentType}
                                    onChange={(e) => { setInputs({...inputs, contentType: e.target.value}); handleReset(); }}
                                    className="w-full px-4 py-2 rounded-lg border border-navy/20 dark:border-white/20 bg-white dark:bg-navy-dark focus:border-navy outline-none"
                                >
                                    <option>Social Media Post</option>
                                    <option>Video Script</option>
                                    <option>Blog Article</option>
                                    <option>Advertisement</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase">Target Audience</label>
                                <select
                                    value={inputs.audience}
                                    onChange={(e) => { setInputs({...inputs, audience: e.target.value}); handleReset(); }}
                                    className="w-full px-4 py-2 rounded-lg border border-navy/20 dark:border-white/20 bg-white dark:bg-navy-dark focus:border-navy outline-none"
                                >
                                    <option>Multi-Ethnic Malaysian</option>
                                    <option>Muslim Majority</option>
                                    <option>Chinese Community</option>
                                    <option>Urban Professionals</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content Received Indicator */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-4 rounded-lg border border-teal/20 bg-teal/5 mb-6"
                    >
                        <div className="flex items-center justify-center gap-2 text-sm">
                            <ArrowRight size={16} className="text-teal" />
                            <span className="font-bold text-teal">Content Received from Layer 2:</span>
                            <span className="text-gray-700 dark:text-gray-300">10 captions • TikTok script • SEO keywords</span>
                        </div>
                    </motion.div>

                    {/* Execute Button */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <button
                            onClick={handleExecute}
                            disabled={isRunning}
                            className="flex items-center gap-3 px-8 py-4 bg-navy text-white rounded-xl font-bold shadow-lg shadow-navy/30 hover:shadow-xl transition-all disabled:opacity-50"
                        >
                            <Play size={20} fill="currentColor" />
                            {isRunning ? 'Running Validation...' : 'Execute Validation Pipeline'}
                        </button>
                        
                        {showResults && (
                            <button
                                onClick={handleReset}
                                className="px-6 py-4 bg-white dark:bg-navy-dark border border-navy/20 rounded-xl font-bold hover:border-navy/50 transition-all"
                            >
                                Reset
                            </button>
                        )}
                    </div>

                    {/* Terminal Execution */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-6 rounded-xl border-2 border-navy/20 bg-navy-dark text-teal mb-8"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Terminal size={20} className="text-teal" />
                                <h3 className="font-bold text-white">Live Pipeline Execution</h3>
                            </div>
                            {isRunning && (
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                                    <span className="text-xs font-bold text-teal">VALIDATING</span>
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
                                        cmd.cmd.startsWith('  •') ? 'text-yellow-400' :
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
                                        typingText.startsWith('  •') ? 'text-yellow-400' :
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
                                    <span>Ready to validate campaign...</span>
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
                                className="glass-card p-8 rounded-xl border-2 border-green-500/30 bg-gradient-to-r from-green-500/10 to-teal/10"
                            >
                                <div className="flex items-center justify-center gap-3 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <Check size={32} className="text-green-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">✅ CAMPAIGN APPROVED!</h3>
                                        <p className="text-gray-600 dark:text-gray-400">All validation checks passed - Ready to deploy</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-5 gap-4 mb-6">
                                    <div className="text-center p-4 bg-white dark:bg-navy-dark rounded-lg border-2 border-green-500/30">
                                        <ShieldCheck size={24} className="text-green-500 mx-auto mb-2" />
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">HALAL</p>
                                        <p className="text-lg font-bold text-green-600">PASSED</p>
                                    </div>
                                    <div className="text-center p-4 bg-white dark:bg-navy-dark rounded-lg border-2 border-green-500/30">
                                        <AlertTriangle size={24} className="text-green-500 mx-auto mb-2" />
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">LEGAL</p>
                                        <p className="text-lg font-bold text-green-600">PASSED</p>
                                    </div>
                                    <div className="text-center p-4 bg-white dark:bg-navy-dark rounded-lg border-2 border-green-500/30">
                                        <Users size={24} className="text-green-500 mx-auto mb-2" />
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">CULTURAL</p>
                                        <p className="text-lg font-bold">96/100</p>
                                    </div>
                                    <div className="text-center p-4 bg-white dark:bg-navy-dark rounded-lg border-2 border-green-500/30">
                                        <DollarSign size={24} className="text-green-500 mx-auto mb-2" />
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">PRICING</p>
                                        <p className="text-lg font-bold">RM 19.90</p>
                                    </div>
                                    <div className="text-center p-4 bg-white dark:bg-navy-dark rounded-lg border-2 border-green-500/30">
                                        <Zap size={24} className="text-green-500 mx-auto mb-2" />
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">INFLUENCER ROI</p>
                                        <p className="text-lg font-bold">280%</p>
                                    </div>
                                </div>

                                <div className="text-center bg-gradient-to-r from-primary/10 to-teal/10 p-6 rounded-lg">
                                    <h4 className="font-bold text-lg mb-3">🎯 COMPLETE END-TO-END CAMPAIGN</h4>
                                    <div className="flex flex-wrap items-center justify-center gap-2 text-sm mb-4">
                                        <span className="px-3 py-1 bg-primary/20 rounded-full font-bold text-primary">Layer 1 Intel</span>
                                        <ArrowRight size={16} />
                                        <span className="px-3 py-1 bg-teal/20 rounded-full font-bold text-teal">Layer 2 Content</span>
                                        <ArrowRight size={16} />
                                        <span className="px-3 py-1 bg-green-500/20 rounded-full font-bold text-green-600">Layer 3 Approval</span>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        <strong>Total Budget:</strong> RM 15,000 • 
                                        <strong> Predicted ROI:</strong> 340% • 
                                        <strong> Estimated Revenue:</strong> RM 51,000
                                    </p>
                                    <div className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-bold">
                                        <Check size={20} />
                                        Ready to Launch Campaign
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

export default MakcikApprovalPipeline;
