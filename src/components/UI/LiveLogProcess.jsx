import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

/**
 * LiveLogProcess - A terminal-style live log viewer for AI workflows
 * Shows real-time processing steps with typing animation
 */

const LOG_ICONS = {
  INFO: <Terminal size={12} className="text-blue-400" />,
  PROCESS: <Loader2 size={12} className="text-yellow-400 animate-spin" />,
  SUCCESS: <CheckCircle2 size={12} className="text-green-400" />,
  ERROR: <AlertCircle size={12} className="text-red-400" />,
  WARN: <AlertCircle size={12} className="text-orange-400" />,
};

const LOG_COLORS = {
  INFO: 'text-blue-400',
  PROCESS: 'text-yellow-400',
  SUCCESS: 'text-green-400',
  ERROR: 'text-red-400',
  WARN: 'text-orange-400',
};

// Typewriter hook for realistic terminal typing
const useTypewriter = (text, isActive, speed = 30) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!isActive) {
      setDisplayText('');
      setIsComplete(false);
      indexRef.current = 0;
      return;
    }

    const typeNextChar = () => {
      if (indexRef.current < text.length) {
        setDisplayText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
        const delay = speed + Math.random() * 20;
        setTimeout(typeNextChar, delay);
      } else {
        setIsComplete(true);
      }
    };

    typeNextChar();
  }, [text, isActive, speed]);

  return { displayText, isComplete };
};

const LogLine = ({ log, isActive, onComplete }) => {
  const { displayText, isComplete } = useTypewriter(log.message, isActive, 25);
  
  useEffect(() => {
    if (isComplete && onComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-start gap-2 py-1 font-mono text-xs"
    >
      <span className="flex-shrink-0 mt-0.5">{LOG_ICONS[log.type] || LOG_ICONS.INFO}</span>
      <span className="flex-shrink-0 text-gray-500">
        [{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]
      </span>
      <span className={LOG_COLORS[log.type] || 'text-gray-300'}>
        {displayText}
        {!isComplete && <span className="animate-pulse">▋</span>}
      </span>
    </motion.div>
  );
};

export const LiveLogProcess = ({ 
  workflow = 'content-creation', 
  isPlaying = false,
  currentStage = 0,
  className = '' 
}) => {
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const containerRef = useRef(null);

  // Workflow-specific logs
  const workflowLogs = {
    'content-creation': [
      { message: 'Initializing content pipeline...', type: 'INFO' },
      { message: 'Loading brand guidelines from database...', type: 'PROCESS' },
      { message: 'Analyzing target audience: Malaysian millennials...', type: 'PROCESS' },
      { message: 'Generating Manglish variants with cultural context...', type: 'PROCESS' },
      { message: 'Running viral prediction model (v2.4)...', type: 'PROCESS' },
      { message: 'Predicted engagement: 8.5% (3x industry avg)', type: 'SUCCESS' },
      { message: 'Auto-scheduling for optimal posting time...', type: 'PROCESS' },
      { message: 'Content package ready for publishing', type: 'SUCCESS' },
    ],
    'lead-generation': [
      { message: 'Initializing lead scraper v3.0...', type: 'INFO' },
      { message: 'Connecting to LinkedIn Sales Navigator...', type: 'PROCESS' },
      { message: 'Scanning for prospects in F&B industry...', type: 'PROCESS' },
      { message: 'Found 247 potential leads in KL/Selangor area', type: 'INFO' },
      { message: 'Running AI lead scoring model...', type: 'PROCESS' },
      { message: 'Enriching contact data with Apollo.io...', type: 'PROCESS' },
      { message: 'Qualified 42 high-intent leads (17% conversion)', type: 'SUCCESS' },
      { message: 'Exporting to HubSpot CRM...', type: 'PROCESS' },
      { message: 'Lead pipeline automation complete', type: 'SUCCESS' },
    ],
    'customer-service': [
      { message: 'Initializing AI support agent "MakcikBot"...', type: 'INFO' },
      { message: 'Loading knowledge base (2,847 articles)...', type: 'PROCESS' },
      { message: 'Analyzing customer query sentiment...', type: 'PROCESS' },
      { message: 'Sentiment: Frustrated | Intent: Refund Request', type: 'WARN' },
      { message: 'Searching historical resolutions...', type: 'PROCESS' },
      { message: 'Generating personalized response in Manglish...', type: 'PROCESS' },
      { message: 'Response sent with empathy score: 94%', type: 'SUCCESS' },
      { message: 'Ticket auto-resolved | CSAT predicted: 4.2/5', type: 'SUCCESS' },
    ],
  };

  const logs = workflowLogs[workflow] || workflowLogs['content-creation'];

  // Reset when workflow changes or play starts
  useEffect(() => {
    if (isPlaying) {
      setVisibleLogs([]);
      setCurrentLogIndex(0);
    }
  }, [isPlaying, workflow]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLogs]);

  // Add logs progressively when playing
  useEffect(() => {
    if (!isPlaying || currentLogIndex >= logs.length) return;

    const addLog = () => {
      if (currentLogIndex < logs.length) {
        setVisibleLogs(prev => [...prev, { ...logs[currentLogIndex], id: Date.now() }]);
        setCurrentLogIndex(prev => prev + 1);
      }
    };

    // Staggered delays for realistic terminal feel
    const delays = [500, 800, 1200, 1000, 1500, 800, 1000, 600];
    const delay = delays[currentLogIndex] || 1000;

    const timer = setTimeout(addLog, delay);
    return () => clearTimeout(timer);
  }, [isPlaying, currentLogIndex, logs]);

  return (
    <div className={`bg-slate-900 rounded-xl overflow-hidden border border-slate-700 ${className}`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-teal" />
          <span className="text-xs font-mono text-slate-300">AI_Workflow_Logs.sh</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={containerRef}
        className="p-3 font-mono text-xs h-[200px] overflow-y-auto bg-slate-950"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#475569 #0f172a' }}
      >
        {/* Welcome message */}
        {visibleLogs.length === 0 && (
          <div className="text-slate-500 text-xs py-2">
            <p>$ ./run_workflow.sh --mode=ai --verbose</p>
            <p className="mt-1">Ready to execute. Click &quot;Play Demo&quot; to start...</p>
          </div>
        )}

        {/* Log lines */}
        <AnimatePresence mode="popLayout">
          {visibleLogs.map((log, index) => (
            <LogLine
              key={log.id}
              log={log}
              isActive={index === visibleLogs.length - 1}
            />
          ))}
        </AnimatePresence>

        {/* Cursor at end */}
        {isPlaying && currentLogIndex < logs.length && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 py-1"
          >
            <span className="text-green-400">➜</span>
            <span className="text-slate-400">Processing...</span>
            <Loader2 size={10} className="text-teal animate-spin" />
          </motion.div>
        )}

        {/* Completed state */}
        {!isPlaying && visibleLogs.length > 0 && currentLogIndex >= logs.length && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 py-2 mt-2 border-t border-slate-800"
          >
            <CheckCircle2 size={12} className="text-green-400" />
            <span className="text-green-400 text-xs">Workflow completed successfully</span>
          </motion.div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-800 border-t border-slate-700 text-[10px] text-slate-400">
        <div className="flex items-center gap-3">
          <span>Stage: {currentStage + 1}/4</span>
          <span className="text-slate-600">|</span>
          <span>Logs: {visibleLogs.length}/{logs.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`} />
          <span>{isPlaying ? 'RUNNING' : 'IDLE'}</span>
        </div>
      </div>
    </div>
  );
};

export default LiveLogProcess;
