import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    GitBranch, RotateCcw, Brain, Zap, TrendingUp, 
    Activity, Users, Target, Sparkles, Play, Pause,
    ArrowRight, Circle, CheckCircle2, AlertCircle,
    Cpu, Network, RefreshCw, BarChart3, Eye, Clock
} from 'lucide-react';

/**
 * Living Pipeline Visualization
 * Shows evolution from Linear Assembly Line → Closed-Loop Ecosystem
 */
const LivingPipeline = () => {
    const [stage, setStage] = useState('linear'); // linear | predictive | generative | microtest | feedback | multiagent | live
    const [isRunning, setIsRunning] = useState(false);
    const [metrics, setMetrics] = useState({
        timeReduction: 87,
        engagementBoost: 0,
        autonomy: 0,
        confidence: 0
    });
    const [activeNode, setActiveNode] = useState(null);
    const [loopCount, setLoopCount] = useState(0);
    const [showDna, setShowDna] = useState(false);

    const stages = {
        linear: {
            title: "Stage 0: Linear Assembly Line",
            subtitle: "Current static workflow - Steps 1→5",
            metrics: { timeReduction: 87, engagementBoost: 0, autonomy: 10, confidence: 60 },
            description: "Traditional conveyor belt approach. Fixed output, no feedback loops."
        },
        predictive: {
            title: "Stage 1: Predictive Intelligence",
            subtitle: "ML-powered pre-filtering + Competitive gap analysis",
            metrics: { timeReduction: 87, engagementBoost: 15, autonomy: 25, confidence: 75 },
            description: "Prophet/LSTM models predict CTR before creating content. Skip low-probability topics."
        },
        generative: {
            title: "Stage 2: Generative Variation Engine",
            subtitle: "LangGraph multi-agent creative debate",
            metrics: { timeReduction: 90, engagementBoost: 25, autonomy: 40, confidence: 82 },
            description: "3 creative personas debate approaches. Generate 45 assets instead of 15."
        },
        microtest: {
            title: "Stage 3: Real-Time Micro-Testing",
            subtitle: "2-hour flash tests with auto-scaling winners",
            metrics: { timeReduction: 92, engagementBoost: 35, autonomy: 60, confidence: 88 },
            description: "Deploy 3 variations to 5% audience each. Winner auto-scales to 85%."
        },
        feedback: {
            title: "Stage 4: Feedback Loop Integration",
            subtitle: "Performance DNA capture + Evolution synthesis",
            metrics: { timeReduction: 93, engagementBoost: 40, autonomy: 75, confidence: 92 },
            description: "Computer vision + NLP analysis stores high-performer embeddings in vector DB."
        },
        multiagent: {
            title: "Stage 5: Multi-Agent Creative Director",
            subtitle: "CrewAI autonomous decision-making",
            metrics: { timeReduction: 95, engagementBoost: 45, autonomy: 90, confidence: 95 },
            description: "5 agents debate: Trend Analyst, Copywriter, Designer, Editor, Brand Guardian."
        },
        live: {
            title: "Stage 6: Live Adaptation + Cross-Platform",
            subtitle: "Self-healing content + Viral signal detection",
            metrics: { timeReduction: 95, engagementBoost: 55, autonomy: 95, confidence: 98 },
            description: "Underperforming posts auto-edit within 30 mins. Viral content cross-posts in 15 mins."
        }
    };

    useEffect(() => {
        if (isRunning && stage !== 'live') {
            const timer = setTimeout(() => {
                const stageOrder = ['linear', 'predictive', 'generative', 'microtest', 'feedback', 'multiagent', 'live'];
                const currentIndex = stageOrder.indexOf(stage);
                if (currentIndex < stageOrder.length - 1) {
                    setStage(stageOrder[currentIndex + 1]);
                    setLoopCount(prev => prev + 1);
                } else {
                    setIsRunning(false);
                    setShowDna(true);
                }
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [stage, isRunning]);

    useEffect(() => {
        setMetrics(stages[stage].metrics);
    }, [stage]);

    const handleEvolve = () => {
        setStage('linear');
        setLoopCount(0);
        setShowDna(false);
        setIsRunning(true);
    };

    const currentStage = stages[stage];

    return (
        <section className="py-24 bg-gradient-to-b from-navy-dark via-navy to-navy-dark overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
                        <Sparkles size={16} />
                        Advanced Architecture Concept
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Pipeline Evolution
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        From Linear Assembly Line → Closed-Loop Ecosystem with Feedback DNA
                    </p>
                </motion.div>

                {/* Evolution Visualization */}
                <div className="max-w-7xl mx-auto">
                    {/* Stage Indicator */}
                    <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
                        {Object.keys(stages).map((s, idx) => (
                            <button
                                key={s}
                                onClick={() => { setStage(s); setIsRunning(false); }}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                    stage === s 
                                        ? 'bg-primary text-white scale-110' 
                                        : 'bg-white/10 text-gray-500 hover:bg-white/20'
                                }`}
                            >
                                {idx}
                            </button>
                        ))}
                    </div>

                    {/* Main Stage Display */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {/* Left: Pipeline Visualization */}
                        <motion.div
                            key={stage}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card p-8 rounded-2xl border border-primary/20 bg-white/5"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-white">{currentStage.title}</h3>
                                {stage === 'live' && (
                                    <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="text-green-400"
                                    >
                                        <RefreshCw size={24} />
                                    </motion.div>
                                )}
                            </div>
                            
                            <p className="text-primary font-medium mb-4">{currentStage.subtitle}</p>
                            <p className="text-gray-400 mb-8">{currentStage.description}</p>

                            {/* Dynamic Pipeline Nodes */}
                            <div className="relative h-64">
                                <AnimatePresence mode="wait">
                                    {stage === 'linear' && <LinearPipeline />}
                                    {stage === 'predictive' && <PredictivePipeline />}
                                    {stage === 'generative' && <GenerativePipeline />}
                                    {stage === 'microtest' && <MicrotestPipeline />}
                                    {stage === 'feedback' && <FeedbackPipeline />}
                                    {stage === 'multiagent' && <MultiAgentPipeline />}
                                    {stage === 'live' && <LivePipeline loopCount={loopCount} />}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* Right: Metrics Dashboard */}
                        <div className="space-y-4">
                            {/* Metric Cards */}
                            <MetricCard 
                                icon={Clock}
                                label="Time Reduction"
                                value={`${metrics.timeReduction}%`}
                                color="text-teal"
                                bgColor="bg-teal/10"
                                description="87% → 95% through optimization"
                            />
                            <MetricCard 
                                icon={TrendingUp}
                                label="Engagement Boost"
                                value={`+${metrics.engagementBoost}%`}
                                color="text-primary"
                                bgColor="bg-primary/10"
                                description="Predictive filtering + micro-testing"
                            />
                            <MetricCard 
                                icon={Cpu}
                                label="Autonomy Level"
                                value={`${metrics.autonomy}%`}
                                color="text-purple-400"
                                bgColor="bg-purple-500/10"
                                description="Campaigns run without human touch"
                            />
                            <MetricCard 
                                icon={Target}
                                label="Confidence Score"
                                value={`${metrics.confidence}%`}
                                color="text-green-400"
                                bgColor="bg-green-500/10"
                                description="ML model prediction accuracy"
                            />

                            {/* Evolution Button */}
                            <motion.button
                                onClick={handleEvolve}
                                disabled={isRunning}
                                className="w-full py-4 bg-gradient-to-r from-primary to-teal text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {isRunning ? (
                                    <>
                                        <RefreshCw size={20} className="animate-spin" />
                                        Evolving...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={20} />
                                        {stage === 'live' ? 'Restart Evolution' : 'Evolve Pipeline'}
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </div>

                    {/* Technical Details */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <TechCard 
                            icon={Brain}
                            title="ML Models"
                            items={['Prophet (trend forecasting)', 'LSTM (engagement prediction)', 'Computer Vision (content analysis)', 'Vector Embeddings (Pinecone)']}
                        />
                        <TechCard 
                            icon={Network}
                            title="Multi-Agent Architecture"
                            items={['CrewAI / LangGraph', 'Creative Director Agent', 'Trend Analyst Agent', 'Brand Guardian Agent', 'Consensus Voting']}
                        />
                        <TechCard 
                            icon={Activity}
                            title="Real-Time Systems"
                            items={['2-hour flash testing', '30-min resuscitation', 'Viral signal detection', 'Auto-cross-posting', 'Live performance DNA']}
                        />
                    </div>

                    {/* DNA Visualization (appears at end) */}
                    <AnimatePresence>
                        {showDna && (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-12 glass-card p-8 rounded-2xl border-2 border-green-500/30 bg-gradient-to-r from-green-500/10 to-teal/10"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <CheckCircle2 size={32} className="text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">🧬 Living System Achieved</h3>
                                        <p className="text-gray-400">Self-evolving creative organism with feedback DNA</p>
                                    </div>
                                </div>
                                
                                <div className="grid md:grid-cols-4 gap-4">
                                    <div className="text-center p-4 bg-black/30 rounded-lg">
                                        <p className="text-3xl font-bold text-green-400">15min</p>
                                        <p className="text-sm text-gray-400">Campaign Time</p>
                                    </div>
                                    <div className="text-center p-4 bg-black/30 rounded-lg">
                                        <p className="text-3xl font-bold text-primary">+55%</p>
                                        <p className="text-sm text-gray-400">Engagement</p>
                                    </div>
                                    <div className="text-center p-4 bg-black/30 rounded-lg">
                                        <p className="text-3xl font-bold text-purple-400">95%</p>
                                        <p className="text-sm text-gray-400">Autonomy</p>
                                    </div>
                                    <div className="text-center p-4 bg-black/30 rounded-lg">
                                        <p className="text-3xl font-bold text-teal">∞</p>
                                        <p className="text-sm text-gray-400">Evolution Loops</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

// Pipeline Visualizations
const LinearPipeline = () => (
    <div className="flex items-center justify-between h-full px-4">
        {[1, 2, 3, 4, 5].map((step) => (
            <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: step * 0.1 }}
                className="flex flex-col items-center"
            >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold mb-2">
                    {step}
                </div>
                <div className="text-xs text-gray-500">Step {step}</div>
                {step < 5 && <ArrowRight className="absolute text-gray-600" style={{ left: `${step * 20}%` }} />}
            </motion.div>
        ))}
    </div>
);

const PredictivePipeline = () => (
    <div className="relative h-full">
        {/* New predictive layer above */}
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-0 left-1/2 -translate-x-1/2"
        >
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-2">
                <Brain size={24} className="text-purple-400" />
            </div>
            <p className="text-xs text-center text-purple-400">0. predict_success</p>
        </motion.div>
        
        {/* Original pipeline below */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-between px-8 opacity-50">
            {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs">
                    {step}
                </div>
            ))}
        </div>
        
        {/* Filter arrow */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-16 left-1/2 -translate-x-1/2"
        >
            <div className="text-xs text-purple-400 text-center">Filters low-probability topics</div>
            <div className="w-0.5 h-8 bg-purple-500/50 mx-auto mt-1" />
        </motion.div>
    </div>
);

const GenerativePipeline = () => (
    <div className="h-full flex items-center justify-center">
        <div className="relative">
            {/* Central node */}
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center"
            >
                <Network size={32} className="text-primary" />
            </motion.div>
            
            {/* 3 agents */}
            {[0, 120, 240].map((angle, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.2 }}
                    className="absolute w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center"
                    style={{
                        top: `${50 + 40 * Math.sin((angle * Math.PI) / 180)}%`,
                        left: `${50 + 40 * Math.cos((angle * Math.PI) / 180)}%`,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <Users size={16} className="text-teal" />
                </motion.div>
            ))}
            
            <p className="text-center text-xs text-gray-400 mt-20">3 agents debating creative approaches</p>
        </div>
    </div>
);

const MicrotestPipeline = () => (
    <div className="h-full flex items-center justify-center">
        <div className="flex items-center gap-4">
            {/* Test groups */}
            {[15, 15, 15].map((pct, idx) => (
                <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.3 }}
                    className="text-center"
                >
                    <div className="w-16 h-16 rounded-lg bg-teal/20 flex items-center justify-center mb-2">
                        <span className="text-teal font-bold">{pct}%</span>
                    </div>
                    <p className="text-xs text-gray-400">Variant {idx + 1}</p>
                </motion.div>
            ))}
            
            <ArrowRight className="text-gray-600" />
            
            {/* Winner */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
                className="text-center"
            >
                <div className="w-20 h-20 rounded-lg bg-green-500/20 flex items-center justify-center mb-2 border-2 border-green-500">
                    <span className="text-green-400 font-bold text-xl">85%</span>
                </div>
                <p className="text-xs text-green-400">Winner Auto-Scales</p>
            </motion.div>
        </div>
    </div>
);

const FeedbackPipeline = () => (
    <div className="h-full flex items-center justify-center">
        <div className="relative w-48 h-48">
            {/* Central database */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
            />
            
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <GitBranch size={24} className="text-primary" />
                </div>
            </div>
            
            {/* Orbiting data points */}
            {[0, 90, 180, 270].map((angle, idx) => (
                <motion.div
                    key={idx}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: idx * 0.5 }}
                    className="absolute inset-0"
                >
                    <div 
                        className="w-4 h-4 rounded-full bg-teal"
                        style={{ marginTop: '10px', marginLeft: '50%', transform: 'translateX(-50%)' }}
                    />
                </motion.div>
            ))}
        </div>
    </div>
);

const MultiAgentPipeline = () => (
    <div className="h-full flex items-center justify-center">
        <div className="grid grid-cols-2 gap-3">
            {[
                { icon: Target, label: 'Trend Analyst', color: 'text-blue-400' },
                { icon: Users, label: 'Copywriter', color: 'text-green-400' },
                { icon: Eye, label: 'Designer', color: 'text-purple-400' },
                { icon: Activity, label: 'Brand Guardian', color: 'text-yellow-400' },
            ].map((agent, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.15 }}
                    className="w-20 h-20 rounded-lg bg-white/5 border border-white/10 flex flex-col items-center justify-center"
                >
                    <agent.icon size={20} className={agent.color} />
                    <p className="text-[10px] text-gray-400 mt-1 text-center">{agent.label}</p>
                </motion.div>
            ))}
        </div>
    </div>
);

const LivePipeline = ({ loopCount }) => (
    <div className="h-full flex flex-col items-center justify-center">
        <motion.div
            animate={{ 
                boxShadow: ['0 0 20px rgba(0,255,0,0.3)', '0 0 40px rgba(0,255,0,0.5)', '0 0 20px rgba(0,255,0,0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center border-2 border-green-500"
        >
            <RefreshCw size={32} className="text-green-400 animate-spin" />
        </motion.div>
        <p className="text-green-400 text-sm mt-4 font-bold">Self-Evolving System</p>
        <p className="text-gray-500 text-xs">Evolution loops: {loopCount}</p>
    </div>
);

// Components
const MetricCard = ({ icon: Icon, label, value, color, bgColor, description }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card p-4 rounded-xl border border-white/5"
    >
        <div className="flex items-start justify-between">
            <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center`}>
                <Icon size={20} className={color} />
            </div>
            <motion.span 
                key={value}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-2xl font-bold ${color}`}
            >
                {value}
            </motion.span>
        </div>
        <p className="text-white font-medium mt-2">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
    </motion.div>
);

const TechCard = ({ icon: Icon, title, items }) => (
    <div className="glass-card p-6 rounded-xl border border-white/5 bg-white/5">
        <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Icon size={20} className="text-primary" />
            </div>
            <h4 className="font-bold text-white">{title}</h4>
        </div>
        <ul className="space-y-2">
            {items.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

export default LivingPipeline;
