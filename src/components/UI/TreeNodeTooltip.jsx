import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";
import { ChevronRight, ChevronDown, Folder, FolderOpen, Award, TrendingUp, Zap } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip";

export default function TreeNodeTooltip({ node, index = 0 }) {
  const [expanded, setExpanded] = useState(node.defaultExpanded || false);
  const hasUserInteracted = useRef(false);

  // React to defaultExpanded prop changes (for auto-expand)
  // Only auto-expand if user hasn't manually interacted
  useEffect(() => {
    if (node.defaultExpanded !== undefined && !hasUserInteracted.current) {
      setExpanded(node.defaultExpanded);
    }
  }, [node.defaultExpanded]);

  const isCategory = node.type === "category";
  const isTool = node.type === "tool";

  const toggle = () => {
    if (isCategory) {
      hasUserInteracted.current = true;
      setExpanded((prev) => !prev);
    }
  };

  // Get success rate color
  const getSuccessColor = (rate) => {
    if (rate >= 90) return "text-teal";
    if (rate >= 75) return "text-blue-500";
    if (rate >= 60) return "text-primary";
    return "text-gray-500";
  };

  // Get proficiency badge
  const getProficiencyBadge = (rate) => {
    if (rate >= 90) return { text: "Expert", class: "bg-teal/10 text-teal" };
    if (rate >= 75) return { text: "Advanced", class: "bg-blue-500/10 text-blue-500" };
    if (rate >= 60) return { text: "Proficient", class: "bg-primary/10 text-primary" };
    return { text: "Learning", class: "bg-gray-500/10 text-gray-500" };
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggle}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg w-full text-left group transition-all",
                "hover:bg-primary/5 dark:hover:bg-white/5",
                isTool && "pl-8",
                expanded && isCategory && "bg-primary/5 dark:bg-white/5"
              )}
            >
              {/* Icon */}
              {isCategory && (
                <>
                  {expanded ? (
                    <ChevronDown size={16} className="text-primary flex-shrink-0" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-400 flex-shrink-0" />
                  )}
                  {expanded ? (
                    <FolderOpen size={18} className="text-primary flex-shrink-0" />
                  ) : (
                    <Folder size={18} className="text-gray-400 flex-shrink-0" />
                  )}
                </>
              )}

              {isTool && node.logo && (
                <img 
                  src={node.logo} 
                  alt={node.name}
                  className="w-4 h-4 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              )}

              {/* Name */}
              <span className={cn(
                "flex-1 truncate font-medium",
                isCategory && "font-bold text-navy dark:text-white",
                isTool && "text-gray-700 dark:text-gray-300"
              )}>
                {node.name}
              </span>

              {/* Success Rate Badge */}
              {isTool && node.successRate !== undefined && (
                <span className={cn(
                  "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
                  getSuccessColor(node.successRate)
                )}>
                  <TrendingUp size={12} />
                  {node.successRate}%
                </span>
              )}

              {/* Children Count */}
              {isCategory && node.children && (
                <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-full">
                  {node.children.length}
                </span>
              )}
            </button>
          </TooltipTrigger>

          <TooltipContent side="right" className="max-w-xs" showArrow>
            <div className="space-y-2">
              <div className="font-bold text-base">{node.name}</div>
              
              {node.description && (
                <p className="text-sm opacity-90">{node.description}</p>
              )}

              {node.successRate !== undefined && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="opacity-75">Proficiency:</span>
                    <span className={cn(
                      "font-bold px-2 py-0.5 rounded",
                      getProficiencyBadge(node.successRate).class
                    )}>
                      {getProficiencyBadge(node.successRate).text}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${node.successRate}%` }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className={cn(
                        "h-full rounded-full",
                        node.successRate >= 90 ? "bg-teal" :
                        node.successRate >= 75 ? "bg-blue-500" :
                        node.successRate >= 60 ? "bg-primary" :
                        "bg-gray-500"
                      )}
                    />
                  </div>
                </div>
              )}

              {node.achievement && (
                <div className="flex items-start gap-2 text-sm bg-primary/10 dark:bg-primary/20 p-2 rounded">
                  <Award size={14} className="text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-primary font-medium">{node.achievement}</span>
                </div>
              )}

              {node.usage && (
                <div className="flex items-center gap-2 text-xs opacity-75">
                  <Zap size={12} />
                  <span>{node.usage}</span>
                </div>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Animate children */}
      {isCategory && (
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-4 border-l-2 border-primary/20 dark:border-white/10 pl-2 space-y-0.5 overflow-hidden"
            >
              {node.children?.map((child, idx) => (
                <TreeNodeTooltip key={child.id} node={child} index={idx} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}
