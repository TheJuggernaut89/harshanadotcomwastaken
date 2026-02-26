import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Headphones, Brain, Heart, Eye, MessageSquare, 
    Sparkles, Play, Activity, Zap, TrendingUp,
    Users, Shield, Clock, ArrowRight, Video,
    Monitor, Smartphone, RefreshCw, CheckCircle2,
    AlertCircle, Smile, Frown, Meh, Gauge
} from 'lucide-react';

/**
 * Customer Service Evolution
 * From Reactive Tickets → Anticipatory Emotional Intelligence
 */
const CustomerServiceEvolution = () => {
    const [stage, setStage] = useState('reactive');
    const [isRunning, setIsRunning] = useState(false);
    const [metrics, setMetrics] = useState({
        responseTime: 2,
        automation: 80,
        satisfaction: 95,
        humanLoad: 1.0
    });
    const [emotion, setEmotion] = useState('neutral');
    const [showArchitecture, setShowArchitecture] = useState(false);

    const stages = {
        reactive: {
            title: "Stage 0: Reactive Support",
            subtitle: "Wait for tickets → Respond → Resolve",
            metrics: { responseTime: 2, automation: 80, satisfaction: 95, humanLoad: 1.0 },
            description: "Traditional helpdesk: Customer contacts first, then we respond. 2-minute avg response."
        },
        predictive: {
            title: "Stage 1: Predictive Support",
            subtitle: "Anticipate issues before contact",
            metrics: { responseTime: 0.5, automation: 85, satisfaction: 96, humanLoad: 0.9 },
            description: "Monitor usage telemetry, detect confusion patterns, proactive outreach. <500ms response."
        },
        emotional: {
            title: "Stage 2: Emotional Intelligence",
            subtitle: "Real-time emotion detection + Adaptive responses",
            metrics: { responseTime: 0.5, automation: 88, satisfaction: 97, humanLoad: 0.8 },
            description: "Detect frustration, urgency, confusion. Adapt tone. Auto-escalate high emotion."
        },
        multimodal: {
            title: "Stage 3: Multimodal Visual Support",
            subtitle: "AR/VR + Screen sharing + Video guidance",
            metrics: { responseTime: 0.5, automation: 90, satisfaction: 97.5, humanLoad: 0.7 },
            description: "AR annotations on camera feed, screen sharing with AI highlights, Loom-style video explanations."
        },
        selflearning: {
            title: "Stage 4: Self-Learning Knowledge",
            subtitle: "Living knowledge graph + Auto-evolution",
            metrics: { responseTime: 0.3, automation: 92, satisfaction: 98, humanLoad: 0.6 },
            description: "Every resolved ticket improves KB. Failed resolutions trigger new articles. GitHub auto-sync."
        },
        collaboration: {
            title: "Stage 5: Human-AI Collaboration",
            subtitle: "Seamless handoffs + Real-time collaboration",
            metrics: { responseTime: 0.3, automation: 93, satisfaction: 98, humanLoad: 0.5 },
            description: "Bi-directional state sync, human approval checkpoints, AI suggests + human approves."
        },
        autonomous: {
            title: "Stage 6: Autonomous Resolution",
            subtitle: "AI fixes problems directly + Omnichannel memory",
            metrics: { responseTime: 0, automation: 95, satisfaction: 98, humanLoad: 0.3 },
            description: "Zero-minute response (anticipatory). AI resets passwords, issues refunds, executes fixes."
        }
    };

    useEffect(() => {
        if (isRunning && stage !== 'autonomous') {
            const timer = setTimeout(() => {
                const stageOrder = ['reactive', 'predictive', 'emotional', 'multimodal', 'selflearning', 'collaboration', 'autonomous'];
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
        
        // Simulate emotion changes
        if (stage === 'emotional' || stage === 'collaboration') {
            const emotions = ['frustrated', 'neutral', 'satisfied'];
            const interval = setInterval(() => {
                setEmotion(emotions[Math.floor(Math.random() * emotions.length)]);
            }, 1500);
            return () => clearInterval(interval);
        } else {
            setEmotion('neutral');
        }
    }, [stage]);

    const handleEvolve = () => {
        setStage('reactive');
        setShowArchitecture(false);
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm font-bold mb-4">
                        <Heart size={16} />
                        Emotional Intelligence Architecture
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Customer Service Evolution
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        From Reactive Tickets → Anticipatory, Emotionally Intelligent Support
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
                                        ? 'bg-green-500 text-white scale-110 shadow-lg shadow-green-500/30' 
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
                            className="glass-card p-8 rounded-2xl border border-green-500/20 bg-white/5 min-h-[500px]"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-2xl font-bold text-white">{currentStage.title}</h3>
                                {stage === 'autonomous' && (
                                    <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        className="text-green-400"
                                    >
                                        <RefreshCw size={24} />
                                    </motion.div>
                                )}
                            </div>
                            
                            <p className="text-green-400 font-medium mb-4">{currentStage.subtitle}</p>
                            <p className="text-gray-400 mb-8">{currentStage.description}</p>

                            {/* Stage Visualizations */}
                            <div className="h-80 relative">
                                <AnimatePresence mode="wait">
                                    {stage === 'reactive' && <ReactiveSupport />}
                                    {stage === 'predictive' && <PredictiveSupport />}
                                    {stage === 'emotional' && <EmotionalIntelligence emotion={emotion} />}
                                    {stage === 'multimodal' && <MultimodalSupport />}
                                    {stage === 'selflearning' && <SelfLearning />}
                                    {stage === 'collaboration' && <HumanAICollab />}
                                    {stage === 'autonomous' && <AutonomousResolution />}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* Metrics Panel */}
                        <div className="space-y-4">
                            <MetricCard 
                                icon={Clock}
                                label="Response Time"
                                value={metrics.responseTime === 0 ? '<1min' : `${metrics.responseTime}min`}
                                color="text-green-400"
                                bgColor="bg-green-500/10"
                                description="2min → Zero (anticipatory)"
                            />
                            <MetricCard 
                                icon={Zap}
                                label="Automation Rate"
                                value={`${metrics.automation}%`}
                                color="text-teal"
                                bgColor="bg-teal/10"
                                description="80% → 95% (autonomous actions)"
                            />
                            <MetricCard 
                                icon={Smile}
                                label="CSAT Score"
                                value={`${metrics.satisfaction}%`}
                                color="text-yellow-400"
                                bgColor="bg-yellow-500/10"
                                description="95% → 98% (emotional + multimodal)"
                            />
                            <MetricCard 
                                icon={Users}
                                label="Human Load"
                                value={`${metrics.humanLoad} FTE`}
                                color="text-blue-400"
                                bgColor="bg-blue-500/10"
                                description="1 supervisor → 0.3 (per 1000 chats)"
                            />

                            {/* Evolution Button */}
                            <motion.button
                                onClick={handleEvolve}
                                disabled={isRunning}
                                className="w-full py-4 bg-gradient-to-r from-green-500 to-teal text-white rounded-xl font-bold text-lg shadow-lg shadow-green-500/30 hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                                {isRunning ? (
                                    <>
                                        <RefreshCw size={20} className="animate-spin" />
                                        Evolving System...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={20} />
                                        {stage === 'autonomous' ? 'Restart Evolution' : 'Evolve Support'}
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <TechCard 
                            icon={Brain}
                            title="Predictive & Memory"
                            items={[
                                'predictivechat (<500ms)',
                                'NevaMind-AI/memU',
                                'Usage telemetry monitoring',
                                'Weather API integration',
                                'Proactive trigger detection'
                            ]}
                        />
                        <TechCard 
                            icon={Heart}
                            title="Emotional Intelligence"
                            items={[
                                'Emotion-Aware-AI-Support',
                                'Audio tone analysis',
                                'Text sentiment trajectory',
                                'Visual emotion detection',
                                'EmpathAI personality adaptation'
                            ]}
                        />
                        <TechCard 
                            icon={Video}
                            title="Multimodal & AR"
                            items={[
                                'Microsoft multimodal agent',
                                'AR annotation on camera',
                                'Screen sharing + AI highlights',
                                'RemoteAssistanceAR (Hololens)',
                                'Loom-style video generation'
                            ]}
                        />
                    </div>

                    {/* Architecture Diagram */}
                    <AnimatePresence>
                        {showArchitecture && (
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass-card p-8 rounded-2xl border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 to-teal/10"
                            >
                                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                                    🧠 Anticipatory Support Architecture
                                </h3>
                                
                                <div className="space-y-4">
                                    {/* Layer 1 */}
                                    <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                                        <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                            <Brain size={24} className="text-purple-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-white">ANTICIPATORY LAYER (MemU + Predictive)</h4>
                                            <p className="text-sm text-gray-400">Detects confusion patterns → Auto-opens chat. Weather alerts. Usage monitoring.</p>
                                        </div>
                                        <ArrowRight className="text-gray-600" />
                                    </div>
                                    
                                    {/* Layer 2 */}
                                    <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                                        <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                                            <Heart size={24} className="text-pink-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-white">EMOTIONAL INTELLIGENCE (EmpathAI)</h4>
                                            <p className="text-sm text-gray-400">Tone adaptation + Visual emotion + Sentiment trajectory + Cultural matching</p>
                                        </div>
                                        <ArrowRight className="text-gray-600" />
                                    </div>
                                    
                                    {/* Layer 3 */}
                                    <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                                        <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                            <Video size={24} className="text-blue-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-white">MULTIMODAL SUPPORT (Microsoft Agent)</h4>
                                            <p className="text-sm text-gray-400">AR annotations + Screen sharing + Voice/Video + Hololens 3D guidance</p>
                                        </div>
                                        <ArrowRight className="text-gray-600" />
                                    </div>
                                    
                                    {/* Layer 4 */}
                                    <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                                        <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                                            <RefreshCw size={24} className="text-yellow-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-white">SELF-LEARNING (ai42z)</h4>
                                            <p className="text-sm text-gray-400">Auto-extract best practices + GitHub sync + Knowledge gap detection</p>
                                        </div>
                                        <ArrowRight className="text-gray-600" />
                                    </div>
                                    
                                    {/* Layer 5 */}
                                    <div className="flex items-center gap-4 p-4 bg-black/30 rounded-lg">
                                        <div className="w-12 h-12 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                                            <Users size={24} className="text-orange-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-white">HUMAN COLLABORATION (AG-UI Protocol)</h4>
                                            <p className="text-sm text-gray-400">Bi-directional state sync + Approval checkpoints + Real-time collaboration</p>
                                        </div>
                                        <ArrowRight className="text-gray-600" />
                                    </div>
                                    
                                    {/* Layer 6 */}
                                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-500/20 to-teal/20 rounded-lg border border-green-500/30">
                                        <div className="w-12 h-12 rounded-lg bg-green-500/30 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 size={24} className="text-green-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-green-400">AUTONOMOUS RESOLUTION</h4>
                                            <p className="text-sm text-gray-400">Reset passwords, issue refunds, execute fixes, API integrations. Fix, don't just answer.</p>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Final Stats */}
                                <div className="grid grid-cols-4 gap-4 mt-8">
                                    <div className="text-center p-4 bg-black/30 rounded-lg">
                                        <p className="text-3xl font-bold text-green-400">0min</p>
                                        <p className="text-sm text-gray-400">Response Time</p>
                                    </div>
                                    <div className="text-center p-4 bg-black/30 rounded-lg">
                                        <p className="text-3xl font-bold text-teal">95%</p>
                                        <p className="text-sm text-gray-400">Automation</p>
                                    </div>
                                    <div className="text-center p-4 bg-black/30 rounded-lg">
                                        <p className="text-3xl font-bold text-yellow-400">98%</p>
                                        <p className="text-sm text-gray-400">CSAT Score</p>
                                    </div>
                                    <div className="text-center p-4 bg-black/30 rounded-lg">
                                        <p className="text-3xl font-bold text-blue-400">0.3</p>
                                        <p className="text-sm text-gray-400">Human FTE</p>
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
const ReactiveSupport = () => (
    <div className="h-full flex flex-col items-center justify-center">
        <div className="space-y-4 w-full max-w-sm">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-4 bg-red-500/20 rounded-lg border border-red-500/30"
            >
                <AlertCircle size={24} className="text-red-400" />
                <div>
                    <p className="text-white font-medium">Customer Problem</p>
                    <p className="text-sm text-gray-400">"I can't checkout"</p>
                </div>
            </motion.div>
            
            <div className="flex justify-center">
                <ArrowRight className="text-gray-600 rotate-90" />
            </div>
            
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-3 p-4 bg-green-500/20 rounded-lg border border-green-500/30"
            >
                <Headphones size={24} className="text-green-400" />
                <div>
                    <p className="text-white font-medium">Agent Response</p>
                    <p className="text-sm text-gray-400">2 minutes later...</p>
                </div>
            </motion.div>
        </div>
    </div>
);

const PredictiveSupport = () => (
    <div className="h-full flex flex-col items-center justify-center">
        <div className="relative w-full max-w-md">
            {/* Radar scanning */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/30"
            />
            
            {/* Confusion pattern detected */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-4 left-4 p-3 bg-red-500/20 rounded-lg border border-red-500"
            >
                <p className="text-xs text-red-400 font-bold">Confusion Pattern</p>
                <p className="text-[10px] text-gray-400">Rapid page switching</p>
            </motion.div>
            
            {/* Proactive trigger */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-4 right-4 p-3 bg-green-500/20 rounded-lg border border-green-500"
            >
                <p className="text-xs text-green-400 font-bold">Proactive Trigger</p>
                <p className="text-[10px] text-gray-400">Auto-opening chat...</p>
            </motion.div>
            
            {/* Center AI */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Brain size={32} className="text-purple-400" />
                </div>
            </div>
        </div>
        <p className="text-center text-sm text-gray-400 mt-20">AI detects issues before contact</p>
    </div>
);

const EmotionalIntelligence = ({ emotion }) => (
    <div className="h-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-8 mb-8">
            {/* Customer emotion */}
            <motion.div
                key={emotion}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-center"
            >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-2 ${
                    emotion === 'frustrated' ? 'bg-red-500/20' :
                    emotion === 'satisfied' ? 'bg-green-500/20' : 'bg-yellow-500/20'
                }`}>
                    {emotion === 'frustrated' && <Frown size={40} className="text-red-400" />}
                    {emotion === 'neutral' && <Meh size={40} className="text-yellow-400" />}
                    {emotion === 'satisfied' && <Smile size={40} className="text-green-400" />}
                </div>
                <p className="text-sm text-gray-400">Customer: {emotion}</p>
            </motion.div>
            
            <ArrowRight className="text-gray-600" />
            
            {/* AI adaptation */}
            <motion.div
                key={`ai-${emotion}`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-center"
            >
                <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mb-2">
                    <Heart size={32} className="text-purple-400" />
                </div>
                <p className="text-sm text-gray-400">
                    {emotion === 'frustrated' && 'Auto-escalate + Compensation'}
                    {emotion === 'neutral' && 'Standard helpful tone'}
                    {emotion === 'satisfied' && 'Upsell opportunity!'}
                </p>
            </motion.div>
        </div>
        
        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-md">
            <div className="text-center p-3 bg-black/30 rounded-lg">
                <p className="text-xs text-gray-400">Tone</p>
                <p className="text-sm text-green-400">Detected</p>
            </div>
            <div className="text-center p-3 bg-black/30 rounded-lg">
                <p className="text-xs text-gray-400">Pitch</p>
                <p className="text-sm text-green-400">Analyzed</p>
            </div>
            <div className="text-center p-3 bg-black/30 rounded-lg">
                <p className="text-xs text-gray-400">Trajectory</p>
                <p className="text-sm text-green-400">Tracking</p>
            </div>
        </div>
    </div>
);

const MultimodalSupport = () => (
    <div className="h-full flex items-center justify-center">
        <div className="grid grid-cols-2 gap-4">
            {[
                { icon: Video, label: 'AR Guidance', color: 'text-red-400', active: true },
                { icon: Monitor, label: 'Screen Share', color: 'text-blue-400', active: true },
                { icon: Smartphone, label: 'Camera View', color: 'text-green-400', active: true },
                { icon: Eye, label: 'Visual AI', color: 'text-purple-400', active: false },
            ].map((mode, idx) => (
                <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.15 }}
                    className={`w-28 h-28 rounded-xl flex flex-col items-center justify-center ${
                        mode.active ? 'bg-teal/20 border border-teal' : 'bg-gray-800 opacity-50'
                    }`}
                >
                    <mode.icon size={32} className={mode.color} />
                    <span className="text-[10px] text-gray-400 mt-2 text-center">{mode.label}</span>
                </motion.div>
            ))}
        </div>
    </div>
);

const SelfLearning = () => (
    <div className="h-full flex flex-col items-center justify-center">
        <div className="relative w-48 h-48">
            {/* Growing knowledge graph */}
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-yellow-500/30"
            />
            
            {/* Nodes appearing */}
            {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
                <motion.div
                    key={idx}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.2, repeat: Infinity, repeatDelay: 2 }}
                    className="absolute w-4 h-4 rounded-full bg-yellow-500"
                    style={{
                        top: `${50 + 40 * Math.sin((angle * Math.PI) / 180)}%`,
                        left: `${50 + 40 * Math.cos((angle * Math.PI) / 180)}%`,
                        transform: 'translate(-50%, -50%)'
                    }}
                />
            ))}
            
            {/* Center */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <RefreshCw size={24} className="text-yellow-400 animate-spin" />
                </div>
            </div>
        </div>
        <p className="text-center text-sm text-gray-400 mt-8">Knowledge base auto-evolving</p>
    </div>
);

const HumanAICollab = () => (
    <div className="h-full flex items-center justify-center">
        <div className="flex items-center gap-6">
            {/* AI Side */}
            <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-center"
            >
                <div className="w-20 h-20 rounded-full bg-purple-500/20 flex items-center justify-center mb-2">
                    <Brain size={32} className="text-purple-400" />
                </div>
                <p className="text-sm text-purple-400">AI Suggests</p>
            </motion.div>
            
            {/* Collaboration arrows */}
            <div className="flex flex-col gap-2">
                <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    <ArrowRight className="text-green-400" />
                </motion.div>
                <motion.div
                    animate={{ x: [0, -5, 0] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                >
                    <ArrowRight className="text-green-400 rotate-180" />
                </motion.div>
            </div>
            
            {/* Human Side */}
            <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="text-center"
            >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                    <Users size={32} className="text-green-400" />
                </div>
                <p className="text-sm text-green-400">Human Approves</p>
            </motion.div>
        </div>
    </div>
);

const AutonomousResolution = () => (
    <div className="h-full flex flex-col items-center justify-center">
        <motion.div
            animate={{ 
                boxShadow: ['0 0 20px rgba(74,222,128,0.3)', '0 0 40px rgba(74,222,128,0.5)', '0 0 20px rgba(74,222,128,0.3)']
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500/20 to-teal/20 flex flex-col items-center justify-center border-2 border-green-500"
        >
            <CheckCircle2 size={48} className="text-green-400" />
            <span className="text-xs text-green-400 mt-1">FIXED</span>
        </motion.div>
        
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 grid grid-cols-2 gap-3"
        >
            {['Password Reset', 'Refund Issued', 'Rescheduled', 'API Updated'].map((action, idx) => (
                <div key={idx} className="px-3 py-2 bg-green-500/10 rounded-lg text-center">
                    <p className="text-xs text-green-400">{action}</p>
                </div>
            ))}
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
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                <Icon size={20} className="text-green-400" />
            </div>
            <h4 className="font-bold text-white">{title}</h4>
        </div>
        <ul className="space-y-2">
            {items.map((item, idx) => (
                <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                    <span className="text-green-400 mt-1">•</span>
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

export default CustomerServiceEvolution;
