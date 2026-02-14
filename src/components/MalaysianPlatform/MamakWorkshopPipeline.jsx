import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, Terminal, MessageSquare, Zap, Check, HelpCircle, FileText, Globe, Megaphone } from 'lucide-react';

const MamakWorkshopPipeline = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [commandIndex, setCommandIndex] = useState(0);
    const [typingText, setTypingText] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [charIndex, setCharIndex] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);

    // Editable inputs
    const [inputs, setInputs] = useState({
        product: 'Cream Cheese',
        tone: 'Friendly',
        platform: 'Instagram'
    });

    const commands = [
        { cmd: '$ receive_intel(from="kopitiam_layer")', tooltip: 'Loading intelligence data from Layer 1 analysis', delay: 800, pauseAfter: 400 },
        { cmd: '✓ Loaded: CNY campaign, Reunion Recipe trend, RM15K budget', tooltip: null, delay: 600, pauseAfter: 800 },
        { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
        { cmd: '$ rojak_translator.localize(concept="reunion_recipes")', tooltip: 'Translating concept into natural Malaysian Rojak (BM + English mix)', delay: 1200, pauseAfter: 500 },
        { cmd: '  → Analyzing Malaysian communication patterns...', tooltip: 'How Malaysians naturally code-switch between languages', delay: 500, pauseAfter: 300 },
        { cmd: '  → Loading cultural idioms and slang...', tooltip: 'Manglish phrases like "lah", "one", "can", "confirm"', delay: 500, pauseAfter: 300 },
        { cmd: '  → Generating code-switched variations...', tooltip: 'Creating text that sounds like a Malaysian speaking', delay: 500, pauseAfter: 400 },
        { cmd: '✓ Generated: "Reunion dinner ideas yang confirm sedap!"', tooltip: 'Natural Manglish - English + Malay mixed authentically', delay: 600, pauseAfter: 800 },
        { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
        { cmd: '$ mamak_copy.generate(style="rojak", platform="Instagram")', tooltip: 'Creating Instagram captions with Manglish style', delay: 1200, pauseAfter: 500 },
        { cmd: '  → Applying friendly tone...', tooltip: 'Casual, approachable language Malaysians use with friends', delay: 400, pauseAfter: 200 },
        { cmd: '  → Adding emoji patterns...', tooltip: 'Emojis Malaysians commonly use: 😋🔥😍👍', delay: 400, pauseAfter: 200 },
        { cmd: '  → Inserting CNY cultural references...', tooltip: 'Reunion dinner, angpau, family gathering themes', delay: 400, pauseAfter: 200 },
        { cmd: '  → Optimizing for Instagram engagement...', tooltip: 'Hashtags, line breaks, call-to-action placement', delay: 400, pauseAfter: 400 },
        { cmd: '✓ 10 caption variations generated', tooltip: null, delay: 500, pauseAfter: 300 },
        { cmd: '✓ Average engagement score: 8.9/10', tooltip: 'Based on AI prediction of likes, comments, shares', delay: 500, pauseAfter: 800 },
        { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
        { cmd: '$ live_seller_script.create(product="cream_cheese")', tooltip: 'Building TikTok Live selling script for real-time sales', delay: 1200, pauseAfter: 500 },
        { cmd: '  → Loading urgency tactics library...', tooltip: 'Phrases like "Limited stock!", "While stock last!", "Last chance!"', delay: 500, pauseAfter: 300 },
        { cmd: '  → Generating price anchoring scripts...', tooltip: 'Show higher price first, then discount: "RM25 → RM19.90!"', delay: 500, pauseAfter: 300 },
        { cmd: '  → Inserting Manglish selling phrases...', tooltip: 'Natural seller language: "Eh fast fast grab ah!", "Confirm worth it one!"', delay: 500, pauseAfter: 400 },
        { cmd: '✓ TikTok Live script ready (12 minutes duration)', tooltip: 'Complete script with timing, pauses, product demos', delay: 600, pauseAfter: 800 },
        { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
        { cmd: '$ seo_translator.optimize(keywords="reunion+recipes")', tooltip: 'Converting international SEO to how Malaysians actually search', delay: 1200, pauseAfter: 500 },
        { cmd: '  → Analyzing 12,000+ Malaysian search patterns...', tooltip: 'How Malaysians type in Google search bar', delay: 600, pauseAfter: 300 },
        { cmd: '  → Converting: "reunion recipes" → ?', tooltip: null, delay: 500, pauseAfter: 200 },
        { cmd: '✓ Optimized: "resepi reunion dinner simple sedap"', tooltip: 'Malaysians search with Rojak: English + Malay keywords mixed', delay: 600, pauseAfter: 300 },
        { cmd: '✓ Search volume: 8,900/month in Malaysia', tooltip: 'Much higher than pure English "reunion recipes" (only 340/month)', delay: 600, pauseAfter: 800 },
        { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
        { cmd: '🎯 CONTENT PACKAGE COMPLETE', tooltip: null, delay: 600, pauseAfter: 400 },
        { cmd: '   All 4 tools transformed intelligence into ready content', tooltip: null, delay: 400, pauseAfter: 500 }
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
        <section className="py-24 bg-gradient-to-b from-teal/5 to-transparent dark:from-teal/10">
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
                            <div className="w-12 h-12 rounded-lg bg-teal/20 flex items-center justify-center">
                                <MessageSquare size={24} className="text-teal" />
                            </div>
                            <h2 className="text-4xl font-bold">LAYER 2: Mamak Workshop</h2>
                        </div>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                            Content creation generating campaigns, translations, scripts, and SEO in authentic Malaysian style
                        </p>
                        
                        {/* Tools List */}
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                            <span className="font-bold text-teal">🔧 4 Tools Working Together:</span>
                            <span className="px-3 py-1 bg-teal/10 rounded-full font-medium">Rojak Translator</span>
                            <ArrowRight size={16} className="text-teal" />
                            <span className="px-3 py-1 bg-teal/10 rounded-full font-medium">Mamak Copy</span>
                            <ArrowRight size={16} className="text-teal" />
                            <span className="px-3 py-1 bg-teal/10 rounded-full font-medium">Live Seller Script</span>
                            <ArrowRight size={16} className="text-teal" />
                            <span className="px-3 py-1 bg-teal/10 rounded-full font-medium">SEO Translator</span>
                        </div>
                    </div>

                    {/* Editable Inputs */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-6 rounded-xl border border-teal/20 mb-6"
                    >
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Zap size={18} className="text-teal" />
                            Configure Your Content
                        </h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase">Product</label>
                                <select
                                    value={inputs.product}
                                    onChange={(e) => { setInputs({...inputs, product: e.target.value}); handleReset(); }}
                                    className="w-full px-4 py-2 rounded-lg border border-navy/20 dark:border-white/20 bg-white dark:bg-navy-dark focus:border-teal outline-none"
                                >
                                    <option>Cream Cheese</option>
                                    <option>Coffee</option>
                                    <option>Skincare</option>
                                    <option>Electronics</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase">Tone</label>
                                <select
                                    value={inputs.tone}
                                    onChange={(e) => { setInputs({...inputs, tone: e.target.value}); handleReset(); }}
                                    className="w-full px-4 py-2 rounded-lg border border-navy/20 dark:border-white/20 bg-white dark:bg-navy-dark focus:border-teal outline-none"
                                >
                                    <option>Friendly</option>
                                    <option>Professional</option>
                                    <option>Humorous</option>
                                    <option>Persuasive</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase">Platform</label>
                                <select
                                    value={inputs.platform}
                                    onChange={(e) => { setInputs({...inputs, platform: e.target.value}); handleReset(); }}
                                    className="w-full px-4 py-2 rounded-lg border border-navy/20 dark:border-white/20 bg-white dark:bg-navy-dark focus:border-teal outline-none"
                                >
                                    <option>Instagram</option>
                                    <option>Facebook</option>
                                    <option>TikTok</option>
                                    <option>LinkedIn</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>

                    {/* Intel Received Indicator */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-4 rounded-lg border border-primary/20 bg-primary/5 mb-6"
                    >
                        <div className="flex items-center justify-center gap-2 text-sm">
                            <ArrowRight size={16} className="text-primary" />
                            <span className="font-bold text-primary">Intelligence Received from Layer 1:</span>
                            <span className="text-gray-700 dark:text-gray-300">CNY trend • 89% confidence • RM15K budget • 40% SG traffic</span>
                        </div>
                    </motion.div>

                    {/* Execute Button */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <button
                            onClick={handleExecute}
                            disabled={isRunning}
                            className="flex items-center gap-3 px-8 py-4 bg-teal text-white rounded-xl font-bold shadow-lg shadow-teal/30 hover:shadow-xl transition-all disabled:opacity-50"
                        >
                            <Play size={20} fill="currentColor" />
                            {isRunning ? 'Running Pipeline...' : 'Execute Content Pipeline'}
                        </button>
                        
                        {showResults && (
                            <button
                                onClick={handleReset}
                                className="px-6 py-4 bg-white dark:bg-navy-dark border border-teal/20 rounded-xl font-bold hover:border-teal/50 transition-all"
                            >
                                Reset
                            </button>
                        )}
                    </div>

                    {/* Terminal Execution */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-6 rounded-xl border-2 border-teal/20 bg-navy-dark text-teal mb-8"
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
                                    <span>Ready to execute content pipeline...</span>
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
                                        <h3 className="text-2xl font-bold text-teal">Content Package Complete!</h3>
                                        <p className="text-gray-600 dark:text-gray-400">All 4 tools created ready-to-deploy content</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-4 gap-4 mb-6">
                                    <div className="text-center p-4 bg-white dark:bg-navy-dark rounded-lg">
                                        <Globe size={24} className="text-teal mx-auto mb-2" />
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">LOCALIZED</p>
                                        <p className="text-lg font-bold">Manglish</p>
                                    </div>
                                    <div className="text-center p-4 bg-white dark:bg-navy-dark rounded-lg">
                                        <FileText size={24} className="text-primary mx-auto mb-2" />
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">CAPTIONS</p>
                                        <p className="text-lg font-bold">10</p>
                                    </div>
                                    <div className="text-center p-4 bg-white dark:bg-navy-dark rounded-lg">
                                        <Megaphone size={24} className="text-teal mx-auto mb-2" />
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">LIVE SCRIPT</p>
                                        <p className="text-lg font-bold">12 min</p>
                                    </div>
                                    <div className="text-center p-4 bg-white dark:bg-navy-dark rounded-lg">
                                        <MessageSquare size={24} className="text-primary mx-auto mb-2" />
                                        <p className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">SEO KEYWORDS</p>
                                        <p className="text-lg font-bold">8.9K/mo</p>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        💡 This content package is now ready for Layer 3 (Compliance Validation)
                                    </p>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal/10 rounded-full text-teal font-bold text-sm">
                                        <ArrowRight size={16} />
                                        Data flows to Makcik Approval for validation
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

export default MamakWorkshopPipeline;
