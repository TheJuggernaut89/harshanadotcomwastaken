import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Shield, Scale, Globe, Users, TrendingUp, 
    CheckCircle, AlertTriangle, XCircle, Clock,
    Play, RefreshCw, Lock, Unlock, Activity,
    Database, Zap, Award, FileCheck
} from 'lucide-react';

// Evolution stages for Makcik Approval
const approvalStages = [
    { 
        stage: 0, 
        name: 'Manual Checks', 
        icon: '📋', 
        halal: '230 manual checks',
        legal: 'Reactive',
        cultural: 'Static rules',
        color: 'red'
    },
    { 
        stage: 1, 
        name: 'Blockchain Halal', 
        icon: '🔗', 
        halal: '99.8% tamper-proof',
        legal: 'Smart contracts',
        cultural: 'IoT verified',
        color: 'orange'
    },
    { 
        stage: 2, 
        name: 'Predictive Legal', 
        icon: '⚖️', 
        halal: 'Pre-screened',
        legal: '14-day forecast',
        cultural: 'Risk scoring',
        color: 'yellow'
    },
    { 
        stage: 3, 
        name: 'Cultural Radar', 
        icon: '📡', 
        halal: 'Fatwa DB synced',
        legal: 'Multi-jurisdiction',
        cultural: 'Real-time 4 ethnicities',
        color: 'teal'
    },
    { 
        stage: 4, 
        name: 'Neuro-Pricing', 
        icon: '🧠', 
        halal: 'Auto-compliant',
        legal: 'Dynamic framing',
        cultural: 'Religious numerology',
        color: 'blue'
    },
    { 
        stage: 5, 
        name: 'Autonomous AI', 
        icon: '🤖', 
        halal: 'Verified',
        legal: 'Auto-approved',
        cultural: 'Escalation only',
        color: 'green'
    }
];

