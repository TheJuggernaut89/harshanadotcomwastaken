import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Radar, Satellite, TrendingUp, Brain, MapPin, 
    Calendar, Zap, Globe, Eye, Activity, ChevronRight,
    Play, RefreshCw, DollarSign, Users, Target
} from 'lucide-react';

// Evolution stages for Kopitiam Intel
const intelStages = [
    { 
        stage: 0, 
        name: 'Reactive Monitoring', 
        icon: '👀', 
        prediction: '0 days', 
        dataSources: 'Social only',
        color: 'red'
    },
    { 
        stage: 1, 
        name: 'Nowcasting', 
        icon: '⚡', 
        prediction: '2 weeks ahead', 
        dataSources: 'Social + Economic',
        color: 'orange'
    },
    { 
        stage: 2, 
        name: 'Multi-Modal Fusion', 
        icon: '🛰️', 
        prediction: '3 days ahead', 
        dataSources: '+Satellite +Geolocation',
        color: 'yellow'
    },
    { 
        stage: 3, 
        name: 'Policy Oracle', 
        icon: '📜', 
        prediction: '48hr impact sim', 
        dataSources: '+Gov NLP +Regulations',
        color: 'teal'
    },
    { 
        stage: 4, 
        name: 'Behavioral Engine', 
        icon: '🧠', 
        prediction: 'Psych prediction', 
        dataSources: '+Consumer psychology',
        color: 'blue'
    },
    { 
        stage: 5, 
        name: 'Autonomous Radar', 
        icon: '🎯', 
        prediction: 'Auto-optimize', 
        dataSources: 'Full fusion + RL',
        color: 'green'
    }
];

// Kinetic Log Stream for Kopitiam Intel
import KineticLogStream from '../UI/KineticLogStream';

// Generate logs based on current stage
const generateIntelLogs = (stage) => {
    const baseLogs = [
        { timestamp: '10:00:00', type: 'INFO', message: 'Kopitiam Intel system initialized' },
    ];
    
    if (stage >= 0) {
        baseLogs.push({ timestamp: '10:00:02', type: 'PROCESS', message: 'Monitoring social feeds (TikTok/IG/FB)...' });
        baseLogs.push({ timestamp: '10:00:05', type: 'SUCCESS', message: 'Social velocity tracking active' });
    }
    
    if (stage >= 1) {
        baseLogs.push({ timestamp: '10:00:08', type: 'PROCESS', message: 'LSTM nowcasting models loading...' });
        baseLogs.push({ timestamp: '10:00:12', type: 'SUCCESS', message: '14-day prediction horizon activated' });
    }
    
    if (stage >= 2) {
        baseLogs.push({ timestamp: '10:00:15', type: 'PROCESS', message: 'Satellite feed connecting...' });
        baseLogs.push({ timestamp: '10:00:18', type: 'SUCCESS', message: 'YOLOv8 detecting SG cars in JB malls' });
    }
    
    if (stage >= 3) {
        baseLogs.push({ timestamp: '10:00:22', type: 'PROCESS', message: 'FedNLP parsing government policies...' });
        baseLogs.push({ timestamp: '10:00:26', type: 'WARNING', message: 'Petrol subsidy change detected - simulating impact' });
    }
    
    if (stage >= 4) {
        baseLogs.push({ timestamp: '10:00:30', type: 'PROCESS', message: 'Behavioral economics engine active' });
        baseLogs.push({ timestamp: '10:00:34', type: 'SUCCESS', message: 'Loss aversion patterns mapped' });
    }
    
    if (stage >= 5) {
        baseLogs.push({ timestamp: '10:00:38', type: 'PROCESS', message: 'Reinforcement learning initializing...' });
        baseLogs.push({ timestamp: '10:00:42', type: 'SUCCESS', message: 'Autonomous radar fully operational' });
    }
    
    return baseLogs.reverse();
};

// Satellite data visualization
const SatelliteFeed = ({ stage }) => {
    if (stage < 2) return null;
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-4 right-4 bg-black/80 rounded-lg p-3 text-xs font-mono"
        >
            <div className="flex items-center gap-2 text-green-400 mb-2">
                <Satellite size={12} />
                <span>SATELLITE FEED</span>
            </div>
            <div className="space-y-1 text-gray-400">
                <div className="flex justify-between gap-4">
                    <span>JB Mall Parking:</span>
                    <span className="text-green-400">87% full</span>
                </div>
                <div className="flex justify-between gap-4">
                    <span>SG Plates:</span>
                    <span className="text-yellow-400">↑42%</span>
                </div>
                <div className="flex justify-between gap-4">
                    <span>Night Lights:</span>
                    <span className="text-teal">Active</span>
                </div>
            </div>
        </motion.div>
    );
};

