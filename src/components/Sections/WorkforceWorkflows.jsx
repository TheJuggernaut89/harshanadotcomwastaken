import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ArrowRight, Clock, Users, Zap, TrendingUp, AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';

// Tooltip Component
const CommandTooltip = ({ text, show }) => {
    if (!show || !text) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="ml-6 mb-2 flex items-start gap-2 text-gray-400 text-xs"
        >
            <HelpCircle size={12} className="text-blue-400 mt-0.5 flex-shrink-0" />
            <span className="italic">{text}</span>
        </motion.div>
    );
};

const WorkforceWorkflows = () => {
    const [activeWorkflow, setActiveWorkflow] = useState('content-creation');
    const [isExecuting, setIsExecuting] = useState(false);
    const [commandIndex, setCommandIndex] = useState(0);
    const [typingText, setTypingText] = useState('');
    const [showAfter, setShowAfter] = useState(false);
    const [charIndex, setCharIndex] = useState(0);
    const [showTooltip, setShowTooltip] = useState(false);

    const workflows = {
        'content-creation': {
            name: 'Content Creation Workflow',
            description: 'Multi-platform content generation and distribution',
            before: {
                time: '4-6 hours per campaign',
                team: '3 people (Marketer, Designer, Copywriter)',
                steps: [
                    'Manual brainstorming session (60 min)',
                    'Design creation in Photoshop (90 min)',
                    'Copywriting for each platform (45 min)',
                    'Manual resizing for platforms (30 min)',
                    'Review and approval rounds (45 min)',
                    'Manual posting to each platform (30 min)'
                ],
                issues: [
                    'High coordination overhead',
                    'Inconsistent brand voice',
                    'Platform-specific delays',
                    'Human error in scheduling'
                ]
            },
            after: {
                time: '45 minutes per campaign',
                team: '1 person (Marketing Technologist)',
                steps: [
                    'AI-powered trend analysis (5 min)',
                    'Automated multi-format generation (10 min)',
                    'AI copywriting with brand voice (5 min)',
                    'Automated platform optimization (10 min)',
                    'One-click review dashboard (10 min)',
                    'Automated scheduling & distribution (5 min)'
                ],
                benefits: [
                    '87% time reduction',
                    '3x faster deployment',
                    'Zero scheduling errors',
                    'Consistent brand voice'
                ]
            },
            commands: [
                { cmd: '$ initialize_campaign --type="product_launch"', tooltip: 'Starting a new campaign: Sets up the project and loads your brand settings', delay: 800, pauseAfter: 400 },
                { cmd: '✓ Campaign initialized: PROD_LAUNCH_2026', tooltip: null, delay: 400, pauseAfter: 600 },
                { cmd: '$ analyze_trends --platform="all" --region="MY"', tooltip: 'Scanning social media: Checking 50,000+ posts to find trending topics', delay: 1000, pauseAfter: 500 },
                { cmd: '  → Scanning TikTok...', tooltip: 'Looking at viral videos, trending sounds, and popular hashtags', delay: 600, pauseAfter: 300 },
                { cmd: '  → Scanning Instagram...', tooltip: 'Analyzing Reels, Stories, and post engagement patterns', delay: 600, pauseAfter: 300 },
                { cmd: '  → Scanning Facebook...', tooltip: 'Finding what Malaysians are sharing, liking, and commenting on', delay: 600, pauseAfter: 400 },
                { cmd: '✓ Trend analysis complete: 3 high-potential topics identified', tooltip: 'These topics have 89% confidence based on AI prediction models', delay: 600, pauseAfter: 800 },
                { cmd: '$ generate_content --format="multi_platform" --count=15', tooltip: 'Creating content: Making posts optimized for each platform automatically', delay: 1200, pauseAfter: 400 },
                { cmd: '  → Facebook: 3 carousel posts generated', tooltip: 'Carousel format works best on Facebook for product showcases', delay: 300, pauseAfter: 200 },
                { cmd: '  → Instagram: 4 reels + 4 stories generated', tooltip: 'Reels get 3x more engagement than static posts on Instagram', delay: 300, pauseAfter: 200 },
                { cmd: '  → TikTok: 4 short videos generated', tooltip: 'TikTok videos are 15-60 seconds with trending audio added', delay: 300, pauseAfter: 400 },
                { cmd: '✓ Content generation complete: 15 assets ready', tooltip: 'All content follows your brand guidelines and voice automatically', delay: 600, pauseAfter: 800 },
                { cmd: '$ optimize_scheduling --strategy="engagement_max"', tooltip: 'Smart timing: AI finds the best time to post for maximum engagement', delay: 1000, pauseAfter: 500 },
                { cmd: '✓ Optimal schedule calculated: 95% coverage predicted', tooltip: '95% of your audience will see at least one post in their feed', delay: 600, pauseAfter: 800 },
                { cmd: '$ deploy_campaign --auto_publish=true', tooltip: 'Publishing: Posts go live automatically at the scheduled times', delay: 1000, pauseAfter: 400 },
                { cmd: '✓ Campaign deployed successfully!', tooltip: null, delay: 400, pauseAfter: 600 },
                { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
                { cmd: '📊 Expected Results:', tooltip: null, delay: 400, pauseAfter: 300 },
                { cmd: '   • Estimated Reach: 80K-120K', tooltip: 'Based on your follower count and typical engagement rates', delay: 300, pauseAfter: 200 },
                { cmd: '   • Predicted Engagement: 8.5%', tooltip: 'Industry average is 3-5%, this campaign beats that by 2x', delay: 300, pauseAfter: 200 },
                { cmd: '   • Time Saved: 5.25 hours', tooltip: 'That means you saved RM 400+ in labor costs for this campaign', delay: 300, pauseAfter: 500 }
            ]
        },
        'lead-generation': {
            name: 'Lead Generation Workflow',
            description: 'Automated prospect identification and outreach',
            before: {
                time: '8-10 hours per week',
                team: '2 people (Sales + Marketing)',
                steps: [
                    'Manual LinkedIn prospecting (120 min)',
                    'Data entry into spreadsheet (60 min)',
                    'Email template customization (90 min)',
                    'Manual email sending (45 min)',
                    'Follow-up tracking (45 min)',
                    'Response management (120 min)'
                ],
                issues: [
                    'Low volume capacity',
                    'Generic messaging',
                    'Missed follow-ups',
                    'No prioritization'
                ]
            },
            after: {
                time: '1.5 hours per week',
                team: '1 person (AI-assisted)',
                steps: [
                    'AI prospect scoring (15 min)',
                    'Automated data enrichment (10 min)',
                    'AI personalized messaging (10 min)',
                    'Automated sequencing (5 min)',
                    'Smart follow-up triggers (automated)',
                    'Priority inbox alerts (20 min)'
                ],
                benefits: [
                    '85% time reduction',
                    '10x lead volume',
                    '3x response rate',
                    '100% follow-up rate'
                ]
            },
            commands: [
                { cmd: '$ scan_prospects --criteria="tech_companies_MY" --size="50-200"', tooltip: 'Finding companies: Searching for Malaysian tech companies with 50-200 employees', delay: 1000, pauseAfter: 500 },
                { cmd: '✓ Scanning 1,247 companies...', tooltip: 'Checking company databases, LinkedIn, and business registries', delay: 800, pauseAfter: 600 },
                { cmd: '✓ Found 342 qualified prospects', tooltip: 'These companies match your ideal customer profile', delay: 600, pauseAfter: 800 },
                { cmd: '$ enrich_data --source="linkedin" --depth="full"', tooltip: 'Getting details: Finding decision makers, company info, and contact details', delay: 1200, pauseAfter: 400 },
                { cmd: '  → Fetching company details...', tooltip: 'Industry, revenue, employee count, recent news, funding status', delay: 400, pauseAfter: 300 },
                { cmd: '  → Extracting decision makers...', tooltip: 'Finding CEOs, CTOs, Marketing Directors with verified emails', delay: 400, pauseAfter: 300 },
                { cmd: '  → Analyzing company signals...', tooltip: 'Recent hiring, funding rounds, product launches = buying signals', delay: 400, pauseAfter: 400 },
                { cmd: '✓ Data enrichment complete: 342 profiles enhanced', tooltip: 'Each profile now has 15+ data points for personalization', delay: 600, pauseAfter: 800 },
                { cmd: '$ score_prospects --model="engagement_prediction"', tooltip: 'AI scoring: Predicting which prospects are most likely to respond', delay: 1000, pauseAfter: 500 },
                { cmd: '✓ Scoring complete: 89 high-priority prospects identified', tooltip: 'These prospects have 60%+ predicted response rate', delay: 600, pauseAfter: 800 },
                { cmd: '$ generate_outreach --style="personalized" --tone="professional"', tooltip: 'Writing emails: AI creates unique messages for each prospect', delay: 1200, pauseAfter: 400 },
                { cmd: '✓ 89 personalized emails generated', tooltip: 'Each email mentions their company, role, and recent activities', delay: 600, pauseAfter: 800 },
                { cmd: '$ schedule_campaign --sequence="3_touch" --days="7"', tooltip: 'Smart follow-ups: Sending 3 emails over 7 days automatically', delay: 1000, pauseAfter: 500 },
                { cmd: '✓ Campaign scheduled: Day 1, 3, 7 touchpoints', tooltip: 'If they don\'t respond to email 1, email 2 goes automatically', delay: 600, pauseAfter: 600 },
                { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
                { cmd: '📈 Projected Outcomes:', tooltip: null, delay: 400, pauseAfter: 300 },
                { cmd: '   • Expected Open Rate: 42%', tooltip: 'Personalization increases opens by 26% vs generic emails', delay: 300, pauseAfter: 200 },
                { cmd: '   • Predicted Response: 18%', tooltip: 'AI-scored prospects respond 3x more than random outreach', delay: 300, pauseAfter: 200 },
                { cmd: '   • Qualified Leads: 16-20', tooltip: 'That\'s 16-20 sales conversations from 1.5 hours of work', delay: 300, pauseAfter: 500 }
            ]
        },
        'customer-service': {
            name: 'Customer Service Workflow',
            description: '24/7 automated support with AI triage',
            before: {
                time: 'Business hours only (8 hours)',
                team: '2-3 support agents',
                steps: [
                    'Manual inbox monitoring',
                    'Read and categorize inquiry',
                    'Search knowledge base',
                    'Draft response',
                    'Manager approval for complex cases',
                    'Send response'
                ],
                issues: [
                    'Limited coverage hours',
                    'Response delays (4-24 hours)',
                    'Inconsistent answers',
                    'Agent burnout on repetitive queries'
                ]
            },
            after: {
                time: '24/7 automated coverage',
                team: 'AI Agent + 1 human supervisor',
                steps: [
                    'Instant message reception',
                    'AI sentiment analysis & categorization',
                    'Automated response for 80% of queries',
                    'Smart escalation to human',
                    'Knowledge base auto-update',
                    'Continuous learning from interactions'
                ],
                benefits: [
                    '24/7 availability',
                    '2-minute avg response time',
                    '80% automation rate',
                    '95% satisfaction score'
                ]
            },
            commands: [
                { cmd: '$ initialize_support_ai --mode="production"', tooltip: 'Starting AI support: Loading your company knowledge and policies', delay: 800, pauseAfter: 400 },
                { cmd: '✓ AI Support Agent initialized', tooltip: null, delay: 400, pauseAfter: 600 },
                { cmd: '$ load_knowledge_base --source="documentation"', tooltip: 'Learning from docs: AI reads all your FAQs, guides, and policies', delay: 1000, pauseAfter: 500 },
                { cmd: '✓ Loaded 2,847 support articles', tooltip: 'AI can now answer questions about products, policies, troubleshooting', delay: 600, pauseAfter: 800 },
                { cmd: '$ monitor_channels --platforms="email,chat,social"', tooltip: 'Watching inbox: AI monitors all customer communication channels', delay: 800, pauseAfter: 400 },
                { cmd: '✓ Monitoring 3 channels...', tooltip: 'Email, Facebook Messenger, and website chat are being watched', delay: 400, pauseAfter: 600 },
                { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
                { cmd: '📬 New Inquiry Received:', tooltip: null, delay: 600, pauseAfter: 300 },
                { cmd: '  → Source: Facebook Messenger', tooltip: 'Customer messaged your Facebook page', delay: 300, pauseAfter: 200 },
                { cmd: '  → Query: "How to use your product for catering?"', tooltip: 'They want bulk order information for an event', delay: 300, pauseAfter: 400 },
                { cmd: '$ analyze_intent --query="catering_usage"', tooltip: 'Understanding: AI figures out what they really need', delay: 1000, pauseAfter: 500 },
                { cmd: '✓ Intent: Product Usage | Confidence: 94%', tooltip: 'AI is 94% sure this is about bulk ordering/catering', delay: 500, pauseAfter: 300 },
                { cmd: '✓ Sentiment: Positive | Priority: Medium', tooltip: 'Customer is friendly, not urgent, doesn\'t need immediate escalation', delay: 400, pauseAfter: 600 },
                { cmd: '$ search_knowledge --keywords="catering+bulk+usage"', tooltip: 'Finding answer: Searching your documentation for relevant info', delay: 800, pauseAfter: 400 },
                { cmd: '✓ Found 3 relevant articles', tooltip: 'Bulk ordering guide, catering packages, minimum order quantities', delay: 400, pauseAfter: 600 },
                { cmd: '$ generate_response --tone="helpful" --detail="comprehensive"', tooltip: 'Writing reply: AI creates a friendly, complete answer', delay: 1200, pauseAfter: 500 },
                { cmd: '✓ Response generated and sent (1.8 sec total)', tooltip: 'From receiving message to sending reply: under 2 seconds', delay: 600, pauseAfter: 600 },
                { cmd: '', tooltip: null, delay: 200, pauseAfter: 200 },
                { cmd: '✅ Customer satisfied | Query resolved | No escalation needed', tooltip: 'AI handled this completely - no human agent needed', delay: 400, pauseAfter: 500 }
            ]
        }
    };

    const currentWorkflow = workflows[activeWorkflow];
    const currentCommand = currentWorkflow?.commands[commandIndex];

    // Typewriter effect
    useEffect(() => {
        if (!isExecuting || !currentCommand) return;

        if (charIndex < currentCommand.cmd.length) {
            const timer = setTimeout(() => {
                setTypingText(prev => prev + currentCommand.cmd[charIndex]);
                setCharIndex(prev => prev + 1);
            }, 60); // 60ms per character

            return () => clearTimeout(timer);
        } else {
            // Show tooltip briefly
            if (currentCommand.tooltip) {
                setShowTooltip(true);
            }

            // Command fully typed, wait then move to next
            const timer = setTimeout(() => {
                setShowTooltip(false);
                setCommandIndex(prev => prev + 1);
                setTypingText('');
                setCharIndex(0);
            }, currentCommand.pauseAfter);

            return () => clearTimeout(timer);
        }
    }, [isExecuting, charIndex, currentCommand, commandIndex]);

    // Check if execution is complete
    useEffect(() => {
        if (isExecuting && commandIndex >= currentWorkflow.commands.length) {
            setTimeout(() => {
                setShowAfter(true);
                setIsExecuting(false);
            }, 1000);
        }
    }, [isExecuting, commandIndex, currentWorkflow]);

    const handleExecute = () => {
        setCommandIndex(0);
        setCharIndex(0);
        setTypingText('');
        setShowAfter(false);
        setShowTooltip(false);
        setIsExecuting(true);
    };

    const handleReset = () => {
        setCommandIndex(0);
        setCharIndex(0);
        setTypingText('');
        setShowAfter(false);
        setShowTooltip(false);
        setIsExecuting(false);
    };

    // Get completed commands
    const completedCommands = currentWorkflow.commands.slice(0, commandIndex);

    return (
        <section className="py-24 bg-gradient-to-b from-white to-navy/5 dark:from-navy-dark dark:to-white/5">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-left md:text-center mb-16"
                >
                    <h2 className="section-title text-3xl md:text-5xl">Workforce Transformation</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
                        Watch AI-powered workflows eliminate bottlenecks and multiply efficiency in real-time
                    </p>
                </motion.div>

                <div className="max-w-7xl mx-auto">
                    {/* Workflow Selector */}
                    <div className="flex flex-wrap gap-3 mb-8">
                        {Object.entries(workflows).map(([key, workflow]) => (
                            <button
                                key={key}
                                onClick={() => {
                                    setActiveWorkflow(key);
                                    handleReset();
                                }}
                                className={`px-6 py-3 rounded-lg font-bold text-sm transition-all ${activeWorkflow === key
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                        : 'bg-white dark:bg-navy-dark border border-navy/10 dark:border-white/10 hover:border-primary/50'
                                    }`}
                            >
                                {workflow.name}
                            </button>
                        ))}
                    </div>

                    {/* Before/After Comparison */}
                    <div className="grid lg:grid-cols-2 gap-6 mb-8">
                        {/* BEFORE State */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: showAfter ? 0.5 : 1, x: 0 }}
                            className="glass-card p-8 rounded-xl border-2 border-red-500/30 bg-red-50/50 dark:bg-red-900/10"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                                    <AlertCircle size={24} className="text-red-600 dark:text-red-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-red-900 dark:text-red-300">BEFORE Automation</h3>
                                    <p className="text-sm text-red-700 dark:text-red-400">Manual Process</p>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center gap-3">
                                    <Clock size={18} className="text-red-600 dark:text-red-400" />
                                    <div>
                                        <p className="text-xs font-bold text-red-700 dark:text-red-400 uppercase">Time Required</p>
                                        <p className="text-lg font-bold text-red-900 dark:text-red-300">{currentWorkflow.before.time}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users size={18} className="text-red-600 dark:text-red-400" />
                                    <div>
                                        <p className="text-xs font-bold text-red-700 dark:text-red-400 uppercase">Team Size</p>
                                        <p className="text-lg font-bold text-red-900 dark:text-red-300">{currentWorkflow.before.team}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-sm font-bold text-red-800 dark:text-red-400 mb-3 uppercase">Process Steps</h4>
                                <ul className="space-y-2">
                                    {currentWorkflow.before.steps.map((step, idx) => (
                                        <li key={idx} className="text-sm text-red-800 dark:text-red-300 flex gap-2">
                                            <span className="text-red-500">•</span>
                                            {step}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-red-800 dark:text-red-400 mb-3 uppercase">Key Issues</h4>
                                <ul className="space-y-2">
                                    {currentWorkflow.before.issues.map((issue, idx) => (
                                        <li key={idx} className="text-sm text-red-800 dark:text-red-300 flex gap-2">
                                            <AlertCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                                            {issue}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>

                        {/* AFTER State */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: showAfter ? 1 : 0.5, x: 0, scale: showAfter ? 1.02 : 1 }}
                            className="glass-card p-8 rounded-xl border-2 border-teal/30 bg-teal-50/50 dark:bg-teal-900/10 relative overflow-hidden"
                        >
                            {showAfter && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 bg-gradient-to-br from-teal/5 to-primary/5 pointer-events-none"
                                />
                            )}

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-teal/20 flex items-center justify-center">
                                        <CheckCircle2 size={24} className="text-teal-600 dark:text-teal-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-teal-900 dark:text-teal-300">AFTER Automation</h3>
                                        <p className="text-sm text-teal-700 dark:text-teal-400">AI-Powered System</p>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <Zap size={18} className="text-teal-600 dark:text-teal-400" />
                                        <div>
                                            <p className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase">Time Required</p>
                                            <p className="text-lg font-bold text-teal-900 dark:text-teal-300">{currentWorkflow.after.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Users size={18} className="text-teal-600 dark:text-teal-400" />
                                        <div>
                                            <p className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase">Team Size</p>
                                            <p className="text-lg font-bold text-teal-900 dark:text-teal-300">{currentWorkflow.after.team}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="text-sm font-bold text-teal-800 dark:text-teal-400 mb-3 uppercase">Optimized Steps</h4>
                                    <ul className="space-y-2">
                                        {currentWorkflow.after.steps.map((step, idx) => (
                                            <li key={idx} className="text-sm text-teal-800 dark:text-teal-300 flex gap-2">
                                                <span className="text-teal-500">✓</span>
                                                {step}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-teal-800 dark:text-teal-400 mb-3 uppercase">Key Benefits</h4>
                                    <ul className="space-y-2">
                                        {currentWorkflow.after.benefits.map((benefit, idx) => (
                                            <li key={idx} className="text-sm text-teal-800 dark:text-teal-300 flex gap-2">
                                                <TrendingUp size={14} className="text-teal-500 mt-0.5 flex-shrink-0" />
                                                {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Terminal Execution */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-6 rounded-xl border-2 border-primary/20 bg-navy-dark text-teal"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <Terminal size={20} className="text-teal" />
                                <h3 className="font-bold text-white">Live Workflow Execution</h3>
                            </div>
                            <div className="flex items-center gap-3">
                                {isExecuting && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                                        <span className="text-xs font-bold text-teal">RUNNING</span>
                                    </div>
                                )}
                                <button
                                    onClick={isExecuting ? null : handleExecute}
                                    disabled={isExecuting}
                                    className="px-6 py-2 bg-teal text-navy-dark rounded-lg font-bold text-sm hover:bg-teal/90 transition-all disabled:opacity-50"
                                >
                                    {isExecuting ? 'Executing...' : 'Execute Workflow'}
                                </button>
                            </div>
                        </div>

                        <div className="bg-black/30 rounded-lg p-6 font-mono text-sm min-h-[400px] max-h-[500px] overflow-y-auto">
                            {/* Completed commands */}
                            {completedCommands.map((cmd, idx) => (
                                <div key={idx} className="mb-1">
                                    <span className={
                                        cmd.cmd.startsWith('✓') ? 'text-teal' :
                                            cmd.cmd.startsWith('$') ? 'text-primary' :
                                                cmd.cmd.startsWith('📊') || cmd.cmd.startsWith('📈') || cmd.cmd.startsWith('📬') ? 'text-blue-400' :
                                                    'text-gray-400'
                                    }>
                                        {cmd.cmd}
                                    </span>
                                    {cmd.tooltip && (
                                        <div className="ml-6 mb-2 flex items-start gap-2 text-gray-400 text-xs">
                                            <HelpCircle size={12} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                            <span className="italic">{cmd.tooltip}</span>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Currently typing command */}
                            {isExecuting && typingText && (
                                <div>
                                    <span className={
                                        typingText.startsWith('✓') ? 'text-teal' :
                                            typingText.startsWith('$') ? 'text-primary' :
                                                typingText.startsWith('📊') || typingText.startsWith('📈') || typingText.startsWith('📬') ? 'text-blue-400' :
                                                    'text-gray-400'
                                    }>
                                        {typingText}
                                        <motion.span
                                            animate={{ opacity: [1, 0.3, 1] }}
                                            transition={{ repeat: Infinity, duration: 1 }}
                                            className="inline-block w-2 h-4 bg-teal ml-1"
                                        />
                                    </span>
                                    {showTooltip && currentCommand?.tooltip && (
                                        <CommandTooltip text={currentCommand.tooltip} show={showTooltip} />
                                    )}
                                </div>
                            )}

                            {!isExecuting && commandIndex === 0 && (
                                <div className="text-gray-500 flex items-center gap-2">
                                    <Terminal size={16} />
                                    <span>Ready to execute. Click "Execute Workflow" to begin...</span>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Results Summary */}
                    {showAfter && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 glass-card p-8 rounded-xl border-2 border-teal/30 bg-gradient-to-r from-teal/10 to-primary/10"
                        >
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center">
                                    <CheckCircle2 size={32} className="text-teal" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-teal">Workflow Complete!</h3>
                                    <p className="text-gray-600 dark:text-gray-400">AI automation delivered in seconds</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <ArrowRight size={16} className="text-primary" />
                                <span>This transformation is happening right now at scale across all campaigns</span>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default WorkforceWorkflows;
