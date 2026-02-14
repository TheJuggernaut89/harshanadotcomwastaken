import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageSquare, Phone, Send, Github, Linkedin, Twitter, Sparkles, ArrowRight, Users, Zap, Building2, Lightbulb, Coffee, Briefcase } from 'lucide-react';

const ChooseYourAdventure = () => {
    const [stage, setStage] = useState('start');
    const [choices, setChoices] = useState([]);

    const storyline = {
        start: {
            title: "Choose Your Path",
            description: "How would you like to work with me?",
            options: [
                {
                    icon: <Building2 size={24} />,
                    label: "Full-Time Opportunity",
                    description: "You're hiring for a permanent role",
                    next: 'fulltime',
                    color: 'from-blue-500 to-blue-600'
                },
                {
                    icon: <Briefcase size={24} />,
                    label: "Freelance Project",
                    description: "You need help with a specific project",
                    next: 'freelance',
                    color: 'from-purple-500 to-purple-600'
                },
                {
                    icon: <Coffee size={24} />,
                    label: "Just Exploring",
                    description: "Want to chat about possibilities",
                    next: 'casual',
                    color: 'from-teal to-teal-600'
                },
                {
                    icon: <Lightbulb size={24} />,
                    label: "Build Something Cool",
                    description: "You have a wild idea to discuss",
                    next: 'innovation',
                    color: 'from-primary to-red-600'
                }
            ]
        },
        fulltime: {
            title: "Tell Me About The Role",
            description: "What type of position are you looking to fill?",
            options: [
                {
                    icon: <Users size={24} />,
                    label: "Marketing Technologist",
                    description: "Need someone who codes AND markets",
                    next: 'contact_fulltime_tech',
                    color: 'from-primary to-orange-600'
                },
                {
                    icon: <Zap size={24} />,
                    label: "Social Media Manager",
                    description: "Multi-platform content + analytics",
                    next: 'contact_fulltime_smm',
                    color: 'from-blue-500 to-purple-600'
                },
                {
                    icon: <Sparkles size={24} />,
                    label: "Something Else",
                    description: "Let's discuss your specific needs",
                    next: 'contact_fulltime_custom',
                    color: 'from-teal to-blue-600'
                }
            ]
        },
        freelance: {
            title: "What's The Project?",
            description: "Tell me what you're building",
            options: [
                {
                    icon: <Zap size={24} />,
                    label: "AI Automation Build",
                    description: "n8n workflows, APIs, custom tools",
                    next: 'contact_freelance_automation',
                    color: 'from-purple-500 to-pink-600'
                },
                {
                    icon: <Users size={24} />,
                    label: "Social Media Campaign",
                    description: "Content strategy + execution",
                    next: 'contact_freelance_social',
                    color: 'from-blue-500 to-purple-600'
                },
                {
                    icon: <Sparkles size={24} />,
                    label: "Full Marketing System",
                    description: "End-to-end setup + automation",
                    next: 'contact_freelance_system',
                    color: 'from-primary to-orange-600'
                }
            ]
        },
        casual: {
            title: "What's On Your Mind?",
            description: "No pressure, just exploring possibilities",
            options: [
                {
                    icon: <Coffee size={24} />,
                    label: "Career Advice",
                    description: "Want to pick my brain about marketing tech",
                    next: 'contact_casual_advice',
                    color: 'from-teal to-blue-600'
                },
                {
                    icon: <Lightbulb size={24} />,
                    label: "Collaboration Idea",
                    description: "Have a potential partnership in mind",
                    next: 'contact_casual_collab',
                    color: 'from-purple-500 to-pink-600'
                },
                {
                    icon: <Users size={24} />,
                    label: "Just Networking",
                    description: "Connect on LinkedIn and stay in touch",
                    next: 'contact_casual_network',
                    color: 'from-blue-500 to-teal-600'
                }
            ]
        },
        innovation: {
            title: "I'm Listening...",
            description: "Tell me about this wild idea",
            options: [
                {
                    icon: <Zap size={24} />,
                    label: "Experimental Tech Project",
                    description: "Pushing boundaries with AI/automation",
                    next: 'contact_innovation_tech',
                    color: 'from-purple-500 to-pink-600'
                },
                {
                    icon: <Sparkles size={24} />,
                    label: "Startup Idea",
                    description: "Early-stage venture, need a co-founder vibe",
                    next: 'contact_innovation_startup',
                    color: 'from-primary to-orange-600'
                },
                {
                    icon: <Lightbulb size={24} />,
                    label: "Something Weird",
                    description: "Too crazy to categorize (love it already)",
                    next: 'contact_innovation_weird',
                    color: 'from-teal to-purple-600'
                }
            ]
        }
    };

    const contactStages = {
        // Full-time contacts
        contact_fulltime_tech: {
            title: "Perfect Match! 🎯",
            message: "Marketing Technologist roles are exactly my sweet spot. I bring:",
            highlights: [
                "429% Facebook + 178% Instagram growth at Cream of Creams",
                "Technical skills: React, n8n automation, API integration",
                "Creative execution: Adobe-certified, video editing",
                "Revenue tracking systems (not just vanity metrics)"
            ],
            cta: "Let's discuss your tech stack and growth goals"
        },
        contact_fulltime_smm: {
            title: "I Can Do This Sleep! 🚀",
            message: "Social Media Management + AI automation is my core skillset:",
            highlights: [
                "Multi-platform mastery: FB, IG, TikTok, LinkedIn, XHS",
                "Built 6 AI tools for Malaysian market localization",
                "End-to-end: strategy → execution → analytics → optimization",
                "40% efficiency gains through automation"
            ],
            cta: "Tell me about your platforms and KPIs"
        },
        contact_fulltime_custom: {
            title: "I'm Intrigued 💡",
            message: "Custom roles that blend skills are my favorite. My background:",
            highlights: [
                "Entrepreneurial: 3 ventures (1 active, 2 learned expensive lessons)",
                "Security to social media (yes, really)",
                "Technical + Creative + Strategic thinking",
                "Fast learner, always building new systems"
            ],
            cta: "Let's explore if we're a good fit"
        },

        // Freelance contacts
        contact_freelance_automation: {
            title: "Hell Yes! 🤖",
            message: "AI automation builds are what I do for fun (and profit):",
            highlights: [
                "n8n expert: multi-step workflows, API orchestration",
                "Built legal transcription automation (passive income)",
                "Malaysian Marketing Platform (6 AI tools)",
                "Custom solutions > off-the-shelf tools"
            ],
            cta: "Describe your workflow pain points"
        },
        contact_freelance_social: {
            title: "Let's Make It Viral 📈",
            message: "Social media campaigns with real results:",
            highlights: [
                "2M+ impressions on 'Cheesecake Around Malaysia' campaign",
                "Manglish copywriting that actually converts",
                "Platform-specific optimization (not copy-paste)",
                "Data-driven decisions, not gut feelings"
            ],
            cta: "Share your brand and target audience"
        },
        contact_freelance_system: {
            title: "Now We're Talking 🎯",
            message: "Full marketing systems are my specialty:",
            highlights: [
                "Revenue attribution: social → website → sales → RM",
                "Multi-platform automation and content distribution",
                "Analytics dashboards showing what actually works",
                "Training your team to maintain it (not vendor lock-in)"
            ],
            cta: "Tell me your current setup and goals"
        },

        // Casual contacts
        contact_casual_advice: {
            title: "Happy To Help! ☕",
            message: "I learned everything the hard way, save yourself some time:",
            highlights: [
                "Failed businesses = expensive education (worth sharing)",
                "Technical + Marketing hybrid path (rare but powerful)",
                "Malaysian market insights (cultural nuances matter)",
                "Building systems > buying tools"
            ],
            cta: "What's your current challenge?"
        },
        contact_casual_collab: {
            title: "I'm Open To It 🤝",
            message: "Good collaborations create 1+1=3 outcomes:",
            highlights: [
                "Past collabs: event management, content partnerships",
                "Skills I bring: marketing tech, AI automation, content",
                "What I look for: clear value exchange, mutual growth",
                "Malaysian market focus (but not limited to)"
            ],
            cta: "Pitch me your collaboration idea"
        },
        contact_casual_network: {
            title: "Let's Connect! 🌐",
            message: "Always happy to expand the network:",
            highlights: [
                "LinkedIn: Where I share marketing tech insights",
                "Open to: introductions, knowledge exchange, future opps",
                "Malaysian market: Happy to share local insights",
                "Maybe we'll work together someday 🚀"
            ],
            cta: "Connect with me on LinkedIn"
        },

        // Innovation contacts
        contact_innovation_tech: {
            title: "I Love This Energy! ⚡",
            message: "Experimental projects are where breakthroughs happen:",
            highlights: [
                "Built: AI content tools, automation systems, data pipelines",
                "Interested in: AI agents, workflow automation, data viz",
                "Philosophy: Ship fast, iterate faster, learn fastest",
                "Malaysian context: underserved market = opportunity"
            ],
            cta: "Tell me about your experiment"
        },
        contact_innovation_startup: {
            title: "Startup Mode Activated 🚀",
            message: "Early-stage ventures need someone who wears all hats:",
            highlights: [
                "Been there: 3 businesses (1 surviving), learned a LOT",
                "Can contribute: marketing, tech, product, strategy",
                "What I need: equity + clear value path (not just sweat equity)",
                "Excited about: AI/automation in Malaysian market"
            ],
            cta: "Pitch me your startup vision"
        },
        contact_innovation_weird: {
            title: "You Had Me At Weird 🎪",
            message: "The best ideas sound crazy at first:",
            highlights: [
                "My weird ideas: Spotify recipe playlists, forest symphony campaigns",
                "Philosophy: Different is better than better",
                "Malaysian market: conservative surface, creative underneath",
                "Let's see if your weird matches my weird 😄"
            ],
            cta: "Hit me with your wildest pitch"
        }
    };

    const handleChoice = (nextStage) => {
        setChoices([...choices, stage]);
        setStage(nextStage);
    };

    const handleReset = () => {
        setStage('start');
        setChoices([]);
    };

    const handleBack = () => {
        if (choices.length > 0) {
            setStage(choices[choices.length - 1]);
            setChoices(choices.slice(0, -1));
        }
    };

    const isContactStage = stage.startsWith('contact_');
    const currentStory = isContactStage ? contactStages[stage] : storyline[stage];

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-navy/5 dark:from-navy-dark dark:to-white/5">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="section-title">Choose Your Adventure</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
                        Pick your path, I'll take it from there
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!isContactStage ? (
                        <motion.div
                            key={stage}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            {/* Story Title */}
                            <div className="text-center">
                                <h3 className="text-3xl font-bold mb-2">{currentStory.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{currentStory.description}</p>
                            </div>

                            {/* Options Grid */}
                            <div className="grid md:grid-cols-2 gap-4">
                                {currentStory.options.map((option, index) => (
                                    <motion.button
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => handleChoice(option.next)}
                                        className="group relative overflow-hidden rounded-xl p-6 text-left transition-all hover:scale-105"
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                                        <div className="glass-card h-full border border-primary/20 group-hover:border-primary/40 p-6 relative z-10">
                                            <div className="flex items-start gap-4">
                                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} text-white flex items-center justify-center flex-shrink-0`}>
                                                    {option.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                                                        {option.label}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        {option.description}
                                                    </p>
                                                </div>
                                                <ArrowRight className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                                            </div>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            {/* Back Button */}
                            {choices.length > 0 && (
                                <div className="text-center">
                                    <button
                                        onClick={handleBack}
                                        className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                                    >
                                        ← Go Back
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key={stage}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="max-w-3xl mx-auto"
                        >
                            <div className="glass-card p-8 md:p-12 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-teal/5">
                                <h3 className="text-4xl font-bold mb-4 text-center">{currentStory.title}</h3>
                                <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 text-center">
                                    {currentStory.message}
                                </p>

                                <div className="bg-white/50 dark:bg-navy-dark/50 rounded-xl p-6 mb-8">
                                    <ul className="space-y-3">
                                        {currentStory.highlights.map((highlight, idx) => (
                                            <li key={idx} className="flex gap-3">
                                                <span className="text-teal text-xl">✓</span>
                                                <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <a
                                        href={`mailto:jothiharshana188@gmail.com?subject=${encodeURIComponent(currentStory.cta)}`}
                                        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
                                    >
                                        <Mail size={20} />
                                        Email Me: {currentStory.cta}
                                    </a>
                                    <a
                                        href="https://wa.me/60112964914"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-teal text-white rounded-xl font-bold text-lg shadow-lg shadow-teal/30 hover:shadow-xl hover:shadow-teal/40 transition-all"
                                    >
                                        <MessageSquare size={20} />
                                        WhatsApp Me Instead
                                    </a>
                                </div>

                                <div className="mt-8 text-center">
                                    <button
                                        onClick={handleReset}
                                        className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm"
                                    >
                                        ← Start Over
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Social Links at Bottom */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 flex items-center justify-center gap-4"
                >
                    <span className="text-sm text-gray-600 dark:text-gray-400">Or connect directly:</span>
                    {[
                        { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
                        { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
                        { icon: <Github size={20} />, href: '#', label: 'GitHub' }
                    ].map((social, i) => (
                        <motion.a
                            key={i}
                            href={social.href}
                            whileHover={{ y: -3, scale: 1.1 }}
                            className="w-10 h-10 rounded-full border border-primary/20 hover:border-primary/50 flex items-center justify-center hover:bg-primary/10 transition-all"
                            title={social.label}
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ChooseYourAdventure;
