import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Lock, Info, ExternalLink, Zap } from 'lucide-react';

/**
 * Universal Demo Wrapper Component
 * Wraps all AI tool demos with consistent UX
 */
const DemoWrapper = ({ 
  title, 
  description, 
  demoType = 'interactive', // 'interactive', 'static', 'limited'
  children,
  limitations = "Demo mode - limited functionality. Full version available to contracted clients.",
  upgradeMessage = "Interested in the full platform? Let's talk!",
  onUpgradeClick
}) => {
  const [showInfo, setShowInfo] = useState(false);

  const getBadgeConfig = () => {
    switch(demoType) {
      case 'interactive':
        return {
          icon: <Sparkles size={12} />,
          text: 'DEMO MODE',
          className: 'bg-teal/20 text-teal border-teal/30 animate-pulse'
        };
      case 'limited':
        return {
          icon: <Lock size={12} />,
          text: 'LIMITED ACCESS',
          className: 'bg-sandy/20 text-sandy border-sandy/30'
        };
      case 'static':
        return {
          icon: <Zap size={12} />,
          text: 'PREVIEW',
          className: 'bg-primary/20 text-primary border-primary/30'
        };
      default:
        return {
          icon: <Sparkles size={12} />,
          text: 'DEMO',
          className: 'bg-gray-500/20 text-gray-500 border-gray-500/30'
        };
    }
  };

  const badge = getBadgeConfig();

  return (
    <div className="glass-card p-6 md:p-8 relative overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Demo Mode Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
        <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 border ${badge.className}`}>
          {badge.icon}
          {badge.text}
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="p-2 rounded-full hover:bg-white/10 dark:hover:bg-navy/20 transition-colors"
        >
          <Info size={16} className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* Info Popup */}
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-16 right-4 bg-navy-dark text-white p-4 rounded-lg shadow-card max-w-xs z-20"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-sm">About This Demo</h4>
              <button
                onClick={() => setShowInfo(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <p className="text-xs text-gray-300 mb-2">{limitations}</p>
            <p className="text-xs text-teal">{upgradeMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Demo Header */}
      <div className="mb-6 relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-navy dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
          {description}
        </p>
      </div>

      {/* Demo Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Upgrade CTA */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 pt-6 border-t border-navy/10 dark:border-white/10 relative z-10"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-navy dark:text-white mb-1">
              Need the full version?
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Unlimited access, full features, dedicated support.
            </p>
          </div>
          <button 
            onClick={onUpgradeClick}
            className="btn-secondary py-2 px-6 text-sm whitespace-nowrap flex items-center gap-2"
          >
            Request Full Access
            <ExternalLink size={14} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DemoWrapper;