// Risk Gauge Component
const RiskGauge = ({ label, value, color, stage }) => {
    const colors = {
        green: 'from-green-500 to-emerald-500',
        yellow: 'from-yellow-500 to-amber-500',
        red: 'from-red-500 to-rose-500'
    };
    
    return (
        <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 uppercase tracking-wider">{label}</span>
                <span className={`text-lg font-bold ${
                    color === 'green' ? 'text-green-400' :
                    color === 'yellow' ? 'text-yellow-400' :
                    'text-red-400'
                }`}>
                    {value}%
                </span>
            </div>
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                    className={`h-full rounded-full bg-gradient-to-r ${colors[color]}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, delay: stage * 0.1 }}
                />
            </div>
            <div className="flex justify-between mt-1 text-[10px] text-gray-500">
                <span>Safe</span>
                <span>Risk</span>
            </div>
        </div>
    );
};

// Blockchain verification visual
const BlockchainVerification = ({ stage }) => {
    const blocks = [
        { id: 'farm', label: 'Farm', verified: stage >= 1 },
        { id: 'slaughter', label: 'Slaughter', verified: stage >= 1 },
        { id: 'process', label: 'Processing', verified: stage >= 1 },
        { id: 'retail', label: 'Retail', verified: stage >= 1 },
    ];
    
    if (stage === 0) {
        return (
            <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                <div className="flex items-center gap-2 mb-3 text-red-400">
                    <AlertTriangle size={16} />
                    <span className="text-xs font-bold uppercase">Manual Verification</span>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        230 checklist items
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        Paper documentation
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        3-5 day processing
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
            <div className="flex items-center gap-2 mb-3 text-green-400">
                <Database size={16} />
                <span className="text-xs font-bold uppercase">HalalChain Verified</span>
            </div>
            <div className="flex items-center gap-2">
                {blocks.map((block, idx) => (
                    <React.Fragment key={block.id}>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: idx * 0.2 }}
                            className={`flex-1 p-2 rounded-lg text-center ${
                                block.verified 
                                    ? 'bg-green-500/20 border border-green-500' 
                                    : 'bg-gray-700'
                            }`}
                        >
                            <div className={`w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center ${
                                block.verified ? 'bg-green-500' : 'bg-gray-600'
                            }`}>
                                {block.verified && <CheckCircle size={14} className="text-white" />}
                            </div>
                            <div className="text-[10px] text-gray-400">{block.label}</div>
                        </motion.div>
                        {idx < blocks.length - 1 && (
                            <div className={`w-4 h-0.5 ${
                                block.verified ? 'bg-green-500' : 'bg-gray-700'
                            }`} />
                        )}
                    </React.Fragment>
                ))}
            </div>
            <div className="mt-3 text-xs text-green-400">
                ✓ 99.8% tamper detection | 1.2s consensus
            </div>
        </div>
    );
};

// Cultural sentiment monitor
const CulturalRadar = ({ stage }) => {
    const ethnicities = [
        { name: 'Malay', sentiment: 85, risk: 'Low' },
        { name: 'Chinese', sentiment: 78, risk: 'Low' },
        { name: 'Indian', sentiment: 82, risk: 'Low' },
        { name: 'Orang Asli', sentiment: 70, risk: 'Medium' },
    ];
    
    if (stage < 3) {
        return (
            <div className="bg-gray-800/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3 text-gray-400">
                    <Globe size={16} />
                    <span className="text-xs font-bold uppercase">Cultural Sensitivity</span>
                </div>
                <div className="text-xs text-gray-500">
                    Static rule-based checking
                </div>
            </div>
        );
    }
    
    return (
        <div className="bg-teal/10 rounded-xl p-4 border border-teal/20">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-teal">
                    <Activity size={16} />
                    <span className="text-xs font-bold uppercase">Live Cultural Radar</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] text-green-400">LIVE</span>
                </div>
            </div>
            <div className="space-y-2">
                {ethnicities.map((eth, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 w-20">{eth.name}</span>
                        <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-gradient-to-r from-teal to-green-400"
                                animate={{ width: `${eth.sentiment}%` }}
                            />
                        </div>
                        <span className={`text-xs ${
                            eth.risk === 'Low' ? 'text-green-400' : 'text-yellow-400'
                        }`}>
                            {eth.risk}
                        </span>
                    </div>
                ))}
            </div>
            <div className="mt-3 p-2 bg-black/30 rounded text-xs text-teal">
                ✓ All clear for Raya campaign
            </div>
        </div>
    );
};

// Approval workflow visualization
const ApprovalWorkflow = ({ stage }) => {
    const steps = [
        { id: 'halal', label: 'Halal', icon: Database },
        { id: 'legal', label: 'Legal', icon: Scale },
        { id: 'cultural', label: 'Cultural', icon: Globe },
        { id: 'pricing', label: 'Pricing', icon: TrendingUp },
        { id: 'final', label: 'Approve', icon: Award },
    ];
    
    return (
        <div className="bg-white/5 rounded-xl p-4">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-4">
                Approval Workflow
            </div>
            <div className="flex items-center justify-between">
                {steps.map((step, idx) => {
                    const Icon = step.icon;
                    const isActive = idx <= stage;
                    const isCurrent = idx === stage;
                    
                    return (
                        <React.Fragment key={step.id}>
                            <div className="flex flex-col items-center">
                                <motion.div
                                    animate={{
                                        scale: isCurrent ? 1.1 : 1,
                                        backgroundColor: isActive ? '#2dd4bf' : '#374151'
                                    }}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        isActive ? 'shadow-lg shadow-teal/30' : ''
                                    }`}
                                >
                                    <Icon size={18} className={isActive ? 'text-navy-dark' : 'text-gray-500'} />
                                </motion.div>
                                <span className={`text-[10px] mt-1 ${
                                    isActive ? 'text-teal' : 'text-gray-600'
                                }`}>
                                    {step.label}
                                </span>
                            </div>
                            {idx < steps.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-2 ${
                                    idx < stage ? 'bg-teal' : 'bg-gray-700'
                                }`} />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

const MakcikApprovalEvolution = () => {
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
            title: 'Manual Compliance',
            desc: '230 manual halal checks, paper documentation, reactive legal review',
            insight: 'Slow, error-prone, reactive to problems after they occur',
            metric: '3-5 day processing time'
        },
        { 
            title: 'Blockchain HalalChain',
            desc: 'Ethereum smart contracts, IoT sensors, 3-of-5 validator consensus (JAKIM/MUIS/MUI)',
            insight: 'Immutable supply chain: Farm → Slaughter → Processing → Retail',
            metric: '99.8% tamper detection, 1.2s consensus'
        },
        { 
            title: 'Predictive Legal Guard',
            desc: 'RiskLexis T5 Transformer predicts legal challenges 14 days ahead',
            insight: 'Auto-detects MY vs SG vs Indonesia legal frameworks',
            metric: '70% reduction in legal review time'
        },
        { 
            title: 'Cultural Radar Live',
            desc: 'Kafka + Spark Streaming monitors 4 ethnicities in real-time',
            insight: 'Auto-cancel campaign if tragedy breaks during festival period',
            metric: 'Real-time sentiment, early warning system'
        },
        { 
            title: 'Neuro-Pricing AI',
            desc: 'Behavioral economics: loss aversion for Malay, gain framing for Chinese',
            insight: 'Auto-avoid "666" (Chinese) and "13" (Western), adjust ±RM1',
            metric: 'Dynamic religious numerology awareness'
        },
        { 
            title: 'Autonomous AI Approval',
            desc: 'RL agent makes final approve/reject decisions without human oversight',
            insight: 'Escalation triggers: religious >85, legal High, budget >RM10K',
            metric: '70% routine approvals automated'
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm font-bold mb-4">
                        <Shield size={16} />
                        Compliance & Governance
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Makcik Approval Evolution
                    </h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        From manual checks → blockchain verification → autonomous AI governance
                    </p>
                </motion.div>

                {/* Stage Selector */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {approvalStages.map((s, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleStageClick(idx)}
                            className={`px-4 py-3 rounded-xl text-sm font-bold transition-all flex flex-col items-center min-w-[100px] ${
                                currentStage === idx
                                    ? 'bg-green-500 text-navy-dark shadow-lg shadow-green-500/30 scale-105'
                                    : completedStage >= idx
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-white/5 text-gray-500 hover:bg-white/10'
                            }`}
                        >
                            <span className="text-xl mb-1">{s.icon}</span>
                            <span className="text-[10px] uppercase tracking-wider">Stage {idx}</span>
                        </button>
                    ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
                    {/* Left: Risk Dashboard */}
                    <div className="lg:col-span-4 space-y-4">
                        <RiskGauge 
                            label="Halal Compliance" 
                            value={currentStage === 0 ? 75 : currentStage === 1 ? 99.8 : 100}
                            color={currentStage === 0 ? 'yellow' : 'green'}
                            stage={currentStage}
                        />
                        <RiskGauge 
                            label="Legal Risk" 
                            value={currentStage < 2 ? 45 : currentStage === 2 ? 25 : 15}
                            color={currentStage < 2 ? 'yellow' : 'green'}
                            stage={currentStage}
                        />
                        <RiskGauge 
                            label="Cultural Safety" 
                            value={currentStage < 3 ? 70 : currentStage === 3 ? 85 : 96}
                            color={currentStage < 3 ? 'yellow' : currentStage === 3 ? 'green' : 'green'}
                            stage={currentStage}
                        />
                        
                        {/* ROI Metric */}
                        <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-xl p-4 border border-green-500/20">
                            <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Influencer ROI</div>
                            <div className="flex items-end gap-2">
                                <span className="text-3xl font-bold text-green-400">
                                    {currentStage < 5 ? '280%' : '450%'}
                                </span>
                                <span className="text-sm text-green-500 mb-1">
                                    {currentStage === 5 ? '(+61%)' : ''}
                                </span>
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                {currentStage < 5 
                                    ? 'Fraud elimination pending' 
                                    : 'Fraud detected & avoided'}
                            </div>
                        </div>
                    </div>

                    {/* Center: Main Display */}
                    <div className="lg:col-span-5">
                        <motion.div
                            key={currentStage}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-black/40 rounded-2xl p-6 border border-green-500/20 h-full"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{approvalStages[currentStage].icon}</span>
                                    <div>
                                        <span className="text-xs text-green-400 font-bold uppercase tracking-wider">
                                            Stage {currentStage}
                                        </span>
                                        <h3 className="font-bold text-white text-lg">
                                            {stageInfo[currentStage].title}
                                        </h3>
                                    </div>
                                </div>
                                <button
                                    onClick={handlePlay}
                                    disabled={isPlaying}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-navy-dark rounded-lg text-xs font-bold hover:bg-green-600 transition-all disabled:opacity-50"
                                >
                                    {isPlaying ? (
                                        <RefreshCw size={12} className="animate-spin" />
                                    ) : (
                                        <Play size={12} fill="currentColor" />
                                    )}
                                    {isPlaying ? 'Running...' : 'Evolve'}
                                </button>
                            </div>

                            <p className="text-gray-300 text-sm mb-4">
                                {stageInfo[currentStage].desc}
                            </p>

                            <div className="bg-green-500/10 rounded-lg p-3 border-l-2 border-green-400 mb-4">
                                <p className="text-xs text-green-300 italic">
                                    "{stageInfo[currentStage].insight}"
                                </p>
                            </div>

                            {/* Workflow */}
                            <ApprovalWorkflow stage={currentStage} />

                            {/* Progress */}
                            <div className="mt-4 pt-4 border-t border-white/10">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>System Evolution</span>
                                    <span>{Math.round(((currentStage + 1) / 6) * 100)}%</span>
                                </div>
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <motion.div 
                                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                                        animate={{ width: `${((currentStage + 1) / 6) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Specialized Checks */}
                    <div className="lg:col-span-3 space-y-4">
                        <BlockchainVerification stage={currentStage} />
                        <CulturalRadar stage={currentStage} />
                        
                        {/* Features List */}
                        <div className="bg-white/5 rounded-xl p-4">
                            <div className="text-xs text-gray-400 uppercase tracking-wider mb-3">
                                Active Systems
                            </div>
                            <div className="space-y-2">
                                {[
                                    { label: 'Blockchain Halal', active: currentStage >= 1 },
                                    { label: 'Predictive Legal', active: currentStage >= 2 },
                                    { label: 'Cultural Radar', active: currentStage >= 3 },
                                    { label: 'Neuro-Pricing', active: currentStage >= 4 },
                                    { label: 'Influencer Fraud AI', active: currentStage >= 5 },
                                ].map((feat, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex items-center gap-2 text-xs ${
                                            feat.active ? 'text-green-400' : 'text-gray-600'
                                        }`}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${
                                            feat.active ? 'bg-green-500' : 'bg-gray-700'
                                        }`} />
                                        {feat.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom: Before/After */}
                <div className="grid md:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto">
                    <div className="bg-red-500/10 rounded-xl p-6 border border-red-500/20">
                        <h4 className="font-bold text-red-400 mb-3">Before: Manual Checks</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex items-start gap-2">
                                <AlertTriangle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                                230 manual halal checklist items
                            </li>
                            <li className="flex items-start gap-2">
                                <AlertTriangle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                                Reactive legal (after problem occurs)
                            </li>
                            <li className="flex items-start gap-2">
                                <AlertTriangle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                                Static cultural rules (easily outdated)
                            </li>
                            <li className="flex items-start gap-2">
                                <AlertTriangle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                                3-5 day processing time
                            </li>
                        </ul>
                    </div>
                    <div className="bg-green-500/10 rounded-xl p-6 border border-green-500/20">
                        <h4 className="font-bold text-green-400 mb-3">After: Autonomous AI</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex items-start gap-2">
                                <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                                99.8% blockchain tamper detection
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                                14-day predictive legal early warning
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                                Real-time 4-ethnicity sentiment monitoring
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle size={14} className="text-green-400 mt-0.5 flex-shrink-0" />
                                70% routine approvals automated
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakcikApprovalEvolution;