// Policy alerts
const PolicyAlerts = ({ stage }) => {
    if (stage < 3) return null;
    
    const alerts = [
        { policy: "Subsidy Update", impact: "Transport +15%", time: "48hr" },
        { policy: "Halal Cert", impact: "New category", time: "72hr" },
    ];
    
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute bottom-4 left-4 bg-amber-900/80 rounded-lg p-3 text-xs max-w-[200px]"
        >
            <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Globe size={12} />
                <span>POLICY ORACLE</span>
            </div>
            {alerts.map((a, i) => (
                <div key={i} className="mb-2 last:mb-0 p-2 bg-black/30 rounded">
                    <div className="text-amber-300 font-bold">{a.policy}</div>
                    <div className="text-gray-400">{a.impact}</div>
                    <div className="text-teal">{a.time}</div>
                </div>
            ))}
        </motion.div>
    );
};

// Typewriter text component
const Typewriter = ({ text, delay = 0, className = '' }) => {
    const [display, setDisplay] = useState('');
    
    useEffect(() => {
        let i = 0;
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                if (i <= text.length) {
                    setDisplay(text.slice(0, i));
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 30);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timer);
    }, [text, delay]);
    
    return (
        <span className={className}>
            {display}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
                className="inline-block w-0.5 h-4 bg-current align-middle ml-0.5"
            />
        </span>
    );
};

