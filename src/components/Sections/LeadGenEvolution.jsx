import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Target, Zap, Brain, Network, Activity, TrendingUp,
    Users, Mail, Linkedin, MessageSquare, Phone, 
    Sparkles, Play, GitBranch, Radar, Eye, Bot,
    BarChart3, AlertCircle, CheckCircle2, RefreshCw,
    Database, Shield, Clock, ArrowRight, Layers
} from 'lucide-react';

/**
 * Lead Generation Evolution
 * From Linear Automation → Autonomous Revenue Intelligence
 */
const LeadGenEvolution = () => {
    const [stage, setStage] = useState('basic');
    const [isRunning, setIsRunning] = useState(false);
    const [metrics, setMetrics] = useState({
        timeReduction: 85,
        leadQuality: 60,
        coverage: 20,
        winRate: 15
    });
    const [activeSignals, setActiveSignals] = useState([]);
    const [showArchitecture, setShowArchitecture] = useState(false);

    const stages = {
        basic: {
            title: "Stage 0: Basic Lead Gen",
            subtitle: "Linear scoring + Fixed email sequences",
            metrics: { timeReduction: 85, leadQuality: 60, coverage: 20, winRate: 15 },
            description: "Traditional SDR workflow: Static criteria, single-threaded, fixed sequences."
        },
        intent: {
            title: "Stage 1: Intent-Based Prospecting",
            subtitle: "Real-time buying signals + Behavioral intent",
            metrics: { timeReduction: 87, leadQuality: 75, coverage: 25, winRate: 22 },
            description: "Monitor hiring spikes, funding news, tech stack changes. Target '3.5x more likely to buy' moments."
        },
        account: {
            title: "Stage 2: Account-Based Orchestration",
            subtitle: "Multi-threading + Buying committee mapping",
            metrics: { timeReduction: 90, leadQuality: 82, coverage: 60, winRate: 30 },
            description: "5 specialized agents per account: Champion, Influencer, Decision Maker, Blocker, Coordinator."
        },
        behavioral: {
            title: "Stage 3: Real-Time Behavioral Scoring",
            subtitle: "Dynamic rescoring + Event-driven architecture",
            metrics: { timeReduction: 92, leadQuality: 88, coverage: 70, winRate: 38 },
            description: "Score updates in real-time: Pricing page visit (+15), LinkedIn post (+25), Email opens (+5)."
        },
        multichannel: {
            title: "Stage 4: Autonomous Multi-Channel",
            subtitle: "Dynamic channel selection + Conversational qualification",
            metrics: { timeReduction: 94, leadQuality: 92, coverage: 80, winRate: 45 },
            description: "AI selects optimal mix: Email + LinkedIn + SMS + Voice. Chatbot qualifies before human handoff."
        },
        selfimproving: {
            title: "Stage 5: Self-Improving System",
            subtitle: "Reinforcement learning + Competitive intelligence",
            metrics: { timeReduction: 96, leadQuality: 95, coverage: 90, winRate: 55 },
            description: "System learns what converts best. Auto-counters competitor mentions. Response rate improves 3% → 15%."
        },
        predictive: {
            title: "Stage 6: Predictive Pipeline Management",
            subtitle: "Velocity prediction + Autonomous objection handling",
            metrics: { timeReduction: 98, leadQuality: 98, coverage: 95, winRate: 65 },
            description: "Predicts deal stall and auto-intervenes. AI handles objections without human approval."
        }
    };

    useEffect(() => {
        if (isRunning && stage !== 'predictive') {
            const timer = setTimeout(() => {
                const stageOrder = ['basic', 'intent', 'account', 'behavioral', 'multichannel', 'selfimproving', 'predictive'];
                const currentIndex = stageOrder.indexOf(stage);
                if (currentIndex < stageOrder.length - 1) {
                    setStage(stageOrder[currentIndex + 1]);
                } else {
                    setIsRunning(false);
                    setShowArchitecture(true);
                }
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [stage, isRunning]);

    useEffect(() => {
        setMetrics(stages[stage].metrics);
        
        // Generate random buying signals for intent stage
        if (stage === 'intent' || stage === 'behavioral' || stage === 'predictive') {
            const signals = [
                { type: 'funding', company: 'TechStart MY', value: '+40 score', icon: TrendingUp },
                { type: 'hiring', company: 'DataFlow Sdn', value: '+25 score', icon: Users },
                { type: 'tech', company: 'CloudNet Asia', value: '+30 score', icon: Database },
            ];
            setActiveSignals(signals);
        } else {
            setActiveSignals([]);
        }
    }, [stage]);

    const handleEvolve = () => {
        setStage('basic');
        setShowArchitecture(false);
        setIsRunning(true);
    };

    const currentStage = stages[stage];

    return (
        <section className="py-24 bg-gradient-to-b from-navy via-navy-dark to-navy overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 text-teal text-sm font-bold mb-4">
                        <Radar size={16} />
                        Revenue Intelligence Architecture
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Lead Generation Evolution
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        From Email Blaster → Autonomous Revenue Intelligence System
                    </p>
                </motion.div>

                <div className="max-w-7xl mx-auto">
                    {/* Stage Navigator */}
                    <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
                        {Object.keys(stages).map((s, idx) => (
                            <button
                                key={s}
                                onClick={() => { setStage(s); setIsRunning(false); }}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                                    stage === s 
                                        ? 'bg-teal text-white scale-110 shadow-lg shadow-teal/30' 
                                        : 'bg-white/10 text-gray-500 hover:bg-white/20'
                                }`}
                            >
                                {idx}
                            </button>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {/* Visualization */}
                        <motion.div
                            key={stage}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="glass-card p-8 rounded-2xl border border-teal/20 bg-white/5 min-h-[500px]"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-white">{currentStage.title}</h3>
                                {stage === 'predictive' && (
                                    <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="text-teal"
                                    >
                                        <RefreshCw size={24} />
                                    </motion.div>
                                )}
                            </div>
                            
                            <p className="text-teal font-medium mb-4">{currentStage.subtitle}</p>
                            <p className="text-gray-400 mb-8">{currentStage.description}</p>

                            {/* Stage-Specific Visualizations */}
                            <div className="h-80 relative">
                                <AnimatePresence mode="wait">
                                    {stage === 'basic' && <BasicPipeline />}
                                    {stage === 'intent' && <IntentVisualization signals={activeSignals} />}
                                    {stage === 'account' && <AccountOrchestration />}
                                    {stage === 'behavioral' && <BehavioralScoring />}
                                    {stage === 'multichannel' && <MultiChannel />}
                                    {stage === 'selfimproving' && <SelfImproving />}
                                    {stage === 'predictive' && <PredictiveSystem />}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* Metrics Panel */}
                        <div className="space-y-4">
                            <MetricCard 
                                icon={Clock}
                                label="Time Reduction"
                                value={`${metrics.timeReduction}%`}
                                color="text-teal"
                                bgColor="bg-teal/10"
                                description="1.5hrs/week → 15min/week"
                            />
                            <MetricCard 
                                icon={Target}
                                label="Lead Quality Score"
                                value={`${metrics.leadQuality}/100`}
                                color="text-primary"
                                bgColor="bg-primary/10"
                                description="Response prediction → Win prediction (CLV-weighted)"
                            />
                            <MetricCard 
                                icon={Network}
                                label="Account Coverage"
                                value={`${metrics.coverage}%`}
                                color="text-purple-400"
                                bgColor="bg-purple-500/10"
                                description="Single-threaded → Multi-threaded (5 contacts/account)"
                            />
                            <MetricCard 
                                icon={TrendingUp}
                                label="Win Rate"
                                value={`${metrics.winRate}%`}
                                color="text-green-400"
                                bgColor="bg-green-500/10"
                                description="With competitive auto-counter intelligence"
                            />

                            {/* Evolution Button */}
                            <motion.button
                                onClick={handleEvolve}
                                disabled={isRunning}
                                className="w-full py-4 bg-gradient-to-r from-teal to-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-teal/30 hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {isRunning ? (
                                    <>
                                        <RefreshCw size={20} className="animate-spin" />
                                        Evolving System...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={20} />
                                        {stage === 'predictive' ? 'Restart Evolution' : 'Evolve Lead Gen'}
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </div>

                    {/* Architecture Layers */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <TechCard 
                            icon={Radar}
                            title="Intent Detection Layer"
                            items={[
                                'BrightData trigger detection',
                                'Funding news monitoring',
                                'Hiring spike alerts',
                                'Tech stack change tracking',
                                'Reverse IP lookup',
                                'BuiltWith technographics'
                            ]}
                        />
                        <TechCard 
                            icon={Bot}
                            title="Multi-Agent System"
                            items={[
                                'Champion Agent (end-users)',
                                'Influencer Agent (middle mgmt)',
                                'Decision Maker Agent (C-suite)',
                                'Blocker Agent (competitor counter)',
                                'Coordinator Agent (conflict prevention)',
                                'Azure CosmosDB coordination'
                            ]}
                        />
                        <TechCard 
                            icon={Brain}
                            title="Self-Improvement Engine"
                            items={[
                                'REFLEX reinforcement learning',
                                'Trajectory tracking per campaign',
                                'Skill library auto-updates',
                                'Competitive mention detection',
                                'Battlecard auto-generation',
                                'Weekly playbook evolution'
                            ]}
                        />
                    </div>

                    {/* Real-Time Architecture Diagram */}
                    <AnimatePresence>
                        {showArchitecture && (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card p-8 rounded-2xl border-2 border-teal/30 bg-gradient-to-br from-teal/5 to-primary/5"
                            >
                                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                                    🏗️ Autonomous Revenue Intelligence Architecture
                                </h3>
                                
                                <div className="space-y-4">
                                    {/* Layer 1 */}
                                    <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                                        <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                                            <Radar size={24} className="text-red-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-white">TRIGGER LAYER (Real-Time Intent)</h4>
                                            <p className="text-sm text-gray-400">Hiring signals + Funding news + Tech changes (BrightData)</p>
                                        </div>
                                        <ArrowRight className="text-gray-600" />
                                    </div>
                                    
                                    {/* Layer 2 */}
                                    <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                                        <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                                            <Database size={24} className="text-orange-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-white">ACCOUNT MAPPING (6 stakeholders/company)</h4>
                                            <p className="text-sm text-gray-400">Buying committee identification + CLV prediction</p>
                                        </div>
                                        <ArrowRight className="text-gray-600" />
                                    </div>
                                    
                                    {/* Layer 3 */}
                                    <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                                        <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                                            <Users size={24} className="text-yellow-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-white">MULTI-AGENT COORDINATION (5 agents/account)</h4>
                                            <p className="text-sm text-gray-400">Champion + Influencer + Decision Maker + Blocker + Coordinator</p>
                                        </div>
                                        <ArrowRight className="text-gray-600" />
                                    </div>
                                    
                                    {/* Layer 4 */}
                                    <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                                        <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                            <Layers size={24} className="text-green-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-white">DYNAMIC CHANNEL ORCHESTRATION</h4>
                                            <p className="text-sm text-gray-400">Email + LinkedIn + SMS + Voice + Chat (optimal mix per persona)</p>
                                        </div>
                                        <ArrowRight className="text-gray-600" />
                                    </div>
                                    
                                    {/* Layer 5 */}
                                    <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                                        <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                            <MessageSquare size={24} className="text-blue-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-white">CONVERSATIONAL QUALIFICATION (AI Chat)</h4>
                                            <p className="text-sm text-gray-400">Claude-powered chat with PostgreSQL memory. Qualifies before human handoff.</p>
                                        </div>
                                        <ArrowRight className="text-gray-600" />
                                    </div>
                                    
                                    {/* Layer 6 */}
                                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-teal/20 to-primary/20 rounded-lg border border-teal/30">
                                        <div className="w-12 h-12 rounded-lg bg-teal/30 flex items-center justify-center flex-shrink-0">
                                            <RefreshCw size={24} className="text-teal animate-spin" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-teal">REINFORCEMENT LEARNING OPTIMIZATION</h4>
                                            <p className="text-sm text-gray-400">Self-improving system. Response rate: 3% → 8% → 15% over time.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Final Stats */}
                                <div className="grid grid-cols-4 gap-4 mt-8">
                                    <div className="text-center p-4 bg-black/30 rounded-lg">
                                        <p className="text-3xl font-bold text-teal">15min</p>
                                        <p className="text-sm text-gray-400">Weekly Time</p>
                                    </div>
                                    <div className="text-center p-4 bg-black/30 rounded-lg">
                                        <p className="text-3xl font-bold text-primary">98/100</p>
                                        <p className="text-sm text-gray-400">Lead Quality</p>
                                    </div>
                                    <div className="text-center p-4 bg-black/30 rounded-lg">
                                        <p className="text-3xl font-bold text-purple-400">5x</p>
                                        <p className="text-sm text-gray-400">Contacts/Account</p>
                                    </div>
                                    <div className="text-center p-4 bg-black/30 rounded-lg">
                                        <p className="text-3xl font-bold text-green-400">65%</p>
                                        <p className="text-sm text-gray-400">Win Rate</p>
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

// Visualization Components
const BasicPipeline = () => (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
        {[1, 2, 3, 4, 5].map((step) => (
            <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: step * 0.1 }}
                className="flex items-center gap-4 w-full max-w-sm"
            >
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
                    {step}
                </div>
                <div className="flex-1 h-12 bg-gray-700 rounded-lg flex items-center px-4">
                    <span className="text-sm text-gray-400">
                        {step === 1 && "Scan Prospects"}
                        {step === 2 && "Enrich Data"}
                        {step === 3 && "Score Leads"}
                        {step === 4 && "Generate Outreach"}
                        {step === 5 && "Schedule Campaign"}
                    </span>
                </div>
            </motion.div>
        ))}
    </div>
);

const IntentVisualization = ({ signals }) => (
    <div className="h-full flex flex-col items-center justify-center">
        <div className="relative w-full max-w-md">
            {/* Central Radar */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-teal/30"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-teal/20 flex items-center justify-center">
                    <Radar size={32} className="text-teal" />
                </div>
            </div>
            
            {/* Signal Bubbles */}
            {signals.map((signal, idx) => (
                <motion.div
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: idx * 0.3 }}
                    className="absolute w-24 h-24 rounded-lg bg-red-500/20 border border-red-500/50 flex flex-col items-center justify-center p-2"
                    style={{
                        top: `${20 + idx * 25}%`,
                        left: idx % 2 === 0 ? '5%' : '75%',
                    }}
                >
                    <signal.icon size={16} className="text-red-400 mb-1" />
                    <p className="text-[10px] text-white text-center leading-tight">{signal.company}</p>
                    <p className="text-xs text-green-400 font-bold">{signal.value}</p>
                </motion.div>
            ))}
        </div>
        <p className="text-center text-sm text-gray-400 mt-8">Real-time buying signal detection</p>
    </div>
);

const AccountOrchestration = () => (
    <div className="h-full flex items-center justify-center">
        <div className="relative w-64 h-64">
            {/* Account Hub */}
            <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
            >
                <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary">
                    <Target size={32} className="text-primary" />
                </div>
            </motion.div>
            
            {/* 5 Agents orbiting */}
            {[
                { name: 'Champion', angle: 0, color: 'bg-blue-500' },
                { name: 'Influencer', angle: 72, color: 'bg-green-500' },
                { name: 'Decision', angle: 144, color: 'bg-purple-500' },
                { name: 'Blocker', angle: 216, color: 'bg-yellow-500' },
                { name: 'Coordinator', angle: 288, color: 'bg-pink-500' },
            ].map((agent, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.2 }}
                    className="absolute w-14 h-14 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{
                        backgroundColor: agent.color.replace('bg-', '').replace('-500', ''),
                        top: `${50 + 35 * Math.sin((agent.angle * Math.PI) / 180)}%`,
                        left: `${50 + 35 * Math.cos((agent.angle * Math.PI) / 180)}%`,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    {agent.name.slice(0, 4)}
                </motion.div>
            ))}
        </div>
    </div>
);

const BehavioralScoring = () => (
    <div className="h-full flex flex-col items-center justify-center space-y-6">
        {/* Live Events Stream */}
        <div className="w-full max-w-md space-y-3">
            {[
                { action: 'Visited pricing page', score: '+15', time: '2s ago', icon: Eye },
                { action: 'Opened email 3x', score: '+5', time: '5s ago', icon: Mail },
                { action: 'LinkedIn post: "hiring sales"', score: '+25', time: '12s ago', icon: Linkedin },
            ].map((event, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className="flex items-center gap-4 p-3 bg-black/30 rounded-lg"
                >
                    <event.icon size={18} className="text-teal" />
                    <div className="flex-1">
                        <p className="text-sm text-white">{event.action}</p>
                        <p className="text-xs text-gray-500">{event.time}</p>
                    </div>
                    <span className="text-green-400 font-bold">{event.score}</span>
                </motion.div>
            ))}
        </div>
        
        {/* Score Display */}
        <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-teal/20 to-primary/20 flex flex-col items-center justify-center border-2 border-teal"
        >
            <span className="text-4xl font-bold text-teal">89</span>
            <span className="text-xs text-gray-400">Priority Score</span>
        </motion.div>
    </div>
);

const MultiChannel = () => (
    <div className="h-full flex items-center justify-center">
        <div className="grid grid-cols-3 gap-4">
            {[
                { icon: Mail, label: 'Email', color: 'text-blue-400', active: true },
                { icon: Linkedin, label: 'LinkedIn', color: 'text-blue-600', active: true },
                { icon: MessageSquare, label: 'SMS', color: 'text-green-400', active: false },
                { icon: Phone, label: 'Voice', color: 'text-purple-400', active: true },
                { icon: Bot, label: 'Chat', color: 'text-orange-400', active: true },
                { icon: Database, label: 'Direct', color: 'text-gray-400', active: false },
            ].map((channel, idx) => (
                <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`w-20 h-20 rounded-xl flex flex-col items-center justify-center ${
                        channel.active ? 'bg-teal/20 border border-teal' : 'bg-gray-800 opacity-50'
                    }`}
                >
                    <channel.icon size={24} className={channel.color} />
                    <span className="text-[10px] text-gray-400 mt-1">{channel.label}</span>
                </motion.div>
            ))}
        </div>
    </div>
);

const SelfImproving = () => (
    <div className="h-full flex flex-col items-center justify-center">
        {/* Learning Curve */}
        <div className="w-full max-w-md h-40 relative mb-8">
            <svg className="w-full h-full" viewBox="0 0 300 100">
                <motion.path
                    d="M 0 90 Q 75 80, 100 70 T 200 40 T 300 10"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4ade80" />
                        <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                </defs>
            </svg>
            
            {/* Data Points */}
            {[
                { x: 50, y: 75, label: '3%' },
                { x: 150, y: 50, label: '8%' },
                { x: 250, y: 20, label: '15%' },
            ].map((point, idx) => (
                <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + idx * 0.3 }}
                    className="absolute w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white text-xs font-bold"
                    style={{ left: point.x, top: point.y }}
                >
                    {point.label}
                </motion.div>
            ))}
        </div>
        
        <p className="text-center text-sm text-gray-400">Response rate improvement over time</p>
    </div>
);

const PredictiveSystem = () => (
    <div className="h-full flex flex-col items-center justify-center">
        <motion.div
            animate={{ 
                boxShadow: ['0 0 20px rgba(20,184,166,0.3)', '0 0 40px rgba(20,184,166,0.5)', '0 0 20px rgba(20,184,166,0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-teal/20 to-primary/20 flex items-center justify-center border-2 border-teal"
        >
            <Brain size={48} className="text-teal" />
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 grid grid-cols-2 gap-4"
        >
            <div className="text-center p-3 bg-black/30 rounded-lg">
                <p className="text-lg font-bold text-white">Deal #247</p>
                <p className="text-xs text-yellow-400">⚠️ Risk: Stalling</p>
                <p className="text-xs text-gray-500">Auto-trigger: Video message</p>
            </div>
            <div className="text-center p-3 bg-black/30 rounded-lg">
                <p className="text-lg font-bold text-white">Deal #189</p>
                <p className="text-xs text-green-400">✅ On track</p>
                <p className="text-xs text-gray-500">No action needed</p>
            </div>
        </motion.div>
    </div>
);

// Shared Components
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
            <div className="w-10 h-10 rounded-lg bg-teal/20 flex items-center justify-center">
                <Icon size={20} className="text-teal" />
            </div>
            <h4 className="font-bold text-white">{title}</h4>
        </div>
        <ul className="space-y-2">
            {items.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                    <span className="text-teal mt-1">•</span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

export default LeadGenEvolution;
