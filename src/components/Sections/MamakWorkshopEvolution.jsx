import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Mic, Video, MessageSquare, TrendingUp, Zap, 
    Users, DollarSign, Clock, Target, Sparkles,
    Play, Pause, RefreshCw, ChevronRight, Activity,
    Volume2, UserCircle, ShoppingCart, Flame,
    CheckCircle2, Shield, Brain
} from 'lucide-react';

// Evolution stages for Mamak Workshop
const workshopStages = [
    { 
        stage: 0, 
        name: 'Basic Translation', 
        icon: '🔄', 
        output: 'Google Translated',
        speed: 'Slow',
        authenticity: '4/10',
        color: 'red'
    },
    { 
        stage: 1, 
        name: 'Manglish GPT', 
        icon: '🧠', 
        output: 'Native Manglish',
        speed: 'Fast',
        authenticity: '9.5/10',
        color: 'orange'
    },
    { 
        stage: 2, 
        name: 'Viral Prediction', 
        icon: '🔮', 
        output: 'Pre-flight tested',
        speed: 'Simulated',
        authenticity: '87% hit rate',
        color: 'yellow'
    },
    { 
        stage: 3, 
        name: 'Voice Clone', 
        icon: '🎙️', 
        output: 'Malaysian accent',
        speed: 'Real-time',
        authenticity: 'Clone ready',
        color: 'teal'
    },
    { 
        stage: 4, 
        name: 'Live Adaptation', 
        icon: '⚡', 
        output: 'Auto-adjusting',
        speed: 'Live',
        authenticity: 'Dynamic',
        color: 'blue'
    },
    { 
        stage: 5, 
        name: 'Cultural Firewall', 
        icon: '🛡️', 
        output: 'Safety validated',
        speed: 'Instant',
        authenticity: 'Multi-ethnic OK',
        color: 'green'
    }
];