const KopitiamIntelEvolution = () => {
    const [currentStage, setCurrentStage] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [completedStage, setCompletedStage] = useState(-1);
    const [logLines, setLogLines] = useState([]);

    // Stage descriptions with typewriter effect
    const stageInfo = [
        { 
            title: 'Reactive Monitoring',
            desc: 'Traditional social listening - watching what already happened',
            insight: 'Too late to capitalize on trends',
            metric: '340% ROI predicted (unreliable)'
        },
        { 
            title: 'Nowcasting Intelligence',
            desc: 'LSTM neural networks predict sentiment 14 days before official reports',
            insight: 'Know Hari Raya shopping mood before retail data releases',
            metric: '14-day prediction horizon'
        },
        { 
            title: 'Multi-Modal Fusion',
            desc: 'Satellite parking lots + TikTok velocity + night lights + cross-border flows',
            insight: 'YOLOv8 detects SG cars in JB malls = arbitrage opportunity',
            metric: '3-day ahead foot traffic prediction'
        },
        { 
            title: 'Policy Oracle',
            desc: 'FedNLP for Malaysian government - auto-simulate subsidy impacts in 48hrs',
            insight: 'Petrol subsidy removal → transport +15% → margins -8%',
            metric: 'Auto-detect regulatory arbitrage'
        },
        { 
            title: 'Behavioral Engine',
            desc: 'Loss aversion detection, herd behavior tracking, mental accounting',
            insight: 'Duit Raya treated differently than regular income',
            metric: 'Psychology-aware pricing'
        },
        { 
            title: 'Autonomous Radar',
            desc: 'Self-optimizing budget allocation with reinforcement learning',
            insight: 'If TikTok CPM spikes 40% → auto-shift to Reels in 15min',
            metric: 'Real-time reallocation + GAN scenarios'
        }
    ];

    // Auto-play evolution
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

    return (
        <section className="py-24 bg-gradient-to-b from-navy-dark via-navy to-navy-dark">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 text-teal text-sm font-bold mb-4">
                        <Radar size={16} />
                        Cultural Intelligence Architecture
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Kopitiam Intel Evolution
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        From reactive monitoring → predictive cultural radar with satellite intelligence
                    </p>
                </motion.div>

                {/* Stage Navigator */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {intelStages.map((s, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleStageClick(idx)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
                                currentStage === idx
                                    ? 'bg-teal text-navy-dark shadow-lg shadow-teal/30 scale-105'
                                    : completedStage >= idx
                                        ? 'bg-teal/20 text-teal'
                                        : 'bg-white/5 text-gray-500 hover:bg-white/10'
                            }`}
                        >
                            <span>{s.icon}</span>
                            <span className="hidden md:inline">{s.name}</span>
                        </button>
                    ))}
                </div>

                <div className="grid lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
                    {/* Left: Kinetic Log Stream Visualization */}
                    <div className="lg:col-span-3">
                        <motion.div 
                            className="relative bg-black/40 rounded-2xl border border-teal/20 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-teal/20">
                                <div className="flex items-center gap-3">
                                    <Radar size={20} className="text-teal" />
                                    <h3 className="font-bold text-white">Live Intelligence Feed</h3>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-gray-500">
                                        Stage {currentStage + 1}/6
                                    </span>
                                    <button
                                        onClick={handlePlay}
                                        disabled={isPlaying}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-teal text-navy-dark rounded-lg text-xs font-bold hover:bg-teal/90 transition-all disabled:opacity-50"
                                    >
                                        {isPlaying ? (
                                            <RefreshCw size={12} className="animate-spin" />
                                        ) : (
                                            <Play size={12} fill="currentColor" />
                                        )}
                                        {isPlaying ? 'Evolving...' : 'Evolve'}
                                    </button>
                                </div>
                            </div>

                            {/* Kinetic Log Stream */}
                            <KineticLogStream 
                                logs={generateIntelLogs(currentStage)}
                                showHeader={false}
                                height="320px"
                                className="border-0 rounded-none"
                            />
                        </motion.div>
                    </div>

                    {/* Right: Info Panel */}
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentStage}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="bg-white/5 rounded-2xl p-6 border border-teal/20"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-3xl">{intelStages[currentStage].icon}</span>
                                    <div>
                                        <span className="text-xs text-teal font-bold uppercase tracking-wider">
                                            Stage {currentStage}
                                        </span>
                                        <h3 className="font-bold text-white text-lg">
                                            {stageInfo[currentStage].title}
                                        </h3>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-gray-300 text-sm mb-2">
                                            <Typewriter 
                                                text={stageInfo[currentStage].desc} 
                                                delay={100}
                                            />
                                        </p>
                                    </div>

                                    <div className="bg-teal/10 rounded-lg p-3 border-l-2 border-teal">
                                        <p className="text-xs text-teal/80 italic">
                                            <Typewriter 
                                                text={stageInfo[currentStage].insight}
                                                delay={800}
                                            />
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm">
                                        <Activity size={14} className="text-green-400" />
                                        <span className="text-green-400 font-bold">
                                            <Typewriter 
                                                text={stageInfo[currentStage].metric}
                                                delay={1500}
                                            />
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Data Sources */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/5 rounded-xl p-4"
                        >
                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                                Active Data Sources
                            </h4>
                            <div className="space-y-2">
                                {[
                                    { name: 'TikTok/IG/FB Velocity', active: currentStage >= 0 },
                                    { name: 'LSTM Nowcasting Models', active: currentStage >= 1 },
                                    { name: 'Satellite Parking Analysis', active: currentStage >= 2 },
                                    { name: 'Policy NLP (FedNLP)', active: currentStage >= 3 },
                                    { name: 'Behavioral Economics', active: currentStage >= 4 },
                                    { name: 'Reinforcement Learning', active: currentStage >= 5 },
                                ].map((source, idx) => (
                                    <div 
                                        key={idx}
                                        className={`flex items-center gap-2 text-xs ${
                                            source.active ? 'text-teal' : 'text-gray-600'
                                        }`}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${
                                            source.active ? 'bg-teal animate-pulse' : 'bg-gray-700'
                                        }`} />
                                        {source.name}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Prediction horizon */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-gradient-to-br from-teal/20 to-teal/5 rounded-xl p-4 border border-teal/20">
                                <div className="text-2xl font-bold text-teal">
                                    {currentStage === 0 ? '0' : currentStage === 1 ? '14' : currentStage === 2 ? '3' : 'Real-time'}
                                </div>
                                <div className="text-xs text-gray-500">Days Ahead</div>
                            </div>
                            <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl p-4 border border-green-500/20">
                                <div className="text-2xl font-bold text-green-400">
                                    {currentStage === 5 ? '95%' : `${(currentStage + 1) * 15}%`}
                                </div>
                                <div className="text-xs text-gray-500">Confidence</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stage Indicators */}
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                    {intelStages.map((s, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                                idx <= currentStage 
                                    ? 'bg-teal/20 text-teal border border-teal/30' 
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

export default KopitiamIntelEvolution;
