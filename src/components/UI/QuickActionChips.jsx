import { motion } from 'framer-motion';
import { Sparkles, Mail, Image, FileText, Search, Link2 } from 'lucide-react';

const QuickActionChips = ({ messageText, onChipClick }) => {
  // Analyze message content to generate relevant chips
  const generateChips = (text) => {
    const chips = [];
    const lowerText = text.toLowerCase();

    // Long message → suggest summarize
    if (text.length > 150) {
      chips.push({ id: 'summarize', label: 'Summarize', icon: FileText, action: `Summarize this: ${text}` });
    }

    // Contains email/contact → suggest draft
    if (lowerText.includes('email') || lowerText.includes('contact') || lowerText.includes('reach')) {
      chips.push({ id: 'email', label: 'Draft email', icon: Mail, action: 'Draft an email about this' });
    }

    // Contains work/project references → suggest similar
    if (lowerText.includes('project') || lowerText.includes('work') || lowerText.includes('portfolio')) {
      chips.push({ id: 'similar', label: 'Find similar', icon: Search, action: 'Find similar projects' });
    }

    // Contains tools/AI mentions → suggest details
    if (lowerText.includes('tool') || lowerText.includes('ai') || lowerText.includes('automat')) {
      chips.push({ id: 'details', label: 'More details', icon: Sparkles, action: 'Tell me more details about this' });
    }

    // Contains links/URLs → suggest visit
    if (lowerText.includes('http') || lowerText.includes('link') || lowerText.includes('github')) {
      chips.push({ id: 'links', label: 'Show links', icon: Link2, action: 'Show me relevant links' });
    }

    // Always include "Explain differently"
    chips.push({ id: 'explain', label: 'Explain differently', icon: Sparkles, action: 'Explain this in a different way' });

    return chips.slice(0, 4); // Max 4 chips
  };

  const chips = generateChips(messageText);

  if (chips.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-purple-500/10"
    >
      {chips.map((chip, idx) => {
        const Icon = chip.icon;
        return (
          <motion.button
            key={chip.id}
            onClick={() => onChipClick(chip.action)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.3 + idx * 0.05 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
              borderColor: 'rgba(139, 92, 246, 0.6)'
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5
                     bg-zinc-700/30 hover:bg-zinc-700/50
                     border border-purple-500/25 hover:border-purple-500/50
                     rounded-full text-xs font-medium text-zinc-200
                     backdrop-blur-md
                     transition-all duration-200
                     cursor-pointer
                     shadow-sm hover:shadow-lg hover:shadow-purple-500/20"
          >
            <Icon className="w-3 h-3" />
            <span>{chip.label}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default QuickActionChips;