// Pipeline stage component
const PipelineStage = ({ stage, isActive, isCompleted, onClick, data }) => {
    const icons = [MessageSquare, Brain, Target, Mic, Zap, Shield];
    const Icon = icons[stage] || MessageSquare;
    
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex flex-col items-center p-4 rounded-xl transition-all min-w-[140px] ${
                isActive 
                    ? 'bg-teal text-navy-dark shadow-lg shadow-teal/30' 
                    : isCompleted
                        ? 'bg-teal/20 text-teal'
                        : 'bg-white/5 text-gray-500 hover:bg-white/10'
            }`}
        >
            <span className="text-2xl mb-2">{data.icon}</span>
            <span className="text-xs font-bold uppercase tracking-wider mb-1">
                Stage {stage}
            </span>
            <span className="text-sm font-bold text-center leading-tight">
                {data.name}
            </span>
            {isCompleted && (
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-white" />
                </div>
            )}
        </motion.button>
    );
};

// Content preview component
const ContentPreview = ({ stage }) => {
    const content = [
        { 
            input: 'Limited time offer, buy now',
            output: 'Limited time offer, buy now (translated)', 
            note: 'Sounds robotic 😬',
            score: 4
        },
        { 
            input: 'Limited time offer, buy now',
            output: 'Eh bro, this offer valid until tomorrow only lah. Don\'t kiasu later regret hor!', 
            note: 'Native Manglish generation! 🎉',
            score: 9.5
        },
        { 
            input: 'Eh bro, this offer valid until tomorrow only lah',
            output: 'Testing 3 variations... Variant B wins! 87% viral prediction',
            note: 'Pre-flight simulation complete',
            score: 87
        },
        { 
            input: 'Winning caption selected',
            output: '🎙️ "Eh bro, this offer valid until tomorrow only lah..."',
            note: 'Voice cloned with Malaysian accent',
            score: 95
        },
        { 
            input: 'Live session started',
            output: '⚡ Adapting: "Only 3 left!" (urgency inflated)',
            note: 'Real-time adaptation active',
            score: 92
        },
        { 
            input: 'Content package ready',
            output: '✅ Halal check: PASS | Racial harmony: PASS | Regional: PASS',
            note: 'Cultural safety validated',
            score: 98
        }
    ];

    const current = content[stage] || content[0];

    return (
        <div className="bg-black/40 rounded-xl p-4 border border-teal/20">
            <div className="flex items-center gap-2 mb-3 text-xs text-gray-500 uppercase tracking-wider">
                <MessageSquare size={12} />
                Content Pipeline
            </div>
            
            <div className="space-y-3">
                <div>
                    <span className="text-xs text-gray-500">Input:</span>
                    <p className="text-sm text-gray-300">{current.input}</p>
                </div>
                
                <div className="flex items-center justify-center">
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                    >
                        <ChevronRight size={20} className="text-teal rotate-90" />
                    </motion.div>
                </div>
                
                <div className="bg-teal/10 rounded-lg p-3 border-l-2 border-teal">
                    <span className="text-xs text-teal">Output:</span>
                    <p className="text-sm text-white font-medium">{current.output}</p>
                    <p className="text-xs text-teal/70 mt-1">{current.note}</p>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-gray-500">Authenticity Score</span>
                    <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-gradient-to-r from-teal to-green-400"
                                initial={{ width: 0 }}
                                animate={{ width: `${(current.score / 10) * 100}%` }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>
                        <span className="text-sm font-bold text-teal">{current.score}/10</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Live selling dashboard
const LiveSellingDashboard = ({ stage }) => {
    const [metrics, setMetrics] = useState({
        viewers: 127,
        engagement: 68,
        sales: 23,
        urgency: 'Medium'
    });

    // Simulate live metrics
    useEffect(() => {
        if (stage < 4) return;
        
        const interval = setInterval(() => {
            setMetrics(prev => ({
                viewers: prev.viewers + Math.floor(Math.random() * 5) - 2,
                engagement: Math.min(100, Math.max(0, prev.engagement + Math.floor(Math.random() * 10) - 5)),
                sales: prev.sales + (Math.random() > 0.7 ? 1 : 0),
                urgency: prev.viewers > 150 ? 'High 🔥' : prev.viewers > 100 ? 'Medium' : 'Low'
            }));
        }, 2000);

        return () => clearInterval(interval);
    }, [stage]);

    if (stage < 4) {
        return (
            <div className="bg-black/40 rounded-xl p-4 border border-white/10 h-full flex items-center justify-center">
                <div className="text-center text-gray-500">
                    <Activity size={32} className="mx-auto mb-2 opacity-30" />
                    <p className="text-sm">Live dashboard activates Stage 4+</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black/40 rounded-xl p-4 border border-red-500/30">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider">LIVE</span>
                </div>
                <div className="text-xs text-gray-500">00:12:34</div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                        <Users size={12} />
                        Viewers
                    </div>
                    <div className="text-xl font-bold text-white">{metrics.viewers}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                        <TrendingUp size={12} />
                        Engagement
                    </div>
                    <div className="text-xl font-bold text-teal">{metrics.engagement}%</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                        <ShoppingCart size={12} />
                        Sales
                    </div>
                    <div className="text-xl font-bold text-green-400">{metrics.sales}</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                        <Flame size={12} />
                        Urgency
                    </div>
                    <div className="text-sm font-bold text-orange-400">{metrics.urgency}</div>
                </div>
            </div>

            {/* Auto-adaptation log */}
            <div className="space-y-2">
                <div className="text-xs text-gray-500 uppercase tracking-wider">AI Adaptations</div>
                <AnimatePresence mode="popLayout">
                    {metrics.viewers > 140 && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center gap-2 text-xs bg-orange-500/20 text-orange-300 p-2 rounded"
                        >
                            <Zap size={12} />
                            "Only 3 left!" urgency injected
                        </motion.div>
                    )}
                    {metrics.engagement > 75 && metrics.sales < 30 && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex items-center gap-2 text-xs bg-blue-500/20 text-blue-300 p-2 rounded"
                        >
                            <UserCircle size={12} />
                            "Aminah from Shah Alam bought 2!"
                        </motion.div>
                    )}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-xs bg-green-500/20 text-green-300 p-2 rounded"
                    >
                        <Target size={12} />
                        Price test: RM99 vs RM97 running...
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};



const MamakWorkshopEvolution = () => {
    const [currentStage, setCurrentStage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [completedStage, setCompletedStage] = useState(-1);

    // Auto-play
    useEffect(() => {
        if (!isPlaying) return;
        
        const timer = setTimeout(() => {
            if (currentStage < 5) {
                setCompletedStage(currentStage);
                setCurrentStage(prev => prev + 1);
            } else {
                setCompletedStage(5);
                setIsPlaying(false);
            }
        }, 4000);
        
        return () => clearTimeout(timer);
    }, [isPlaying, currentStage]);

    const handlePlay = () => {
        setCurrentStage(0);
        setCompletedStage(-1);
        setIsPlaying(true);
    };

    const handleStageClick = (stage) => {
        setCurrentStage(stage);
        setCompletedStage(stage - 1);
        setIsPlaying(false);
    };

    const stageInfo = [
        { 
            title: 'Rule-Based Translation',
            desc: 'English → Manglish via translation rules',
            insight: 'Sounds robotic, misses cultural nuance',
            metric: '4/10 authenticity'
        },
        { 
            title: 'Native Manglish GPT',
            desc: 'LLaMA 3 fine-tuned on 20,000+ Manglish tweets, TikTok comments, WhatsApp',
            insight: 'Generates "lah", "meh", "kiasu" naturally - not translated, conceived in Manglish',
            metric: '9.5/10 authenticity'
        },
        { 
            title: 'Viral Pre-Flight',
            desc: 'Simulate 1,000 virtual Malaysians engaging with draft before publishing',
            insight: 'Test 3 caption variants, predict by demographic, require 85% confidence',
            metric: '87% prediction accuracy'
        },
        { 
            title: 'Voice & Avatar Clone',
            desc: 'Bark + OpenVoice clone Malaysian influencers, lip-sync ready avatars',
            insight: 'Code-switched speech: "This one memang best lah" with natural BM/English flow',
            metric: '95% voice match'
        },
        { 
            title: 'Adaptive Live Orchestrator',
            desc: 'Script evolves in real-time based on viewer behavior',
            insight: '50 viewers, no sales → "Only 3 left!" | High engagement → social proof injection',
            metric: 'Real-time adaptation'
        },
        { 
            title: 'Cultural Safety Firewall',
            desc: 'Multi-ethnic validation: religious sensitivity, racial harmony, regional accuracy',
            insight: 'Prevent "Kiwi bogan" style missteps that alienate local audience',
            metric: 'Multi-ethnic OK'
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-navy-dark via-navy to-navy-dark">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 text-sm font-bold mb-4">
                        <Mic size={16} />
                        Content Generation Pipeline
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Mamak Workshop Evolution
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        From Google Translate → Native Manglish AI with voice cloning & live adaptation
                    </p>
                </motion.div>

                {/* Horizontal Pipeline */}
                <div className="flex gap-3 mb-8 overflow-x-auto pb-4 scrollbar-hide justify-center">
                    {workshopStages.map((s, idx) => (
                        <React.Fragment key={idx}>
                            <PipelineStage
                                stage={idx}
                                isActive={currentStage === idx}
                                isCompleted={completedStage >= idx}
                                onClick={() => handleStageClick(idx)}
                                data={s}
                            />
                            {idx < 5 && (
                                <div className="flex items-center">
                                    <div className={`w-8 h-0.5 ${
                                        completedStage >= idx ? 'bg-teal' : 'bg-gray-700'
                                    }`} />
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Content Preview */}
                    <div className="lg:col-span-1">
                        <ContentPreview stage={currentStage} />
                    </div>

                    {/* Main Visualization Area */}
                    <div className="lg:col-span-1">
                        <motion.div
                            key={currentStage}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-black/40 rounded-2xl p-6 border border-orange-500/20 h-full"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-white">Pipeline Stage</h3>
                                <button
                                    onClick={handlePlay}
                                    disabled={isPlaying}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 text-white rounded-lg text-xs font-bold hover:bg-orange-600 transition-all disabled:opacity-50"
                                >
                                    {isPlaying ? (
                                        <RefreshCw size={12} className="animate-spin" />
                                    ) : (
                                        <Play size={12} fill="currentColor" />
                                    )}
                                    {isPlaying ? 'Running...' : 'Run Pipeline'}
                                </button>
                            </div>

                            <div className="text-center py-8">
                                <span className="text-6xl mb-4 block">{workshopStages[currentStage].icon}</span>
                                <h4 className="text-xl font-bold text-orange-400 mb-2">
                                    {stageInfo[currentStage].title}
                                </h4>
                                <p className="text-sm text-gray-400 mb-4">
                                    {stageInfo[currentStage].desc}
                                </p>
                                
                                <div className="bg-orange-500/10 rounded-lg p-3 border-l-2 border-orange-400">
                                    <p className="text-xs text-orange-300 italic">
                                        "{stageInfo[currentStage].insight}"
                                    </p>
                                </div>
                            </div>

                            {/* Progress */}
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Pipeline Progress</span>
                                    <span>{Math.round(((currentStage + 1) / 6) * 100)}%</span>
                                </div>
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
                                        animate={{ width: `${((currentStage + 1) / 6) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Live Selling Dashboard */}
                    <div className="lg:col-span-1">
                        <LiveSellingDashboard stage={currentStage} />
                    </div>
                </div>

                {/* Feature Tags */}
                <div className="flex flex-wrap justify-center gap-3 mt-8">
                    {[
                        { label: 'Manglish GPT', active: currentStage >= 1 },
                        { label: 'Viral Prediction', active: currentStage >= 2 },
                        { label: 'Voice Clone', active: currentStage >= 3 },
                        { label: 'Live Adaptation', active: currentStage >= 4 },
                        { label: 'Cultural Safety', active: currentStage >= 5 },
                    ].map((tag, idx) => (
                        <div
                            key={idx}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                                tag.active 
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                                    : 'bg-white/5 text-gray-500'
                            }`}
                        >
                            {tag.label}
                        </div>
                    ))}
                </div>

                {/* Before/After */}
                <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto">
                    <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/20">
                        <h4 className="font-bold text-red-400 mb-3">Before: Translation</h4>
                        <div className="bg-black/30 rounded-lg p-3 mb-3">
                            <p className="text-sm text-gray-400 italic">"Limited time offer, buy now"</p>
                            <p className="text-xs text-red-400 mt-1">Sounds Google Translated 😬</p>
                        </div>
                        <ul className="space-y-1 text-sm text-gray-400">
                            <li>• Rule-based Manglish</li>
                            <li>• Misses cultural nuance</li>
                            <li>• No viral prediction</li>
                            <li>• Generic voice</li>
                        </ul>
                    </div>
                    <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/20">
                        <h4 className="font-bold text-green-400 mb-3">After: Native AI</h4>
                        <div className="bg-black/30 rounded-lg p-3 mb-3">
                            <p className="text-sm text-white italic">"Eh bro, this offer valid until tomorrow only lah. Don't kiasu later regret hor!"</p>
                            <p className="text-xs text-green-400 mt-1">Conceived in Manglish! 🎉</p>
                        </div>
                        <ul className="space-y-1 text-sm text-gray-400">
                            <li>• Native Manglish generation</li>
                            <li>• 87% viral prediction</li>
                            <li>• Voice + avatar cloning</li>
                            <li>• Live adaptation</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MamakWorkshopEvolution;
