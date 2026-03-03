"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info, Code, Terminal, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';

// The main log stream component
const KineticLogStream = ({ 
    logs: customLogs,
    title = "System Feed",
    subtitle = "Real-time processing pipeline",
    height = "400px",
    showHeader = true,
    autoScroll = true,
    className = ""
}) => {
    const [logs, setLogs] = useState([]);
    const logContainerRef = useRef(null);
    const [isActive, setIsActive] = useState(true);

    const logTypes = [
        { type: 'INFO', icon: <Info className="h-4 w-4 text-blue-400" />, color: 'text-blue-400' },
        { type: 'SUCCESS', icon: <CheckCircle className="h-4 w-4 text-green-400" />, color: 'text-green-400' },
        { type: 'WARNING', icon: <AlertTriangle className="h-4 w-4 text-yellow-400" />, color: 'text-yellow-400' },
        { type: 'ERROR', icon: <AlertTriangle className="h-4 w-4 text-red-400" />, color: 'text-red-400' },
        { type: 'PROCESS', icon: <Zap className="h-4 w-4 text-teal-400" />, color: 'text-teal-400' },
    ];

    const defaultLogMessages = [
        { msg: 'Initializing system kernel...', type: 'INFO' },
        { msg: 'Connection established to primary server.', type: 'SUCCESS' },
        { msg: 'User authentication successful.', type: 'SUCCESS' },
        { msg: 'Data packet received from node-01.', type: 'INFO' },
        { msg: 'Compiling assets...', type: 'PROCESS' },
        { msg: 'Deployment complete.', type: 'SUCCESS' },
        { msg: 'High memory usage detected.', type: 'WARNING' },
        { msg: 'Retrying database connection...', type: 'WARNING' },
        { msg: 'API endpoint returned 503.', type: 'ERROR' },
        { msg: 'System health check OK.', type: 'SUCCESS' },
    ];

    useEffect(() => {
        if (customLogs && customLogs.length > 0) {
            setLogs(customLogs);
            return;
        }

        if (!isActive) return;

        const interval = setInterval(() => {
            const randomLogType = logTypes[Math.floor(Math.random() * logTypes.length)];
            const randomMessage = defaultLogMessages[Math.floor(Math.random() * defaultLogMessages.length)];
            const newLog = {
                id: Date.now() + Math.random(),
                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
                ...randomLogType,
                message: randomMessage.msg,
            };

            setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 19)]);
        }, 2000);

        return () => clearInterval(interval);
    }, [customLogs, isActive]);

    useEffect(() => {
        if (logContainerRef.current && autoScroll) {
            logContainerRef.current.scrollTop = 0;
        }
    }, [logs, autoScroll]);

    const logVariants = {
        initial: { opacity: 0, x: -50, scale: 0.8 },
        animate: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } },
        exit: { opacity: 0, x: 50, transition: { duration: 0.3 } }
    };

    return (
        <div className={cn("w-full bg-[#0c0a09] rounded-lg overflow-hidden border border-slate-800 shadow-2xl", className)}>
            {/* Header */}
            {showHeader && (
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                            <Terminal size={14} className="text-teal-400" />
                            <span className="text-slate-400 text-sm font-mono">/var/log/system.log</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-green-400 uppercase tracking-wider">Live</span>
                    </div>
                </div>
            )}

            {/* Log Stream */}
            <div 
                ref={logContainerRef} 
                className="overflow-y-auto font-mono text-sm p-4"
                style={{ height, maxHeight: height }}
            >
                <AnimatePresence initial={false}>
                    {logs.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-slate-600">
                            <div className="text-center">
                                <Code size={32} className="mx-auto mb-2 opacity-50" />
                                <p className="text-sm">Waiting for system events...</p>
                            </div>
                        </div>
                    ) : (
                        logs.map((log, index) => (
                            <motion.div
                                key={log.id}
                                layout
                                variants={logVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="flex items-start gap-3 mb-2 py-1 hover:bg-white/5 rounded px-2 transition-colors"
                            >
                                <span className="text-slate-600 text-xs shrink-0 pt-0.5">{log.timestamp}</span>
                                <div className={cn("flex items-center gap-2 font-bold w-20 shrink-0", log.color)}>
                                    {log.icon}
                                    <span className="text-xs">[{log.type}]</span>
                                </div>
                                <span className="text-slate-300 text-sm break-all">{log.message}</span>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
            
            {/* Bottom gradient fade */}
            <div className="h-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
        </div>
    );
};

// Mobile-optimized step-by-step terminal log for AI processes
export const StepByStepTerminal = ({ 
    steps,
    currentStep = 0,
    onComplete,
    height = "300px",
    className = ""
}) => {
    const [logs, setLogs] = useState([]);
    const [completedSteps, setCompletedSteps] = useState([]);
    const logContainerRef = useRef(null);

    useEffect(() => {
        if (!steps || steps.length === 0) return;

        // Add initial log
        setLogs([{
            id: Date.now(),
            timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
            type: 'INFO',
            icon: <Info className="h-4 w-4 text-blue-400" />,
            color: 'text-blue-400',
            message: 'Initializing process...'
        }]);

        // Process each step with delay
        steps.forEach((step, index) => {
            setTimeout(() => {
                setLogs(prev => [{
                    id: Date.now() + index,
                    timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
                    type: step.type || 'PROCESS',
                    icon: step.type === 'SUCCESS' ? <CheckCircle className="h-4 w-4 text-green-400" /> :
                          step.type === 'WARNING' ? <AlertTriangle className="h-4 w-4 text-yellow-400" /> :
                          <Zap className="h-4 w-4 text-teal-400" />,
                    color: step.type === 'SUCCESS' ? 'text-green-400' :
                           step.type === 'WARNING' ? 'text-yellow-400' :
                           'text-teal-400',
                    message: step.message
                }, ...prev]);
                
                setCompletedSteps(prev => [...prev, index]);
                
                if (index === steps.length - 1 && onComplete) {
                    setTimeout(onComplete, 500);
                }
            }, step.delay || (index + 1) * 1500);
        });
    }, [steps]);

    useEffect(() => {
        if (logContainerRef.current) {
            logContainerRef.current.scrollTop = 0;
        }
    }, [logs]);

    return (
        <div className={cn("w-full bg-black/60 rounded-xl overflow-hidden border border-teal/20", className)}>
            {/* Progress bar */}
            <div className="h-1 bg-slate-800">
                <motion.div 
                    className="h-full bg-teal"
                    initial={{ width: 0 }}
                    animate={{ width: `${((completedSteps.length) / (steps?.length || 1)) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Terminal */}
            <div 
                ref={logContainerRef}
                className="overflow-y-auto font-mono text-xs p-4"
                style={{ height, maxHeight: height }}
            >
                <AnimatePresence>
                    {logs.map((log, index) => (
                        <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-start gap-2 mb-2"
                        >
                            <span className="text-slate-600 shrink-0">{log.timestamp}</span>
                            <div className={cn("shrink-0", log.color)}>
                                {log.icon}
                            </div>
                            <span className="text-slate-300">{log.message}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {completedSteps.length < (steps?.length || 0) && (
                    <motion.div 
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="flex items-center gap-2 text-teal-400"
                    >
                        <span className="text-slate-600">{new Date().toLocaleTimeString('en-US', { hour12: false })}</span>
                        <Zap size={12} />
                        <span>Processing...</span>
                        <span className="animate-pulse">_</span>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default KineticLogStream;
