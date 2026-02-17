import { motion } from 'framer-motion';
import {
  Sparkles, Mail, FileText, Search, Link2,
  BarChart3, Target, DollarSign, TrendingUp,
  Wrench, Bot, Zap, Code,
  Building, Calendar,
  Rocket, LineChart, Award, Scale,
  Briefcase, Banknote, Phone,
  ExternalLink, Download, Linkedin, Image,
  Component, GitBranch, Video, Users,
  GitCompare, Shield, Gem,
  MapPin, Clock, Globe, MessageCircle,
  Flame, Lightbulb, Contact
} from 'lucide-react';

const QuickActionChips = ({ messageText, onChipClick }) => {
  // Analyze message content to generate relevant chips
  const generateChips = (text) => {
    const chips = [];
    const lowerText = text.toLowerCase();

    // CATEGORY 1: Achievement Proof (metrics detected)
    const hasMetrics = /\d{2,3}%|rm\s?\d+k?|million|growth|increase|results|revenue|impression/i.test(text);
    if (hasMetrics) {
      chips.push({
        id: 'see-numbers',
        label: '🎯 Show me the numbers',
        icon: Target,
        action: 'Break down the 429% growth - how did you achieve it?',
        type: 'conversational'
      });
      chips.push({
        id: 'roi',
        label: '💰 What\'s the ROI?',
        icon: DollarSign,
        action: 'Explain the RM7K/month savings vs agency cost',
        type: 'conversational'
      });
    }

    // CATEGORY 2: Technical Verification
    const isTechnical = /(code|build|tech stack|tools?|automation|ai|development|react|n8n)/i.test(lowerText);
    if (isTechnical) {
      chips.push({
        id: 'tech-stack',
        label: '🛠️ View my tech stack',
        icon: Wrench,
        action: 'Show me the full list: React, n8n, Claude API, analytics tools',
        type: 'conversational'
      });
      chips.push({
        id: 'ai-tools',
        label: '🤖 See the 6 AI tools',
        icon: Bot,
        action: 'Tell me about Kopitiam Oracle, Mamak Copy, and the Malaysian AI suite',
        type: 'conversational'
      });
    }

    // CATEGORY 3: Experience Deep-Dive
    const isExperience = /(experience|work|role|job|career|background)/i.test(lowerText);
    if (isExperience) {
      chips.push({
        id: 'cream-story',
        label: '🏢 Cream of Creams story',
        icon: Building,
        action: 'Tell me about the 429% growth campaign and revenue system',
        type: 'conversational'
      });
      chips.push({
        id: 'career-timeline',
        label: '📚 Full career timeline',
        icon: Calendar,
        action: 'Walk me through 7 years: Singapore → Malaysia → current',
        type: 'conversational'
      });
    }

    // CATEGORY 4: Project Exploration
    const isProject = /(project|build|created|launched|platform|campaign)/i.test(lowerText);
    if (isProject) {
      chips.push({
        id: 'malaysian-ai',
        label: '🚀 Malaysian AI Platform',
        icon: Rocket,
        action: 'Tell me about the 6 localized AI tools for Malaysia market',
        type: 'conversational'
      });
      chips.push({
        id: 'viral-campaign',
        label: '🧀 Viral Cheesecake Campaign',
        icon: Award,
        action: 'Break down the 2M+ impression campaign strategy',
        type: 'conversational'
      });
    }

    // CATEGORY 5: Hiring-Focused
    const isHiring = /(hire|salary|cost|worth|team|position|availability|available)/i.test(lowerText);
    if (isHiring) {
      chips.push({
        id: 'hire-vs-agency',
        label: '💼 Why hire vs agency?',
        icon: Briefcase,
        action: 'Compare: In-house me vs RM45K/year agency',
        type: 'conversational'
      });
      chips.push({
        id: 'lets-talk',
        label: '📞 Let\'s talk',
        icon: Phone,
        action: 'external:whatsapp',
        type: 'external'
      });
    }

    // CATEGORY 6: Verification & Proof
    const isProof = /(proof|evidence|verify|show me|demonstrate|portfolio|resume)/i.test(lowerText);
    if (isProof) {
      chips.push({
        id: 'full-portfolio',
        label: '✅ Open full portfolio',
        icon: ExternalLink,
        action: 'external:portfolio',
        type: 'external'
      });
      chips.push({
        id: 'linkedin',
        label: '🔗 Connect on LinkedIn',
        icon: Linkedin,
        action: 'external:linkedin',
        type: 'external'
      });
    }

    // CATEGORY 7: Skill-Specific (only if no other category matched)
    if (chips.length < 2) {
      if (/react|vite|javascript|web/i.test(lowerText)) {
        chips.push({
          id: 'react-projects',
          label: '⚛️ React projects',
          icon: Component,
          action: 'Show me websites and apps I\'ve built with React + Vite',
          type: 'conversational'
        });
      }
      if (/n8n|automation|workflow|zapier/i.test(lowerText)) {
        chips.push({
          id: 'automation-examples',
          label: '🔄 n8n automation examples',
          icon: GitBranch,
          action: 'Walk me through 3 automation workflows I\'ve created',
          type: 'conversational'
        });
      }
      if (/video|editing|premiere|after effects/i.test(lowerText)) {
        chips.push({
          id: 'video-portfolio',
          label: '🎬 Video editing portfolio',
          icon: Video,
          action: 'Tell me about Premiere Pro / After Effects work',
          type: 'conversational'
        });
      }
      if (/social media|instagram|facebook|tiktok/i.test(lowerText)) {
        chips.push({
          id: 'social-wins',
          label: '📱 Social media wins',
          icon: Users,
          action: 'Highlight my best campaigns across Instagram, Facebook, TikTok',
          type: 'conversational'
        });
      }
    }

    // CATEGORY 8: Comparison & Positioning
    const isComparison = /(versus|compare|alternative|other|difference|why you)/i.test(lowerText);
    if (isComparison) {
      chips.push({
        id: 'goldmine-positioning',
        label: '💎 The 3-in-1 GOLDMINE',
        icon: Gem,
        action: 'SMM + Developer + Designer skills breakdown',
        type: 'conversational'
      });
      chips.push({
        id: 'vs-agency',
        label: '🆚 In-house vs Agency',
        icon: Shield,
        action: 'Compare speed, cost, cultural fit, system ownership',
        type: 'conversational'
      });
    }

    // CATEGORY 9: Location & Availability
    const isLocation = /(location|malaysia|hybrid|remote|full-time|when)/i.test(lowerText);
    if (isLocation) {
      chips.push({
        id: 'location',
        label: '📍 I\'m in Malaysia',
        icon: MapPin,
        action: 'Based in Damansara Perdana - available for hybrid/full-time',
        type: 'conversational'
      });
      chips.push({
        id: 'chat',
        label: '💬 Let\'s chat',
        icon: MessageCircle,
        action: 'external:whatsapp',
        type: 'external'
      });
    }

    // CATEGORY 10: Always Available Fallback (if no chips yet)
    if (chips.length === 0) {
      chips.push({
        id: 'top-achievements',
        label: '🎯 Top 3 achievements',
        icon: Award,
        action: 'Show my biggest wins: 429% growth, RM savings, 2M impressions',
        type: 'conversational'
      });
      chips.push({
        id: 'goldmine-pitch',
        label: '💎 The 3-in-1 GOLDMINE',
        icon: Gem,
        action: 'The elevator pitch: 3-in-1, proven results, Malaysian market expert',
        type: 'conversational'
      });
      chips.push({
        id: 'most-impressive',
        label: '🔥 Most impressive project',
        icon: Flame,
        action: 'Tell me about the Malaysian AI Platform - the GOLDMINE',
        type: 'conversational'
      });
    }

    // ALWAYS include contact option if hiring-related OR as fallback
    if (isHiring || chips.length < 3) {
      chips.push({
        id: 'email-me',
        label: '📧 Email me',
        icon: Mail,
        action: 'external:email',
        type: 'external'
      });
    }

    return chips.slice(0, 4); // Max 4 chips
  };

  const chips = generateChips(messageText);

  const handleChipClick = (chip) => {
    if (chip.type === 'external') {
      // Handle external links
      switch (chip.action) {
        case 'external:portfolio':
          window.open('https://harshanajothiresume2026.netlify.app', '_blank');
          break;
        case 'external:whatsapp':
          window.open('https://wa.me/60112964914?text=Hi%20Harshana,%20I%20saw%20your%20portfolio!', '_blank');
          break;
        case 'external:email':
          window.location.href = 'mailto:jothiharshana188@gmail.com?subject=Inquiry%20from%20Portfolio';
          break;
        case 'external:linkedin':
          window.open('https://www.linkedin.com/in/harshana-jothi/', '_blank');
          break;
        default:
          console.warn('Unknown external action:', chip.action);
      }
    } else {
      // Handle conversational chips (send to chatbot)
      onChipClick(chip.action);
    }
  };

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
            onClick={() => handleChipClick(chip)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.3 + idx * 0.05 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: chip.type === 'external'
                ? 'rgba(16, 185, 129, 0.2)' // Green for external links
                : 'rgba(139, 92, 246, 0.2)', // Purple for conversational
              borderColor: chip.type === 'external'
                ? 'rgba(16, 185, 129, 0.6)'
                : 'rgba(139, 92, 246, 0.6)'
            }}
            whileTap={{ scale: 0.95 }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5
                     ${chip.type === 'external' ? 'bg-green-700/20' : 'bg-zinc-700/30'}
                     hover:bg-zinc-700/50
                     border ${chip.type === 'external' ? 'border-green-500/25' : 'border-purple-500/25'}
                     hover:border-purple-500/50
                     rounded-full text-xs font-medium text-zinc-200
                     backdrop-blur-md transition-all duration-200 cursor-pointer
                     shadow-sm hover:shadow-lg ${chip.type === 'external' ? 'hover:shadow-green-500/20' : 'hover:shadow-purple-500/20'}`}
          >
            <Icon className="w-3 h-3" />
            <span>{chip.label}</span>
            {chip.type === 'external' && (
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default QuickActionChips;
