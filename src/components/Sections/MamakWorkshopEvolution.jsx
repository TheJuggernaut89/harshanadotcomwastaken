import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Mic, Video, MessageSquare, TrendingUp, Zap, 
    Users, DollarSign, Clock, Target, Sparkles,
    Play, Pause, RefreshCw, ChevronRight, Activity,
    Volume2, UserCircle, ShoppingCart, Flame,
    CheckCircle2, Shield, Brain, Terminal
} from 'lucide-react';
import KineticLogStream from '../UI/KineticLogStream';

// Generate logs for Mamak Workshop
const generateWorkshopLogs = (stage) => {
    const baseLogs = [
        { timestamp: '10:00:00', type: 'INFO', message: 'Mamak Workshop pipeline initialized' },
    ];
    
    if (stage >= 0) {
        baseLogs.push({ timestamp: '10:00:02', type: 'PROCESS', message: 'Loading translation engines...' });
        baseLogs.push({ timestamp: '10:00:05', type: 'WARN', message: 'Google Translate: Robotic output detected' });
    }
    
    if (stage >= 1) {
        baseLogs.push({ timestamp: '10:00:08', type: 'PROCESS', message: 'Loading Manglish GPT (LLaMA 3 fine-tuned)...' });
        baseLogs.push({ timestamp: '10:00:12', type: 'SUCCESS', message: 'Native Manglish generation active - 9.5/10 authenticity' });
    }
    
    if (stage >= 2) {
        baseLogs.push({ timestamp: '10:00:15', type: 'PROCESS', message: 'Running viral prediction simulation...' });
        baseLogs.push({ timestamp: '10:00:18', type: 'SUCCESS', message: 'Variant B selected: 87% viral probability' });
    }
    
    if (stage >= 3) {
        baseLogs.push({ timestamp: '10:00:22', type: 'PROCESS', message: 'Cloning voice with Malaysian accent...' });
        baseLogs.push({ timestamp: '10:00:26', type: 'SUCCESS', message: 'Voice clone ready: 95% match accuracy' });
    }
    
    if (stage >= 4) {
        baseLogs.push({ timestamp: '10:00:30', type: 'PROCESS', message: 'Live adaptation engine active...' });
        baseLogs.push({ timestamp: '10:00:34', type: 'SUCCESS', message: 'Auto-adjusting content based on viewer metrics' });
    }
    
    if (stage >= 5) {
        baseLogs.push({ timestamp: '10:00:38', type: 'PROCESS', message: 'Running cultural safety firewall...' });
        baseLogs.push({ timestamp: '10:00:42', type: 'SUCCESS', message: 'All multi-ethnic checks PASSED' });
    }
    
    return baseLogs.reverse();
};

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

                <div className="grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                    {/* Left: Kinetic Log Stream Visualization */}
                    <div className="lg:col-span-3">
                        <motion.div 
                            className="relative bg-black/40 rounded-2xl border border-orange-500/20 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-orange-500/20">
                                <div className="flex items-center gap-3">
                                    <Terminal size={20} className="text-orange-400" />
                                    <h3 className="font-bold text-white">Live Pipeline Logs</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-gray-500">
                                        Stage {currentStage + 1}/6
                                    </span>
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
                            </div>

                            {/* Kinetic Log Stream - Taller */}
                            <KineticLogStream 
                                logs={generateWorkshopLogs(currentStage)}
                                showHeader={false}
                                height="420px"
                                className="border-0 rounded-none"
                            />
                        </motion.div>
                    </div>

                    {/* Right: Info Panel + Content Preview */}
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStage}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white/5 rounded-2xl p-6 border border-orange-500/20"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl">{workshopStages[currentStage].icon}</span>
                                    <div>
                                        <span className="text-xs text-orange-400 font-bold uppercase tracking-wider">
                                            Stage {currentStage}
                                        </span>
                                        <h3 className="font-bold text-white text-lg">
                                            {stageInfo[currentStage].title}
                                        </h3>
                                    </div>
                                </div>

                                <p className="text-gray-300 text-sm mb-4">
                                    {stageInfo[currentStage].desc}
                                </p>

                                <div className="bg-orange-500/10 rounded-lg p-3 border-l-2 border-orange-400 mb-4">
                                    <p className="text-xs text-orange-300 italic">
                                        "{stageInfo[currentStage].insight}"
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    <Activity size={14} className="text-green-400" />
                                    <span className="text-green-400 font-bold">
                                        {stageInfo[currentStage].metric}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Content Preview */}
                        <ContentPreview stage={currentStage} />
                        
                        {/* Live Selling Dashboard */}
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

                {/* Pipeline Progress */}
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    {workshopStages.map((s, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                                idx <= currentStage 
                                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
                                    : 'bg-white/5 text-gray-500'
                            }`}
                        >
                            <span>{s.icon}</span>
                            <span className="hidden sm:inline">{s.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MamakWorkshopEvolution;
